# Exports Plugins

The `plugins/exports/` plugins provide utilities to export particle frames or configuration. They generally do not expose a shared top-level options schema — each export target has its own API-driven parameters.

## Available export packages

| Package                            | Export type | Description                                         |
| ---------------------------------- | ----------- | --------------------------------------------------- |
| `@tsparticles/plugin-export-image` | Image       | Export the current canvas frame as a PNG/JPEG image |
| `@tsparticles/plugin-export-json`  | JSON        | Export the current particle configuration as JSON   |
| `@tsparticles/plugin-export-video` | Video       | Export canvas animation as a video file             |

Export plugins are typically used programmatically via the container's `export` method rather than through declarative options.
