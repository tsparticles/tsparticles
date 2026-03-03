---
phase: 01-core-stabilization
plan: 04
type: execute
wave: 1
depends_on: []
files_modified:
  - .planning/phases/01-core-stabilization/01-core-stabilization-RESEARCH.md
  - .planning/phases/01-core-stabilization/CORE-02-AUDIT.md
autonomous: true
requirements: [CORE-02]
user_setup: []
must_haves:
  truths:
    - "Phase-scoped research summary exists and documents Validation Architecture for Phase 1"
    - "Requirement CORE-02 is explicitly mapped to existing artifacts or has a small remediation plan"
    - "A lightweight audit file lists where CORE-02 is satisfied (tests, code, plans) or what remains to be done"
  artifacts:
    - path: ".planning/phases/01-core-stabilization/01-core-stabilization-RESEARCH.md"
      provides: "Phase research, risks, validation architecture, and implementation notes"
    - path: ".planning/phases/01-core-stabilization/CORE-02-AUDIT.md"
      provides: "Mapping of CORE-02 to code, tests, and plans, plus remediation steps if missing"
  key_links:
    - from: ".planning/phases/01-core-stabilization/01-core-stabilization-RESEARCH.md"
      to: ".planning/ROADMAP.md"
      via: "explicit mapping of requirement IDs and validation architecture"
---

<objective>
Produce phase-scoped research and a short audit that proves requirement CORE-02 is covered (or defines a minimal remediation plan).

Purpose: Ensure the planner + executor have clear, phase-scoped research (including Validation Architecture) and that CORE-02 is not left unaddressed before execution.
Output: .planning/phases/01-core-stabilization/01-core-stabilization-RESEARCH.md and CORE-02-AUDIT.md
</objective>

<execution_context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
</execution_context>

<context>
Roadmap: Phase 1 — Core Stabilization (requirements: CORE-01, CORE-02, TEST-01). Existing plans 01-03 implement many items but CORE-02 is not referenced by existing PLAN.md files. This plan creates phase research and performs a focused audit for CORE-02 so the requirement coverage rule is satisfied.
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create phase-scoped RESEARCH.md (Validation Architecture included)</name>
  <files>.planning/phases/01-core-stabilization/01-core-stabilization-RESEARCH.md</files>
  <action>
    Create a phase-scoped research document at the listed path. Use ROADMAP.md (phase goal & req IDs), STATE.md (recent decisions / commits), and existing global research under .planning/research/ as inputs. The RESEARCH.md must contain:
    - Executive summary (what to build and why)
    - Stack and constraints relevant to tests and fixtures
    - Risks & pitfalls (short list)
    - Validation Architecture: how this phase will be validated (unit tests, CI checks, metrics)
    - Explicit mapping of requirement IDs (CORE-01, CORE-02, TEST-01) to suggested artifacts or plans

    Keep the file concise (~200-600 words). If previous research already exists under .planning/research/, summarize and link to it. Commit the file.

  </action>
  <verify>
    <automated>test -f .planning/phases/01-core-stabilization/01-core-stabilization-RESEARCH.md && echo OK</automated>
  </verify>
  <done>RESEARCH.md exists, contains a '## Validation Architecture' section, and maps requirement IDs to artifacts or next steps.</done>
</task>

<task type="auto">
  <name>Task 2: CORE-02 audit — map or create remediation plan</name>
  <files>.planning/phases/01-core-stabilization/CORE-02-AUDIT.md</files>
  <action>
    Create an audit file that proves where CORE-02 is satisfied or describes minimal remediation. Steps:
    1. Search the repo for code/tests referencing memoize/deepExtend and their tests (engine/src/Utils, utils/tests). List matching files with short notes.
    2. If a test or plan already satisfies CORE-02, point to the exact file(s) and line numbers where behavior is covered.
    3. If coverage is missing, add a short remediation plan: one TDD task (test file path + implementation file path) with acceptance criteria and an estimate (Claude execution time only).

    Write findings into CORE-02-AUDIT.md and commit.

  </action>
  <verify>
    <automated>node -e "const fs=require('fs'); process.exit(fs.existsSync('.planning/phases/01-core-stabilization/CORE-02-AUDIT.md')?0:1)" && grep -n "CORE-02" .planning/phases/01-core-stabilization/CORE-02-AUDIT.md || true</automated>
  </verify>
  <done>Audit file exists and either references existing artifacts that satisfy CORE-02 or includes a 1-2 task remediation plan with clear acceptance criteria.</done>
</task>

</tasks>

<verification>
Automated checks:
- RESEARCH.md file exists and contains the string '## Validation Architecture'
- CORE-02-AUDIT.md exists and references either code/tests or includes a remediation task

Automated: test -f .planning/phases/01-core-stabilization/01-core-stabilization-RESEARCH.md && grep -q "## Validation Architecture" .planning/phases/01-core-stabilization/01-core-stabilization-RESEARCH.md && test -f .planning/phases/01-core-stabilization/CORE-02-AUDIT.md
</verification>

<success_criteria>

- Phase RESEARCH.md created and committed
- CORE-02 requirement explicitly mapped to artifacts or has a small remediation plan (tasks) in CORE-02-AUDIT.md
- This PLAN.md lists CORE-02 in `requirements` frontmatter (satisfies mapping rule)
  </success_criteria>

<output>
After completion, create `.planning/phases/01-core-stabilization/04-PLAN-SUMMARY.md`
</output>
