=== tsParticles WP Block ===
Contributors:      matteobruni
Donate link:       https://github.com/sponsors/matteobruni
Tags:              block, particles, confetti, fireworks, animations, javascript, tsparticles, particles js, background, particle background, animated background, particlesjs
Requires at least: 5.9
Tested up to:      6.0
Stable tag:        2.5.3
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
- [Slack](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI)
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
- [Official tsParticles Slack](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI)
- [Official tsParticles Telegram](https://t.me/tsparticles)
- [Official tsParticles Reddit](https://www.reddit.com/r/tsParticles/)
- In this plugin support forum

== Screenshots ==

1. This screenshot shows the particles in the front end, using default values.
2. This screenshot shows the particles block in the editor.

== Upgrade Notice ==
Nothing to say

== Changelog ==

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
