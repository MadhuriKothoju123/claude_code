import { randomUUID } from "node:crypto";

export const SESSION_TTL_MS = 24 * 60 * 60 * 1000;

interface Session {
  userId: string;
  expiresAt: number;
}

const sessions = new Map<string, Session>();

export function createSession(userId: string): string {
  const token = randomUUID();
  sessions.set(token, { userId, expiresAt: Date.now() + SESSION_TTL_MS });
  return token;
}

export function resolveSession(token: string | undefined): string | undefined {
  if (!token) return undefined;

  const session = sessions.get(token);
  if (!session) return undefined;

  if (session.expiresAt < Date.now()) {
    sessions.delete(token);
    return undefined;
  }

  return session.userId;
}

export function destroySession(token: string | undefined): void {
  if (token) sessions.delete(token);
}
