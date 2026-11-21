---
name: nx-cloud-ci-failure-review
description: Review failed Nx Cloud CI pipeline executions and group recurring, evidence-based failure patterns. Use this skill whenever a user asks about failed CI pipelines, recurring task failures, failed CIPEs, a CI failure review, or a last-24-hours CI report. Use the nx-cloud-api skill for every Nx Cloud read. This read-only skill separates task, workflow, agent, timeout, cancellation, and unknown cases. It suggests diagnostic next steps without changing systems.
---

# Nx Cloud CI failure review

Requires the `nx-cloud-api` skill for all Nx Cloud reads. This workflow is read-only.

Reduce failed pipelines to a small set of diagnostic groups. A failed pipeline
does not prove that an agent or platform caused the failure. Classify each group
only at the level the evidence supports.

## Scope and collection

Use **focused investigation mode** when the user supplies one or more CIPE or
run-group links. Fetch those exact records first. Follow their returned run-group,
run, task, and workflow links. Compare the supplied executions directly. Do not run a broad time
window or build a workspace-wide ranking unless the user asks for recurrence or
scope. Keep cancellations that follow the named critical error as consequences,
not separate root-cause groups.

Use **review mode** when the user asks for a workspace failure review. Review
failures from the last 24 hours by default. CIPE and run-group list filters use
`createdAt`, not failure time. Query a 30-hour creation window to cover the maximum
normal six-hour CI duration. State the intended 24-hour review period and the
30-hour creation window.

Query `statuses=FAILED`, `statuses=TIMED_OUT`, and `statuses=CANCELED` (the
`cipes` filter accepts only terminal statuses). State the
branches, CI contexts, statuses, endpoints, and record counts. Ask before widening
the window or mixing unrelated repositories/workspaces.

Use **nx-cloud-api** (`npx nx-cloud api`) for every read. Inspect the live
schemas with `--describe` for `cipes`, `run-groups`, `run-groups/{runGroupId}`,
`runs`, `runs/{runId}/tasks`, and the linked `steps` and `instances` endpoints.
Use `--list-operations` to confirm the routes; the public API has no separate
workflow routes. Reach child records by following returned `links`. Start with supplied CIPEs in focused investigation mode. Start with failed CIPEs
and their linked run groups in review mode. Use only live documented filters and
fields. Fetch one narrow page first and check `nextCursor` before continuing.

Collect in this order:

1. Failed, timed-out, and canceled CIPEs with status, timestamps, branch, and CI
   context. Use a small, stated `--pages` value. Rank groups workspace-wide
   only after a zero exit with `nextCursor: null`; otherwise
   report the data as incomplete.
2. Linked run groups and their documented critical-error fields.
3. Runs and terminal task rows for each selected group.
4. Workflow and instance status only when task data does not explain the group.
5. The smallest relevant task or instance log excerpt for representative cases.

Use a semaphore of at most five narrow detail requests. Fetch logs only after a
group reaches the top five. Tell the user before reading CI log content. Quote
only redacted error lines.

Treat cancellations as their own category until their reason and timing show that
they belong elsewhere. Do not call a cancellation a failure without that context.

## Grouping method

Build groups from stable evidence. Prefer a task identifier plus normalized error
signature. Normalize timestamps, GUIDs, retry counters, temporary paths, and
random ports. Keep stack context, command, and error code that distinguish two
otherwise similar messages.

Use these categories only when their evidence exists:

- Repeated task error.
- Task timeout.
- Cancellation.
- Workflow or agent failure.
- Unknown pipeline failure.

Call a group **workflow or agent failure** only when workflow/instance status,
critical error, or agent evidence supports it and no task failure explains the
pipeline. Do not infer infrastructure from the absence of a task log.

Reconcile the full pipeline picture before classification. A task can record
`SUCCEEDED` or a cache hit while the main job fails during artifact download,
validation, or restoration. Compare the run-group `criticalErrorMessage`, task
status, cache status, workflow status, and later cancellations. In that case,
classify the main-job cache restoration error as primary and the canceled runs as
consequences.

For every group, record its CIPE count, run-group count, affected task count,
first and last occurrence, branches/contexts, and one or two representative IDs.
Rank first by affected pipeline count, then recurrence, then blocked duration when
it is documented.

## Next action rules

- Repeated task error: when a relevant workspace checkout exists, inspect
  `CODEOWNERS` and project ownership metadata at the recorded commit. Suggest a
  likely review owner. Do not assign work or claim ownership when that evidence is absent.
- Task timeout: compare duration and resource evidence. Request a focused
  reproduction or resource report when it does not show a direct cause.
- Cancellation: identify the documented cancel source, or keep it separate as
  unknown cancellation.
- Workflow or agent failure: retry or monitor only when the evidence supports a
  transient event. Otherwise inspect the named workflow/agent asset.
- Unknown: request the smallest log or run detail that can separate the cases.

Do not make code, workflow, or allocation changes without explicit approval.

## Report format

```md
# Failed CI review

## Scope

- Window: …
- Data: …

## Failure groups

### 1. <evidence-level category> — <short signature>

- **Confirmed facts:** affected CIPEs/runs/tasks; representative IDs; log excerpt.
- **Assessment:** **Confirmed** / **Likely** / **Needs diagnostic run** — …
- **Impact:** …
- **Highest-leverage next action:** …

## Unclassified or incomplete data

- …
```

Limit a review report to five groups. In focused investigation mode, report the
supplied executions as one comparison when they have the same normalized signature. Link each
finding to exact CIPEs, run groups, runs, and tasks where available. State the data
limit when pagination, missing assets, or missing context affects the conclusion.
