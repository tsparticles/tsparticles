# Effect Plugins

The `effects/` directory contains effect drawer packages that extend the effect system. Each effect registers a name that can be used in `particles.effect.type`.

## Available effect packages

| Package                         | Effect name | Description                     |
| ------------------------------- | ----------- | ------------------------------- |
| `@tsparticles/effect-bubble`    | `bubble`    | Bubble/balloon effect           |
| `@tsparticles/effect-filter`    | `filter`    | CSS filter effects on particles |
| `@tsparticles/effect-particles` | `particles` | Nested particle effects         |
| `@tsparticles/effect-shadow`    | `shadow`    | Drop shadow effect              |
| `@tsparticles/effect-trail`     | `trail`     | Motion trail effect             |

## Usage

```json
{
  "particles": {
    "effect": {
      "type": "bubble"
    }
  }
}
```

Each effect may accept additional options under `particles.effect.options.<effectName>`. See [Effect](../Particles/Effect.md) for the generic effect configuration.

## Related docs

- Effect options: [Effect](../Particles/Effect.md)
- Particles root: [Particles](../Particles.md)
- Options root: [Options](../../Options.md)
