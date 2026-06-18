# Plan: Separate Animated GIF from Image Shape

## Goal

Extract all animated GIF handling from `@tsparticles/shape-image` into a new `@tsparticles/shape-gif` package.
`@tsparticles/shape-image` loses GIF support entirely (static images only — including `.gif` files loaded as static `<img>` elements, without animation decoding).
`@tsparticles/shape-gif` is included in `@tsparticles/all` only (not in slim/full).

## Architecture

```
@tsparticles/shape-image                @tsparticles/shape-gif
  src/                                    src/
    Utils.ts  (IImage, IParticleImage,      IGifShape.ts   (shape options)
               ImageParticle — NO gif*)      types.ts       (GifParticle)
    ImageDrawer.ts  (NO drawGif)            GifDrawer.ts   (with GIF cache Map)
    ImagePreloader.ts                       GifUtils/
    index.ts  (NO loadGifImage)               Utils.ts  (decodeGIF, drawGif, getGIFLoopAmount)
    Options/Classes/Preload.ts                ByteStream.ts
      (NO gif flag)                           Constants.ts
                                              Enums/DisposalMethod.ts
                                              Types/GIF.ts, Frame.ts, ...
  (*: all gif* fields removed)
```

**Key differences in `drawGif` in the copy:**
- Original (in shape-image): reads `particle.image.gifData`, `particle.image.gifLoopCount`, `particle.image.gif`
- New (in shape-gif): reads `particle.gifData` directly, writes `particle.gifFrame/gifTime/gifLoopCount` directly
- The `gifParticle` has `gifData` at the top level, not nested under `image`

---

## Step 1 — Create `shapes/gif/` package scaffold

### Sub-step 1.1 — Create directory structure

```bash
mkdir -p shapes/gif/src
```

---

### Sub-step 1.2 — Create `shapes/gif/package.json`

```json
{
  "name": "@tsparticles/shape-gif",
  "version": "4.2.0",
  "description": "tsParticles shape for rendering particles as animated GIFs",
  "homepage": "https://particles.js.org",
  "scripts": {
    "build": "tsparticles-build",
    "version": "tsparticles-build -d && git add package.dist.json && tsparticles-build -p -l && git add .",
    "prepack": "pnpm run build"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/tsparticles/tsparticles.git",
    "directory": "shapes/gif"
  },
  "keywords": [
    "front-end", "frontend", "tsparticles", "particles", "particle",
    "canvas", "animation", "web", "html5", "css3", "animated",
    "background", "confetti", "fireworks", "typescript", "javascript",
    "tsparticles-shape", "gif", "animated-gif"
  ],
  "author": "Matteo Bruni <matteo.bruni@me.com>",
  "license": "MIT",
  "bugs": { "url": "https://github.com/tsparticles/tsparticles/issues" },
  "prettier": "@tsparticles/prettier-config",
  "files": ["dist"],
  "sideEffects": false,
  "browser": "dist/browser/index.js",
  "main": "dist/cjs/index.js",
  "module": "dist/esm/index.js",
  "types": "dist/types/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/types/index.d.ts",
      "browser": "./dist/browser/index.js",
      "import": "./dist/esm/index.js",
      "require": "./dist/cjs/index.js",
      "default": "./dist/esm/index.js"
    },
    "./lazy": {
      "types": "./dist/types/index.lazy.d.ts",
      "browser": "./dist/browser/index.lazy.js",
      "import": "./dist/esm/index.lazy.js",
      "require": "./dist/cjs/index.lazy.js",
      "default": "./dist/esm/index.lazy.js"
    },
    "./package.json": "./dist/package.json"
  },
  "peerDependencies": { "@tsparticles/engine": "workspace:*" },
  "devDependencies": {
    "@tsparticles/cli-build": "workspace:*",
    "@tsparticles/engine": "workspace:*"
  },
  "publishConfig": { "access": "public", "directory": "dist", "linkDirectory": true },
  "type": "module"
}
```

---

### Sub-step 1.3 — Create `shapes/gif/package.dist.json`

