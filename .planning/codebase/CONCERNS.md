# CONCERNS

Known risks & technical debt

- Monorepo complexity: Nx + Lerna + pnpm adds cognitive overhead for contributors; ensure CI scripts are clear and well-documented.
- Publishing hygiene: multiple `publish:*` scripts (Lerna) — verify `bundles/*/package.dist.json` is updated if package boundaries change.

Potential fragile areas

- Hot-path performance: particle update loops are performance-sensitive. Look for per-frame allocations in `engine/src/` utilities and updaters (e.g., `Utils.ts`, `MathUtils.ts`).
- Bundle configs: webpack configs under `bundles/*` can diverge; ensure consistent build target configs.

Security & secrets

- Repository is a library and currently contains no runtime secrets. Still, be careful when generating docs or examples that include API keys — add `.planning/codebase/` to review before commit.

Testing gaps

- Ensure critical performance scenarios have benchmarks or stress tests; current tests mostly focus on correctness.

Recommendations

1. Add CONTRIBUTING.md with local dev and release steps (pnpm, Node version, common Nx commands).
2. Add a `docs/` or top-level note describing release/publishing expectations for contributors.
3. Introduce a small performance checklist for PRs touching `engine/src/`.
