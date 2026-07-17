# my-app

Express (TypeScript) API + React (TypeScript, Vite) frontend, managed as an
npm workspaces monorepo.

## Architecture

- `server/` — Express API. Entry point `server/src/index.ts`, app wiring in
  `server/src/app.ts`. Routes live in `server/src/routes/`, one file per
  resource. Config/env parsing in `server/src/config/env.ts`.
- `client/` — React app (Vite). Standard `src/` layout. Talks to the API via
  `/api/*`, which Vite proxies to `http://localhost:4000` in dev
  (see `client/vite.config.ts`).
- Root `package.json` uses npm workspaces to run/build both together.

## Commands

Run these from the repo root unless noted.

- `npm run dev` — start both server and client in watch mode (concurrently)
- `npm run dev:server` / `npm run dev:client` — start just one side
- `npm run build` — type-checks and builds both workspaces
- `npm run lint` — lints both workspaces
- `npm run type-check` — TypeScript check only, no emit
- `npm run test` — runs tests in both workspaces
- `npm run verify` — type-check + lint + test + build; run this after any
  change before considering it done

## Code style

- TypeScript strict mode is on in both workspaces — don't loosen it.
- Server uses ESM (`"type": "module"`), `NodeNext` module resolution.
  Relative imports in `server/src` need explicit `.js` extensions (this is
  normal for NodeNext + TS, not a typo).
- New Express routes: add a `Router` in `server/src/routes/<name>.ts` and
  mount it in `server/src/app.ts` under `/api`.
- Prefer function components and hooks on the client; no class components.

## Workflow

- After implementing a change, run `npm run verify` and fix anything it
  reports before calling the task done.
- Keep client and server changes in the same commit when they're part of one
  feature (e.g., a new API route plus the UI that calls it).
- Environment variables: copy `server/.env.example` to `server/.env` locally;
  never commit `.env`.

## Gotchas

- `CLIENT_ORIGIN` in `server/.env` must match the Vite dev server URL
  (default `http://localhost:5173`) or CORS will reject requests when
  hitting the API directly (not needed when going through the Vite proxy).
- The client dev server proxies `/api` to port 4000 — if you change the
  server port, update `client/vite.config.ts` too.
