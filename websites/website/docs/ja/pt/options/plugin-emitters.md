# Opção de plugin: Emissores

`emitters` gera partículas dinamicamente e é acionado por plug-in.

## Exemplo

```ts
emitters: {
  position: {
    x: 50,
    y: 50,
  },
  rate: {
    quantity: 5,
    delay: 0.2,
  },
}
```

## Notas

- Ótimo para efeitos de explosão e geração dinâmica de partículas.
- Mantenha as taxas de emissão equilibradas para evitar picos de desempenho.

## Referência da fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Plugins/Emitters.md>
