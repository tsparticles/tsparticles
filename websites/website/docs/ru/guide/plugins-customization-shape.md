# Shape

Shapes are drawing primitives for particles. Each shape implements `IShapeDrawer` with a `draw` method that receives the canvas context and particle data.

## Quick app-local creation

```ts
import type { Engine } from "@tsparticles/engine";

// Register a custom shape inline
await tsParticles.addShape("app-star", {
  draw: (data) => {
    const { context, radius } = data;
    const sides = 5;
    const inset = 2;

    context.beginPath();
    for (let i = 0; i < sides * 2; i++) {
      const angle = (Math.PI * i) / sides - Math.PI / 2;
      const r = i % 2 === 0 ? radius : radius / inset;
      const x = r * Math.cos(angle);
      const y = r * Math.sin(angle);

      if (i === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    }
    context.closePath();
  },
});

const options = {
  particles: {
    shape: { type: "app-star" },
  },
};
```

## Creating a reusable package

### Using the CLI

```bash
npx @tsparticles/cli-create shape <destination>
```

### Generated files

```
src/
  ShapeDrawer.ts    — IShapeDrawer class with draw, init, particleInit
  index.ts          — Load function + exports
  index.lazy.ts     — Lazy async loader for code-splitting
  browser.ts        — Browser global registration
```

### Package structure

The generated `ShapeDrawer.ts` contains a class implementing `IShapeDrawer`:

```ts
export class MyShapeDrawer implements IShapeDrawer {
  readonly validTypes = ["my-shape"];

  draw(data: IShapeDrawData): void {
    const { context, radius } = data;
    // drawing logic
  }
}
```

The load function registers the shape:

```ts
export async function loadMyShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);
  await engine.pluginManager.register((e) => {
    e.pluginManager.addShape(["my-shape"], () => new MyShapeDrawer());
  });
}
```

### Using your package

```ts
import { loadMyShape } from "@tsparticles/shape-my-shape";

await loadMyShape(tsParticles);

const options = {
  particles: {
    shape: { type: "my-shape" },
  },
};
```

## Contributing to the official repository

- Place your package in: `shapes/<name>/`
- Lint and build with: `pnpm run build`
- Open a pull request on GitHub
