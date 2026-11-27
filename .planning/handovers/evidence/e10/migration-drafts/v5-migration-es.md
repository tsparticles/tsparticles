# Guía de migración a v5 — borrador E10

Estado: borrador E10 actualizado el 2026-11-27. Las comprobaciones E9 de
paquetes instalados y navegador han pasado para el candidato actual. Esta guía
describe los contratos v5 implementados para el engine, los wrappers, los
bundles y los colores. Los límites de tamaño E0 siguen visibles como referencias
de diagnóstico según el criterio E10 actualizado; no se presentan como
superados. El seguimiento del renderer sin callback supera las 30 comprobaciones
de runtime E0, incluidas las filas con HDR forzado. En M4/500, update y render
están dentro de los límites E0; el p95 del frame es 7,20 ms, 0,05 ms por encima
de la referencia histórica E5. Siguen pendientes la comprobación de HDR en
hardware y las revisiones documentales requeridas.

El ejemplo TypeScript generado por MCP y los 20 scaffolds CLI (Vanilla y 19
frameworks) superan la comprobación de tipos, la compilación de producción y el
inicio en Chrome sin errores de página ni de consola. Las nueve familias de
templates empaquetadas excluyen las variantes retiradas de Vue 2, Nuxt 2 y Nuxt 3. Siguen pendientes la revisión lingüística de los nueve borradores y la comprobación de
HDR/navegador en hardware. Este es un borrador interno, no la guía de migración
definitiva para el lanzamiento.

Las guías Vanilla predeterminadas y localizadas del sitio actual son copias
idénticas y apuntan a los paquetes CDN v4 publicados. Los ejemplos con singleton
se conservan como documentación v4 hasta que se publique la página de migración
v5; no cuentan como comprobaciones de consumidores v5.

## Propiedad del engine

Sustituye las importaciones del singleton `tsParticles` por `createEngine()`.
Conserva la instancia devuelta en el ámbito de la aplicación, pásala a cada
loader y proporciónala explícitamente a los wrappers y providers. Una variable
local puede seguir llamándose `tsParticles`. El teardown de un componente se
encarga de su container; no debe destruir containers no relacionados que usen
el mismo engine.

La personalización de random/logger y la programación de animaciones pertenecen
a cada instancia desde la implementación E2. Registra los plugins personalizados
en `container.engine` (o `container.pluginManager.engine`) para que los
servicios runtime sigan al engine propietario.

## Integraciones de frameworks retiradas

| Integración                                   | Destino de la migración                | Eliminación / verificación     |
| --------------------------------------------- | -------------------------------------- | ------------------------------ |
| Wrapper, demo y referencias starter de Vue 2  | Migrar a Vue 3 y `@tsparticles/vue3`   | Retirado en E1; revisado en E9 |
| Wrapper, demo y referencias starter de Nuxt 2 | Migrar a Nuxt 4 y `@tsparticles/nuxt4` | Retirado en E1; revisado en E9 |
| Wrapper, demo y referencias starter de Nuxt 3 | Migrar a Nuxt 4 y `@tsparticles/nuxt4` | Retirado en E1; revisado en E9 |

Las actualizaciones de framework son migraciones de aplicación, no simples
renombrados de paquetes. La búsqueda de referencias E0 está en
`../../e0/retirement-references.txt`; al retirar integraciones revisa
instaladores, cadenas generadas, documentación y traducciones. La matriz también
incluye consumidores mantenidos que deben usar engines explícitos.

## API obsoletas

Se ha eliminado `colorMix()`, que devolvía RGB. También se eliminaron los
helpers obsoletos del engine `getStyleFromRgb()` y `getStyleFromHsl()`,
`getStyleFromHsv()` del plugin HSV y el formatter local del paquete OKLCH
`getStyleFromOklch()`. Convierte RGB con `rgbToOklch()`, HSL con
`rgbToOklch(hslToRgbFloat(color))` y resuelve opciones HSV mediante el color
manager HSV registrado con `rangeColorToOklch(engine.pluginManager,
{ value: { hsv: color } })`. Pasa el resultado canónico a
`getStyleFromOklch()` del engine, que gestiona el gamut de destino y la
configuración HDR. Si el límite de salida realmente requiere solo RGB, usa
`mapOklchToSrgb(result).rgb`.

### Hooks del ciclo de vida de los interactors

