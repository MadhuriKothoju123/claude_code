---
name: react-mui-component
description: Build or edit React components for this repo (src/). Use whenever the user asks to create, add, scaffold, or refactor a React component, page, form, dialog, or UI element in this project — even if they don't mention MUI, styling, or line count by name. Enforces this project's component rules — MUI-only UI, no inline styles, TypeScript function components with hooks, one component per file under 150 lines — so generated code matches existing conventions instead of drifting into plain HTML/CSS or class components.
---

# React MUI Component

This repo's `src/` standardizes on **Material UI (MUI)** for all UI,
TypeScript function components, and no inline styling. This skill encodes
those rules so every component you write fits the existing codebase without
needing a follow-up cleanup pass.

## Core rules

1. **MUI components only, no bare HTML for UI elements.** Use `<Button>`
   not `<button>`, `<TextField>` not `<input>`, `<Typography>` not `<h1>`/
   `<p>`, `<Box>`/`<Stack>`/`<Grid>` for layout instead of `<div>` with
   custom CSS. A plain `<div>` or `<span>` is fine only as an inert wrapper
   with no visual styling of its own — reach for `Box` first regardless,
   since it takes the same props and stays consistent with the rest of the
   file. Never add a second UI library (no Chakra, Ant Design, Bootstrap,
   Tailwind, etc.) — MUI is the only one.
   

2. **No inline styles, ever.** Never use the `style={{...}}` prop. Style
   through MUI's `sx` prop for one-off styling, the `styled()` API for
   reusable styled components, or the theme (`useTheme`, theme tokens like
   `theme.spacing()`, `theme.palette`) for values that should stay
   consistent across the app. Don't add plain `.css`/`.scss` files for new
   components — `sx` and `styled()` cover what CSS files used to do, and
   keeping styles co-located in the component is easier to maintain than a
   separate stylesheet that can drift out of sync.

3. **Function components and hooks only** — this matches the existing
   CLAUDE.md rule for the repo, not just this skill. No class components,
   no `React.Component`. Use built-in hooks (`useState`, `useEffect`,
   `useMemo`, etc.) and extract custom hooks (`useThing`) when logic needs
   to be shared or a component is getting crowded with non-render logic.

4. **TypeScript throughout.** Every component gets an explicit `Props`
   interface (named `<ComponentName>Props`), even for a single prop —
   it documents the component's contract and gives callers autocomplete.
   Avoid `any`; if a prop's type isn't obvious, model it precisely (union
   of literal strings, a proper event handler type, etc.). Export the
   props type alongside the component if other files might need to
   reference it (e.g. a parent building the props object ahead of time).

5. **One component per file, 150 lines or fewer** (including imports and
   the props interface, excluding blank lines used for readability). If a
   component is approaching the limit:
   - Pull repeated JSX into a subcomponent in its own file.
   - Move non-trivial logic (data fetching, derived state, form handling)
     into a custom hook in the same folder or a `hooks/` subfolder.
   - Split a "smart" container component from a "dumb" presentational one
     if the component is doing both data-wrangling and rendering.
   Prefer splitting along natural seams (a repeated list item, a form
   section, a toolbar) rather than cutting arbitrarily at the line count —
   the goal is readability and reuse, and the line limit is a signal that
   a component is trying to do too much, not just a number to dodge.

6. **Reusable, composable, no premature abstraction.** Give props sensible
   defaults where a sensible default exists. Favor composition (children,
   render props, or slot-like props) over a single component that grows a
   long list of boolean flags to handle every variant. But don't build
   generic abstractions for a single call site — if a component is only
   ever used one way today, keep it concrete; generalize when a second use
   case actually shows up.

## Placement

- Components live under `src/components/`. If a component is specific to
  one page/feature and unlikely to be reused, a `components/<Feature>/`
  subfolder is fine; shared primitives go directly under `components/`.
- Custom hooks go in `src/hooks/` (create it if it doesn't exist), named
  `use<Thing>.ts`.
- Match the existing file naming: `PascalCase.tsx` for components.

MUI (`@mui/material`, `@emotion/react`, `@emotion/styled`) is already a
dependency — no setup needed. Add `@mui/icons-material` only if a component
actually needs icons; confirm with the user before adding a new dependency
if you're unsure whether they want it.

Theming: `src/theme.ts` defines the theme, and `main.tsx` wraps the app in
`<ThemeProvider>` + `<CssBaseline />`. Reach for theme tokens (`useTheme`,
`theme.spacing()`, `theme.palette`) for values that should stay consistent
across the app rather than hardcoding them.

## Example shape

A typical small component — note the `Props` interface, `sx` instead of
inline styles, and MUI components for every visual element:

```tsx
import { Card, CardContent, Stack, Typography, Chip } from '@mui/material'

interface UserCardProps {
  name: string
  email: string
  role?: string
}

function UserCard({ name, email, role = 'Member' }: UserCardProps) {
  return (
    <Card variant="outlined" sx={{ maxWidth: 360 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{name}</Typography>
          <Chip label={role} size="small" color="primary" />
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {email}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default UserCard
```

## After writing or editing a component

Run `npm run verify` from the repo root (per this repo's CLAUDE.md) to
catch type errors and lint issues — MUI prop misuse and missing imports
usually surface here before you'd see them in the browser.
