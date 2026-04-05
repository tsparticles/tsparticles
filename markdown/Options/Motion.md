# Motion

Accessibility-aware controls to reduce or disable particle animation for users who prefer reduced motion.

Respects the [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) media query.

## Properties

| Key             | Type      | Default | Notes                                                             |
| --------------- | --------- | ------- | ----------------------------------------------------------------- |
| `disable`       | `boolean` | `false` | Completely stops all animation for `prefers-reduced-motion` users |
| `reduce.value`  | `boolean` | `true`  | Reduces (but does not stop) animation instead of disabling it     |
| `reduce.factor` | `number`  | `4`     | Higher values = more aggressive reduction                         |

## disable

When `true`, no animation runs at all for users with `prefers-reduced-motion: reduce`.

```json
{
  "motion": {
    "disable": true
  }
}
```

## reduce

When `disable` is `false`, the `reduce` option slows down motion proportionally instead of stopping it entirely.

`factor` is applied inversely — a higher value produces a stronger slowdown.

```json
{
  "motion": {
    "disable": false,
    "reduce": {
      "value": true,
      "factor": 4
    }
  }
}
```

## Recommended pattern

Use `reduce` for most cases to keep a subtle animation alive while respecting accessibility. Use `disable` only when any animation would be disorienting.

```json
{
  "motion": {
    "disable": false,
    "reduce": {
      "value": true,
      "factor": 10
    }
  }
}
```

## Common pitfalls

- Ignoring `motion` entirely — `prefers-reduced-motion` users may experience discomfort with fast animations
- Setting `reduce.factor` too low (e.g. `1`) — has no visible effect on motion speed

## Related docs

- Options root: [Options](../Options.md)