```json
{
  "name": "@tsparticles/shape-gif",
  "version": "4.2.0",
  "description": "tsParticles gif shape",
  "homepage": "https://particles.js.org",
  "repository": { "type": "git", "url": "git+https://github.com/tsparticles/tsparticles.git", "directory": "shapes/gif" },
  "keywords": [
    "front-end", "frontend", "tsparticles", "particles", "particle",
    "canvas", "jsparticles", "xparticles", "particles-js", "particles.js",
    "particles-ts", "particles.ts", "typescript", "javascript",
    "animation", "web", "html5", "web-design", "webdesign",
    "css", "html", "css3", "animated", "background", "tsparticles-shape"
  ],
  "author": "Matteo Bruni <matteo.bruni@me.com>",
  "license": "MIT",
  "bugs": { "url": "https://github.com/tsparticles/tsparticles/issues" },
  "sideEffects": false,
  "jsdelivr": "tsparticles.shape.gif.min.js",
  "unpkg": "tsparticles.shape.gif.min.js",
  "browser": "browser/index.js",
  "main": "cjs/index.js",
  "module": "esm/index.js",
  "types": "types/index.d.ts",
  "exports": {
    ".": {
      "types": "./types/index.d.ts", "browser": "./browser/index.js",
      "import": "./esm/index.js", "require": "./cjs/index.js",
      "default": "./esm/index.js"
    },
    "./lazy": {
      "types": "./types/index.lazy.d.ts", "browser": "./browser/index.lazy.js",
      "import": "./esm/index.lazy.js", "require": "./cjs/index.lazy.js",
      "default": "./esm/index.lazy.js"
    },
    "./package.json": "./package.json"
  },
  "peerDependencies": { "@tsparticles/engine": "4.2.0" },
  "publishConfig": { "access": "public" },
  "type": "module"
}
```

---

### Sub-step 1.4 — Create `shapes/gif/.browserslistrc`

```
extends @tsparticles/browserslist-config
```

---

### Sub-step 1.5 — Create `shapes/gif/eslint.config.js`

```javascript
import tsParticlesESLintConfig from "@tsparticles/eslint-config";
import { defineConfig } from "eslint/config";

export default defineConfig([
    tsParticlesESLintConfig,
]);
```

---

### Sub-step 1.6 — Create `shapes/gif/rollup.config.js`

```javascript
import { loadParticlesShape } from "@tsparticles/rollup-plugin";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url),
  __dirname = path.dirname(__filename),
  rootPkgPath = path.join(__dirname, "package.json"),
  pkg = await fs.readJson(rootPkgPath),
  version = pkg.version;

export default loadParticlesShape({
  moduleName: "gif",
  shapeName: "Gif",
  version,
  dir: __dirname,
  progress: false,
});
```

---

### Sub-step 1.7 — Create TypeScript config files

Create `shapes/gif/tsconfig.base.json`:
```json
{
  "extends": "@tsparticles/tsconfig/dist/tsconfig.base.json",
  "compilerOptions": { "rootDir": "./src" },
  "include": ["./src"]
}
```

Create `shapes/gif/tsconfig.json`:
```json
{
  "extends": ["./tsconfig.base.json", "@tsparticles/tsconfig/dist/tsconfig.json"],
  "compilerOptions": { "outDir": "./dist/cjs" }
}
```

Create `shapes/gif/tsconfig.browser.json`:
```json
{
  "extends": ["./tsconfig.base.json", "@tsparticles/tsconfig/dist/tsconfig.browser.json"],
  "compilerOptions": { "outDir": "./dist/browser" }
}
```

Create `shapes/gif/tsconfig.module.json`:
```json
{
  "extends": ["./tsconfig.base.json", "@tsparticles/tsconfig/dist/tsconfig.module.json"],
  "compilerOptions": { "outDir": "./dist/esm" }
}
```

Create `shapes/gif/tsconfig.types.json`:
```json
{
  "extends": ["./tsconfig.base.json", "@tsparticles/tsconfig/dist/tsconfig.types.json"],
  "compilerOptions": { "outDir": "./dist/types" }
}
```

---

### Sub-step 1.8 — Create `shapes/gif/typedoc.json`

```json
{
  "projectDocuments": ["../markdown/**/*.md"],
  "entryPoints": ["./src/"],
  "entryPointStrategy": "expand",
  "name": "tsParticles GIF Shape",
  "includeVersion": true,
  "hideGenerator": true,
  "out": "./docs",
  "validation": { "invalidLink": true, "notDocumented": true }
}
```

---

### Sub-step 1.9 — Create `shapes/gif/src/IGifShape.ts`

