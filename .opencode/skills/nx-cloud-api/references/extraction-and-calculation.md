# Large extraction, assets, and calculations

Read this file only for more than one page, a task or log asset, or a
calculation.

## Extraction

1. Run `npx nx-cloud api --describe <operation>`. Use only its documented
   filters.
2. Request one filtered page. Use `fetchedItemCount` and `nextCursor` to choose
   a small `--pages` value, or narrower filters.
3. Split periods only with documented, non-overlapping time boundaries.
4. Run ranges in sequence. Save each range to its own file and record its exit
   code.
5. Combine data only when every range exited 0 with `nextCursor: null`.

Use the default JSON output for extraction; only it carries the completion
state and resume cursor:

```sh
dir="$(mktemp -d)"
npx nx-cloud api task-stats \
  -f dateAfter=2026-08-01 -f dateBefore=2026-08-07 \
  -f percentiles=50 -f percentiles=95 \
  --pages 3 \
  -o "$dir/task-stats-2026-08-01.json"
echo "exit $?"
jq '{fetchedItemCount, pageLimitReached, nextCursor}' "$dir/task-stats-2026-08-01.json"
jq -c '.items[]' "$dir/task-stats-2026-08-01.json"   # rows, one per line
```

A non-null `nextCursor` means the range is incomplete: either `--pages` stopped
it (`pageLimitReached: true`) or a later page failed (non-zero exit; the file
holds the pages fetched before the failure). To continue, rerun the same
command with `--cursor <nextCursor>` into a new file. Do not calculate a
complete result while any range is incomplete. Do not use `--format ndjson` for
extraction; it records neither completion state nor a resume cursor. You might want to record each
time range, filters,
file, exit code, item count, and final `nextCursor` in a manifest.

## Assets

Asset links (task logs, artifacts, reports) answer with a redirect;
`--describe` shows them as `returns: file`. The command downloads the target and writes the raw bytes, the only output that is
not JSON. Use `-o <file>` with an explicit extension such as `.tar.gz`; the
command refuses to write a download to a terminal. Encrypted
artifacts can be decrypted with `npx nx-cloud decrypt-artifact`.

A returned asset link proves only that a route was advertised. A successful
download proves only that it resolves now. A 404 does not prove that the asset
never existed.

Nx Cloud log and report assets are compressed binary payloads. Treat each as an
archive, not terminal text. Save it privately. Identify its format from bytes, not
the URL or file name. Decode it with a matching local tool into a second private
file. Do not stream, print, or expand it in the workspace.

Read only the needed lines from the decoded text. Quote a redacted error signature,
not the complete log or report.

A non-empty gzip payload can contain a valid tar archive whose terminal-output
entry is zero bytes. The artifact can also contain an empty outputs directory and
a zero-byte `terminalOutput` beside a successful exit code. This is usually not a
problem when the task writes no stdout or stderr and produces no declared output
files. An `nx:noop` target is one common example.

Do not classify this shape as archive corruption or a log-capture defect from the
asset alone. Inspect the matching workspace task first. Check its resolved
executor, command, declared outputs, and expected terminal behavior. A matching
hash associates the archive with the task, but it does not prove that output
should exist.

## Calculation

Save the bounded input. Use a script that:

1. Reads the saved JSON (rows in `.items`).
2. States fields, filters, time range, and formula in a code comment.
3. Prints machine-readable JSON before prose.
4. Uses numeric timestamps and weighted counts for rates.
5. Deletes raw data unless the user requests retention.

Do not calculate material rates, percentiles, or durations by inspection.
