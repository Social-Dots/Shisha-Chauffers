import rootConfig from "../vite.config";

/**
 * Re-export the repo-root vite.config.ts so `vite build` / `vite dev` work when
 * invoked from inside client/ as well as from the repo root. Without this,
 * vite looks for a config in cwd only and finds nothing, which silently
 * breaks `@/` alias resolution and path-aware plugins.
 */
export default rootConfig