```typescript
import type { IShapeValues } from "@tsparticles/engine";

export interface IGifShape extends IShapeValues {
    height: number;
    loopCount?: number;
    name?: string;
    src: string;
    width: number;
}
```

---

### Sub-step 1.10 — Create `shapes/gif/src/types.ts`

```typescript
import type { Particle } from "@tsparticles/engine";
import type { GIF } from "./GifUtils/Types/GIF.js";

export type GifParticle = Particle & {
    gifData?: GIF;
    gifFrame: number;
    gifLoopCount: number;
    gifTime: number;
};
```

---

### Sub-step 1.11 — Create `shapes/gif/src/GifDrawer.ts`

```typescript
import type { Container, IShapeDrawData, IShapeDrawer } from "@tsparticles/engine";
import { getGIFLoopAmount } from "./GifUtils/Utils.js";
import type { GifParticle } from "./types.js";
import type { IGifShape } from "./IGifShape.js";
import { decodeGIF, drawGif } from "./GifUtils/Utils.js";
import type { GIF } from "./GifUtils/Types/GIF.js";

export class GifDrawer implements IShapeDrawer<GifParticle> {
    readonly #container: Container;
    readonly #gifCache: Map<string, GIF>;

    constructor(container: Container) {
        this.#container = container;
        this.#gifCache = new Map();
    }

    async draw(data: IShapeDrawData<GifParticle>): Promise<void> {
        const { context, opacity } = data;

        if (!data.particle.gifData) return;

        context.globalAlpha = opacity;
        await drawGif(data, this.#container.canvas.render.settings);
        context.globalAlpha = 1;
    }

    async particleInit(container: Container, particle: GifParticle): Promise<void> {
        const shapeData = particle.shapeData as IGifShape | undefined;

        if (!shapeData?.src) return;

        let gifData = this.#gifCache.get(shapeData.src);

        if (!gifData) {
            particle.gifData = undefined;
            particle.gifFrame = 0;
            particle.gifTime = 0;
            particle.gifLoopCount = 0;

            gifData = await decodeGIF(shapeData.src, { colorSpace: "srgb" });
            this.#gifCache.set(shapeData.src, gifData);
        }

        particle.gifData = gifData;
        particle.gifFrame = 0;
        particle.gifTime = 0;
        particle.gifLoopCount = getGIFLoopAmount(gifData);

        if (particle.gifLoopCount === 0) {
            particle.gifLoopCount = Number.POSITIVE_INFINITY;
        }

        if (shapeData.loopCount !== undefined) {
            particle.gifLoopCount = shapeData.loopCount;
        }
    }

    destroy(): void {
        this.#gifCache.clear();
    }
}
```

---

### Sub-step 1.12 — Create `shapes/gif/src/index.ts`

```typescript
import type { Engine } from "@tsparticles/engine";
import { GifDrawer } from "./GifDrawer.js";

export async function loadGifShape(engine: Engine): Promise<void> {
    engine.checkVersion("4.2.0");

    await engine.pluginManager.register(e => {
        e.pluginManager.addShape(["gif", "gifs"], container =>
            Promise.resolve(new GifDrawer(container)),
        );
    });
}
```

---

### Sub-step 1.13 — Create `shapes/gif/src/index.lazy.ts`

```typescript
import type { Engine } from "@tsparticles/engine";

export async function loadGifShape(engine: Engine): Promise<void> {
    engine.checkVersion("4.2.0");

    await engine.pluginManager.register(async e => {
        const { GifDrawer } = await import("./GifDrawer.js");

        e.pluginManager.addShape(["gif", "gifs"], container =>
            Promise.resolve(new GifDrawer(container)),
        );
    });
}
```

---

### Sub-step 1.14 — Create `shapes/gif/src/browser.ts`

```typescript
import { loadGifShape } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
    __tsParticlesInternals?: Record<string, unknown>;
    loadGifShape?: typeof loadGifShape;
};
globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadGifShape = loadGifShape;

export * from "./index.js";
```

---

## Step 2 — Copy `GifUtils/` from `shapes/image/src/GifUtils/` to `shapes/gif/src/GifUtils/`

### Sub-step 2.1 — Copy all files (preserve directory tree)

Copy the entire `GifUtils/` directory from `shapes/image/src/GifUtils/` to `shapes/gif/src/GifUtils/`:

```bash
cp -r shapes/image/src/GifUtils/ shapes/gif/src/GifUtils/
```

