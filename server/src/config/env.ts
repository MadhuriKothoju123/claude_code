import "dotenv/config";

function required(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  PORT: Number(required("PORT", "4000")),
  NODE_ENV: required("NODE_ENV", "development"),
  CLIENT_ORIGIN: required("CLIENT_ORIGIN", "http://localhost:5173"),
};
