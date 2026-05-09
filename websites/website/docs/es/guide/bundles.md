# Guia de bundles

Esta pagina te ayuda a elegir el bundle correcto de `tsParticles` y configurarlo rapido.

## Comparacion de paquetes

| Paquete                  | Ideal para                                                      | Estilo de setup                                |
| ------------------------ | --------------------------------------------------------------- | ---------------------------------------------- |
| `@tsparticles/basic`     | Configuraciones ultra ligeras                                   | `tsParticles` + `await loadBasic(tsParticles)` |
| `@tsparticles/slim`      | La mayoria de sitios/apps                                       | `tsParticles` + `await loadSlim(tsParticles)`  |
| `tsparticles`            | Conjunto completo de funciones oficiales con control del engine | `tsParticles` + `await loadFull(tsParticles)`  |
| `@tsparticles/all`       | Todas las funciones, prototipado rapido                         | `tsParticles` + `await loadAll(tsParticles)`   |
| `@tsparticles/confetti`  | Efectos de confeti con una llamada                              | `await confetti(options)`                      |
| `@tsparticles/fireworks` | Efectos de fuegos artificiales con una llamada                  | `await fireworks(options)`                     |
| `@tsparticles/particles` | API simple para fondo de particulas                             | `await particles(options)`                     |

## Guias por bundle

- Basic: [`/guide/bundles-basic`](/es/guide/bundles-basic)
- Slim: [`/guide/bundles-slim`](/es/guide/bundles-slim)
- tsparticles (Full): [`/guide/bundles-full`](/es/guide/bundles-full)
- All: [`/guide/bundles-all`](/es/guide/bundles-all)
- Confetti: [`/guide/bundles-confetti`](/es/guide/bundles-confetti)
- Fireworks: [`/guide/bundles-fireworks`](/es/guide/bundles-fireworks)
- Particles: [`/guide/bundles-particles`](/es/guide/bundles-particles)

## Instalacion

Instala la ruta de paquetes que coincide con tu caso de uso.

```bash
pnpm add @tsparticles/engine @tsparticles/basic
pnpm add @tsparticles/engine @tsparticles/slim
pnpm add @tsparticles/engine tsparticles
pnpm add @tsparticles/engine @tsparticles/all
pnpm add @tsparticles/confetti
pnpm add @tsparticles/fireworks
pnpm add @tsparticles/particles
```

Necesitas enlaces CDN y mas variantes de gestores de paquetes?

- Ver [`/guide/installation`](/es/guide/installation).

## Ejemplos de setup

### Bundles con engine + loader (`basic`, `slim`, `full`, `all`)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

await loadSlim(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      number: { value: 80 },
      move: { enable: true, speed: 2 },
    },
  },
});
```

Para los otros presets, cambia solo el import/funcion del loader:

- `@tsparticles/basic` -> `loadBasic`
- `tsparticles` -> `loadFull`
- `@tsparticles/all` -> `loadAll`

### API enfocadas (`confetti`, `fireworks`, `particles`)

```ts
import { confetti } from "@tsparticles/confetti";
import { fireworks } from "@tsparticles/fireworks";
import { particles } from "@tsparticles/particles";

await confetti({ count: 80, spread: 60 });
await fireworks({ sounds: false });
await particles({ count: 100, links: true });
```

Estas API son ideales cuando quieres integracion rapida sin conectar manualmente muchos plugins del engine.

## Reglas practicas de seleccion

1. Empieza con `@tsparticles/slim` en la mayoria de proyectos.
2. Usa `@tsparticles/basic` si el tamano del bundle es tu prioridad principal y las funciones son simples.
3. Usa `tsparticles` cuando necesites una base full con muchas funciones y `loadFull`.
4. Usa `@tsparticles/all` para prototipado o cuando necesites muchas funciones de inmediato.
5. Usa `@tsparticles/confetti`, `@tsparticles/fireworks` o `@tsparticles/particles` cuando tu UI necesite un efecto enfocado con setup minimo.

## Paginas relacionadas

- Bundles enfocados en playground: [`/playground/bundles`](/es/playground/bundles)
- Ruta de inicio: [`/guide/getting-started`](/es/guide/getting-started)
- Matriz de instalacion: [`/guide/installation`](/es/guide/installation)
- Vista general de wrappers: [`/guide/wrappers`](/es/guide/wrappers)
