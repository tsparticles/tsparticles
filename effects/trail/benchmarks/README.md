# Trail drawer benchmarks

These opt-in browser checks compare the current `TrailDrawer` against the
unmodified source saved from commit
`c11a2db2beb0a54cb496d3481b6ab217e5e13c13` in
`reference/TrailDrawer.original.ts`.
They use the workspace's Puppeteer installation and real Chromium canvas
contexts; the comparison dependencies are development-only.

Run from the repository root (set `CHROME_BIN` if the detected Chromium is
unavailable):

```sh
pnpm --filter @tsparticles/effect-trail run browser:compare
pnpm --filter @tsparticles/effect-trail run browser:benchmark
```

`browser:compare` captures frames 1, 10, 60, and 200 for the full transform,
fade, trail-length, width, out-mode, and DPR matrix. It checks context-state
restoration and compares `isInsideCanvas` with a brute-force trail-bounds
calculation on every frame of a 1,000-frame run for every out mode and
direction. It also verifies that the raw trail is trimmed to the configured
length on every frame. The complete pixel report, including each DPR 2 pixel's
position, per-channel delta, and nearest segment-edge distance, is written to
`output/pixel-comparison.json`. Differing PNGs and a marked-up worst-case
comparison are saved under `output/pixel-diffs/`. All generated artifacts and
transpiled test modules are gitignored.

The zero-width case is an explicit, intentional behavior change:
`maxWidth: 0` now draws no stroke; historically, Canvas ignored
`lineWidth = 0` and reused a stale context width. The runner verifies this
against the original implementation instead of treating it as a pixel
regression.

The only other measured differences were with `transform: false` at DPR 2:
90 edge pixels across 75 captures (at most 8 of 640 x 480 pixels per capture).
The maximum recorded geometry-coordinate delta was 0.0000608 device pixels,
all changed pixels were within 0.0171 device pixels of a stroked edge, and
stroke styles matched exactly. These are edge-antialiasing pixels: per-channel
deltas can look large in absolute terms (red up to 57) because the changed
pixels lie on stroke edges where a tiny coverage change affects the blended
color. Channel deltas were red 1-57 (mean 26.77), green 3-23 (mean 12.16),
blue 0-28 (mean 3.18), alpha 0. The measured geometry delta was at most about
0.00006 device pixels, and every changed pixel was within about 0.017 device
pixels of a stroked edge, supporting floating-point rounding from subtracting
the particle position before applying the original translated transform
rather than a geometry or style change.

The comparator uses threshold 0 and permits only this case: at most 8
differing pixels per capture (the largest observed count), within 0.05 device
pixels of a stroke edge (about three times the largest measured edge distance),
with identical stroke styles, and a maximum channel delta of 64 (a small margin
over the observed maximum of 57). Every other difference fails. The worst case
is marked in `output/pixel-diffs/worst-dpr2-edge-annotated.png`.

The drawer keeps exact per-frame trail trimming and computes out-of-bounds
trail bounds directly; it does not use batched compaction or a bounds cache.

`browser:benchmark` reports median, minimum, and maximum milliseconds per frame
for original and current implementations at DPR 1 and 2, with transform off
and on. It uses 500 particles, 50 trail steps, fade enabled, 20 warm-up frames,
60 measured frames, and five repetitions. These numbers come from this single
configuration (500 particles, trail length 50, fade on, Chrome 157, Apple M1
Max, CPU throttling disabled) and must not be read as a general speedup figure.
Results depend on the machine and on the relative cost of `setTransform` and
`stroke`. The output includes Chromium and host-machine details.

Final measured run: Chrome 157.0.8103.52 on Apple M1 Max (macOS 27.2.0 arm64),
CPU throttling disabled.

| Transform | DPR | Original median (min-max) ms/frame | Current median (min-max) ms/frame | Change |
| --------- | --: | ---------------------------------: | --------------------------------: | -----: |
| false     |   1 |                9.517 (8.872-9.832) |               6.658 (6.362-7.650) | -30.0% |
| true      |   1 |              10.138 (9.927-10.412) |              9.622 (9.530-10.092) |  -5.1% |
| false     |   2 |             17.312 (16.578-17.568) |               7.795 (7.552-7.833) | -55.0% |
| true      |   2 |             18.110 (17.980-19.103) |            17.595 (17.440-17.933) |  -2.8% |

The absolute-coordinate path has a clear gain with `transform: false`; the
small transform-enabled median improvements are comparable to the measurement
spread and show no regression. Batched compaction and cached bounds are absent
from the final implementation: prior measurements were within run-to-run
noise, and retaining exact trail length avoids changing the observable raw
array length.

The saved original source is only used by these scripts and is not exported or
included in package builds.
