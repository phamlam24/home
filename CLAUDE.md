# home — Claude Code context

See [`../CLAUDE.md`](../CLAUDE.md) for cross-app architecture and [`../docs/HOSTING.md`](../docs/HOSTING.md) for server/infra details. This file only covers things specific to this app's code.

Worktrees are allowed (see `../CLAUDE.md`'s Git workflow section) — edit directly in this checkout for most changes, use one when isolation actually helps.

**Versioning is commit-message-driven, not manual** — prefix a commit with `(patch)`/`(minor)`/`(major)` to have CI bump `package.json` accordingly on push; no prefix means no version change. See `../CLAUDE.md`'s Versioning section for the policy and `.github/workflows/deploy.yml`'s "Bump version from commit message prefix" step for the mechanism.

## What this is

Serves the root domain `lampham.space`. For now it's just a redirect hub linking to the other apps; it's expected to grow into a full portfolio site later. No database, no admin editing — just a login check to decide which links to show.

Built with **Astro (SSR, server output)** + **Tailwind CSS v4** + Catppuccin Macchiato, matching the other apps' look. No Preact/islands — the page has no interactivity yet.

**Never use em dashes in any visible copy on this site** (headings, prose, bullets, titles, prize/subtitle strings, etc.) — use a comma, colon, period, or `·` instead depending on context.

## Auth: login-gated visibility, not admin editing

Unlike climbing-tracker (public + admin editing) or learn (fully login-gated), this app is public but shows a different **set of links** depending on login state:

- Logged out (and not localhost): only public apps (currently just Climbing Tracker).
- Logged in, or browsing on localhost: every app, including login-gated ones (currently adds Learn).

`src/lib/auth.ts`'s `isLoggedIn()` is the one check driving this — same JWT-cookie-verification pattern as the other apps' `isAdmin()`/middleware, just renamed since "admin" isn't the right concept here (there's no editing to gate).

## Adding a new app to the hub

Edit the `APPS` array in `src/pages/apps.astro` — add `{ name, href, description, requiresLogin }`. That's the only change needed; the page filters and renders from that list.

## Project structure

```
src/
  lib/
    auth.ts                  # isLoggedIn(request, cookies) — JWT cookie check, localhost bypass
    verifyAccessToken.ts       # shared JWT verification (copied from climbing-tracker/learn)
    authOrigin.ts               # AUTH_ORIGIN constant

  middleware.ts               # silently refreshes an expired access token via the auth service
                                # when a refresh token is present (same pattern as the other apps)

  layouts/
    BaseLayout.astro           # minimal shell — no header nav, just the page content

  pages/
    index.astro                 # portfolio landing page
    apps.astro                  # the app hub: APPS array, login-based filtering, login/logout link

  components/
    Footer.astro                # shared footer (home/apps nav, github, status, copyright, log out) —
                                  # used on apps.astro; index.astro keeps its own richer portfolio footer

  styles/
    global.css                  # Tailwind v4 + Catppuccin Macchiato, same semantic token aliases
                                  # as climbing-tracker (bg-surface, text-muted, etc.)
```
