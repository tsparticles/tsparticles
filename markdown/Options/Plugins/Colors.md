# Colors Plugin

The `plugins/colors/` folder contains color space utilities used across the project. There is no single top-level options schema — color handling is used by particle color options (see [Color](../Particles/Color.md) and [Color](../../Color.md)).

## Available color space packages

| Package                           | Description                              |
| --------------------------------- | ---------------------------------------- |
| `@tsparticles/plugin-color-hex`   | Hexadecimal color notation (`#ff0000`)   |
| `@tsparticles/plugin-color-hsl`   | HSL color notation (`hsl(0, 100%, 50%)`) |
| `@tsparticles/plugin-color-hsv`   | HSV color notation                       |
| `@tsparticles/plugin-color-hwb`   | HWB color notation                       |
| `@tsparticles/plugin-color-lab`   | CIE Lab color notation                   |
| `@tsparticles/plugin-color-lch`   | CIE Lch color notation                   |
| `@tsparticles/plugin-color-named` | Named CSS colors (`red`, `blue`, etc.)   |
| `@tsparticles/plugin-color-oklab` | Oklab color notation                     |
| `@tsparticles/plugin-color-oklch` | Oklch color notation                     |
| `@tsparticles/plugin-color-rgb`   | RGB color notation (`rgb(255, 0, 0)`)    |

You can configure particle colors using any loaded color space plugin via the standard `particles.color` options. See [Particles Color](../Particles/Color.md) for usage.
