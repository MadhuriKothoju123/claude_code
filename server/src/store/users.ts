import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export interface PublicUser {
  id: string;
  email: string;
  createdAt: string;
}

const usersByEmail = new Map<string, User>();

export function toPublicUser(user: User): PublicUser {
  return { id: user.id, email: user.email, createdAt: user.createdAt };
}

export function findUserByEmail(email: string): User | undefined {
  return usersByEmail.get(email.toLowerCase());
}

export function findUserById(id: string): User | undefined {
  for (const user of usersByEmail.values()) {
    if (user.id === id) return user;
  }
  return undefined;
}

export async function createUser(email: string, password: string): Promise<User> {
  const normalizedEmail = email.toLowerCase();
  if (usersByEmail.has(normalizedEmail)) {
    throw new Error("Email already registered");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user: User = {
    id: randomUUID(),
    email: normalizedEmail,
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  usersByEmail.set(normalizedEmail, user);
  return user;
}

export async function verifyPassword(user: User, password: string): Promise<boolean> {
  return bcrypt.compare(password, user.passwordHash);
}
