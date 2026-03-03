---
phase: 01-core-stabilization
plan: 05
type: execute
wave: 1
depends_on: []
files_modified:
  - .planning/phases/01-core-stabilization/01-core-stabilization-RESEARCH.md
  - .planning/phases/01-core-stabilization/VERIFICATION.md
  - .planning/phases/01-core-stabilization/05-PLAN-SUMMARY.md
autonomous: false
requirements: [CORE-01, CORE-02, TEST-01]
user_setup: []
must_haves:
  truths:
    - "Phase research with a clear Validation Architecture exists and is discoverable by executors"
    - "All PLAN.md files in the phase have been checked by the plan-checker and any issues are recorded in VERIFICATION.md"
    - "A concise phase summary exists that lists plans, verification status, and explicit next steps for execution"
  artifacts:
    - path: ".planning/phases/01-core-stabilization/01-core-stabilization-RESEARCH.md"
      provides: "Phase-scoped research including Validation Architecture and requirement mappings"
    - path: ".planning/phases/01-core-stabilization/VERIFICATION.md"
      provides: "Structured verification output from gsd-plan-checker (PASS / ISSUES FOUND)"
    - path: ".planning/phases/01-core-stabilization/05-PLAN-SUMMARY.md"
      provides: "Human-readable summary and next steps for execute-phase"
  key_links:
    - from: ".planning/phases/01-core-stabilization/01-core-stabilization-RESEARCH.md"
      to: ".planning/ROADMAP.md"
      via: "explicit mapping of requirement IDs and Validation Architecture"
    - from: ".planning/phases/01-core-stabilization/VERIFICATION.md"
      to: ".planning/phases/01-core-stabilization/*-PLAN.md"
      via: "checker references and issue pointers"
---

<objective>
Ensure Phase 1 has an up-to-date research document with a Validation Architecture, run plan-level verification across all PLAN.md artifacts, and produce a short phase summary that records verification results and next steps.

Purpose: Provide a single, easy-to-run plan that integrates research (if missing), automated verification, and a human checkpoint so the phase can safely move to execution.
Output: RESEARCH.md (created/updated), VERIFICATION.md (checker output), 05-PLAN-SUMMARY.md (phase summary)
</objective>

<execution_context>
@.planning/PROJECT.md
@.planning/REQUIREMENTS.md
@.planning/ROADMAP.md
</execution_context>

<context>
Phase 1: Core Stabilization — Goal: Ensure core runtime is correct and covered by tests (ROADMAP.md). This plan focuses on integration: ensure research and validation architecture exist, run the plan-checker across existing PLAN.md files, and produce a human-reviewable summary.

References used as inputs: existing plans in this directory, `.planning/research/*`, and ROADMAP.md.
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create or update phase RESEARCH.md including Validation Architecture</name>
  <files>.planning/phases/01-core-stabilization/01-core-stabilization-RESEARCH.md</files>
  <action>
    If the research file does not exist, create `.planning/phases/01-core-stabilization/01-core-stabilization-RESEARCH.md`. If it exists, open and ensure it contains a `## Validation Architecture` section and explicit mapping for requirement IDs (CORE-01, CORE-02, TEST-01). Use `.planning/research/STACK.md`, `.planning/research/FEATURES.md`, ROADMAP.md, and STATE.md as inputs. Keep the document concise (200-600 words) and include:
    - Executive summary
    - Stack & constraints relevant to tests/fixtures
    - Risks & short mitigations
    - "## Validation Architecture" describing how the phase will be validated (unit tests, CI bundle checks, fixtures, plan-checker gating)
    - Requirement ID mapping (one line per ID pointing to files or plans)

    Commit the file if created or updated. Follow repository doc formatting conventions.

  </action>
  <verify>
    <automated>test -f .planning/phases/01-core-stabilization/01-core-stabilization-RESEARCH.md && grep -q "## Validation Architecture" .planning/phases/01-core-stabilization/01-core-stabilization-RESEARCH.md</automated>
  </verify>
  <done>RESEARCH.md exists, contains a '## Validation Architecture' section, and contains mapping lines for CORE-01, CORE-02, TEST-01.</done>
