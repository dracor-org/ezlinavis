# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Easy Linavis — a browser-only React app that turns a hierarchical, hashtag-delimited character list (per scene) into a network visualization of character co-occurrences. Deployed at https://ezlinavis.dracor.org. Part of the DraCor project.

## Commands

Uses **pnpm** (see `packageManager` field). Common scripts:

- `pnpm run dev` (alias `start`) — compile the grammar, then run Vite dev server (opens browser automatically).
- `pnpm run build` — compile the grammar, then Vite build into `build/`.
- `pnpm run preview` — build-preview with Vite.
- `pnpm run grammar` — regenerate `src/grammar.js` from `src/grammar.ne` using `nearleyc`. Runs automatically before `dev`/`build`/`preview`, but call it manually when editing the grammar so the linter sees the fresh output.
- `pnpm run lint` — ESLint over `src/` (flat config in `eslint.config.mjs`; `src/grammar.js` and `src/App.test.jsx` are ignored).

There is currently no runnable test command. `src/App.test.jsx` exists but is a leftover from Create React App (references `ReactDOM.render` — the React 16 API) and is not wired into any runner.

## Architecture

Single-page React 16 app; no backend. All logic lives client-side.

**Data flow:** user text → nearley parser → co-occurrence extraction → Gephi-style CSV + sigma.js graph, all recomputed inside [EzlinavisComponent.jsx](src/components/EzlinavisComponent.jsx) on every debounced input change.

Key pieces:

- [src/grammar.ne](src/grammar.ne) — nearley grammar for the input format. **Compiled output `src/grammar.js` is committed** and imported directly by React code; regenerate via `pnpm run grammar` after editing the `.ne` file. The linter ignores the generated file.
- Input format: optional free-text header lines, then repeated `#`-prefixed section titles (any level of `#`s treated as a section separator) followed by one character name per line. See [src/grammar.ne](src/grammar.ne) for the exact rules and any `.txt` file under [public/examples/](public/examples/) for canonical examples.
- [EzlinavisComponent.jsx](src/components/EzlinavisComponent.jsx) — orchestrator. `handleListChange` parses text, calls `getCooccurrences` (pairs characters that share a scene, weights by scene count) and `makeGraph`. State is held in this single class component; child components are stateless views.
- Graph rendering uses `react-sigma` with three switchable layouts (NOverlap / ForceLink / ForceAtlas2). Note the `key` on `<Sigma>` is derived from list length + layout name to force remount when either changes — sigma doesn't gracefully update graphs in place.
- [src/examples.json](src/examples.json) is the menu of built-in samples; each `url` points to a file served from [public/examples/](public/examples/). Adding an example means dropping a `.txt` file there and adding an entry to `examples.json`.

## Build / Deploy

- Vite config ([vite.config.mjs](vite.config.mjs)) outputs to `build/` (not the default `dist/`) — kept from the Create React App layout.
- Bootstrap 3 CSS is loaded via CDN from [index.html](index.html); `react-bootstrap` here is v0.31 (Bootstrap-3 era) — don't upgrade it casually as the UI depends on B3 markup.
- Deployment is CI-only: pushing a GitHub Release triggers [.github/workflows/deploy-production.yml](.github/workflows/deploy-production.yml) which invokes the shared `deployment.yml` reusable workflow. Staging has an analogous workflow.

## Gotchas

- Dependency stack is intentionally old (React 16, react-sigma 1.x, react-bootstrap 0.31). Upgrading React requires reworking `App.test.jsx` and likely rewriting graph rendering, since `react-sigma` has no React 17+ release.
- `defaultEdgeColor` in the sigma settings does not take effect; edge color is set per-edge in `makeGraph` (see the FIXME comment).
