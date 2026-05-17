# Primeros pasos

Esta ruta es la configuracion mas rapida y fiable para `tsParticles` en 2026.

## Lista rapida

1. Instala `@tsparticles/engine`.
2. Elige una ruta de ejecucion (`@tsparticles/slim`, `@tsparticles/all`, APIs enfocadas como `@tsparticles/particles`, o solo paquetes personalizados).
3. Carga tu bundle una sola vez.
4. Empieza con opciones manuales, un objeto de configuracion o un preset.

## 1) Instala el engine + un preset de bundle

Usa `@tsparticles/engine` mas `@tsparticles/slim` para un gran equilibrio entre tamano y funcionalidades.

```bash
pnpm add @tsparticles/engine @tsparticles/slim
```

Necesitas enlaces CDN, variantes `npm`/`yarn` o ejemplos con `require(...)`?

- Consulta [`/guide/installation`](/es/guide/installation).

## 2) Crea un contenedor en HTML

```html
<div id="tsparticles"></div>
```

## 3) Inicializa tsParticles

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const options = {
  background: {
    color: "#0b1020",
  },
  particles: {
    number: {
      value: 80,
    },
    links: {
      enable: true,
      distance: 150,
      opacity: 0.35,
    },
    move: {
      enable: true,
      speed: 2,
    },
  },
};

(async () => {
  await loadSlim(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options,
  });
})();
```

## 4) Elige el bundle correcto

- `@tsparticles/slim`: la mayoria de apps deberian empezar aqui.
- `@tsparticles/basic`: conjunto mas pequeno para configuraciones muy ligeras.
- `@tsparticles/all`: todo incluido, ideal para prototipado rapido.

Si necesitas una API enfocada en lugar de la configuracion directa de `tsParticles`:

- `@tsparticles/particles`: API simplificada para fondo de particulas
- `@tsparticles/confetti`: API de confeti de una sola llamada
- `@tsparticles/fireworks`: API de fuegos artificiales de una sola llamada

## 5) Usa presets/configs cuando necesites velocidad

Si prefieres efectos preconstruidos:

```bash
pnpm add @tsparticles/configs
```

Despues carga una configuracion por clave, como en la app [`demo/vite`](https://github.com/tsparticles/tsparticles/blob/main/demo/vite/src/main.ts).

Si prefieres configuraciones basadas en nombre de preset, usa el catalogo oficial en [`/demos/presets`](/es/demos/presets).

## Mapa rapido de documentacion

- Opciones raiz: [`/options/`](/es/options/)
- Referencia de wrappers: [`/guide/wrappers`](/es/guide/wrappers)
- Catalogo de presets: [`/demos/presets`](/es/demos/presets)
- Catalogo de paletas: [`/demos/palettes`](/es/demos/palettes)
- Catalogo de formas: [`/demos/shapes`](/es/demos/shapes)
- Migracion desde particles.js: [`/migrations/particles-js`](/es/migrations/particles-js)
- Formatos de color: [`/guide/color-formats`](/es/guide/color-formats)
- Ciclo de vida del contenedor: [`/guide/container-lifecycle`](/es/guide/container-lifecycle)
- Plugins y personalizacion: [`/guide/plugins-customization`](/es/guide/plugins-customization)

## Solucion de problemas

- Pantalla en blanco: verifica que `#tsparticles` exista antes de llamar a `tsParticles.load`.
- Falta una funcionalidad: probablemente necesitas otro plugin/paquete (shape, interaccion, updater).
- Errores de tipos en opciones: manten tus paquetes alineados en la misma version major/minor.
