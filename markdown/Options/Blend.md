# Blend Plugin Options

This document describes configuration used by the blend plugin. If you are looking for plugin runtime docs, see the plugin's README.

Typical options

```json
{
  "blend": {
    "enable": true,
    "mode": "multiply",
    "opacity": 0.8
  }
}
```

Notes

- The available `mode` values depend on the plugin implementation and the rendering backend.
- This file exists to satisfy `[[include:Options/Blend.md]]` includes used by option classes; adjust or extend as the plugin evolves.

