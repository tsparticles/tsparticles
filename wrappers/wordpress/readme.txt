=== tsParticles WP Block ===
Contributors:      matteobruni
Donate link:       https://github.com/sponsors/matteobruni
Tags:              block, particles, confetti, fireworks, animations, javascript, tsparticles, particles js, background, particle background, animated background, particlesjs
Requires at least: 5.9
Tested up to:      6.1
Stable tag:        3.0.0
Requires PHP:      7.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Example block scaffolded with Create Block tool.

== Description ==

Official tsParticles WordPress Plugin

Easily create highly customizable particle, confetti and fireworks animations and use them as animated backgrounds for your website.
Ready to use components available also for Web Components, Vue.js (2.x and 3.x), Angular, Svelte, jQuery, Preact, React, Riot.js, Solid.js, Inferno.

Official tsParticles website with options editor: <https://particles.js.org>

Official Social Channels:

- [GitHub](https://github.com/matteobruni/tsparticles)
- [Discord](https://discord.gg/hACwv45Hme)
- [Telegram](https://t.me/tsparticles)
- [Reddit](https://www.reddit.com/r/tsParticles/)
- [Twitter](https://www.twitter.com/r/tsParticles/)

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/wordpress-particles` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress

== Frequently Asked Questions ==

= Where can I find particles options?

Go to the official tsParticles website <https://particles.js.org> and export options using the editor.

= Where can I ask for support?

There are some ways to ask for support:

- [Official tsParticles GitHub](https://github.com/matteobruni/tsparticles)
- [Official tsParticles Discord](https://discord.gg/hACwv45Hme)
- [Official tsParticles Telegram](https://t.me/tsparticles)
- [Official tsParticles Reddit](https://www.reddit.com/r/tsParticles/)
- In this plugin support forum

== Screenshots ==

1. This screenshot shows the particles in the front end, using default values.
2. This screenshot shows the particles block in the editor.

== Upgrade Notice ==
Nothing to say

== Changelog ==

= 3.0.0

## BREAKING CHANGES

- Removed all tsParticles `load` methods to keep only a single one using a single `object` parameter
- Removed support for shape deprecated properties like `shape.image`, `shape.polygon`, `shape.stroke`
    - the stroke property can be found in the `particles section`, not in the `shape` object
    - the image and polygon properties, like any other shape, are part of the `shape.options` object
- Stroke now is a single object only like all the other particles properties
- Removed multiline text shape, the text shape now supports that
- Simplified some functions, using objects or removing unused overloads, this is breaking for v2 shapes
- Moved some properties to private since they were public by mistake (this shouldn't affect many, the properties were mainly used in the engine)
- Removed obsolete random properties in options objects
- Removed emitters shapes from the plugin files, every emitters shape now has a dedicated package

### Major Changes

- All the components for Front End frameworks were removed from this repository, each one now has its own repository. This is mainly for maintainability. It's easier to support multiple Front End frameworks versions in a dedicated repository instead of a multipurpose monorepository. Vue.js 2.x and 3.x were kept split because they have many differences.
    - Angular (`@tsparticles/angular`): https://github.com/tsparticles/angular (v3 under development)
    - Astro (`@tsparticles/astro`): https://github.com/tsparticles/astro (v3 under development)
    - Ember (`@tsparticles/ember`): https://github.com/tsparticles/ember (v3 under development)
    - Inferno (`@tsparticles/inferno`): https://github.com/tsparticles/inferno (v3 under development)
    - jQuery (`@tsparticles/jquery`): https://github.com/tsparticles/jquery (v3 under development)
    - Lit (`@tsparticles/lit`): https://github.com/tsparticles/lit (v3 under development)
    - Preact (`@tsparticles/preact`): https://github.com/tsparticles/preact (v3 under development)
    - React (`@tsparticles/react`): https://github.com/tsparticles/react (v3 under development)
    - Riot (`@tsparticles/riot`): https://github.com/tsparticles/riot (v3 under development)
    - Solid (`@tsparticles/solid`): https://github.com/tsparticles/solid (v3 under development)
    - Svelte (`@tsparticles/svelte`): https://github.com/tsparticles/svelte (v3 under development)
    - Vue.js (`@tsparticles/vue`): https://github.com/tsparticles/vue (v3 under development)
    - Web Components (`@tsparticles/webcomponents`): https://github.com/tsparticles/webcomponents (v3 under development)
    - WordPress (`@tsparticles/wordpress`): https://github.com/tsparticles/wordpress (v3 under development)
- Removed all presets from this repository for a single one (<https://github.com/tsparticles/presets>) in the @tsparticles organization, this will make easier to contribute to specific presets or create new ones. (Renaming them to `@tsparticles/preset-<name>` #3977)
- All the previous packages will be deprecated when v3 will come out. Using only the new naming system is the main focus of v3. All the official packages will have `@tsparticles/` organization in the package name, replacing `tsparticles-` prefix, except for `tsparticles` package which will remain the same.
- Moved editor to its own repository: https://github.com/tsparticles/editor
- Pjs package now supports all the legacy pjs options only. This will make this package a wrapper for old pjs users. You can't use tsParticles options in pjs calls.
- Pjs package is no longer part of `@tsparticles/slim` bundle, only included in `@tsparticles/all`.
- Text shape is no longer part of `@tsparticles/slim` bundle, included in `tsparticles`.
- Emoji shape is now part of `@tsparticles/slim` bundle.

### Bug Fixes

- Fixed bug when using particles groups
- Fixed pool on particles destroyed by updaters
- Fixed out modes, bounce was not checking the direction of the update request
- Fixed issue with change theme when an existing canvas is used
- Fixed updates on particles destroyed by updaters, that section wasn't using the memory pool for reusing old particles instead of creating new ones.
- Fixed memory leak in destroyed particles by updaters, the z array wasn't filtered, thanks to @longnguyen2004, closes #5101
- Fixed light interaction, particle shadow wasn't calculated correctly
- Improved resize event and density formula
- Fixed trails config
- Fixed flat output in [@tsparticles/confetti](https://npmjs.com/package/@tsparticles/confetti)
- Improved sounds plugin
- Fixed position in emitters after respawn

### New Features

- Added new EventType particleDestroyed
- Replaced text shape with emoji shape in [@tsparticles/confetti](https://npmjs.com/package/@tsparticles/confetti)
- Reworked [@tsparticles/fireworks](https://npmjs.com/package/@tsparticles/fireworks) a bit for better output with the new v3 trails
- Added range values to life duration and delay of emitters
- Added two new bundles
    - `@tsparticles/basic`: minimum plugins for having circular dots moving in the canvas, common package for all bundles, and presets after this is released. Packages included:
        - `@tsparticles/engine`
        - `@tsparticles/move-base`
        - `@tsparticles/shape-circle`
        - `@tsparticles/updater-color`
        - `@tsparticles/updater-opacity`
        - `@tsparticles/updater-out-modes`
        - `@tsparticles/updater-size`
    - `@tsparticles/all`: a package that includes all the plugins, it's not a best practice to use this, but the easiest way for trying every feature available for sure. It will be used mainly in the [website](https://github.com/tsparticles/website).
- Added event on config added to the engine
- Added flat options to @tsparticles/confetti options
- Creating support for effects, like bubble that wasn't a real shape
- Added linear easing
- Created new emitters shapes: Canvas, Path and Polygon
- Created trail effect plugin, this one is a real trail drawn in the canvas, it works also in transparent backgrounds. It requires more resources since it's drawn calculating last N positions and not redrawing a semi-transparent canvas on itself, supports also fade.
- Added pop click interaction
- Added limit mode (breaking changes on limit options)
- Added possibility to replace color and opacity for emitters shapes
- Added more options for customizing noises values (only Simplex and Perlin paths)
- Added curl noise path plugin
- Created Simplex and Perlin noise packages from their path plugins, they can be used in multiple packages without duplication (Curl Noise path for example)
- Added new emoji shape, better performance than text shape
- Added clear flag to the root object, enabled by default, if disabled, the canvas won't be cleared

= 2.11.0

## Bug Fixes

- Removed console log, closes #5003
- Fixed getPositionOrSize function
- Fixed some shapes

## New Features

- Added refresh flag for loading plugins, this will prevent multiple refresh of the instance
- Added animated gif support to image drawer (use it with caution, gifs are heavy)
- Added setLogger and getLogger functions, this will prevent `console.log` mistakenly left in the code.
- Added export plugins, previous export functions were removed (barely used), and a 3 new plugins are available. The available exports plugin are: Image, JSON, Video. The first two were already present, the third one is new.
- Added new rounded polygon shape

## Other Changes

- Removed fallbacks for requestAnimationFrame, they're useless.
- Added tree shaking capabilities
- Added ESLint `no-console` rule, to avoid other issues likes #5003, `getLogger` must be used when needed some logs.

### How do `setLogger` and `getLogger` functions work?

If you want to customize the log of `tsParticles` you can call `setLogger(logger)` function, passing a `ILogger` object.

The `setLogger` function prevents `undefined` properties assigning the default one.

```ts
setLogger({
    debug: console.debug,
    error: console.error,
    info: console.info,
    log: console.log,
    verbose: console.log,
    warning: console.warn,
});
```

This assigns all the log functions console functions, but you can use empty functions (`() => {}`) to disable every function.

If there's a `console.log` left like in #3552, #3528 or #5003, you can disable the `log` property of the `setLogger` parameter to get rid of it, so you don't have to wait the next release.

The `getLogger` function, returns the object set using `setLogger`, every plugin *MUST* use `getLogger()` for logging things, so mistakes can be fixed easily, even errors can be muted or redirected to your favorite logging platform.

If you want to log something use this code:

```ts
getLogger().log("tsParticles is awesome");
```

= 2.10.0

## New Features

- Added max speed value to collisions options
- Added range values to spiral shape options, added `widthFactor` value
- Added new arrow shape
- Added new cog shape
- Added mode to more coordinates options
- Added error prefix to standardize error messages
- Added image preload and name to shape options. Preload an image with a name, so it can be retrieved using only that in the options.
- Added compatibility with another old particles.js library (deprecated but some samples can be found around)
- Added new path plugin, using svg paths as a source
- Added delta to path generators
- Added delay options to particles values animations (`opacity`, `size`, `color`, `stroke`), closes #4985

## Bug Fixes

- Fixed typo in fireworks bundle exported types
- Fixed presets without particles count
- Improved container reset
- Fixed window resize fired during the initialization
- Improved spiral shape
- Fixed `ICoordinates` types
- Fixed some load functions that weren't async
- Fixed some shapes particle init

## Other Changes

- Improved image shape
- Changed despawn confetti action using opacity animation, was life duration, closes #4978
- All the components for Front End frameworks were removed from this repository, each one now has its own repository. This is mainly for maintainability. It's easier to support multiple Front End frameworks versions in a dedicated repository instead of a multipurpose monorepository. Vue.js 2.x and 3.x were kept split because they have many differences.
    - Angular (`ng-particles`): https://github.com/tsparticles/angular
    - Astro (`astro-particles`): https://github.com/tsparticles/astro
    - Ember (`ember-tsparticles`): https://github.com/tsparticles/ember
    - Inferno (`inferno-particles`): https://github.com/tsparticles/inferno
    - jQuery (`jquery-particles`): https://github.com/tsparticles/jquery
    - Lit (`lit-tsparticles`): https://github.com/tsparticles/lit *(WIP)*
    - Preact (`preact-particles`): https://github.com/tsparticles/preact
    - React (`react-particles`): https://github.com/tsparticles/react
    - Riot (`riot-particles`): https://github.com/tsparticles/riot
    - Solid (`solid-particles`): https://github.com/tsparticles/solid
    - Stencil (`stencil-particles): https://github.com/tsparticles/stencil *(WIP)*
    - Svelte (`svelte-particles`): https://github.com/tsparticles/svelte
    - Vue.js 2.x (`vue2-particles`): https://github.com/tsparticles/vue2
    - Vue.js 3.x (`vue3-particles`): https://github.com/tsparticles/vue3
    - Web Components (`web-particles`): https://github.com/tsparticles/webcomponents
    - WordPress (`wordpress-particles`): https://github.com/tsparticles/wordpress
- Removed all presets from this repository for a single one (<https://github.com/tsparticles/presets>) in the @tsparticles organization, this will make easier to contribute to specific presets or create new ones.
- Added global variables to window object, so they are always accessible
- Migrating output to ES2021, it's widely used and supported

= 2.9.3

## Bug Fixes

- Fixed some plugins, they weren't loading correctly the options

= 2.9.2

## Bug Fixes

- Added missing shapes to confetti bundle
- Fixed issue with emitters plugin that spawned an unwanted emitters, fixes #4905

= 2.9.1

## Bug Fixes

- Fixed missing plugins in wordpress component
- Fixed confetti bundle package.json
- Fixed confetti.create function in confetti bundle

= 2.9.0

## New Features

- Creating confetti bundle, easier confetti animations usage. Removed `confetti` function from the preset, this bundle replaces this feature.
- Creating fireworks bundle, easier fireworks animations usage.

## Minor Changes

- Added version to the `Engine` object.
- Added `color` and `colorOffset` properties to `split` options.
- Changed default particles `number` value to `0`, the previous default value was meaningless. You must specify a number now, it's easier to implement `emitters` plugin since you can declare just the `emitters` property without specifying `0` particles. If you need any number, you declare it ignoring the default value.

= 2.8.0

## New Features

- Reworked move.trail options, created a `fill` property that is an object with color and image, closes #4882

## Bug Fixes

- Fixed polygon mask position issues
- Fixed polygon mask scaling issues

= 2.7.1

## New features

- Added loop options to sounds audio values
- Added volume buttons to sounds plugin

## Other Changes

- Moved out some plugin specific code from the engine to the dedicated plugin

= 2.7.0 =

## Bug Fixes

- Fixed issue with animation random size, multiplying again the pixel ratio
- Added missing export `EventType`
- Fixed Engine package exports

## New Features

- Added shape options to circle, added range (min/max object) values to polygon and star shape options
- Changed default file for slim and full bundles, using the bundled file
- Added support for multiple shape drawers declared at once instead of adding a shape drawer multiple times
- Added ranged values in stroke width and opacity properties
- Added loops count to color animations
- Improved density values, now is 1:1 with number on 1080p resolution with pixel ratio of 1 (this is not a breaking change since nothing breaks, but it changes the behavior of existing values)
- Density values now has width/height values instead of area/factor, for compatibility reason `width` is mapped to `area` and `height` to `factor`.
- Created sounds plugin, with mute/unmute icons
- Added explosion sounds to fireworks preset

---

## Circle Options

In `particle.shape` now it's possible to set another option to the `circle` shape, `angle`. The new property accepts a `number` or a `{ min: number; max: number }` object, when only `number` it's going to be `{ min: 0, max: <value> }`.

This creates partial circles starting from `min` to `max`, both values must be specified in degrees. If this value is ignored the default value is: `{ min: 0, max: 360 }` (the full circle).

### Examples

```
...
  shape: {
    type: "circle",
    options: {
      circle: {
        angle: 180
      }
    }
  }
...
```

This examples creates horizontal half circles

```
...
  shape: {
    type: "circle",
    options: {
      circle: {
        angle: { min: 90, max: 270 }
      }
    }
  }
...
```

This examples creates vertical half circles

## Density options

The density options are changed a bit, instead of `area`/`factor` values, the `width`/`height` values are introduced and mapped respectively. The default values are changed to `width` `1920` and `height` `1080`, so on a FullHD resolution on device pixel ratio `1` the particles number is the one specified in the options. Since `width` and `height` are multiplied together, they can be swapped and nothing changes.

The formula for the density is:

(canvasWidth * canvasHeight) / (densityWidth * densityHeight * devicePixelRatio^2)

### Notes on existing configurations

Since many configs had a `density.area` value of `800`, you'll see less particles, just a few less. If you have also a `factor` value, you won't notice any difference. When only `area` is set, if you want to keep the previous configuration, set `factor` to `1000`. Since the default `factor` (`height`) value is `1080` now, the difference should be barely noticeable.

= 2.6.0 =

## Bug Fixes

- Improved angular component id management
- Fixed multiline text shape (and relative demo)
- Fixed issues with links colors and themes, fixes #4841

## New Features

- Added new resize object to interactivity options, can change the debounce delay, fixes #4803
- WordPress plugin is now localizable, closes #4807

## Other Changes

- Fixed dependencies charts on README files, closes #4763
- Added reset to path generators, this fixes issues with sea anemone and polygon path plugins

= 2.5.4 =

## New Features

- Added localization support

= 2.5.3 =

## Bug Fixes

- Fixed issue with reduce duplicates flag, fixes #4805

= 2.5.1 =

## Bug Fixes

- Fixed issue with ES modules

= 2.4.0 =

## New Features

- Added `reset` method to updaters, this method will be called after a particle loses a life.
- Created the motion plugin for handling motion sickness, I moved this feature from the engine to a plugin since I prefer to have it more customizable. Everyone now can create their own motion sickness plugin, instead of having a standard behavior for everyone
- Added mutation observer to avoid style changes to the canvas when the `fullScreen` option is enabled (default behavior)
- Moved all easing functions to plugin packages, slim now depends on easing-quad since it's the default value used in repulse and attract
- Added support for multiline text in canvas mask text options, separator and spacing are customizable values
- Added `aria-hidden="true"` to canvas element, fixes #4785
- Removed all canvas context save/restore calls, this should be a huge improvement to general performances
- Added the particles pool for reusing destroyed particles, every tsParticles instance will have its own pool
- Changed collision absorb code, added `absorb.speed` option to `collisions` section
- Added delay to root options, fixes #4766

## Bug Fixes

- Fixed infection plugin
- Fixed issue with polygon mask when particles bounce on the polygon edges
- Fixed issue with `rgb()`, `hsl()` and `hsv()` values in color option values

## Other Changes

- Refactored plugins to avoid passing options in init functions since it's no more necessary
- Removed `initAsync` function from plugins, standard `init` is now async for all plugins
- Removed polygon mask plugin from the `tsparticles` package, this is a breaking change only for those that are using it. Since it's a heavy plugin and not so much used, I have preferred removing it from the `tsparticles` package.
- Changed tsconfig target from es6 to es2019 (less transpilation to a reasonable target). The compatibility is still very high, reducing the bundle size.

= 2.3.5 =

## Bug Fixes

- Fixed issue when loading Absorbers and Emitters options

= 2.3.4 =

## Bug Fixes

- Handling "mid" value in links color value
- Fixed links id generation algorithm, it could improve links performances

## Other Changes

- Moved some specific code to correct plugins

= 2.3.3 =

## Release

= 2.3.1 =

## Release
