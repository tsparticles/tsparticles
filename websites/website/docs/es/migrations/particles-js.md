# Migración y compatibilidad

Si está migrando desde `particles.js`, utilice este orden:

1. reemplace el script/paquete antiguo con `@tsparticles/engine` + paquete (`@tsparticles/slim`)
2. mueva su configuración anterior y asigne campos no admitidos de forma incremental
3. prueba las interacciones (hover/clic/enlaces) una por una

## Notas de migración canónica

- Fuente oficial de la guía de migración: [`tsparticles/markdown/pjsMigration.md`](https://github.com/tsparticles/tsparticles/blob/main/markdown/pjsMigration.md)
- Los ejemplos de compatibilidad heredados están disponibles en las carpetas de demostración.

## Paquete de compatibilidad

Si necesita una capa puente al migrar configuraciones heredadas:

- npm: <https://www.npmjs.com/package/@tsparticles/pjs>
- jsDelivr: <https://www.jsdelivr.com/package/npm/@tsparticles/pjs>

Lectura adicional:

- Artículo de migración: <https://dev.to/matteobruni/migrating-from-particles-js-to-tsparticles-2a6m>
- 5 razones para cambiar: <https://dev.to/matteobruni/5-reasons-to-use-tsparticles-and-not-particles-js-1gbe>

## Consejos comunes para mapear

- El antiguo inicio `particlesJS(...)` se convierte en `tsParticles.load({ id, options })`.
- Muchos valores heredados todavía tienen equivalentes directos en `particles`, `interactivity` y `detectRetina`.
- La nueva arquitectura basada en complementos significa que algunas funciones avanzadas requieren la carga explícita de paquetes.

## Lista de verificación de migración para producción

- Verificar la paridad visual en escritorio y móvil.
- Verificar el impacto de CPU/GPU en dispositivos de gama baja.
- Verifique que ninguna tecla de opción se ignore silenciosamente.
- Fijar versiones exactas del paquete antes de la semana de lanzamiento.

## Migración de canvas-confetti a `@tsparticles/confetti`

Si está migrando desde `canvas-confetti`, el cambio más sencillo es reemplazar las llamadas imperativas con llamadas API `@tsparticles/confetti`.

## Mapeo típico

- `confetti({...})` -> `await confetti({...})`
- lienzo personalizado -> `const local = await confetti.create(canvas, defaults)` luego `await local({...})`
- disparos repetidos -> mantenga sus temporizadores/bucles existentes, llame a `await confetti(...)` en esas devoluciones de llamada

## Ejemplo de conversión

Antes (estilo `canvas-confetti`):

```ts
import confetti from "canvas-confetti";

confetti({
  particleCount: 90,
  spread: 70,
  origin: { x: 0.5, y: 0.6 },
});
```

Despues (`@tsparticles/confetti`):

```ts
import { confetti } from "@tsparticles/confetti";

await confetti({
  count: 90,
  spread: 70,
  position: { x: 50, y: 60 },
});
```

## Notas del nombre de la opción

- `particleCount` -> `count`
- `origin.x`/`origin.y` en `0..1` -> `position.x`/`position.y` en `0..100`
- `startVelocity`, `spread`, `angle` y `colors` mantienen la misma semántica

Para obtener API completa y ayudantes, consulte: <https://github.com/tsparticles/tsparticles/tree/main/bundles/confetti#readme>
