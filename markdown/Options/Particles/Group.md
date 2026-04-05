# Particles Groups

Defines named particle option groups that can be referenced by emitters, manual particles, or generated particles.

## Properties

`groups` is an object map where:

- key: group id (`"spark"`, `"smoke"`, `"accent"`, ...)
- value: full particle options override for that group

Each group value supports the same structure as {@link IParticlesOptions}.

## Quick example

```json
{
  "particles": {
    "groups": {
      "spark": {
        "number": {
          "value": 0
        },
        "color": {
          "value": "#f59e0b"
        },
        "size": {
          "value": 2
        }
      },
      "smoke": {
        "number": {
          "value": 0
        },
        "color": {
          "value": "#94a3b8"
        },
        "opacity": {
          "value": 0.2
        }
      }
    }
  }
}
```

## Notes

- Group definitions do not automatically spawn particles.
- Use emitters, manual particles, or plugin features that target group ids to create grouped particles.
