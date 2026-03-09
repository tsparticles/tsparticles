---
phase: 01-core-stabilization
plan: 03
type: execute
wave: 2
depends_on: [01, 02]
files_modified:
  - .planning/phases/01-core-stabilization/03-PLAN.md
  - .planning/phases/01-core-stabilization/01-PLAN-SUMMARY.md
autonomous: false
requirements: [TEST-01]
user_setup: []
must_haves:
  truths:
    - "Plans and changes are verified by plan-checker and pass must-have checks"
    - "All phase artifacts committed and a phase summary exists"
  artifacts:
    - path: ".planning/phases/01-core-stabilization/*-PLAN.md"
      provides: "All PLAN.md artifacts for phase"
    - path: ".planning/phases/01-core-stabilization/01-PLAN-SUMMARY.md"
      provides: "Human-readable summary of completed work"
  key_links:
    - from: ".planning/phases/01-core-stabilization/"
      to: ".planning/ROADMAP.md"
      via: "plan files reference requirement IDs"
---

<objective>
Finalize planning verification for Phase 1 and prepare phase summary. This plan is a checkpoint that requires human approval after automated verification.

Purpose: Ensure the planner's outputs satisfy goal-backward must-haves and produce a concise phase summary for onboarding developers.
Output: Verification pass, phase summary file, and explicit PRD mapping confirmation.
</objective>

<execution_context>
@.planning/PROJECT.md
@.planning/REQUIREMENTS.md
@.planning/ROADMAP.md
</execution_context>

<context>
This plan runs after implementation plans (01, 02). It primarily aggregates verification results and requires a human checkpoint to confirm the phase is ready to execute.
</context>

<tasks>

<task type="auto">
  <name>Task 1: Run plan-checker over phase plans</name>
  <files></files>
  <action>
    Run the gsd-plan-checker against all PLAN.md files in this phase directory. Produce `.planning/phases/01-core-stabilization/VERIFICATION.md` capturing PASS/FAIL and structured issues. Use the checker agent if available; otherwise run local static validations (frontmatter presence, must_haves existence, requirement coverage).
  </action>
  <verify>
    <automated>node "$HOME/.claude/get-shit-done/bin/gsd-tools.cjs" plan-check .planning/phases/01-core-stabilization || true</automated>
  </verify>
  <done>VERIFICATION.md exists with either `## VERIFICATION PASSED` or `## ISSUES FOUND` and structured output. Automated command executed.</done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <what-built>Phase 1 planning: plans + verification results</what-built>
  <how-to-verify>
    1. Review `.planning/phases/01-core-stabilization/VERIFICATION.md` for any `ISSUES FOUND` entries.
    2. Open PLAN.md files: `.planning/phases/01-core-stabilization/*-PLAN.md` and check `requirements` coverage and `must_haves` alignment with ROADMAP.md goal.
    3. Confirm that tests and CI changes are small, documented, and safe to run in CI.
    4. If acceptable, type `approved`. If not, describe issues to iterate.
  </how-to-verify>
  <resume-signal>Type `approved` to continue or describe issues to revise</resume-signal>
</task>

<task type="auto">
  <name>Task 3: Write phase summary and finalize artifacts</name>
  <files>.planning/phases/01-core-stabilization/01-PLAN-SUMMARY.md</files>
  <action>
    Create a short summary file containing: list of plans created, files modified, verification status, and next steps (`/gsd-execute-phase 1`). Include line references to key artifacts.
    Commit summary and VERIFICATION.md along with plan files.
  </action>
  <verify>
    <automated>wc -l .planning/phases/01-core-stabilization/*-PLAN.md .planning/phases/01-core-stabilization/VERIFICATION.md || true</automated>
  </verify>
  <done>Summary file exists and committed. Verification file present. User has approved via checkpoint.</done>
</task>

</tasks>

<verification>
Overall: The phase is ready for execution when the checkpoint task returns `approved` and VERIFICATION.md reports `VERIFICATION PASSED` or user explicitly overrides.
</verification>

<success_criteria>

- Plan-checker run and VERIFICATION.md created
- Human approval received
- Phase summary written and committed
  </success_criteria>

<output>
After completion, create `.planning/phases/01-core-stabilization/03-PLAN-SUMMARY.md`
</output>