</task>

<task type="auto">
  <name>Task 2: Run plan-checker to produce VERIFICATION.md</name>
  <files>.planning/phases/01-core-stabilization/VERIFICATION.md</files>
  <action>
    Run the plan-checker over all PLAN.md files in this phase directory and write structured results to `.planning/phases/01-core-stabilization/VERIFICATION.md`.
    Use the project's gsd-tools if available: `node "$HOME/.claude/get-shit-done/bin/gsd-tools.cjs" plan-check .planning/phases/01-core-stabilization || true`.
    If the checker is unavailable, perform static validations: ensure each PLAN.md has frontmatter fields `phase, plan, type, wave, depends_on, files_modified, autonomous, requirements, must_haves` and that every requirement listed in ROADMAP.md for Phase 1 appears in at least one plan's `requirements` frontmatter.
    Commit VERIFICATION.md.
  </action>
  <verify>
    <automated>node "$HOME/.claude/get-shit-done/bin/gsd-tools.cjs" plan-check .planning/phases/01-core-stabilization > .planning/phases/01-core-stabilization/VERIFICATION.md || true && test -f .planning/phases/01-core-stabilization/VERIFICATION.md</automated>
  </verify>
  <done>VERIFICATION.md exists and lists either `## VERIFICATION PASSED` or `## ISSUES FOUND` with structured issues. Results committed.</done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <what-built>Phase research + plan verification summary</what-built>
  <how-to-verify>
    1. Open `.planning/phases/01-core-stabilization/01-core-stabilization-RESEARCH.md` and confirm it contains a `## Validation Architecture` section and requirement mappings.
    2. Open `.planning/phases/01-core-stabilization/VERIFICATION.md` and review `ISSUES FOUND` entries (if any).
    3. If issues exist, either type `approved` to proceed with known issues (override) or describe the issues to request revisions.
    4. If VERIFICATION.md shows `VERIFICATION PASSED`, type `approved` to continue to execution.
  </how-to-verify>
  <resume-signal>Type `approved` to continue or describe issues to iterate</resume-signal>
</task>

<task type="auto">
  <name>Task 4: Write short phase summary and next steps</name>
  <files>.planning/phases/01-core-stabilization/05-PLAN-SUMMARY.md</files>
  <action>
    Create `.planning/phases/01-core-stabilization/05-PLAN-SUMMARY.md` containing:
    - Phase title & goal
    - List of PLAN.md files and their `requirements` coverage
    - Short excerpt from VERIFICATION.md (PASS or top 3 issues)
    - Next steps: `/gsd-execute-phase 1` and any manual actions
    Commit the summary file.
  </action>
  <verify>
    <automated>test -f .planning/phases/01-core-stabilization/05-PLAN-SUMMARY.md && head -n 50 .planning/phases/01-core-stabilization/05-PLAN-SUMMARY.md || true</automated>
  </verify>
  <done>Summary file exists and documents plans, verification status, and next steps. File committed.</done>
</task>

</tasks>

<verification>
Overall checks:
- RESEARCH.md exists and contains `## Validation Architecture`.
- VERIFICATION.md exists and contains structured output from the plan-checker.
- Human checkpoint approval recorded (resume-signal `approved`).
</verification>

<success_criteria>

- RESEARCH.md created/updated and committed
- VERIFICATION.md created with PASS or structured ISSUES
- Phase summary file created and committed
- Requirements CORE-01, CORE-02, TEST-01 appear in at least one plan's `requirements` frontmatter across the phase

</success_criteria>

<output>
After completion, create `.planning/phases/01-core-stabilization/05-PLAN-SUMMARY.md`
</output>
