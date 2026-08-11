# Migrar desde v1.x

Desde `v1.x`, conviene migrar en tres pasos: paquetes, `load(...)`, opciones.

## API load moderna

Antes:

```ts
await tsParticles.load("tsparticles", oldOptions);
```

Despues:

```ts
await tsParticles.load({
  id: "tsparticles",
  options: oldOptions,
});
```

## Renombres a revisar primero

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## Recursos

- Matriz de renombres: [`/migrations/option-rename-matrix`](/es/migrations/option-rename-matrix)
- Migracion desde particles.js: [`/migrations/particles-js`](/es/migrations/particles-js)