Las clases base de los interactors proporcionan una implementación por defecto
de `reset()` sin efectos. La clase base de los interactors externos también
proporciona un `clear()` sin efectos. El manager selecciona los hooks
personalizados después de inicializar los interactors, incluida la
inicialización del redraw. Conserva los overrides que mantienen estado o hacen
trabajo durante el reset, y añade el modificador TypeScript `override` si usas
`noImplicitOverride`.

Consulta el [inventario de API obsoletas](../../e9/deprecated-migrations.md)
para los formatters de color retirados, las opciones de Confetti y Ribbons y la
superficie de compatibilidad optativa de particles.js que se conserva. Si una
aplicación actualiza su compilador a Stencil 5, elimina `applyPolyfills()` y
espera `defineCustomElements()` cuando el registro deba terminar antes de la
hidratación. El wrapper de tsParticles para Stencil usa Stencil 4 y todavía
declara `applyPolyfills()`.

## Colores, opciones y contratos públicos

Las entradas de color siguen aceptando RGB, HSL, HSV, HWB, Lab, LCH, OKLab,
cadenas CSS, arrays y rangos compatibles. El estado de color y la animación de
partículas usan ahora OKLCH: sustituye los componentes HSL heredados
`{ h, s, l }` por `{ h, c, l }`. El tono sigue siendo un ángulo; el croma y la
luminosidad usan la escala numérica OKLCH de v5, y el alfa sigue siendo un valor
de opacidad independiente. No copies la saturación HSL al croma: convierte el
color en el límite de entrada o conserva una entrada CSS/RGB compatible para
que la analice el engine. Los managers que implementen la extensión de color
deben seguir el contrato OKLCH actual; consulta las
[decisiones de color](../../../V5-COLOR-DECISIONS.md) para conocer las entradas
aceptadas, el gamut mapping, el alfa y el comportamiento HDR.

## API con engine explícito implementada en E1

```ts
import { createEngine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const engine = createEngine();
await loadSlim(engine);
const container = await engine.load({ id: "particles", options: {} });
container?.destroy();
```

Los entrypoints root, `/lazy` y browser module no crean engines ni publican
objetos en `globalThis`. Los scripts clásicos de Rollup exponen el namespace
de factories y loaders:

```js
const engine = tsParticles.createEngine();
await tsParticles.loadSlim(engine);
await engine.load({ id: "particles", options: {} });
```

Un bundle standalone incluye las definiciones del engine; los scripts externos
de features necesitan primero el engine correspondiente y sus dependencias.
Mantén alineadas las versiones de los paquetes. El namespace contiene
definiciones, no un engine. Cargar otro bundle no destruye un engine ya creado.
La propiedad del canvas es exclusiva incluso entre copias del engine incluidas
en bundles distintos. Destruye el owner antes de transferir el canvas. Los ID
iguales en canvas distintos proporcionados siguen siendo independientes entre
engines.

Usa un engine separado cuando la aplicación necesite registros de plugins,
fuentes aleatorias, loggers, schedulers o propiedad de containers separados.
Registra cada feature necesaria en todos los engines que la vayan a usar:

```ts
import { createEngine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const editor = createEngine();
const preview = createEngine();
await Promise.all([loadSlim(editor), loadSlim(preview)]);

const editorContainer = await editor.load({ id: "editor", options: {} });
const previewContainer = await preview.load({ id: "preview", options: {} });

editorContainer?.destroy();
previewContainer?.destroy();
```

Los paquetes de conveniencia exportan `createConfetti(engine)`,
`createFireworks(engine)`, `createParticles(engine)` y `createRibbons(engine)`.
La función devuelta queda asociada a ese engine y conserva `init`, `create` y
`version`:

```ts
import { createEngine } from "@tsparticles/engine";
import { createConfetti } from "@tsparticles/confetti";

const confetti = createConfetti(createEngine());
await confetti({ count: 30, spread: 70 });
```

`initPjs(engine)` devuelve `{ particlesJS, pJSDom, Particles }`; no asigna estas
API de compatibilidad a `globalThis`. `loadConfigs(engine)` registra
explícitamente el catálogo y las paletas en ese engine.

| Familia de wrapper                            | Propiedad del engine y registro                                                                                                                                                           |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| React / Next.js                               | Pasa `engine` a `ParticlesProvider` y proporciona un registrar `init` que cargue los plugins requeridos.                                                                                  |
| Vue 3                                         | Instala el provider particles con `{ engine, init }`; llama `useParticlesProvider()` desde los descendientes.                                                                             |
| Angular                                       | Proporciona un engine a `service.init(engine, registrar)` y usa un service provider distinto para cada engine independiente. Los componentes de conveniencia reciben `engine` como input. |
| Preact, Solid, Inferno, Svelte, Stencil, Riot | Proporciona el engine mediante la API del componente/provider e inicialízalo con `initParticlesEngine(engine, registrar)` cuando esté disponible.                                         |
| Qwik                                          | Crea/registra en el cliente y conserva el engine con `noSerialize`; no lo crees durante el renderizado del servidor.                                                                      |
| Custom elements                               | Asigna `.engine` como propiedad; no es un atributo HTML serializado.                                                                                                                      |
| Nuxt 4                                        | Usa `engine` y `registerParticles` exportados por el módulo de inicialización configurado.                                                                                                |

