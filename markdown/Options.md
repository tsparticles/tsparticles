# **_Options_**

| property                 | option type          | example                                   | notes                                                                                                                                                                                                  |
|--------------------------|----------------------|-------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `autoPlay`               | `boolean`            | `true` / `false`                          |                                                                                                                                                                                                        |
| `background`             | `object`             |                                           | See Background options here {@link IBackground}                                                                                                                                                        |
| `backgroundMask`         | `object`             |                                           | See Background Mask options here {@link IBackgroundMask}                                                                                                                                               |
| `detectRetina`           | `boolean`            | `true` / `false`                          | Replaces the old `retina_detect` property                                                                                                                                                              |
| `duration`               | `number` / `range`   | `60` / `{ min: 30, max: 90 }`             | The particles effect duration in seconds                                                                                                                                                               |
| `fpsLimit`               | `number`             | `60`                                      | _Defaults to `60`_, replaces the old `fps_limit` property                                                                                                                                              |
| `fullScreen`             | `object` / `boolean` | {@link IFullScreen} or `true` / `false`   | See Full Screen options here {@link IFullScreen}                                                                                                                                                       |
| `interactivity`          | `object`             |                                           | See Interactivity options here {@link IInteractivity}                                                                                                                                                  |
| `manualParticles`        | `array`              |                                           | An array of Manual Particles object. See Manual Particles documentation here {@link IManualParticle }                                                                                                  |
| `motion`                 | `object`             |                                           | See Motion options here {@link IMotion here}                                                                                                                                                           |
| `particles`              | `object`             |                                           | See Particles options here {@link IParticlesOptions}                                                                                                                                                   |
| `pauseOnBlur`            | `boolean`            | `true` / `false`                          | Pauses the animations when the page isn't on foreground                                                                                                                                                |
| `pauseOnOutsideViewport` | `boolean`            | `true` / `false`                          | Pauses the animations when the element is out of the viewport                                                                                                                                          |
| `preset`                 | `string` / `array`   | `"basic"`<br /> `[ "links", "confetti" ]` | You can use this property to load one or more presets for focusing on important properties and not all config. You can find presets on `npm` [here](https://www.npmjs.com/search?q=tsparticles-preset) |
| `responsive`             | `array`              |                                           | See Responsive options here {@link IResponsive}                                                                                                                                                        |
| `themes`                 | `array`              |                                           | It's an array of Theme object, you can see the structure here {@link ITheme}                                                                                                                           |

## Plugins

These options are not part of the slim bundle

| property      | option type        | example | notes                                           |
|---------------|--------------------|---------|-------------------------------------------------|
| `absorbers`   | `object` / `array` |         | See Absorbers options here {@link IAbsorber}    |
| `emitters`    | `object` / `array` |         | See Emitter options here {@link IEmitter}       |
| `polygonMask` | `object`           |         | See Particles options here {@link IPolygonMask} |
