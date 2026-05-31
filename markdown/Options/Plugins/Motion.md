# Motion Plugin Options

The `motion` plugin provides rendering behavior settings based on the user's `prefers-reduced-motion` preference, allowing you to disable animations for users who request less motion.

Core properties

- `disable` (boolean) — Default: `true`. When `true`, disables animations for users with `prefers-reduced-motion` enabled.
- `reduce` (MotionReduce) — Default: `{ factor: 4, value: true }`. Settings for reducing motion (reduction factor and flag).

MotionReduce (sub-object)

- `factor` (number) — Default: `4`. Factor used to reduce the speed/amount of movement; higher values reduce movement more.
- `value` (boolean) — Default: `true`. When `true`, applies motion reduction.

JSON example

```json
{
  "motion": {
    "disable": true,
    "reduce": {
      "factor": 4,
      "value": true
    }
  }
}
```

Notes

- If `disable` is `true`, the `reduce` settings are ignored since animations are fully disabled for users who request it.
- See `plugins/motion/src/Options/Classes/Motion.ts` and `MotionReduce.ts` for implementation details and default values.
