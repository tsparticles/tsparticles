# Theme Options

Allows defining multiple named themes (light/dark/any) that can be switched at runtime via `container.loadTheme(name)`.

## Structure

```json
{
  "themes": [
    {
      "name": "dark",
      "default": {
        "value": true,
        "mode": "dark"
      },
      "options": {
        "background": { "color": "#0d1117" },
        "particles": { "color": { "value": "#ffffff" } }
      }
    },
    {
      "name": "light",
      "default": {
        "value": true,
        "mode": "light"
      },
      "options": {
        "background": { "color": "#ffffff" },
        "particles": { "color": { "value": "#000000" } }
      }
    }
  ]
}
```

## Properties

### `name`

A string identifier used to reference the theme in `container.loadTheme("dark")`.

### `default`

Controls whether and when this theme is applied automatically.

| Key             | Type      | Values                         | Notes                                                   |
| --------------- | --------- | ------------------------------ | ------------------------------------------------------- |
| `default.value` | `boolean` | `true` / `false`               | If `true`, this is the default theme for the given mode |
| `default.mode`  | `string`  | `"any"` / `"dark"` / `"light"` | Applies when the OS/browser reports this color scheme   |

- `"dark"` — applied when `prefers-color-scheme: dark` is detected
- `"light"` — applied when `prefers-color-scheme: light` is detected
- `"any"` — applied regardless of system preference

If more than one theme sets `default.value: true` for the same `mode`, the last one wins.

### `options`

A partial {@link Options} object. Only the properties you specify will override the base config — everything else remains unchanged.

## Switching themes at runtime

```javascript
const container = await tsParticles.load({
  id: "tsparticles",
  options: {
    /* ... */
  },
});

// Switch to a named theme
container.loadTheme("dark");

// Reset to the default theme for the current mode
container.loadTheme(undefined);
```

## Common pitfalls

- Defining two themes with `default.value: true` for the same `mode` — only the last one is used
- Passing a `name` that was not registered in `themes` to `loadTheme()` — nothing changes
- Setting complex nested overrides in `options` and expecting deep merge — only specified keys are overridden

## Related docs

- Container runtime API: [Container](../Container.md)
- Options root: [Options](../Options.md)
