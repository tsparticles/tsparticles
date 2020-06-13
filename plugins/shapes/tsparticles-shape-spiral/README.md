# tsparticles-shape-spiral

Spiral shape for [tsParticles](https://github.com/matteobruni/tsparticles)

## Usage

Add the script after the `tsParticles` one. The shape is ready to work.

After that, in your `tsParticles` config you must add this to the `particles` section.

```json
"shape": {
    "type": "spiral",
    "custom": {
        "spiral": {
            "innerRadius": 1,
            "lineSpacing": 1,
            "fill": false,
            "close": false
        }
    }
},
```

If you already have a shape you can set type as an array like this

```json
"type": ["circle", "spiral"]
```

The `custom` section can stay anywhere in the `shape` section.
