# my-app

Express (TypeScript) API + React (TypeScript, Vite) frontend, managed as an
npm workspaces monorepo.

## Code style
- TypeScript strict mode is on in both workspaces — don't loosen it.

## Workflow
- After implementing a change, run `npm run verify` and fix anything it
  reports before calling the task done.
- Keep client and server changes in the same commit when they're part of one
  feature (e.g., a new API route plus the UI that calls it).

## Integration gotchas
- `CLIENT_ORIGIN` in `server/.env` must match the Vite dev server URL
  (default `http://localhost:5173`) or CORS will reject requests when
  hitting the API directly (not needed when going through the Vite proxy).
- The client dev server proxies `/api` to port 4000 — if you change the
  server port, update `client/vite.config.ts` too.
