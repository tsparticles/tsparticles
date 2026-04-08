# Plugins and Customizations

tsParticles can be extended with plugins, custom shapes, and custom presets.

This page provides a practical flow to build extensions that users can reuse easily.

## Choose your extension path

- **Custom shape**: when you need a new particle drawing primitive
- **Custom preset**: when you want to reuse the same effect across many projects
- **Plugin**: when you need new runtime behavior, interactions, or rendering logic

## Before you start

- Register shape/preset before calling `tsParticles.load(...)`
- Use a unique name (for example, with a project prefix)
- Always document a minimal configuration example
- If you are starting from an existing demo object, keep that config as a fixture while developing your extension

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

## Reuse strategy

- Start from `@tsparticles/configs` if you need a concrete object to evolve into a preset
- Start from the official presets repository if you need a ready effect close to your target result
- Use palettes when behavior is already correct and only the color identity should change

## Related resources

- Official presets: <https://github.com/tsparticles/presets>
- Official palettes: <https://github.com/tsparticles/palettes/tree/main/palettes>
- Demo configs: <https://github.com/tsparticles/tsparticles/blob/main/utils/configs/README.md>
- Root options: [Options](./Options.md)
- Docs introduction: [Pages/index](./Pages/index.md)
