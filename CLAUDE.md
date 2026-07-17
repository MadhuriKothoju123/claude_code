# my-app

React (TypeScript, Vite) frontend.

## Code style
- TypeScript strict mode is on — don't loosen it.
- Prefer function components and hooks; no class components.

## Workflow
- After implementing a change, run `npm run verify` and fix anything it
  reports before calling the task done.

## Folder structure

```
src/
├── components/
│   └── <ComponentName>/
│       ├── <ComponentName>.tsx
│       ├── <ComponentName>.test.tsx
│       └── index.ts
├── pages/
│   └── <PageName>/
│       ├── <PageName>.tsx
│       ├── <PageName>.test.tsx
│       └── index.ts
├── hooks/
│   ├── use<Thing>.ts
│   └── use<Thing>.test.ts
├── routes/
│   ├── AppRouter.tsx
│   ├── AppRouter.test.tsx
│   └── index.ts
└── utils/
    ├── <thing>.ts
    └── <thing>.test.ts
```

- **`components/`** — reusable UI components, one per folder. The folder's
  `index.ts` re-exports the default: `export { default } from
  './<ComponentName>'`. Import from the folder (`./components/Button`), not
  the file directly.
- **`pages/`** — route-level components rendered directly by a `<Route>` in
  `AppRouter.tsx`. Same folder shape as `components/`. If a page-only piece
  (a form section, a list item) isn't reused elsewhere, it can live
  alongside the page rather than under `components/`.
- **`hooks/`** — custom hooks stay flat (no per-hook folder), named
  `use<Thing>.ts` with a co-located `use<Thing>.test.ts`.
- **`routes/`** — the route table lives in `AppRouter.tsx` (the `<Routes>` /
  `<Route>` tree mapping paths to pages), following the same
  `<Name>.tsx` + `<Name>.test.tsx` + `index.ts` shape as `components/` and
  `pages/`. `App.tsx` just renders `<AppRouter />`; it doesn't declare
  routes itself. If the app grows distinct route groups (e.g. public vs.
  authenticated), split them into additional files here (e.g.
  `PublicRoutes.tsx`, `PrivateRoutes.tsx`) and compose them from
  `AppRouter.tsx`.
- **`utils/`** — flat, same pattern as `hooks/`: `<thing>.ts` +
  `<thing>.test.ts`. Create this folder when the first utility function is
  actually needed — don't pre-create an empty one.

No CSS modules or sidecar stylesheets in `components/` or `pages/` — this
project is MUI-only (see the `react-mui-component` skill); style through
`sx` or `styled()`, not a `.module.css` file.

## Testing convention
Whenever a new component, page, hook, util, or router is created, also
create a matching Jest test file next to it:
- Component: `src/components/Button/Button.tsx` →
  `src/components/Button/Button.test.tsx`
- Page: `src/pages/HomePage/HomePage.tsx` →
  `src/pages/HomePage/HomePage.test.tsx`
- Hook: `src/hooks/useThing.ts` → `src/hooks/useThing.test.ts`
- Router: `src/routes/AppRouter.tsx` → `src/routes/AppRouter.test.tsx`
- Util: `src/utils/formatDate.ts` → `src/utils/formatDate.test.ts`

Use React Testing Library with Jest. Cover rendering, prop variations,
and key user interactions. Match existing test patterns in this package.
Router tests render the router inside a `MemoryRouter` at a given path and
assert the right page (or redirect) shows up.

`.claude/hooks/check-test-file.sh` enforces this automatically for
`src/components/**`, `src/pages/**`, `src/hooks/**`, `src/routes/**`, and
`src/utils/**` (skipping `index.ts` barrels and test files themselves).
