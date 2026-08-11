# Gráfico de dependencia

Este es un mapa práctico de las capas de paquetes expuestas en el archivo README principal `tsParticles`.

Para ver el gráfico completo y exhaustivo, consulte:

- <https://github.com/tsparticles/tsparticles/blob/main/README.md#dependency-graph>

## Flujo de paquetes de alto nivel

```text
tsParticles Engine
`- tsParticles Basic
   |- tsParticles Particles
   |- tsParticles Confetti
   |- tsParticles Fireworks
   `- tsParticles Slim
      `- tsparticles
         `- tsParticles All
```

## Cómo utilizar este mapa

- Comience desde `engine` + `slim` para la mayoría de las aplicaciones de producción.
- Vaya a `tsparticles` si necesita interacciones/complementos integrados adicionales.
- Pase a `all` solo cuando necesite el conjunto completo de funciones.
- Utilice paquetes dedicados (`confetti`, `fireworks`, `particles`) para efectos enfocados.

## Páginas relacionadas

- [`/guide/getting-started`](/es/guide/getting-started)
- [`/guide/installation`](/es/guide/installation)
- [`/options/performance`](/es/options/performance)
