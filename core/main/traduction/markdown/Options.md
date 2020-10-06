# **_Opciones_**

| propiedad         | tipo        | ejemplo                                | notas                                                                                                                                                                                                  |
| ---------------- | ------------------ | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `background`     | `object`           |                                        | Ver las opciones del Fondo {@link IBackground | aquí}                                                                                                                                                      |
| `backgroundMask` | `object`           |                                        | Ver las opciones de Máscara del fondo {@link IBackgroundMask | aquí}                                                                                                                                             |
| `detectRetina`   | `boolean`          | `true` / `false`                       | reemplaza la antigua propiedad `retina_detect`                                                                                                                                                              |
| `fpsLimit`       | `number`           | `30`                                   | _por defecto es `30`_, reemplaza la antigua propiedad `fps_limit`                                                                                                                                              |
| `infection`      | `object`           |                                        | Ver las opciones de Infección {@link IInfection | aquí}                                                                                                                                                        |
| `interactivity`  | `object`           |                                        | Ver las opciones de Interactividad {@link IInteractivity | aquí}                                                                                                                                                |
| `particles`      | `object`           |                                        | Ver las opciones de Partículas {@link IParticles | aquí}                                                                                                                                                        |
| `pauseOnBlur`    | `boolean`          | `true` / `false`                       | pausa las animaciones cuando la página está en segundo plano                                                                                                                                                |
| `preset`         | `string` / `array` | `"basic"`<br /> `[ "basic", "60fps" ]` | Puede usar esta propiedad para cargar uno o más ajustes predefinidos para enfocar propiedades importantes y no toda la configuración. Puedes encontrar ajustes predefinidos en `npm` [here](https://www.npmjs.com/search?q=tsparticles-preset) |

## Plugins

Estas opciones no se usan en el archivo distribuido reducido

| property      | option type        | example | notes                                              |
| ------------- | ------------------ | ------- | -------------------------------------------------- |
| `absorbers`   | `object` / `array` |         | Ver las opciones del Absorbente {@link IAbsorber | aquí}     |
| `emitters`    | `object` / `array` |         | Ver las opciones del Emisor {@link IEmitter | aquí}        |
| `polygonMask` | `object`           |         | Ver las opciones de Partículas {@link IPolygonMask | aquí}  |
