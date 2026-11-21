---
name: nx-cloud-cache-investigator
description: Investigate a specific Nx cache miss, artifact download or extraction failure, same-hash non-replay, or suspected unsafe cache replay. Use this skill whenever a user asks why an Nx task did not use the cache, why cache artifact restoration failed, why a cache hit restored stale or wrong output, or to compare two cached task executions. Use the nx-cloud-api skill for every Nx Cloud read. This skill supports API-only investigations, preserves strict hash-evidence limits, and requests local configuration only when the question requires it.
---

# Nx cache investigator

Requires the `nx-cloud-api` skill. Use a matching Nx workspace checkout only for local configuration diagnosis. An API-only investigation does not need a checkout.

Diagnose one cache question with bounded evidence. Do not guess a changed hash
input or change configuration from cache status alone.

Nx task caching and a tool-native cache are separate. A target `cache` field
controls Nx replay. Vite, ESLint, and other tools have separate executor options.
One does not prove the other.

## Select the mode

- **Cache-health trend:** This skill covers a specific task or artifact question,
  not a multi-run rate regression. Use a separate bounded trend workflow for
  rate or regression questions.
- **API-only:** Use this for supplied runs, CIPEs, tasks, or artifact errors when no
  matching checkout exists. Do not request local configuration unless required.
- **Specific comparison:** Get two comparable executions. Ask for missing target,
  branch, commit, command, configuration, CI environment, or time range.

## Resume a pending investigation

Arrange one same-session wake only when a known task is non-terminal, an API
request returns HTTP 409 (`not_terminal`), or the user starts a controlled
diagnostic run. Preserve the run, task, `batchId`, link, and filters. Re-query once after the
known delay or expected run completion. Stop at a terminal result or the retry
limit. Do not poll or monitor a live CI run.

## Gather only relevant API evidence

Use `nx-cloud-api` (`npx nx-cloud api`) for every read. Run `--describe` for a
known route. Use `--list-operations` only when the route is unknown or
ambiguous. Follow documented fields and returned links; do not construct routes
from internal IDs.

Save every live API response to a file with `-o`. Use `jq` to select one
row and only the fields needed for this investigation. Do not print, read, or
paste a raw collection into model context. Keep the selected row's `batchId` and
`links.self` in the projection:

```sh
npx nx-cloud api --describe 'runs/{runId}/tasks'
npx nx-cloud api "$run_tasks_link" -o "$dir/tasks.json"
jq --arg task "$task_id" --arg batch "$batch_id" \
  '.items[] | select(.id == $task and .batchId == $batch) |
   {id, batchId, status, cacheStatus, hash, cacheable,
    links: {self: .links.self}}' "$dir/tasks.json"
```

Here `$run_tasks_link` is the tasks link from the selected run and `$dir` is a
scratch directory from `mktemp -d`. Without a link, use
`npx nx-cloud api 'runs/{runId}/tasks' -p runId="$run_id"`; never paste an ID
into the path. Check `nextCursor` before concluding that a
task is absent from the list.

For a selected execution, record run and task IDs, `batchId`, project, target,
configuration, command, parameters, branch, commit, CI context, timestamps,
cache status, final hash, `cacheEnabled`, `cacheable`, and relevant CIPE or
run-group links.

A task ID can repeat. Select the task-list row first. Follow its exact `links.self`
or asset URL because it preserves `batchId`. Do not use one row to explain another.
A task list row already has task fields. A detail read is optional.

If the API reports `cacheable: false`, Nx replay was not expected for that
execution. Name a configuration cause only when the `nx show` target query shows
it. If `cacheEnabled: false`, that run did not use the Nx task cache. Do not
investigate hash inputs or artifacts in either case.

Read a log only when its command output or error can answer the question. Tell the
user before you read CI log content. Read
[references/log-and-report-assets.md](references/log-and-report-assets.md) before
you decode a log or report. Quote only a redacted error signature. Treat
user-supplied asset content as provided evidence. An advertised asset or a later
404 does not prove historical availability.

## Inspect the Nx target

