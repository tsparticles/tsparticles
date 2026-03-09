---
phase: 01-core-stabilization
plan: 07
type: execute
wave: 1
depends_on: []
files_modified:
  - .planning/phases/01-core-stabilization/01-core-stabilization-RESEARCH.md
  - .planning/phases/01-core-stabilization/CORE-02-AUDIT.md
  - .planning/phases/01-core-stabilization/04-PLAN-SUMMARY.md
autonomous: true
requirements: [CORE-02]
user_setup: []
must_haves:
  truths:
    - "Research and audit artifacts are committed and discoverable in the phase directory"
    - "STATE.md records no uncommitted artifacts for the phase"
  artifacts:
    - path: ".planning/phases/01-core-stabilization/01-core-stabilization-RESEARCH.md"
      provides: "Phase research with Validation Architecture"
    - path: ".planning/phases/01-core-stabilization/CORE-02-AUDIT.md"
      provides: "CORE-02 mapping and remediation plan"
  key_links:
    - from: ".planning/phases/01-core-stabilization/CORE-02-AUDIT.md"
      to: ".planning/STATE.md"
      via: "commit records and artifact presence"
      pattern: "CORE-02"
---

<objective>
Commit phase research/audit artifacts that were left uncommitted due to local git locks during execution and ensure STATE.md records are accurate.

Purpose: The verifier reported uncommitted artifacts (research, audit, summary) that reduce artifact durability. This gap plan stages and commits the created files with clear Conventional Commit messages.
Output: Committed RESEARCH.md, CORE-02-AUDIT.md, and 04-PLAN-SUMMARY.md; updated .planning/STATE.md reflecting no pending uncommitted artifacts.
</objective>

<context>
Executor agents created research and audit files (Plan 04) but some commits were blocked by git ref locks in the execution environment. This plan will finalize those artifacts as committed files.
</context>

<tasks>

<task type="auto">
  <name>Task 1: Stage and commit research & audit artifacts</name>
  <files>.planning/phases/01-core-stabilization/01-core-stabilization-RESEARCH.md, .planning/phases/01-core-stabilization/CORE-02-AUDIT.md, .planning/phases/01-core-stabilization/04-PLAN-SUMMARY.md</files>
  <action>
    Add the listed files to git and commit them with a Conventional Commit message: "docs(01-core-stabilization-04): add RESEARCH and CORE-02 audit (finalize artifacts)". If git fails due to environment lock, write a local note into .planning/STATE.md describing exact commands for local finalize and do not attempt further automated commits.
  </action>
  <verify>
    <automated>git ls-files --error-unmatch .planning/phases/01-core-stabilization/01-core-stabilization-RESEARCH.md .planning/phases/01-core-stabilization/CORE-02-AUDIT.md .planning/phases/01-core-stabilization/04-PLAN-SUMMARY.md >/dev/null 2>&1 && echo COMMITTED || echo MISSING</automated>
  </verify>
  <done>Research, audit, and summary files are committed and present in the repository index, or STATE.md contains local-finalize instructions if commit failed.</done>
</task>

<task type="auto">
  <name>Task 2: Update STATE.md to clear pending artifacts</name>
  <files>.planning/STATE.md</files>
  <action>
    Update .planning/STATE.md to remove or mark as committed the previously uncommitted artifacts. Add an entry noting the commit hashes for the artifacts if commits succeeded, or include local finalize instructions if commits were not possible.
  </action>
  <verify>
    <automated>grep -n "Research.*RESEARCH.md" .planning/STATE.md || true</automated>
  </verify>
  <done>STATE.md updated to reflect artifact commit status or contains explicit local finalize instructions.</done>
</task>

</tasks>

<verification>
After these tasks, no uncommitted phase artifacts should remain. state should reflect committed artifacts. If commits could not be made due to environment locks, STATE.md will contain clear instructions for local finalization.
</verification>

<success_criteria>

- RESEARCH.md, CORE-02-AUDIT.md, and 04-PLAN-SUMMARY.md are committed or explicit local-finalize instructions exist in STATE.md
- STATE.md no longer lists those artifacts as pending/uncommitted
  </success_criteria>

<output>
After completion, create `.planning/phases/01-core-stabilization/07-PLAN-SUMMARY.md`
</output>