Consulta el README de cada wrapper para ver las firmas propias del framework y
las limitaciones SSR. No recrees un engine implícito a nivel de módulo dentro
de un provider.

El teardown de un componente destruye únicamente el container que posee. La
aplicación gestiona el ciclo de vida de un engine compartido y debe completar
las cargas pendientes y destruir los containers antes de descartarlo. Los
servicios runtime pertenecen a cada engine; configúralos antes de cargar un
container:

```ts
const engine = createEngine();
engine.setRandom(myRandomFn);
engine.setLogger(myLogger);
engine.setAnimationFunctions(requestFrame, cancelFrame);
const container = await engine.load({ id: "particles", options });
```

Se han eliminado las antiguas API globales `setParticlesRandom`,
`getParticlesRandom`, `getParticlesRandomFn`, `setParticlesLogger` y
`getParticlesLogger`. Sustitúyelas por `engine.setRandom`, `engine.getRandom`,
`engine.getRandomFn`, `engine.setLogger` y `engine.getLogger`. Los plugins
personalizados pueden acceder al owner mediante `container.engine` o
`container.pluginManager.engine`. Los helpers runtime reciben un proveedor
aleatorio explícito; usa el proveedor estable `getRandomFn()` del engine owner
para que los cambios posteriores de la fuente tengan efecto sin afectar a
otros engines. La planificación de animaciones también es por engine; el
scheduler que creó los frames de cada container se encarga de cancelarlos.

### Orden de inicialización

En los wrappers que exponen `initParticlesEngine`, llama a
`initParticlesEngine(engine, registrar)` durante la inicialización de la
aplicación. Los componentes pueden montarse antes: esperan la inicialización de
ese engine y no crean ni inicializan otro implícito. Para jQuery, usa
`$.particles(engine).init(registrar)`. Los providers de React/Vue y la
inicialización del service Angular realizan el paso equivalente. Si falla el
registro, se rechazan las esperas actuales y se puede volver a intentar la
inicialización.

## Entrypoints de módulos y navegador

Importa la raíz del paquete para usar la API ESM estándar. Usa el subpath
`/lazy` cuando necesites su entrypoint diferido; la carga dinámica no restaura
el singleton antiguo. Las comprobaciones del paquete instalado cubren `import`
ESM, `require` CJS y la condición `browser` para la raíz y `/lazy`.

Para la salida clásica de navegador, el namespace Rollup contiene factories y
loaders de features. Crea el engine después de cargar el script namespace y
pásalo a cada loader. Los scripts externos de features dependen del engine
correspondiente y de dependencias compartidas; usa versiones coherentes y el
orden indicado en el README browser del bundle. Un bundle standalone incluye
las features seleccionadas. Ni cargar el entrypoint browser ni importar la raíz
de un paquete crea automáticamente un engine.

## Límites de paquetes y API singleton eliminadas

Importa los tipos runtime y `createEngine` desde `@tsparticles/engine`; después
importa solo los paquetes de features que necesite la aplicación, por ejemplo
`@tsparticles/slim` o un paquete específico de interacción, forma o updater. Los
paquetes de conveniencia son adapters independientes. Prefiere los exports
declarados del paquete a importar rutas internas `dist` o código fuente de
otro paquete. El informe E10 de paquetes instalados es la referencia para las
comprobaciones actuales de `exports`, declaraciones y resolución.

Se han eliminado el singleton engine exportado y los helpers globales para
modificarlo. Sustituye `setParticlesRandom`, `getParticlesRandom`,
`getParticlesRandomFn`, `setParticlesLogger` y `getParticlesLogger` por los
métodos del engine propietario del container. Si la aplicación usaba
`tsParticles.load`, `tsParticles.loadJSON` o `tsParticles.dom`, invoca esas
operaciones en el engine explícito o conserva el container devuelto. No accedas
a `window.tsParticles` desde un paquete ESM/CJS importado; los bundles clásicos
de navegador exponen por separado el namespace documentado.
