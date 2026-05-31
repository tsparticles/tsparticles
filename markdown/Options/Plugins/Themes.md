# Theme (plugin)

Options for the `themes` plugin that let you define predefined themes for the library (theme name, overridden options, and default behavior).

Core properties

- `name` (string) — Default: `""`. Theme name.
- `default` (ThemeDefault) — Default: object with default values (see below). Options for the default theme (`auto`, `mode`, `value`).
- `options` (ISourceOptions | undefined) — Default: `undefined`. The full options that the theme will override.

ThemeDefault (sub-object)

- `auto` (boolean) — Default: `false`. When `true`, the theme is applied automatically when the mode matches the operating system theme.
- `mode` (ThemeMode | keyof typeof ThemeMode) — Default: `ThemeMode.any`. Default theme mode.
- `value` (boolean) — Default: `false`. Flag that sets/un-sets the default theme for the specified mode.

Default JSON example

```json
{
  "name": "",
  "default": {
    "auto": false,
    "mode": "any",
    "value": false
  }
}
```

Usage notes

- Use `options` to pass the options object that the theme should override (same shape as `ISourceOptions`).
- `default.mode` can be one of the constants exported by `ThemeMode`.

Useful links

- API: includes `Options/Plugins/Theme` in the source code.
