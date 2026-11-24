# V5 color report — E10 checkpoint

Recorded 2026-11-24. This report gathers the current color evidence for E10;
it does not close C5 or certify physical HDR output.

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
verify GPU presentation or luminance on a physical HDR display. The checkpoint
ran on Chrome only; other supported browsers and hardware remain unverified.

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

These aggregate size and runtime failures keep C5 open. They are not attributed
solely to color; this report does not waive or change any budget.

## Status

- C0–C4: implementation and acceptance evidence recorded in E3/E5.
- C5 pixel formatting check: current Chrome 158 run passes 8/8 cases.
- C5 final performance/distribution gate: open because of the recorded E0
  budget exceedances and outstanding broader browser/hardware coverage.
- Physical HDR display validation: open; no suitable hardware result is
  recorded in this checkpoint.

E10 remains open. Reconcile this report with the remaining source-review,
translation, generated-consumer and final package gates before closing the
release handover.