Use a matching checkout only for a configuration question or code change. Check out
the recorded commit. Record the workspace Nx version. Query the exact target with
the workspace-local Nx command:

```sh
nx show project "$project" --json | jq \
  --arg target "$target" \
  --arg configuration "${configuration:-}" \
  '.targets[$target] | {
    executor,
    cache,
    inputs,
    outputs,
    options,
    selectedConfiguration: .configurations[$configuration]
  }'
```

Use this fragment as the target evidence. Nx already includes inherited settings.
Do not merge `project.json`, `nx.json`, plugins, or `targetDefaults` yourself. A
missing project property proves nothing. If the query reports `cache: true`, do
not add another `cache: true`. If the command or target is unavailable, report
configuration as unavailable.

Inspect returned `options` only for a tool-native cache question. Use
version-matched executor documentation. A target `cache` field cannot prove Vite
or ESLint native-cache state.

## Classify before you explain

### No cache failure established

A terminal `remote-cache-hit` proves Nx replay worked for that task. Do not turn a
successful hit into a cache-miss investigation or configuration change. Use trend
triage only for a supplied time-bounded rate question.

### Cache artifact retrieval or restoration failure

Use this when the main-job or run-group error names artifact download, validation,
decompression, or extraction. A task can still show `remote-cache-hit`. Reconcile
the task with the critical error and later cancellations. Read
[references/artifact-integrity.md](references/artifact-integrity.md) before you
inspect an archive.

### Insufficient task evidence

A null hash or cache status, `NOT_STARTED`, or `SCHEDULED_IMPLICITLY` does not
prove a miss. Do not compare null hashes or inspect artifacts. Request a terminal
record or one controlled completed run.

### Different computation

Different non-null hashes prove only this: **Nx considered at least one computation
input different.** They do not name the input. Request two comparable controlled
runs with direct hash-detail output when supported. This is a **Needs diagnostic
run** result, not a configuration recommendation.

### Same computation, replay not established

For equal non-null hashes without later replay, confirm `cacheable`,
`cacheEnabled`, and the `cache` value from the exact target query. A returned
`cache: true` blocks a duplicate setting. Do not infer artifact absence from an
empty asset list or 404. Treat an unresolved upload or retrieval branch as
**Needs diagnostic run**.

### Suspected unsafe replay

A stale or wrong replay needs reproduction evidence. `inputs` decide a hash;
`outputs` decide restored files. Request task sandboxing evidence for undeclared
reads or writes, plus the target query and a controlled reproduction. Do not
narrow inputs from task data alone.

## Change gate

Recommend a configuration or code edit only after all applicable checks pass:

1. Record the matching commit, Nx version, exact target query, and returned fragment.
2. Show that its `cache`, `inputs`, or `outputs` value needs a change.
3. Before enabling cache, establish a terminating, deterministic task with correct
   replayable outputs.
4. Before removing an input, obtain direct evidence that names it. Prove that its
   removal cannot affect correct output with a bounded controlled run.
5. Explain the correctness risk and get explicit approval before an edit.

Do not recommend an input exclusion from hash differences, a cache-rate trend, or
apparent breadth. If evidence is missing, say `No configuration change recommended
yet.`

## Report

```md
# Nx cache investigation

## Scope

- Target and compared run/task/batch IDs: …
- Branch, commit, CI environment, command, API cache state, and missing fields: …
- Workspace Nx version: …, or `Not required for this API-only investigation.`
- Nx target query and returned `cache`, `inputs`, and `outputs`: …, or `Unavailable.`
- Tool-native cache: …, or `Unknown; not inspected.`
- Change gate: `Passed` or `Blocked`; include missing evidence.

## Classification

`No cache failure established` | `Cache artifact retrieval or restoration failure` | `Insufficient task evidence` | `Different computation` | `Same computation, replay not established` | `Suspected unsafe replay`

## Confirmed facts

- …

## Assessment

- **Confirmed** / **Likely** / **Needs diagnostic run:** …

## Next diagnostic step

- Exact query, controlled command, or evidence required.
- Result that confirms or rules out the hypothesis.

## Safe recommendation

- Exact `nx show` result and risk; or `No configuration change recommended yet.`
```
