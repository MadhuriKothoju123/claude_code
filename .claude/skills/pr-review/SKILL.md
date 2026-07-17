---
name: pr-review
description: Review a GitHub pull request on MadhuriKothoju123/claude_code by number or link — fetch the diff via GitHub MCP, check it against this repo's actual conventions, and post a real review (line comments + verdict), not just a chat summary. Use whenever asked to review, check, or look over a specific PR. For local uncommitted changes use /code-review instead.
---

# PR review

This repo is `MadhuriKothoju123/claude_code` on GitHub, default branch
`main`. Use this whenever asked to review a pull request by number or link.

## 1. Fetch the PR

- `mcp__github__pull_request_read` method `get` — metadata (title, base/head
  branch, draft status).
- Method `get_diff` and `get_files` — the actual change.
- Method `get_check_runs` — CI status. A failing check is grounds for
  `REQUEST_CHANGES` on its own, regardless of code quality.
- Method `get_reviews` / `get_comments` — check whether this PR already has
  a review from you or others, so you don't repeat old feedback verbatim.

## 2. Check against this repo's actual conventions

Don't review against generic best practices alone — check the diff against
what this repo actually requires:

- [CLAUDE.md](../../../CLAUDE.md) — strict TypeScript (no loosening it),
  function components and hooks only (no classes), `npm run verify`
  (type-check + lint + test + build) as the bar for "done", and the
  folder-per-item structure (`components/<Name>/<Name>.tsx` + `.test.tsx` +
  `index.ts`, same shape for `pages/` and `routes/`; flat `use<Thing>.ts` +
  `.test.ts` for `hooks/` and `utils/`). Every new component/page/hook/
  router/util needs a co-located matching test file. A `PostToolUse` hook
  (`check-test-file.sh`) already nudges about this locally, but PRs can
  still arrive without it if opened from elsewhere — check for it
  explicitly.
- If the diff touches `src/components/**` or `src/pages/**`, invoke the
  `react-mui-component` skill (via the `Skill` tool) to load its full
  checklist and check the diff against it: MUI components only (no bare
  HTML for UI, no second UI library), no inline `style={{...}}` or
  `.module.css`/`.css` files (use `sx`/`styled()`), explicit `Props`
  interface per component, ~150 lines per file, one component per file.

Read the actually-changed files locally (`Read`/`Grep`) when the diff alone
doesn't give enough context — e.g. to confirm a helper it calls doesn't
already exist elsewhere, or that a moved file's new relative imports still
resolve.

## 3. Post a real review

1. `mcp__github__pull_request_review_write` method `create` — opens a
   pending review (no `event` yet).
2. For each concrete issue, `mcp__github__add_comment_to_pending_review`
   with the file path and line. Only comment on real problems —
   correctness bugs, convention violations from section 2, missing test
   files, security issues. Don't nitpick style a linter would already catch
   (`npm run lint` covers that).
3. Submit: `pull_request_review_write` method `submit_pending` with:
   - `event: "REQUEST_CHANGES"` — correctness bugs, failing CI checks, or
     violations that would break the build/tests/conventions above.
   - `event: "COMMENT"` — suggestions/nits, nothing blocking.
   - `event: "APPROVE"` — only when the diff is clean against every
     applicable convention and checks are green.
   Include a short `body` summarizing the verdict and why, referencing
   which convention (if any) drove a `REQUEST_CHANGES`.

## Boundaries

- Never call `merge_pull_request` — merging needs an explicit, separate
  confirmation from the user in chat, never bundled into a review.
- Never push commits, amend, or edit the PR's branch — read and review
  only.
- If the PR is a draft, still review it, but say so in the summary body
  instead of skipping the review.
- If asked to review a PR without a number, list open PRs
  (`mcp__github__list_pull_requests`, state `open`) and ask which one
  rather than guessing.