Files copied:
```
GifUtils/
  ByteStream.ts
  Constants.ts
  Utils.ts
  Enums/DisposalMethod.ts
  Types/GIF.ts
  Types/Frame.ts
  Types/ApplicationExtension.ts
  Types/GIFDataHeaders.ts
  Types/GIFProgressCallbackFunction.ts
  Types/PlainTextData.ts
```

---

### Sub-step 2.2 — Fix import in copied `GifUtils/Utils.ts`

In `shapes/gif/src/GifUtils/Utils.ts`, replace the import at line 3:

**Before:**
```typescript
import { type IImage, type ImageParticle, loadImage } from "../Utils.js";
```

**After:**
```typescript
import type { GifParticle } from "../types.js";
```

---

### Sub-step 2.3 — Remove `loadGifImage` function from copied `GifUtils/Utils.ts`

Delete the entire `loadGifImage` function (the last function in the file, lines 755-777 in the original). The function signature is:

```typescript
export async function loadGifImage(image: IImage, canvasSettings: CanvasRenderingContext2DSettings): Promise<void> {
```

This function is replaced by the `GifDrawer.particleInit()` method.

---

### Sub-step 2.4 — Replace `drawGif` function in copied `GifUtils/Utils.ts`

Replace the entire `drawGif` function (line 641 onward in the original) with the adapted version below.

The original function accesses GIF data via `particle.image.gifData`. The new version accesses it via `particle.gifData` directly.

**Full replacement for `drawGif`:**

```typescript
export function drawGif(data: IShapeDrawData<GifParticle>, canvasSettings?: CanvasRenderingContext2DSettings): void {
  const { context, radius, particle, delta } = data,
    gifData = particle.gifData;

  if (!gifData) {
    return;
  }

  const offscreenCanvas = new OffscreenCanvas(gifData.width, gifData.height),
    offscreenContext = offscreenCanvas.getContext("2d", canvasSettings);

  if (!offscreenContext) {
    throw new Error("could not create offscreen canvas context");
  }

  offscreenContext.imageSmoothingQuality = "low";
  offscreenContext.imageSmoothingEnabled = false;

  offscreenContext.clearRect(originPoint.x, originPoint.y, offscreenCanvas.width, offscreenCanvas.height);

  let frameIndex = particle.gifFrame ?? defaultFrame;

  const pos = { x: -gifData.width * half, y: -gifData.height * half },
    frame = gifData.frames[frameIndex]!;

  particle.gifTime ??= initialTime;

  if (!frame.bitmap) {
    return;
  }

  context.scale(radius / gifData.width, radius / gifData.height);

  switch (frame.disposalMethod) {
    case DisposalMethod.UndefinedA:
    case DisposalMethod.UndefinedB:
    case DisposalMethod.UndefinedC:
    case DisposalMethod.UndefinedD:
    case DisposalMethod.Replace:
      offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);
      context.drawImage(offscreenCanvas, pos.x, pos.y);
      offscreenContext.clearRect(originPoint.x, originPoint.y, offscreenCanvas.width, offscreenCanvas.height);
      break;
    case DisposalMethod.Combine:
      offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);
      context.drawImage(offscreenCanvas, pos.x, pos.y);
      break;
    case DisposalMethod.RestoreBackground:
      offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);
      context.drawImage(offscreenCanvas, pos.x, pos.y);
      offscreenContext.clearRect(originPoint.x, originPoint.y, offscreenCanvas.width, offscreenCanvas.height);
      if (!gifData.globalColorTable.length) {
        offscreenContext.putImageData(gifData.frames[firstIndex]!.image, pos.x + frame.left, pos.y + frame.top);
      } else {
        offscreenContext.putImageData(gifData.backgroundImage, pos.x, pos.y);
      }
      break;
    case DisposalMethod.RestorePrevious:
      {
        const previousImageData = offscreenContext.getImageData(
          originPoint.x, originPoint.y, offscreenCanvas.width, offscreenCanvas.height,
        );

        offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);
        context.drawImage(offscreenCanvas, pos.x, pos.y);
        offscreenContext.clearRect(originPoint.x, originPoint.y, offscreenCanvas.width, offscreenCanvas.height);
        offscreenContext.putImageData(previousImageData, originPoint.x, originPoint.y);
      }
      break;
  }

  particle.gifTime += delta.value;

  if (particle.gifTime > frame.delayTime) {
    particle.gifTime -= frame.delayTime;

    if (++frameIndex >= gifData.frames.length) {
      if (--particle.gifLoopCount <= defaultLoopCount) {
        return;
      }

      frameIndex = firstIndex;
      offscreenContext.clearRect(originPoint.x, originPoint.y, offscreenCanvas.width, offscreenCanvas.height);
    }

    particle.gifFrame = frameIndex;
  }

  context.scale(gifData.width / radius, gifData.height / radius);
}
```

