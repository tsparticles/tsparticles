# **_Options_**

| property                 | option type        | example                                | notes                                                                                                                                                                                                  |
| ------------------------ | ------------------ | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `autoPlay`               | `boolean`          | `true` / `false`                       |                                                                                                                                                                                                        |
| `background`             | `object`           |                                        | See Background options {@link IBackground | here}                                                                                                                                                      |
| `backgroundMask`         | `object`           |                                        | See Background Mask options {@link IBackgroundMask | here}                                                                                                                                             |
| `detectRetina`           | `boolean`          | `true` / `false`                       | Replaces the old `retina_detect` property                                                                                                                                                              |
| `fpsLimit`               | `number`           | `30`                                   | _Defaults to `30`_, replaces the old `fps_limit` property                                                                                                                                              |
| `fullScreen`             | `object`           |                                        | See Full Screen options {@link IFullScreen | here}                                                                                                                                             |
| `infection`              | `object`           |                                        | See Infection options {@link IInfection | here}                                                                                                                                                        |
| `interactivity`          | `object`           |                                        | See Interactivity options {@link IInteractivity | here}                                                                                                                                                |
| `manualParticles`        | `array`            |                                        | An array of Manual Particles object. See Manual Particles documentation {@link IManualParticle | here}                                                                                                 |
| `motion`                 | `object`           |                                        | See Motion options {@link IMotion | here}                                                                                                                                                              |
| `particles`              | `object`           |                                        | See Particles options {@link IParticles | here}                                                                                                                                                        |
| `pauseOnBlur`            | `boolean`          | `true` / `false`                       | Pauses the animations when the page isn't on foreground                                                                                                                                                |
| `pauseOnOutsideViewport` | `boolean`          | `true` / `false`                       | Pauses the animations when the element is out of the viewport                                                                                                                                          |
| `preset`                 | `string` / `array` | `"basic"`<br /> `[ "basic", "60fps" ]` | You can use this property to load one or more presets for focusing on important properties and not all config. You can find presets on `npm` [here](https://www.npmjs.com/search?q=tsparticles-preset) |
| `themes`                 | `array`            |                                        | It's an array of Theme object, you can see the structure {@link ITheme | here }                                                                                                                        |

## Plugins

These options are not used by slim bundle

| property      | option type        | example | notes                                             |
| ------------- | ------------------ | ------- | ------------------------------------------------- |
| `absorbers`   | `object` / `array` |         | See Absorbers options {@link IAbsorber | here}    |
| `emitters`    | `object` / `array` |         | See Emitter options {@link IEmitter | here}       |
| `polygonMask` | `object`           |         | See Particles options {@link IPolygonMask | here} |
