# Plugins and Customizations

tsParticles can be extended with plugins, custom shapes, and custom presets.

This page provides a practical flow to build extensions that users can reuse easily.

## Before you start

- Register shape/preset before calling `tsParticles.load(...)`
- Use a unique name (for example, with a project prefix)
- Always document a minimal configuration example

## Create a custom shape

Register a shape with `tsParticles.addShape(name, drawer)`.

### Function example

```ts
tsParticles.addShape("spiral", (context, particle, radius) => {
  const data = particle.shapeData as { innerRadius: number; lineSpacing: number };
  const realWidth = (radius - data.innerRadius) / data.lineSpacing;

  for (let i = 0; i < realWidth * 10; i++) {
    const angle = 0.1 * i;
    const factor = data.innerRadius + data.lineSpacing * angle;

    context.lineTo(factor * Math.cos(angle), factor * Math.sin(angle));
  }
});
```

### Class example (`IShapeDrawer`)

```ts
class SpiralDrawer {
  draw(context, particle, radius) {
    const data = particle.shapeData;
    const realWidth = (radius - data.innerRadius) / data.lineSpacing;

    for (let i = 0; i < realWidth * 10; i++) {
      const angle = 0.1 * i;
      const factor = data.innerRadius + data.lineSpacing * angle;

      context.lineTo(factor * Math.cos(angle), factor * Math.sin(angle));
    }
  }
}

tsParticles.addShape("spiral", new SpiralDrawer());
```

Useful interface: {@link IShapeDrawer}

### Shape configuration

```json
{
  "particles": {
    "shape": {
      "type": "spiral",
      "options": {
        "spiral": {
          "innerRadius": 1,
          "lineSpacing": 1,
          "close": false,
          "fill": false
        }
      }
    }
  }
}
```

## Create a custom preset

Register a preset with `tsParticles.addPreset(name, options)` and then use it in config with `preset`.

```ts
tsParticles.addPreset("my-fire", {
  fpsLimit: 40,
  particles: {
    number: {
      value: 80,
    },
    move: {
      enable: true,
      speed: 6,
    },
    color: {
      value: ["#fdcf58", "#757676", "#f27d0c", "#800909", "#f07f13"],
    },
  },
  background: {
    image: "radial-gradient(#4a0000, #000)",
  },
});
```

Preset usage:

```json
{
  "preset": "my-fire"
}
```

## Publish on npm

- For shapes: use the `tsparticles-shape` tag
- For presets: use the `tsparticles-preset` tag
- Include in README: installation, registration snippet, config snippet

## Related resources

- Official presets: <https://github.com/tsparticles/presets>
- Root options: [Options](./Options.md)
- Docs introduction: [Pages/index](./Pages/index.md)
