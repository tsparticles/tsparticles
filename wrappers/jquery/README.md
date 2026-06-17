[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# @tsparticles/jquery

[![npm](https://img.shields.io/npm/v/@tsparticles/jquery)](https://www.npmjs.com/package/@tsparticles/jquery) [![npm](https://img.shields.io/npm/dm/@tsparticles/jquery)](https://www.npmjs.com/package/@tsparticles/jquery) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

Official [tsParticles](https://github.com/matteobruni/tsparticles) jQuery plugin

[![Slack](https://particles.js.org/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI) [![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_source=badge-tsparticles) <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Installation

```shell
$ npm install @tsparticles/jquery
```

or

```shell
$ yarn add @tsparticles/jquery
```

or from jsDelivr

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@tsparticles/jquery/badge)](https://www.jsdelivr.com/package/npm/@tsparticles/jquery)

```html
<!-- first include any tsParticles plugin needed -->
<script src="https://cdn.jsdelivr.net/npm/tsparticles/tsparticles.bundle.min.js"></script>

<!-- then include jquery wrapper -->
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/jquery"></script>
```

## How to use

The jQuery wrapper exposes a single static API surface for engine initialization
and a jQuery plugin for loading containers.

Include the scripts (UMD)

```html
<div id="tsparticles"></div>

<!-- tsParticles engine bundle -->
<script src="https://cdn.jsdelivr.net/npm/tsparticles/tsparticles.bundle.min.js"></script>

<!-- jQuery -->
<script src="https://cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js"></script>

<!-- jQuery wrapper -->
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/jquery/dist/jquery.particles.js"></script>
```

Usage

```javascript
// Initialize the engine and register any plugins/presets.
// This must be called once before using the jQuery plugin. Many apps
// will want to load the full plugin bundle; `loadFull` is commonly used
// for that purpose. If you use `loadFull`, make sure the `tsparticles`
// package is available (via npm or CDN) so the function can be imported.
$.particles.init(async engine => {
  // register plugins (for example `loadFull`), if needed
  // Example (dynamic import):
  // const mod = await import('tsparticles').catch(() => null);
  // if (mod && typeof mod.loadFull === 'function') {
  //   await mod.loadFull(engine);
  // }
  // Or, if `loadFull` is exposed globally via a bundle:
  // if (typeof loadFull === 'function') {
  //   await loadFull(engine);
  // }
});

// Load particles into an element using the jQuery plugin and return a Promise
// that resolves to the container.
$("#tsparticles")
  .particles()
  .load({
    particles: {
      number: { value: 80 },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
    },
    interactivity: {
      events: { onhover: { enable: true, mode: "repulse" } },
    },
  })
  .then(container => {
    // container ready
  });

// Or load from a JSON URL
$("#tsparticles")
  .particles()
  .ajax("/particles.json")
  .then(container => {
    // container ready
  });

// Change the active theme at runtime (requires @tsparticles/plugin-themes)
$("#tsparticles")
  .particles()
  .setTheme("dark")
  .then(() => {
    // theme applied
  });
```

Notes

- The only required initialization entrypoint for the browser UMD bundle is
  `$.particles.init(callback)`. The `callback` receives the tsParticles
  `engine` and is where you should register plugins/presets.
- Use the jQuery plugin methods `.load(options)` and `.ajax(url)` to mount
  containers on selected elements. These methods return a Promise that
  resolves with the Container instance.
- Use `.setTheme(name)` to switch the active theme at runtime. This method
  requires the `@tsparticles/plugin-themes` package to be registered. If the
  theme plugin is not loaded, the call is safely ignored.
- Calling `.load(options)` or `.ajax(url)` again on the same element replaces
  the previous container — the old one is destroyed automatically.
- Each method returns a Promise that resolves with the `Container` instance
  (or `undefined` if initialization failed).
- Containers are tracked per element via `WeakMap`. When the DOM element is
  removed, the associated container is not automatically destroyed — call
  `.load({})` with an empty config or destroy the container manually via the
  returned Promise.

## Demos

The demo website is [here](https://particles.js.org)

<https://particles.js.org>

There's also a CodePen collection actively maintained and updated [here](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
