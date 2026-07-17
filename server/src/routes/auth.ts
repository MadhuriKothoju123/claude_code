import { Router } from "express";
import { env } from "../config/env.js";
import { requireAuth, SESSION_COOKIE_NAME } from "../middleware/auth.js";
import { createSession, destroySession, SESSION_TTL_MS } from "../store/sessions.js";
import { createUser, findUserByEmail, toPublicUser, verifyPassword } from "../store/users.js";

export const authRouter = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: env.NODE_ENV === "production",
  maxAge: SESSION_TTL_MS,
};

authRouter.post("/auth/register", async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    res.status(400).json({ error: "A valid email is required" });
    return;
  }
  if (typeof password !== "string" || password.length < MIN_PASSWORD_LENGTH) {
    res.status(400).json({ error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` });
    return;
  }
  if (findUserByEmail(email)) {
    res.status(409).json({ error: "Email already registered" });
    return;
  }

  const user = await createUser(email, password);
  const token = createSession(user.id);
  res.cookie(SESSION_COOKIE_NAME, token, cookieOptions);
  res.status(201).json({ user: toPublicUser(user) });
});

authRouter.post("/auth/login", async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (typeof email !== "string" || typeof password !== "string") {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  const user = findUserByEmail(email);
  const valid = user ? await verifyPassword(user, password) : false;
  if (!user || !valid) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  const token = createSession(user.id);
  res.cookie(SESSION_COOKIE_NAME, token, cookieOptions);
  res.json({ user: toPublicUser(user) });
});

authRouter.post("/auth/logout", (req, res) => {
  const token = req.cookies?.[SESSION_COOKIE_NAME] as string | undefined;
  destroySession(token);
  res.clearCookie(SESSION_COOKIE_NAME, cookieOptions);
  res.status(204).end();
});

authRouter.get("/auth/me", requireAuth, (req, res) => {
  res.json({ user: req.user });
});
