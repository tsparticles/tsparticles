# Migrate canvas and rendering options to v5

## Positive depth ranges

`zLayers` must be a finite positive number. Loading `0`, a negative value, `NaN`
or either infinity now throws `RangeError` before render layers are allocated.
The default remains `100`; positive fractional values retain their existing
behavior.

Use `zLayers: 1` for a single depth bucket instead of `zLayers: 0`. If the value
comes from external data, validate it before loading the options:

```ts
const zLayers = Number.isFinite(inputDepth) && inputDepth > 0 ? inputDepth : 100;
```

## Canvas ownership and workers

Keep the supplied canvas as the presentation surface. A DOM canvas transfers to
OffscreenCanvas once and can be reused after its previous container is destroyed;
two active containers cannot own the same surface. HDR capability changes retain
the supplied surface and report the effective context color space and precision.

For an explicit OffscreenCanvas in a worker, disable DOM layout and device-pixel
ratio detection with `fullScreen: false` and `detectRetina: false`. Interactivity
startup and teardown now tolerate missing `document` and `HTMLElement`. DOM image
export continues to use the DOM canvas; the image export plugin still returns no
blob for an explicit OffscreenCanvas.

## Custom drawing extensions

Renderer hook order remains unchanged. `IContainerPlugin.layer` documents a
plugin's primary role; implemented hook methods determine its layer membership.
Clear hooks remain live, including changes after initialization, with dedicated
clear hooks taking precedence over layer fallback hooks.

Nested particle draws preserve the outer draw's styles and transform. If an
image or shape draw throws, alpha or the particle transform is restored before
the error propagates. Destroyed renderers release their context: retain the new
container's renderer when a canvas is reused.
