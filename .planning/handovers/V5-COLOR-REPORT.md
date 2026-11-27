# V5 color report — E10 checkpoint

Recorded 2026-11-24; reconciled 2026-11-27. This report gathers color evidence
for E10. The user accepted physical HDR output verification as a final-plan
check; no physical display result is claimed here.

## E10 acceptance reconciliation — 2026-11-27

The callback-free renderer follow-up passes all 30 E0 runtime rows, including
forced-HDR context rows. The latest extended bundle matrix and the quiet M4/500
results are summarized in the [E10 evidence](evidence/e10/README.md). E10 is
accepted for progression through the v5 plan. Physical HDR display/GPU
verification remains explicitly queued for the final plan validation by user
decision. The Firefox and Safari context fallbacks and browser support-policy
limitations below remain part of the final evidence; no original performance
ceiling has been changed or waived.

## Contract and migration

C0 records the accepted color model and output decisions in
[`V5-COLOR-DECISIONS.md`](V5-COLOR-DECISIONS.md). The canonical runtime color is
OKLCH plus separate alpha. Built-in color managers resolve supported legacy
inputs to that representation; compatibility RGB/HSL helpers remain isolated
at documented boundaries. Particle color animation uses `h`, `c`, and `l`,
not HSL's `h`, `s`, and `l`; HSL saturation must not be copied directly into
OKLCH chroma. Offsets and animation values follow the OKLCH channel units.
The current migration examples are in [`V5-MIGRATION.md`](V5-MIGRATION.md).

C1–C4 implementation, numerical and consumer migration evidence is accepted
in the [E5 closure](evidence/e5/closure/README.md). The symbol inventory records
remaining RGB/HSL input compatibility, output formatting, pixel-source and
deprecated helper boundaries in [`V5-COLOR-INVENTORY.md`](V5-COLOR-INVENTORY.md).

## E10 browser evidence

The current engine formatter passed all 8 recorded pixel cases in headless
Chrome 158.0.8127.38: sRGB CSS Color 4 reference, Display-P3 gamut mapping,
extended P3 float16 output, alpha, unchanged shared source values, and natural
HDR tone mapping at 400 and 1000 nit peaks. The recorded formatter SHA-256 is
`d12f10ff6aeca2586286bce4c3434b48c3fb934b1224ed037b54060bdb52b88e`;
the full per-case readbacks are in
[`color-browser-results.json`](evidence/e10/color-browser-results.json).

The measured natural HDR luminance readbacks were 140.3526 nits at a 400 nit
peak and 175.2048 nits at a 1000 nit peak. These deterministic headless
float16 readbacks verify the formatter and canvas data path only. They do not
verify GPU presentation or luminance on a physical HDR display. Interactive
Firefox 138.0.1 and Safari 27.2 runs are now recorded in the
[E10 browser matrix](evidence/e10/browser-color-matrix.json): Firefox's P3
requests fell back to sRGB and Safari supported P3 SDR but did not report an
actual float16 context. The strict fixture reports 4/8 and 5/8 cases passing,
respectively, due to unsupported requested contexts. A separate end-to-end smoke
passes in both browsers when the host reports no P3 gamut or high dynamic range:
the engine creates one canvas with sRGB output and HDR disabled. Physical HDR
output and extended-range rendering remain unverified.

## Performance and distribution

E10 remeasured candidate bundle sizes, installed CJS package graphs, and the
M3–M8 plus SDR/HDR runtime matrix. The unchanged E0 ceilings are not met by all
candidate artifacts: the current budget screen records 2 size rows passing,
17 failing (including all 3 CJS rows) and none pending. The first runtime screen
recorded 21 of 30 rows passing and 9 failing. Nine-repetition confirmations
clear seven main-matrix flags; the final reconciled runtime screen has 28 rows
passing and 2 M6/500 extended p95 failures. Matched same-browser E6 artifact
comparisons are available, but they do not replace the E0 acceptance ceilings. See the
[E10 checkpoint](evidence/e10/README.md),
[`budget-screen.json`](evidence/e10/budget-screen.json), and
[`runtime-control-comparison.json`](evidence/e10/runtime-control-comparison.json),
[`runtime-confirmation-comparison.json`](evidence/e10/runtime-confirmation-comparison.json),
and [`runtime-extended-confirmation-comparison.json`](evidence/e10/runtime-extended-confirmation-comparison.json).

At the 2026-11-24 checkpoint, two runtime ceiling exceedances and broader
browser/hardware checks were still open. The 17 size rows over their unchanged E0
ceilings remain visible in the report, but E10 now evaluates size by explaining
retained code and removing demonstrated avoidable growth; those raw deltas alone
do not decide acceptance. The aggregate runtime flags are not attributed solely
to color. No original runtime ceiling is waived or changed.

## Status

- C0–C4: implementation and acceptance evidence recorded in E3/E5.
- C5 pixel formatting check: current Chrome 158 run passes 8/8 cases.
- C5 current code/performance evidence: accepted for E10 progression. The
  callback-free renderer follow-up supersedes the earlier 28/30 runtime screen
  and passes all 30 rows. Bundle ceilings remain diagnostic references under
  E10's updated size criterion; see the [size disposition](V5-10-SIZE-MIGRATION-RELEASE.md#e10-acceptance-criteria-update--2026-11-24).
- Historical 21-repetition M6/500 results of 1.90 ms SDR and 2.20 ms HDR remain
  in the archive. The later callback-free confirmation measures 1.5/1.8 ms
  against the unchanged 1.87 ms E0 ceiling; details are in the
  [E10 checkpoint](evidence/e10/README.md#callback-free-per-particle-drawing-follow-up).
- Physical HDR display validation is queued for the final plan validation at
  the user's direction; no physical luminance result is claimed in this report.

The remaining user-run checks (physical HDR and human language sign-off for the
nine translation drafts) are tracked for final plan validation. E10 does not
authorize a release or package publication.
