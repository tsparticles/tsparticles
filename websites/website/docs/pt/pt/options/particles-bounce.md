# Partículas saltam

`particles.bounce` personaliza o comportamento de recuperação quando colisões ou limites aplicam lógica de rejeição.

## Exemplo

```ts
particles: {
  bounce: {
    horizontal: {
      value: 1,
    },
    vertical: {
      value: 1,
    },
  },
}
```

## Orientação prática

- Valores em torno de `1` mantêm rebotes naturais.
- Valores mais altos podem parecer enérgicos, mas menos realistas.

## Referência da fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Bounce.md>
