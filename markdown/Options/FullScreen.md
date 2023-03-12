# Full Screen

- [`enable`](#enable)
- [`zIndex`](#zIndex)

## Enable

This property sets the canvas to a full window size acting like a background, the most common configuration. The default
value is `true`, so the canvas will be full screen acting like an animated background.

This is really helpful since there's no need to write CSS code to have a full size tsParticles instance.

## Z-Index

This is the CSS `z-index` property set to the canvas, the default value is `0`.

If the `z-index` is less than `0` the mouse interactions works only with the `interactivity.detectsOn` set to `window`.
