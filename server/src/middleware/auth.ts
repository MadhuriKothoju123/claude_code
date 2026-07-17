import type { NextFunction, Request, Response } from "express";
import { resolveSession } from "../store/sessions.js";
import { findUserById, toPublicUser, type PublicUser } from "../store/users.js";

export const SESSION_COOKIE_NAME = "session_token";

declare global {
  // Augmenting Express's Request type requires the namespace form.
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: PublicUser;
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.[SESSION_COOKIE_NAME] as string | undefined;
  const userId = resolveSession(token);
  const user = userId ? findUserById(userId) : undefined;

  if (!user) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  req.user = toPublicUser(user);
  next();
}