**Key differences from the original:**
1. `IShapeDrawData<GifParticle>` instead of `IShapeDrawData<ImageParticle>`
2. `gifData = particle.gifData` instead of `image = particle.image`
3. `if (!gifData)` instead of `if (!image?.gifData || !image.gif)`
4. All `image.gifData.*` replaced with `gifData.*`
5. Removed `particle.gifLoopCount ??= image.gifLoopCount ?? defaultLoopCount` (loop count is set by `particleInit()`)
6. All `image.*` references removed

---

### Sub-step 2.5 — Verify no broken imports in copied GifUtils files

Check that all imported paths resolve correctly:

| File | Imports | Status |
|---|---|---|
| `ByteStream.ts` | `./Types/GIFDataHeaders.js` | ✅ Internal |
| `Constants.ts` | none | ✅ |
| `Utils.ts` | `@tsparticles/engine`, `../types.js`, `./Constants.js`, `./ByteStream.js`, `./Enums/DisposalMethod.js`, `./Types/GIF.js`, `./Types/GIFDataHeaders.js`, `./Types/GIFProgressCallbackFunction.js` | ✅ Fixed in 2.2 |
| `Enums/DisposalMethod.ts` | none | ✅ |
| `Types/GIF.ts` | `@tsparticles/engine`, `./ApplicationExtension.js`, `./Frame.js` | ✅ |
| `Types/Frame.ts` | `@tsparticles/engine`, `../Enums/DisposalMethod.js`, `./PlainTextData.js` | ✅ |
| `Types/GIFProgressCallbackFunction.ts` | `@tsparticles/engine` | ✅ |
| `Types/PlainTextData.ts` | `@tsparticles/engine` | ✅ |
| Others | none | ✅ |

---

## Step 3 — Remove GIF from `@tsparticles/shape-image`

### Sub-step 3.1 — Delete `GifUtils/` directory from shape-image

```bash
rm -rf shapes/image/src/GifUtils/
```

---

### Sub-step 3.2 — Clean `shapes/image/src/Utils.ts`

**Remove import (line 2):**
```typescript
import type { GIF } from "./GifUtils/Types/GIF.js";
```

**Remove 3 fields from `IImage` interface (lines 18-20):**
```typescript
gif: boolean;
gifData?: GIF;
gifLoopCount?: number;
```

**Remove 3 fields from `IParticleImage` interface (lines 37-39):**
```typescript
gif: boolean;
gifData?: GIF;
gifLoopCount?: number;
```

**Remove 3 fields from `ImageParticle` type (lines 50-52):**
```typescript
gifFrame?: number;
gifLoopCount?: number;
gifTime?: number;
```

After removal, `ImageParticle` becomes:
```typescript
export type ImageParticle = Particle & {
    image?: IParticleImage;
};
```

**Remove `gif` field from `replaceImageColor` return value (line 166):**
```typescript
// REMOVE this line from the IParticleImage literal:
gif: imageData.gif,
```

---

### Sub-step 3.3 — Clean `shapes/image/src/IImageShape.ts`

**Remove `gif: boolean;` (line 4).**

After:
```typescript
export interface IImageShape extends IShapeValues {
    height: number;
    name: string;
    replaceColor: boolean;
    src: string;
    width: number;
}
```

---

### Sub-step 3.4 — Clean `shapes/image/src/Options/Classes/Preload.ts`

**Remove `gif` property (line 5):**
```typescript
gif = false;  // REMOVE
```

**Remove `loadProperty(this, "gif", data.gif);` (line 17):**

After:
```typescript
export class Preload implements IPreload, IOptionLoader<IPreload> {
    height?: number;
    name?: string;
    replaceColor?: boolean;
    src = "";
    width?: number;

    load(data?: RecursivePartial<IPreload>): void {
        if (isNull(data)) { return; }

        loadProperty(this, "height", data.height);
        loadProperty(this, "name", data.name);
        loadProperty(this, "replaceColor", data.replaceColor);
        loadProperty(this, "src", data.src);
        loadProperty(this, "width", data.width);
    }
}
```

