# Migrar desde v2.x

El paso de `v2.x` a la versión actual suele tener dos áreas de ruptura principales:

1. La migración de la firma de `tsParticles.load(...)`.
2. La migración de las claves de opciones (especialmente color y stroke).

## Migración de la API load (importante)

En las versiones modernas `load` acepta un **único objeto de parámetros**.

Antes (estilo posicional `v2.x`):

```ts
await tsParticles.load("tsparticles", {
  particles: {
    number: {
      value: 80,
    },
  },
});
```

Después (objeto único):

```ts
await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      number: {
        value: 80,
      },
    },
  },
});
```

También puedes pasar `element`, `url` e `index` en el mismo objeto.

```ts
await tsParticles.load({
  element: document.getElementById("tsparticles") as HTMLElement,
  url: "/particles.json",
  index: 0,
});
```

## Cambios principales en las opciones

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

Antes:

```ts
particles: {
  color: { value: "#00ffcc" },
  stroke: { width: 1, color: "#003344" }
}
```

Después:

```ts
particles: {
  paint: {
    fill: { color: { value: "#00ffcc" } },
    stroke: { width: 1, color: "#003344" }
  }
}
```

## Pasos recomendados

1. Actualiza todos los paquetes `@tsparticles/*` juntos.
2. Comprueba que las versiones de los wrappers (React/Vue/Angular/etc.) estén en la misma línea major.
3. Convierte todas las llamadas `tsParticles.load(id, options)` a parámetros de objeto.
4. Migra las claves conocidas (`color`, `stroke`) a `paint.fill`/`paint.stroke`.
5. Ejecuta una pasada de regresión visual en tus configuraciones más complejas.

## Checklist

- Asegúrate de que el lockfile no contenga versiones major mezcladas.
- Verifica que el bundle elegido (`basic`, `slim`, `all`) siga correspondiendo a las funciones habilitadas.
- Vuelve a probar los hooks del ciclo de vida del canvas (`loaded`, `particlesLoaded`, rutas de cleanup).

## Documentación útil de opciones

- Matriz de renombres: [`/migrations/option-rename-matrix`](/es/migrations/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/es/options/particles-paint)
- Nota de migración `particles.color`: [`/options/particles-color`](/es/options/particles-color)
- Nota de migración `particles.stroke`: [`/options/particles-stroke`](/es/options/particles-stroke)

## Referencias

- Regla de alineación de versiones: [`/migrations/releases`](/es/migrations/releases)
- Releases del repositorio: <https://github.com/tsparticles/tsparticles/releases>
