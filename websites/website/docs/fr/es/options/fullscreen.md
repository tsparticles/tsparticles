# Pantalla completa

Utilice `fullScreen` para controlar si el lienzo ocupa la ventana gráfica completa.

## Configuración típica

```ts
fullScreen: {
  enable: true,
  zIndex: -1,
}
```

- `enable`: alterna el comportamiento de la ventana gráfica completa.
- `zIndex`: útil para mantener las partículas detrás del contenido de la aplicación.

## Secciones integradas

Para vistas previas de documentos, tarjetas y paneles de juegos:

```ts
fullScreen: {
  enable: false,
}
```

Esto evita la superposición con el diseño de página y otros lienzos.

## Referencia fuente

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/FullScreen.md>
