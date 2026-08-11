# parque infantil

Dividido por caso de uso:

- [`Configs Playground`](/es/playground/configs): demostraciones más completas con opciones editables completas.
- [`Shapes Playground`](/es/playground/shapes): demostraciones enfocadas en `shape.type` con opciones especificas por forma cuando estan disponibles.
- [`Presets Playground`](/es/playground/presets): demostraciones oficiales con nombres preestablecidos (`{ preset: "..." }`).
- [`Palettes Playground`](/es/playground/palettes): demostraciones centradas en la paleta del proyecto de ajustes preestablecidos.
- [`Bundles Playground`](/es/playground/bundles): áreas de juego dedicadas para `@tsparticles/confetti`, `@tsparticles/fireworks`, `@tsparticles/particles` y `@tsparticles/ribbons`.

La ejecución siempre es **activada únicamente por el usuario** (sin reproducción automática).

## Flujo compartido

El diseño es consistente en todos los parques infantiles:

1. Primero, vista previa del lienzo.
2. Controles para Iniciar/Pausar/Reanudar/Destruir.
3. Editor JSON para opciones.

4. Elija una demostración del menú.
5. Presione `Start` para ejecutarlo (sin reproducción automática).
6. Edite el JSON en el editor.
7. Presione `Start` nuevamente para recargar con sus nuevas opciones.
8. Utilice `Pause`/`Resume` para controlar el rendimiento y el uso de la CPU.

> Nota: `Destroy` libera completamente la instancia del contenedor.

## Flujo de trabajo sugerido

- Prototipo aquí hasta que el efecto sea estable.
- Copie el JSON final en su proyecto.
- Escríbalo con `ISourceOptions` en el código de la aplicación.
