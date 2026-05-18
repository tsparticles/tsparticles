# Migrar desde v3.x

Desde `v3.x`, los principales riesgos son la **compatibilidad de opciones** y los **cambios de paquetes**.

## Cambios prioritarios

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## Renombrado de paquetes

Algunos paquetes de `v3.x` han sido renombrados o reestructurados:

| Paquete v3                          | Paquete actual                  | Nota                                         |
| ----------------------------------- | ------------------------------- | -------------------------------------------- |
| `@tsparticles/move-base`            | `@tsparticles/plugin-move`      | Fusionados en un solo plugin                 |
| `@tsparticles/move-parallax`        | `@tsparticles/plugin-move`      | Fusionados en un solo plugin                 |
| `@tsparticles/updater-color`        | `@tsparticles/updater-paint`    | Reemplazado por el sistema paint             |
| `@tsparticles/updater-stroke-color` | `@tsparticles/updater-paint`    | Reemplazado por el sistema paint             |
| `@tsparticles/plugin-hsv-color`     | `@tsparticles/plugin-hsv-color` | Movido a `plugins/colors/hsv/`, mismo nombre |

## Ejemplos de mapeo de opciones

Antes (estilo `v3.x`):

```ts
const options = {
  particles: {
    color: {
      value: "#ff0000",
    },
    stroke: {
      width: 2,
      color: "#000000",
    },
  },
};
```

Despues (actual):

```ts
const options = {
  particles: {
    paint: {
      fill: {
        value: "#ff0000",
      },
      stroke: {
        width: 2,
        color: "#000000",
      },
    },
  },
};
```

## Migracion de API load

Antes (llamada posicional legacy):

```ts
await tsParticles.load("tsparticles", options);
```

Despues (parametro objeto):

```ts
await tsParticles.load({
  id: "tsparticles",
  options,
});
```

## Pasos recomendados

1. Alinea todos los paquetes `@tsparticles/*` a la ultima version disponible.
2. Reemplaza las claves de opciones obsoletas (`particles.color`, `particles.stroke`) con `particles.paint.*`.
3. Actualiza los paquetes renombrados en `package.json` (ver tabla arriba).
4. Verifica que los plugins/formas personalizados se carguen antes de `tsParticles.load(...)`.
5. Vuelve a probar interacciones y escenas criticas de rendimiento.

## Recursos

- Matriz de renombres: [`/migrations/option-rename-matrix`](/es/migrations/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/es/options/particles-paint)
