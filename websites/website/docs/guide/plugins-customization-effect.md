# Effect

Effects are visual modifiers that draw before or after particles. They can apply canvas-wide transformations like fade, blur, or color overlays. Each effect implements `IEffectDrawer`.

## Quick app-local creation

```ts
import type { Engine } from "@tsparticles/engine";

export async function loadAppEffect(engine: Engine): Promise<void> {
  await engine.pluginManager.register((e) => {
    e.pluginManager.addEffect("app-fade", () =>
      Promise.resolve({
        drawBefore: ({ context }) => {
          context.save();
          context.globalAlpha *= 0.85;
        },
        drawAfter: ({ context }) => {
          context.restore();
        },
      }),
    );
  });
}

await loadAppEffect(tsParticles);

const options = {
  particles: {
    effect: {
      type: "app-fade",
    },
  },
};
```

## Creating a reusable package

### Using the CLI

```bash
npx @tsparticles/cli-create effect <destination>
```

### Generated files

```
src/
  index.ts          — Load function + effect drawer implementation
  index.lazy.ts     — Lazy async loader
  browser.ts        — Browser global registration
```

### Package structure

The effect drawer class implements `IEffectDrawer` with lifecycle hooks:

```ts
export class MyEffectDrawer implements IEffectDrawer {
  drawBefore(data: IEffectDrawData): void {
    // canvas transform before particle drawing
  }

  drawAfter(data: IEffectDrawData): void {
    // canvas transform after particle drawing
  }
}
```

The load function registers the effect:

```ts
export async function loadMyEffect(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);
  await engine.pluginManager.register((e) => {
    e.pluginManager.addEffect("my-effect", () => new MyEffectDrawer());
  });
}
```

### Using your package

```ts
import { loadMyEffect } from "@tsparticles/effect-my-effect";

await loadMyEffect(tsParticles);

const options = {
  particles: {
    effect: {
      type: "my-effect",
    },
  },
};
```

## Contributing to the official repository

- Place your package in: `effects/<name>/`
- Lint and build with: `pnpm run build`
- Open a pull request on GitHub
