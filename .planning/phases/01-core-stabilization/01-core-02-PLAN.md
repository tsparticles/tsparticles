---
phase: 01-core-stabilization
plan: 02
type: execute
wave: 1
depends_on: [01]
files_modified:
  - engine/src/Utils/Utils.ts
  - utils/tests/src/tests/deepExtend.test.ts
  - utils/tests/package.json
autonomous: true
requirements:
  - CORE-02
user_setup: []
must_haves:
  truths:
    - "deepExtend merges objects without prototype pollution and preserves nested structures"
    - "deepExtend performance regression avoided for common sizes"
    - "Unit tests for deepExtend exist and run in CI"
  artifacts:
    - path: "engine/src/Utils/Utils.ts"
      provides: "deepExtend implementation"
    - path: "utils/tests/src/tests/deepExtend.test.ts"
      provides: "unit tests asserting correctness and edge cases"
  key_links:
    - from: "utils/tests/src/tests/deepExtend.test.ts"
      to: "engine/src/Utils/Utils.ts"
      via: "import { deepExtend } from '../../../../engine/src/Utils/Utils.js'"
      pattern: "deepExtend\(" 
---

<objective>
Fix and harden deepExtend in engine/src/Utils/Utils.ts and add deterministic unit tests that cover nested merges and prototype/constructor edge cases.

Purpose: deepExtend is used widely to merge options; issues here caused bugs and potential security concerns (proto pollution). This plan adds tests and small, safe fixes to the implementation.
Output: engine/src/Utils/Utils.ts (tweaked), utils/tests/src/tests/deepExtend.test.ts (new tests).
</objective>

<context>
@.planning/REQUIREMENTS.md
@.planning/ROADMAP.md
@.planning/research/PITFALLS.md
@engine/src/Utils/Utils.ts
</context>

<tasks>

<task type="auto">
  <name>Task 1: Add tests for deepExtend edge cases</name>
  <files>utils/tests/src/tests/deepExtend.test.ts</files>
  <action>
    Create Vitest tests that assert:
    - deepExtend merges nested objects and arrays predictably
    - deepExtend does not copy dangerous keys: "__proto__", "constructor", "prototype"
    - Merging with undefined or null sources behaves sensibly
    Keep tests focused and small. Import deepExtend from engine/src/Utils/Utils.js.
  </action>
  <verify>
    <automated>pnpm --filter @tsparticles/tests test -- "utils/tests/src/tests/deepExtend.test.ts" || true</automated>
  </verify>
  <done>Test file exists and test runner executes (initially may fail).</done>
</task>

<task type="auto">
  <name>Task 2: Patch deepExtend to avoid proto/constructor copying</name>
  <files>engine/src/Utils/Utils.ts</files>
  <action>
    Edit deepExtend implementation to explicitly ignore keys ["__proto__","constructor","prototype"] when merging plain objects. Add a small micro-optimization: for common shallow object merges, avoid deep recursion path. Add inline comment referencing PITFALLS.md.
  </action>
  <verify>
    <automated>pnpm --filter @tsparticles/tests test -- "utils/tests/src/tests/deepExtend.test.ts"</automated>
  </verify>
  <done>deepExtend tests pass and implementation contains comment about prototype key filtering.</done>
</task>

</tasks>

<verification>
Run deepExtend tests; they must pass locally. Check for presence of comment in Utils.ts indicating keys ignored.
</verification>

<success_criteria>
- deepExtend tests pass: `pnpm --filter @tsparticles/tests test utils/tests/src/tests/deepExtend.test.ts` returns 0
- engine/src/Utils/Utils.ts contains explicit ignore list for dangerous keys
- No public API changes that break callers
</success_criteria>

<output>
After completion, create `.planning/phases/01-core-stabilization/01-core-02-SUMMARY.md`
</output>
