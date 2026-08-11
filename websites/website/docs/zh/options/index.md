# Options Reference

`tsParticles` options are deep, so this page is a practical map before you dive into every sub-option.

## Choose your configuration path

- **Fast visual result**: start from a preset and override key fields.
- **Full control**: define `particles`, `interactivity`, and `background` manually.
- **Config-first workflow**: start from `@tsparticles/configs` and iterate safely.

## Quick docs (local)

- [`Background & Canvas`](/options/background)
- [`Background Mask`](/options/background-mask)
- [`Full Screen`](/options/fullscreen)
- [`Motion`](/options/motion)
- [`Manual Particles`](/options/manual-particles)
- [`Themes`](/options/themes)
- [`Particles`](/options/particles)
- [`Particles Number`](/options/particles-number)
- [`Particles Move`](/options/particles-move)
- [`Particles Links`](/options/particles-links)
- [`Particles Palette`](/options/particles-palette)
- [`Particles Shape`](/options/particles-shape)
- [`Particles Collisions`](/options/particles-collisions)
- [`Particles Life`](/options/particles-life)
- [`Particles Orbit`](/options/particles-orbit)
- [`Particles Roll`](/options/particles-roll)
- [`Particles Rotate`](/options/particles-rotate)
- [`Interactivity`](/options/interactivity)
- [`Interactivity Click`](/options/interactivity-click)
- [`Interactivity Hover`](/options/interactivity-hover)
- [`Interactivity Div`](/options/interactivity-div)
- [`Interactivity Events`](/options/interactivity-events)
- [`Interactivity Modes`](/options/interactivity-modes)
- [`Plugin: Absorbers`](/options/plugin-absorbers)
- [`Plugin: Background Mask`](/options/plugin-background-mask)
- [`Plugin: Blend`](/options/plugin-blend)
- [`Plugin: Canvas Mask`](/options/plugin-canvas-mask)
- [`Plugin: Colors`](/options/plugin-colors)
- [`Plugin: Easings`](/options/plugin-easings)
- [`Plugin: Effects`](/options/plugin-effects)
- [`Plugin: Emitter Shapes`](/options/plugin-emitter-shapes)
- [`Plugin: Emitters`](/options/plugin-emitters)
- [`Plugin: Exports`](/options/plugin-exports)
- [`Plugin: Infection`](/options/plugin-infection)
- [`Plugin: Interactions`](/options/plugin-interactions)
- [`Plugin: Motion`](/options/plugin-motion)
- [`Plugin: Path Generators`](/options/plugin-path-generators)
- [`Plugin: Poisson`](/options/plugin-poisson)
- [`Plugin: Polygon Mask`](/options/plugin-polygon-mask)
- [`Plugin: Responsive`](/options/plugin-responsive)
- [`Plugin: Shapes`](/options/plugin-shapes)
- [`Plugin: Sounds`](/options/plugin-sounds)
- [`Plugin: Themes`](/options/plugin-themes)
- [`Plugin: Trail`](/options/plugin-trail)
- [`Plugin: Updaters`](/options/plugin-updaters)
- [`Plugin: Zoom`](/options/plugin-zoom)
- [`Performance Guide`](/options/performance)

## Particle deep-dive pages

- [`Particles Bounce`](/options/particles-bounce)
- [`Particles Color`](/options/particles-color)
- [`Particles Destroy`](/options/particles-destroy)
- [`Particles Group`](/options/particles-group)
- [`Particles Opacity`](/options/particles-opacity)
- [`Particles Palette`](/options/particles-palette)
- [`Particles Repulse`](/options/particles-repulse)
- [`Particles Shadow`](/options/particles-shadow)
- [`Particles Size`](/options/particles-size)
- [`Particles Stroke`](/options/particles-stroke)
- [`Particles Tilt`](/options/particles-tilt)
- [`Particles Twinkle`](/options/particles-twinkle)
- [`Particles Wobble`](/options/particles-wobble)
- [`Particles ZIndex`](/options/particles-zindex)

## Where the source of truth lives

- Main options docs: [`tsparticles/markdown/Options.md`](https://github.com/tsparticles/tsparticles/blob/main/markdown/Options.md)
- Detailed option pages: [`tsparticles/markdown/Options/`](https://github.com/tsparticles/tsparticles/tree/main/markdown/Options)
- Type interfaces: [`tsparticles/engine/src/Options/Interfaces`](https://github.com/tsparticles/tsparticles/tree/main/engine/src/Options/Interfaces)

## Most-used root options

- `background`
- `fullScreen`
- `interactivity`
- `particles`
- `detectRetina`
- `preset`
- `responsive`

## Most-used sections

- `background`: canvas background and masking basics.
- `particles.number`: quantity and density.
- `particles.move`: movement speed, direction, and out modes.
- `particles.shape`: circle, polygon, image, emoji, custom.
- `particles.palette`: quickly swap coordinated color sets.
- `interactivity`: hover/click modes and external effects.
- `detectRetina`: quality/perf tradeoff on high-DPI screens.

## Particles map (nested view)

Use this quick tree as a navigation aid before opening single pages:

```text
particles
|- number
|- color
|- shape
|- size
|- opacity
|- move
|- links
|- collisions
|- life
|- destroy
|- group
|- orbit
|- repulse
|- roll
|- rotate
|- shadow
|- stroke
|- tilt
|- twinkle
|- wobble
|- zIndex
`- palette
```

Open root docs first, then deep-dive sections:

- Root: [`Particles`](/options/particles)
- Deep dives: [`Particles Number`](/options/particles-number), [`Particles Move`](/options/particles-move), [`Particles Links`](/options/particles-links)

## Safe options workflow

1. Start with a working config from demos or presets.
2. Change one section at a time.
3. Validate with TypeScript (`IOptions`) in app code.
4. Keep production options in dedicated JSON files.

## Minimal typed example

```ts
import type { ISourceOptions } from "@tsparticles/engine";

export const particlesOptions: ISourceOptions = {
  fpsLimit: 60,
  particles: {
    number: { value: 70 },
    move: { enable: true, speed: 1.5 },
  },
};
```

## Performance guardrails

- Prefer `@tsparticles/slim` unless you need advanced plugins.
- Keep particle counts proportional to container area.
- Profile with real devices before adding heavy interactions.

## Related references

- Config package docs: <https://github.com/tsparticles/tsparticles/blob/main/utils/configs/README.md>
- Presets folder: <https://github.com/tsparticles/tsparticles/tree/main/presets>
- Palettes folder: <https://github.com/tsparticles/tsparticles/tree/main/palettes>

For full details on every sub-option, also use the source pages in `tsparticles/markdown/Options` linked above.
