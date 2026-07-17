# my-app

React (TypeScript, Vite) frontend, wired up as an npm workspaces monorepo,
pre-configured for Claude Code.

## Quick start

```bash
npm install
npm run dev
```

This starts the Vite dev server on `http://localhost:5173`.

## Project layout

```
my-app/
├── CLAUDE.md              # instructions for Claude Code
├── .claude/settings.json  # permissions Claude Code operates under
└── src/                   # React app (Vite + TypeScript)
```

## Scripts (run from repo root)

| Command | What it does |
|---|---|
| `npm run dev` | Run the client, watch mode |
| `npm run build` | Type-check and build the client |
| `npm run lint` | Lint the client |
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
