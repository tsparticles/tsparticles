# Migrar desde v1.x

Migrar desde `v1.x` a la versión actual suele requerir una actualización completa de dependencias y una verificación de la configuración.

Los principales bloqueos prácticos son:

1. Patrones antiguos de paquetes e imports.
2. La forma de la llamada `tsParticles.load(...)`.
3. Las claves de opciones actualizadas en los esquemas modernos.

## Migración de la API load

La `load` moderna acepta un único objeto de parámetros.

Antes (estilo posicional legacy):

```ts
await tsParticles.load("tsparticles", oldOptions);
```

Después:

```ts
await tsParticles.load({
  id: "tsparticles",
  options: oldOptions,
});
```

Si cargas desde JSON:

```ts
await tsParticles.load({
  id: "tsparticles",
  url: "/particles.json",
});
```

## Cambios principales en las opciones

Empieza buscando estas claves en tus configuraciones:

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

Ejemplo de reescritura:

```ts
// antes
particles: {
  color: { value: ["#ff6b6b", "#4ecdc4"] },
  stroke: { width: 0 }
}

// después
particles: {
  paint: {
    fill: { color: { value: ["#ff6b6b", "#4ecdc4"] } },
    stroke: { width: 0 }
  }
}
```

## Pasos recomendados

1. Sustituye los nombres de paquetes antiguos por los paquetes `@tsparticles/*` actuales.
2. Empieza con `@tsparticles/engine` + `@tsparticles/slim` y añade después los plugins necesarios.
3. Convierte las llamadas `load` antiguas a la firma basada en objeto `load({ ... })`.
4. Valida las claves de opciones con la documentación actual y corrige los campos renombrados o eliminados.
5. Ejecuta comprobaciones visuales y de rendimiento en escritorio y móvil.

## Checklist

- Elimina los imports obsoletos de la estructura antigua de paquetes.
- Confirma que interacciones, links y formas personalizadas siguen funcionando como se espera.
- Para configuraciones estilo `particles.js`, considera la capa de compatibilidad.

## Documentación útil de opciones

- Matriz de renombres: [`/migrations/option-rename-matrix`](/es/migrations/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/es/options/particles-paint)
- Nota de migración `particles.color`: [`/options/particles-color`](/es/options/particles-color)
- Nota de migración `particles.stroke`: [`/options/particles-stroke`](/es/options/particles-stroke)

## Referencias

- Compatibilidad legacy y bridge de particles.js: [`/migrations/particles-js`](/es/migrations/particles-js)
- Matriz de instalación: [`/guide/installation`](/es/guide/installation)
- Releases del repositorio: <https://github.com/tsparticles/tsparticles/releases>
