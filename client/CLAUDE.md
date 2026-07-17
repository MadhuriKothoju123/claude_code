## Code style
- Prefer function components and hooks; no class components.

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
└── utils/
    ├── <thing>.ts
    └── <thing>.test.ts
```

- **`components/`** — reusable UI components, one per folder. The folder's
  `index.ts` re-exports the default: `export { default } from
  './<ComponentName>'`. Import from the folder (`./components/Button`), not
  the file directly.
- **`pages/`** — route-level components rendered directly by a `<Route>` in
  `App.tsx`. Same folder shape as `components/`. If a page-only piece (a
  form section, a list item) isn't reused elsewhere, it can live alongside
  the page rather than under `components/`.
- **`hooks/`** — custom hooks stay flat (no per-hook folder), named
  `use<Thing>.ts` with a co-located `use<Thing>.test.ts`.
- **`utils/`** — flat, same pattern as `hooks/`: `<thing>.ts` +
  `<thing>.test.ts`. Create this folder when the first utility function is
  actually needed — don't pre-create an empty one.

No CSS modules or sidecar stylesheets in `components/` or `pages/` — this
project is MUI-only (see the `react-mui-component` skill); style through
`sx` or `styled()`, not a `.module.css` file.

## Testing convention
Whenever a new component, page, hook, or util is created, also create a
matching Jest test file next to it:
- Component: `src/components/Button/Button.tsx` →
  `src/components/Button/Button.test.tsx`
- Page: `src/pages/LoginPage/LoginPage.tsx` →
  `src/pages/LoginPage/LoginPage.test.tsx`
- Hook: `src/hooks/useAuth.ts` → `src/hooks/useAuth.test.ts`
- Util: `src/utils/formatDate.ts` → `src/utils/formatDate.test.ts`

Use React Testing Library with Jest. Cover rendering, prop variations, 
and key user interactions. Match existing test patterns in this package.

`.claude/hooks/check-test-file.sh` enforces this automatically for
`src/components/**`, `src/pages/**`, `src/hooks/**`, and `src/utils/**`
(skipping `index.ts` barrels and test files themselves).