---

### Sub-step 3.5 — Clean `shapes/image/src/Options/Interfaces/IPreload.ts`

**Remove `gif: boolean` and its JSDoc (lines 3-5):**

After:
```typescript
/** The preload image options */
export interface IPreload {
    /** The image height */
    height?: number;
    /** The image name */
    name?: string;
    /** Replace the color with the particle color */
    replaceColor?: boolean;
    /** The image source */
    src: string;
    /** The image width */
    width?: number;
}
```

---

### Sub-step 3.6 — Clean `shapes/image/src/ImageDrawer.ts`

**Remove import (line 12):**
```typescript
import { drawGif } from "./GifUtils/Utils.js";
```

**In `draw()` — remove GIF branch (lines 48-49):**

Before:
```typescript
        if (image.gif && image.gifData) {
            drawGif(data, this.#container.canvas.render.settings);
        } else if (element) {
```

After:
```typescript
        if (element) {
```

**In `particleInit()` — remove gif fields from `imageRes` (lines 158-160):**

Before:
```typescript
          gif: image.gif,
          gifData: image.gifData,
          gifLoopCount: image.gifLoopCount,
```

After: (these 3 lines removed entirely)

**In `#loadImageShape()` — remove `gif` from preload data (line 196):**

Before:
```typescript
    await this.#engine.loadImage(container, {
        gif: imageShape.gif,
        name: imageShape.name,
```

After:
```typescript
    await this.#engine.loadImage(container, {
        name: imageShape.name,
```

---

### Sub-step 3.7 — Clean `shapes/image/src/index.ts`

**Remove import (line 6):**
```typescript
import { loadGifImage } from "./GifUtils/Utils.js";
```

**Remove `gif` field from `IImage` literal (line 48):**
```typescript
gif: data.gif,  // REMOVE
```

**Remove `data.gif` check and `loadGifImage` branch (lines 64-65):**

Before:
```typescript
      if (data.gif) {
        imageFunc = (img): Promise<void> => loadGifImage(img, { colorSpace: "srgb" });
      } else if (data.replaceColor) {
```

After:
```typescript
      if (data.replaceColor) {
```

---

### Sub-step 3.8 — Clean `shapes/image/src/index.lazy.ts`

**Remove `gif` field from `IImage` literal (line 45):**
```typescript
gif: data.gif,  // REMOVE
```

**Remove `data.gif` check and dynamic `loadGifImage` import (lines 61-64):**

Before:
```typescript
      if (data.gif) {
        const { loadGifImage } = await import("./GifUtils/Utils.js");

        imageFunc = (img): Promise<void> => loadGifImage(img, { colorSpace: "srgb" });
      } else if (data.replaceColor) {
```

After:
```typescript
      if (data.replaceColor) {
```

---

### Sub-step 3.9 — Verify no GIF references remain in shape-image

```bash
grep -rn "gif\|Gif\|GIF\|GifUtils" shapes/image/src/ --include="*.ts" | grep -v node_modules
```

Expected output: no matches.

---

## Step 4 — Add `@tsparticles/shape-gif` to `@tsparticles/all` bundle

### Sub-step 4.1 — Edit `bundles/all/package.json`

Add to `dependencies` (in alphabetical order, after `"@tsparticles/shape-cog"`):
```json
"@tsparticles/shape-gif": "workspace:*",
```

---

### Sub-step 4.2 — Edit `bundles/all/package.dist.json`

If `bundles/all/package.dist.json` exists, add the same dependency. If not, skip this substep.

---

### Sub-step 4.3 — Edit `bundles/all/src/index.ts`

**Add import** (in alphabetical order, after existing imports):
```typescript
import { loadGifShape } from "@tsparticles/shape-gif";
```

**Add load call** inside the `Promise.all` shapes block (after `loadSquircleShape(e),`):
```typescript
loadGifShape(e),
```

The shapes block becomes:
```typescript
      loadArrowShape(e),
      loadCardsShape(e),
      loadCogShape(e),
      loadGifShape(e),
      loadHeartShape(e),
      loadInfinityShape(e),
      loadMatrixShape(e),
      loadPathShape(e),
      loadRibbonShape(e),
      loadRoundedPolygonShape(e),
      loadRoundedRectShape(e),
      loadSpiralShape(e),
      loadSquircleShape(e),
```

