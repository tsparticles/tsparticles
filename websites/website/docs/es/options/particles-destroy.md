# Partículas Destruyen

`particles.destroy` controla lo que sucede cuando se destruyen las partículas.

## Ejemplo

```ts
particles: {
  destroy: {
    mode: "split",
    split: {
      count: 2,
      factor: {
        value: 0.5,
      },
    },
  },
}
```

## Orientación práctica

- Comience con configuraciones `mode` simples antes de cadenas divididas complejas.
- Vuelva a comprobar el rendimiento cuando utilice recuentos divididos grandes.

## Referencia fuente

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Destroy.md>
