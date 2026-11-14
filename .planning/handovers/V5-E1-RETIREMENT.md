# E1 — Supported-consumer retirement checkpoint

Status: retirement increment implemented and verified on 2026-11-14. **E1 is
not complete:** engine factory, singleton removal, explicit wrapper/convenience
ownership, browser bootstrap and isolation checks remain pending. E2–E10 remain
pending; E11 is excluded. No commits, version bumps or publication performed.

## Scope

- Removed `wrappers/{vue2,nuxt2,nuxt3}` and `demo/{vue2,nuxt2,nuxt3}`.
- Removed the three retired variants from eight template families (24 variants).
  The vanilla-only 404 template remains supported.
- Removed the obsolete wrapper pages in all ten documentation locales, navigation
  entries, wrapper/demo listings, and obsolete package marketing descriptions.
  Nuxt guides target Nuxt 4. Historical changelogs and baseline inventories remain.
- Removed Vue 2-specific dependency overrides, package extensions and patch.
  pnpm updated the lockfile: six workspace importers removed; 493 package-version
  entries removed and none added. Peer contexts were recalculated by pnpm.
- Updated generator choices/types and installer suggestions. Standard exact,
  caret and tilde versions of Vue 3/Nuxt 4 are recognized. Old framework versions
  are not redirected to incompatible wrappers. Existing deprecated `vue2-particles`
  guidance explicitly requires upgrading the application to Vue 3.
- Removed a malformed duplicate installer entry with no detector that previously
  prevented detection of later frameworks such as Svelte.
- Removed local generated `.nuxt`/`.output` caches exposed by deleting retired
  demo ignore files; no source from supported demos was removed.

## Verification

| Check                     | Result                                                                                  | Evidence                                         |
| ------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------ |
| Primary suite             | 50 files, 680 tests passed                                                              | `evidence/e1/tests-retry.txt`                    |
| Engine CI build           | Passed; generated installer matches source                                              | `evidence/e1/engine-build.txt`                   |
| Primary test package lint | Passed                                                                                  | `evidence/e1/tests-lint.txt`                     |
| Create-app tests          | 11 passed; retired choices rejected before creating output                              | `evidence/e1/create-app-tests.txt`               |
| Create-app CI build       | Passed, including lint/format/compile                                                   | `evidence/e1/create-app-build.txt`               |
| Nx project inventory      | Exactly six retired projects removed, none added                                        | `evidence/e1/projects.json` versus E0            |
| Active reference search   | No active retired package/path references                                               | `evidence/e1/remaining-active-references.json`   |
| Packed templates          | Nine local archives checked; zero retired variants; retained framework variants present | `evidence/e1/template-packages.json`             |
| Lockfile/install          | Updated by pnpm, frozen install completed with scripts disabled                         | `evidence/e1/lockfile-online.log`, `install.log` |

The initial installer test used a file URL under jsdom and failed before running;
it now resolves the script from the test-package directory and captures both
stdout/stderr from the real installer subprocess. The subsequent full suite
passes. This is a harness correction, not a suppressed runtime failure.

Packing is local verification, not publication. Reproduce the archive checks with
`node .planning/handovers/evidence/tools/check-retired-templates.mjs`.
The generator rejection tests exercise the actual template resolver/scaffolder,
not just a duplicated list of framework names.

## Next increment

Implement synchronous `createEngine()` and migrate all supported consumers as
specified by handover 01. Keep the engine class type-only. Define same-canvas
ownership, independent registry/loader behavior and explicit CDN bootstrap with
installed-consumer tests. E1 must remain open until these exit criteria pass.
Per-engine RNG/logger service isolation follows in E2.
