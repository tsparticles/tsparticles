---
phase: 02-enum-refactor
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - engine/src/Enums/Types/EventType.ts
  - engine/src/Enums/Modes/OutMode.ts
  - engine/src/Enums/Types/StartValueType.ts
  - .planning/phases/02-enum-refactor/enum-inventory.md
autonomous: true
requirements:
  - CORE-02
  - TEST-01
user_setup: []
must_haves:
  truths:
    - "Replacing small string enums with as-const objects does not change runtime behavior for consumers"
    - "Build and tests pass after enum conversions"
    - "Public typings remain explicit (no use of `any`) and imports keep the same exported names"
  artifacts:
    - path: "engine/src/Enums/Types/EventType.ts"
      provides: "Event type values available at runtime and a TypeScript type for EventType"
    - path: "engine/src/Enums/Modes/OutMode.ts"
      provides: "Out mode values exposed as a runtime object and a type alias OutMode"
    - path: "engine/src/Enums/Types/StartValueType.ts"
      provides: "StartValueType values available as const + Type alias"
    - path: ".planning/phases/02-enum-refactor/enum-inventory.md"
      provides: "Inventory of all enum files and a conversion recommendation (keep/convert/manual)"
  key_links:
    - from: "engine/src/Enums/Types/EventType.ts"
      to: "engine code that imports EventType"
      via: "named import -> use EventType.X pattern"
      pattern: "import .*EventType.*"
    - from: "engine/src/Enums/Modes/OutMode.ts"
      to: "updaters/outModes implementations"
      via: "imports and string comparison/switch"
      pattern: "OutMode\.|OutMode ="

---

<objective>
Replace a small, low-risk set of string-valued TypeScript enums with type-safe `as const` objects + derived union types to reduce emitted JS and improve tree-shaking. Start with a narrow, auditable pilot (3 files) and produce an inventory for follow-ups.

Purpose: reduce unnecessary enum runtime objects (bundle size risk) while preserving API/typing and keeping changes small and reversible.
Output: inventory file and converted implementations for EventType, OutMode, StartValueType plus verification steps.
</objective>

<context>
Repository conventions (from .planning and AGENTS.md): TypeScript monorepo, prefer explicit types for public APIs, run tests with Vitest and builds with pnpm scripts. Keep changes small and include tests.

Key enum files (pilot):

- engine/src/Enums/Types/EventType.ts
- engine/src/Enums/Modes/OutMode.ts
- engine/src/Enums/Types/StartValueType.ts

The codebase contains many string enums across engine and plugins. This plan audits and converts a small, low-risk subset first.
</context>

<tasks>

<task type="auto">
  <name>Task 1: Audit — enumerate all TypeScript enums and classify</name>
  <files>.planning/phases/02-enum-refactor/enum-inventory.md</files>
  <action>
    Run a repo-wide scan for `export enum` and produce a markdown inventory listing: file path, number of members, member names, and a quick recommendation: `convert` (small string enum, used only as values/types), `keep` (numeric enum or bit-flags or large enums with reverse mapping), or `manual` (large enums with many cross-package usages). Save output to `.planning/phases/02-enum-refactor/enum-inventory.md`.

    Implementation notes for executor (automated): prefer ripgrep (rg) or git-grep. Include a short grep command and summary header. Don't modify source files in this task.

  </action>
  <verify>
    <automated>rg --hidden "export enum" --glob '!node_modules' --glob '!.git' -n || true
    rg --hidden "export enum" --glob '!node_modules' --glob '!.git' -n > .planning/phases/02-enum-refactor/enum-inventory.md && test -s .planning/phases/02-enum-refactor/enum-inventory.md</automated>
  </verify>
  <done>The file `.planning/phases/02-enum-refactor/enum-inventory.md` exists and contains a line per enum with path, member count and an initial recommendation (convert/keep/manual).</done>
</task>

<task type="auto">
  <name>Task 2: Convert pilot enums to `as const` + derived type</name>
  <files>
    engine/src/Enums/Types/EventType.ts,
    engine/src/Enums/Modes/OutMode.ts,
    engine/src/Enums/Types/StartValueType.ts
  </files>
  <action>
    For each listed file, replace the `export enum X { a = "a", ... }` pattern with an exported const object and a derived union type. Example transform:

    Before:
    export enum EventType { configAdded = "configAdded", ... }

    After:
    export const EventType = {
      configAdded: "configAdded",
      ...
    } as const;

    export type EventType = typeof EventType[keyof typeof EventType];

    Implementation details:
    - Keep the named export `EventType` so existing `import { EventType } from "..."` still works at runtime for consumers that relied on the object. (Note: this changes the runtime shape from enum object to plain object — property access `EventType.configAdded` remains.)
    - Run a repo-wide typecheck/build after changes to catch uses that assume numeric reverse-mapping or enum-specific operations. If code relies on numeric enum behavior or reverse mapping, mark the enum in the inventory as `keep` and revert changes for that file.
    - Put a small comment above the converted object explaining the reason and linking to the inventory entry (for reviewers).
    - Commit changes in a single atomic change per file (executor will create commits). Do not push.

  </action>
  <verify>
    <automated>pnpm -s run -w build || pnpm -s run build
    </automated>
  </verify>
  <done>Each pilot file now exports a const object + derived type; `pnpm run build` completes without type errors. If any file caused type errors due to enum-specific usage, it has been reverted and noted in inventory.</done>
</task>

<task type="auto">
  <name>Task 3: Sanity checks — run tests, run a minimal bundle check</name>
  <files>package.json</files>
  <action>
    Run the test suite and a slim build to ensure there are no runtime regressions. Commands to run:
    - `pnpm exec vitest run` (run test suites)
    - `pnpm run slimbuild` (build slim bundles)

    If tests fail, capture failing test names and revert the specific enum changes that caused regressions (one-by-one) and document in the inventory.

  </action>
  <verify>
    <automated>pnpm exec vitest run --reporter dot && pnpm run slimbuild</automated>
  </verify>
  <done>All tests pass (Vitest exit 0) and `pnpm run slimbuild` completes. If failures occurred, they are documented in `.planning/phases/02-enum-refactor/enum-inventory.md` with per-file revert notes.</done>
</task>

</tasks>

<verification>
Overall checks:
- `.planning/phases/02-enum-refactor/enum-inventory.md` exists and lists all enums found with a recommendation column.
- The three pilot files have been replaced with `as const` objects + derived types OR explicitly marked `keep` in the inventory with rationale.
- `pnpm run build` and `pnpm exec vitest run` both succeed after changes, or failing conversions were reverted and recorded.
</verification>

<success_criteria>

- Inventory created and reviewed: `.planning/phases/02-enum-refactor/enum-inventory.md` present.
- At least the three pilot enums converted with passing build and tests.
- No public API behavior regressions for consumers of the converted enums (property access preserved).
  </success_criteria>

<output>
After completion, create `.planning/phases/02-enum-refactor/01-PLAN-SUMMARY.md` summarizing converted enums and any reverts.
</output>