---

### Sub-step 4.4 — Verify `bundles/all/src/bundle.ts` and `bundles/all/src/browser.ts`

Both files re-export from `./index.js` which will now export `loadGifShape`. No changes needed.

---

## Step 5 — Verify build

### Sub-step 5.1 — Link workspace packages

```bash
pnpm install
```

### Sub-step 5.2 — Build all packages

```bash
pnpm run build:ci
```

### Sub-step 5.3 — Check for errors

Look for:
- TypeScript errors in `shapes/gif/src/`
- TypeScript errors in `shapes/image/src/` (no more GIF references)
- TypeScript errors in `bundles/all/src/` (missing import)
- Rollup/webpack bundle errors

### Sub-step 5.4 — If errors, build individually for debugging

```bash
pnpm nx run shape-gif:build
pnpm nx run shape-image:build
pnpm nx run all:build
```

### Sub-step 5.5 — Verify bundle output

Check that `shapes/gif/dist/` exists with this structure:
```
shapes/gif/dist/
  browser/index.js
  browser/index.lazy.js
  browser/browser.js
  cjs/index.js
  cjs/index.lazy.js
  esm/index.js
  esm/index.lazy.js
  types/index.d.ts
  types/index.lazy.d.ts
  types/GifDrawer.d.ts
  types/IGifShape.d.ts
  types/types.d.ts
  types/GifUtils/...
```

---

## Step 6 — Update demo config

### Sub-step 6.1 — Edit `utils/configs/src/g/gifs.ts`

Change from old image+gif config to new gif shape config:

**Before:**
```typescript
shape: {
    options: {
        image: {
            gif: true,
            height: 200,
            src: "https://particles.js.org/images/mario.gif",
            width: 200,
        },
    },
    type: "image",
},
```

**After:**
```typescript
shape: {
    options: {
        gif: {
            height: 200,
            src: "https://particles.js.org/images/mario.gif",
            width: 200,
        },
    },
    type: "gif",
},
```

---

## Execution Order

```
Step 1 (create shapes/gif/ scaffold)
  ├── 1.1  mkdir
  ├── 1.2  package.json
  ├── 1.3  package.dist.json
  ├── 1.4  .browserslistrc
  ├── 1.5  eslint.config.js
  ├── 1.6  rollup.config.js
  ├── 1.7  tsconfig files (5 files)
  ├── 1.8  typedoc.json
  ├── 1.9  IGifShape.ts
  ├── 1.10 types.ts
  ├── 1.11 GifDrawer.ts
  ├── 1.12 index.ts
  ├── 1.13 index.lazy.ts
  └── 1.14 browser.ts

Step 2 (copy GifUtils)
  ├── 2.1  cp -r all files
  ├── 2.2  fix import in Utils.ts
  ├── 2.3  remove loadGifImage
  ├── 2.4  replace drawGif
  └── 2.5  verify imports

Step 3 (remove GIF from shape-image)
  ├── 3.1  rm -rf GifUtils/
  ├── 3.2  Utils.ts
  ├── 3.3  IImageShape.ts
  ├── 3.4  Preload.ts
  ├── 3.5  IPreload.ts
  ├── 3.6  ImageDrawer.ts
  ├── 3.7  index.ts
  ├── 3.8  index.lazy.ts
  └── 3.9  grep verify

Step 4 (add to @tsparticles/all)
  ├── 4.1  package.json
  ├── 4.2  package.dist.json
  ├── 4.3  src/index.ts
  └── 4.4  verify bundle/browser exports

Step 5 (build & verify)
  ├── 5.1  pnpm install
  ├── 5.2  pnpm run build:ci
  ├── 5.3  check errors
  ├── 5.4  debug build per-package
  └── 5.5  verify dist/ output

Step 6 (demo config)
  └── 6.1  utils/configs/src/g/gifs.ts
```

**Dependencies between steps:**
- Steps 1-3 can run in parallel (different package dirs)
- Step 4 requires Step 1 (package must exist for pnpm workspace resolution to work)
- Step 5 requires Steps 1-4
- Step 6 can run anytime after Step 3

---

## Cheat sheet: Exact changes by file

### New files (17)

