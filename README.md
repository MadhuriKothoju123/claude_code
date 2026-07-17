# my-app

Express (TypeScript) API + React (TypeScript, Vite) frontend, wired together
as an npm workspaces monorepo, pre-configured for Claude Code.

## Quick start

```bash
npm install
cp server/.env.example server/.env
npm run dev
```

This starts the Express API on `http://localhost:4000` and the Vite dev
server on `http://localhost:5173` together. The client proxies `/api/*`
requests to the server in dev, so open `http://localhost:5173` and you
should see a page reading the server's `/api/health` endpoint.

## Project layout

```
my-app/
├── CLAUDE.md              # instructions for Claude Code
├── .claude/settings.json  # permissions Claude Code operates under
├── server/                # Express API (TypeScript, ESM)
│   └── src/
│       ├── index.ts       # entry point
│       ├── app.ts         # express app + middleware
│       ├── routes/        # one file per resource
│       └── config/        # env parsing
└── client/                # React app (Vite + TypeScript)
    └── src/
```

## Scripts (run from repo root)

| Command | What it does |
|---|---|
| `npm run dev` | Run server + client together, watch mode |
| `npm run build` | Type-check and build both workspaces |
| `npm run lint` | Lint both workspaces |
| `npm run type-check` | TypeScript check only |
| `npm run verify` | type-check + lint + test + build — run before considering any change done |

## Using Claude Code here

- `CLAUDE.md` documents the architecture, conventions, and gotchas so
  Claude Code has project context from the first prompt.
- `.claude/settings.json` pre-approves the npm scripts above so Claude Code
  can run and verify its own work without prompting for every command, while
  denying destructive operations (`rm -rf`, `sudo`, editing `.env` files).
- Ask Claude Code to run `npm run verify` after any change — that's the
  single command that proves the change actually works.
