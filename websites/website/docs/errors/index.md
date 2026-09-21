# tsParticles Errors

**tsParticles** reports failures through stable, human-readable **error codes** instead of embedding
full message strings in every delivered bundle.

Depending on the build, an error is surfaced in one of two ways:

- **Development / non-minified builds** throw the full, formatted English message, e.g.
  `Invalid HDR "peakNits" value: expected a positive number, got "NaN"`.
- **Minified / production builds** throw only a compact code plus a link to this page, e.g.
  `[tsParticles Error TSP-1203] https://particles.js.org/errors/#TSP-1203`.

The code is stable and never reused after a release: if you see `TSP-xxxx`, the explanation below is
the authoritative one.

## Reading an error code

A code has the shape `TSP-<area><serial>`. The first numbers identify the area:

| Range      | Area                                                 |
| ---------- | ---------------------------------------------------- |
| `TSP-100x` | Engine core (version, particle, plugin registration) |
| `TSP-110x` | Canvas / OffscreenCanvas                             |
| `TSP-120x` | Options validation                                   |
| `TSP-200x` | Image shape                                          |
| `TSP-210x` | GIF shape                                            |
| `TSP-300x` | Polygon mask plugin                                  |
| `TSP-310x` | Emitters + emitters shapes                           |
| `TSP-320x` | Interactivity + base mover                           |
| `TSP-400x` | Particle interactions (collisions)                   |

Some messages contain placeholders such as `{0}` or `{1}`. They are replaced at runtime with
contextual values (versions, image names, option values). In production builds those values never
appear — the compact code + link is shown instead.

## Error catalog

The message column shows the development message as emitted by `getErrorMessage()`; `{0}`, `{1}`
denote the positional arguments.

### Engine

| Code       | Message                                                                                                            |
| ---------- | ------------------------------------------------------------------------------------------------------------------ |
| `TSP-1001` | The tsParticles version is different from the loaded plugins version. Engine version: `{0}`. Plugin version: `{1}` |
| `TSP-1002` | a valid position cannot be found for particle                                                                      |
| `TSP-1003` | Register plugins can only be done before calling tsParticles.load()                                                |
| `TSP-1101` | OffscreenCanvas is required but not supported by this browser                                                      |
| `TSP-1102` | OffscreenCanvas transfer failed                                                                                    |
| `TSP-1201` | Invalid HDR `enable` value: expected a boolean, got `{0}`                                                          |
| `TSP-1202` | Invalid HDR `mode` value: expected one of `{0}`, got `{1}`                                                         |
| `TSP-1203` | Invalid HDR `peakNits` value: expected a positive number, got `{0}`                                                |

### Image shape

| Code       | Message                     |
| ---------- | --------------------------- |
| `TSP-2001` | No images collection found  |
| `TSP-2002` | No image source provided    |
| `TSP-2003` | `{0}` not found             |
| `TSP-2004` | Image shape not initialized |

### GIF shape

| Code       | Message                                   |
| ---------- | ----------------------------------------- |
| `TSP-2101` | not a supported GIF file                  |
| `TSP-2102` | GIF frame size is to large                |
| `TSP-2103` | error while parsing frame `{0}` "{1}"     |
| `TSP-2104` | could not create offscreen canvas context |

### Polygon mask plugin

| Code       | Message                                                  |
| ---------- | -------------------------------------------------------- |
| `TSP-3001` | No polygon found, you need to specify SVG url in config. |
| `TSP-3002` | Error occurred during polygon mask download              |
| `TSP-3003` | No polygon data loaded.                                  |

### Emitters + emitters shapes

| Code       | Message                                   |
| ---------- | ----------------------------------------- |
| `TSP-3101` | tsParticles Emitters Plugin is not loaded |
| `TSP-3102` | No 2d context available                   |
| `TSP-3103` | No path data available                    |

### Interactivity + base mover

| Code       | Message                                                         |
| ---------- | --------------------------------------------------------------- |
| `TSP-3201` | tsParticles Interactivity Plugin is not loaded                  |
| `TSP-3202` | Click handlers can only be set after calling tsParticles.load() |
| `TSP-3203` | tsParticles Base Mover is not loaded                            |

### Particle interactions

| Code       | Message                                     |
| ---------- | ------------------------------------------- |
| `TSP-4001` | Particle is overlapping and can't be placed |
