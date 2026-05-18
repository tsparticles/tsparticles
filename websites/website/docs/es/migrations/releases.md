# Lanzamientos y versiones

Este proyecto ahora se envía desde un único repositorio: `tsparticles/tsparticles`.

<WebsiteVersionInfo />

## Dónde ocurre el trabajo de liberación

- Raíz de Monorepo: <https://github.com/tsparticles/tsparticles>
- Paquetes: <https://github.com/tsparticles/tsparticles/tree/main/bundles>
- Motor: <https://github.com/tsparticles/tsparticles/tree/main/engine>
- Envoltorios: <https://github.com/tsparticles/tsparticles/tree/main/wrappers>
- Preajustes: <https://github.com/tsparticles/tsparticles/tree/main/presets>
- Paletas: <https://github.com/tsparticles/tsparticles/tree/main/palettes>

## Regla de alineación de versiones

- Mantenga todos los paquetes `@tsparticles/*` alineados con la misma línea de lanzamiento.
- Evite mezclar diferentes líneas beta o versiones principales en una sola aplicación.

## Lista de verificación práctica de liberación

1. Verifique las versiones del paquete de destino en los archivos `package.json` del espacio de trabajo.
2. Construir y probar los proyectos afectados.
3. Validar los enlaces de documentos y el comportamiento del área de juegos.
4. Publicar desde el flujo de lanzamiento de monorepo.