| # | File | Sub-step |
|---|---|---|
| 1 | `shapes/gif/package.json` | 1.2 |
| 2 | `shapes/gif/package.dist.json` | 1.3 |
| 3 | `shapes/gif/.browserslistrc` | 1.4 |
| 4 | `shapes/gif/eslint.config.js` | 1.5 |
| 5 | `shapes/gif/rollup.config.js` | 1.6 |
| 6 | `shapes/gif/tsconfig.base.json` | 1.7 |
| 7 | `shapes/gif/tsconfig.json` | 1.7 |
| 8 | `shapes/gif/tsconfig.browser.json` | 1.7 |
| 9 | `shapes/gif/tsconfig.module.json` | 1.7 |
| 10 | `shapes/gif/tsconfig.types.json` | 1.7 |
| 11 | `shapes/gif/typedoc.json` | 1.8 |
| 12 | `shapes/gif/src/IGifShape.ts` | 1.9 |
| 13 | `shapes/gif/src/types.ts` | 1.10 |
| 14 | `shapes/gif/src/GifDrawer.ts` | 1.11 |
| 15 | `shapes/gif/src/index.ts` | 1.12 |
| 16 | `shapes/gif/src/index.lazy.ts` | 1.13 |
| 17 | `shapes/gif/src/browser.ts` | 1.14 |

### Copied files (10)

| File | From | To | Edit needed |
|---|---|---|---|
| `GifUtils/ByteStream.ts` | `shapes/image/src/GifUtils/` | `shapes/gif/src/GifUtils/` | No |
| `GifUtils/Constants.ts` | same | same | No |
| `GifUtils/Utils.ts` | same | same | **Yes** — 2.2, 2.3, 2.4 |
| `GifUtils/Enums/DisposalMethod.ts` | same | same | No |
| `GifUtils/Types/GIF.ts` | same | same | No |
| `GifUtils/Types/Frame.ts` | same | same | No |
| `GifUtils/Types/ApplicationExtension.ts` | same | same | No |
| `GifUtils/Types/GIFDataHeaders.ts` | same | same | No |
| `GifUtils/Types/GIFProgressCallbackFunction.ts` | same | same | No |
| `GifUtils/Types/PlainTextData.ts` | same | same | No |

### Modified files (10)

| File | Change | Sub-step |
|---|---|---|
| `shapes/image/src/Utils.ts` | Remove GIF import + 7 gif fields + 1 `gif:` in literal | 3.2 |
| `shapes/image/src/IImageShape.ts` | Remove `gif: boolean` | 3.3 |
| `shapes/image/src/Options/Classes/Preload.ts` | Remove `gif` property + `loadProperty("gif")` | 3.4 |
| `shapes/image/src/Options/Interfaces/IPreload.ts` | Remove `gif: boolean` | 3.5 |
| `shapes/image/src/ImageDrawer.ts` | Remove drawGif import, if-gif branch, gif fields in particleInit, gif in loadImageShape | 3.6 |
| `shapes/image/src/index.ts` | Remove loadGifImage import, gif literal field, if(data.gif) branch | 3.7 |
| `shapes/image/src/index.lazy.ts` | Same as index.ts | 3.8 |
| `bundles/all/package.json` | Add `@tsparticles/shape-gif` dependency | 4.1 |
| `bundles/all/src/index.ts` | Add import + loadGifShape call | 4.3 |
| `utils/configs/src/g/gifs.ts` | Change `type: "image"` + gif opts → `type: "gif"` | 6.1 |

### Deleted (1)

| Path | Sub-step |
|---|---|
| `shapes/image/src/GifUtils/` | 3.1 |

### No changes needed

| Reason | |
|---|---|
| `pnpm-workspace.yaml` | Already includes `shapes/*` |
| `bundles/all/src/bundle.ts` | Re-exports from `./index.js` |
| `bundles/all/src/browser.ts` | Re-exports from `./index.js` |
| `shapes/image/src/types.ts` | No GIF-specific types |
| `shapes/image/src/ImagePreloader.ts` | No GIF-specific code |
| `shapes/image/src/ImagePreloaderInstance.ts` | No GIF-specific code |
| `shapes/image/src/browser.ts` | No GIF-specific code |

---

## Testing

Run the demo server after implementation:

```bash
cd demo/vanilla && pnpm start
```

Navigate to the "Gifs" demo preset. Particles should render as animated GIFs using the new `type: "gif"` shape.
