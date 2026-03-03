---
phase: 01-core-stabilization
plan: 06
type: execute
wave: 1
depends_on: []
files_modified:
  - .planning/phases/01-core-stabilization/05-PLAN.md
autonomous: true
requirements: [CORE-01]
user_setup: []
must_haves:
  truths:
    - "05-PLAN.md contains valid YAML frontmatter so the plan-checker can parse it"
    - "Plan-checker no longer reports frontmatter parsing errors for 05-PLAN.md"
  artifacts:
    - path: ".planning/phases/01-core-stabilization/05-PLAN.md"
      provides: "Canonical PLAN.md metadata for plan 05 (frontmatter present and correct)"
  key_links:
    - from: ".planning/phases/01-core-stabilization/05-PLAN.md"
      to: ".planning/phases/01-core-stabilization/VERIFICATION.md"
      via: "Plan-checker parsing and verification"
      pattern: "^phase: 01-core-stabilization"
---

<objective>
Restore missing YAML frontmatter for Plan 05 so the plan-checker can parse the file and the phase verification can pass.

Purpose: The verifier flagged 05-PLAN.md as missing frontmatter. This gap plan adds the required YAML frontmatter fields and re-validates the plan with a plan-check run.
Output: Updated .planning/phases/01-core-stabilization/05-PLAN.md with required frontmatter and a successful static parse check.
</objective>

<context>
This is a focused gap-closure plan created from the phase verifier output (VERIFICATION.md). It must be small and deterministic: add YAML frontmatter only (do not change plan semantics). Execution may be automated fully.
</context>

<tasks>

<task type="auto">
  <name>Task 1: Add YAML frontmatter to 05-PLAN.md</name>
  <files>.planning/phases/01-core-stabilization/05-PLAN.md</files>
  <action>
    Edit .planning/phases/01-core-stabilization/05-PLAN.md to add the required YAML frontmatter at the top. The frontmatter must include: phase, plan, type, wave, depends_on, files_modified (can be empty array), autonomous, requirements (match phase requirements if relevant), must_haves (can be an empty array or a minimal placeholder). Do NOT modify the plan body below; only add/restore frontmatter. Commit the change with message: "docs(01-core-stabilization-05): restore YAML frontmatter for plan metadata".
    Reason: A proper frontmatter allows the plan-checker to parse and include the plan in verification.
  </action>
  <verify>
    <automated>python - <<'PY'
import sys,ruamel.yaml
p=' .planning/phases/01-core-stabilization/05-PLAN.md'
with open(p,'r') as f:
    s=f.read()
if s.lstrip().startswith('---'):
    print('OK')
    sys.exit(0)
else:
    print('MISSING')
    sys.exit(2)
PY</automated>
  </verify>
  <done>05-PLAN.md contains valid YAML frontmatter and the change is committed.</done>
</task>

<task type="auto">
  <name>Task 2: Re-run plan-checker (static parse) and update VERIFICATION.md</name>
  <files>.planning/phases/01-core-stabilization/VERIFICATION.md</files>
  <action>
    Run the plan-checker (if available) or perform static validation: ensure every PLAN.md has the required frontmatter fields. Update .planning/phases/01-core-stabilization/VERIFICATION.md with the re-check results. Commit VERIFICATION.md.
    If gsd-tools is not available in the environment, run local greps to validate frontmatter presence and write a small verification summary to VERIFICATION.md.
  </action>
  <verify>
    <automated>grep -q "^phase: 01-core-stabilization" .planning/phases/01-core-stabilization/05-PLAN.md && echo "RECHECK_OK" || echo "RECHECK_FAIL"</automated>
  </verify>
  <done>VERIFICATION.md updated to reflect that 05-PLAN.md is parseable; plan-checker reports no frontmatter parse error for 05-PLAN.md.</done>
</task>

</tasks>

<verification>
Overall: After these tasks, the plan-checker should no longer report a frontmatter parsing error for 05-PLAN.md. VERIFICATION.md should be updated and committed.
</verification>

<success_criteria>

- .planning/phases/01-core-stabilization/05-PLAN.md contains YAML frontmatter and is parseable
- .planning/phases/01-core-stabilization/VERIFICATION.md updated to show the parse issue is resolved
- Commit(s) created for the frontmatter fix and updated verification
  </success_criteria>

<output>
After completion, create `.planning/phases/01-core-stabilization/06-PLAN-SUMMARY.md`
</output>
