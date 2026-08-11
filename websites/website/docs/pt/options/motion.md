# Movimento

`motion` é útil quando você precisa de controle no nível da animação, incluindo comportamento de movimento reduzido.

## Estrutura básica

```ts
motion: {
  disable: false,
  reduce: {
    factor: 4,
    value: true,
  },
}
```

- `disable`: interrompe o comportamento relacionado ao movimento.
- `reduce`: permite animações mais suaves em dispositivos restritos ou contextos de movimento reduzido.

## Orientação prática

- Mantenha isso nos padrões, a menos que você tenha requisitos de acessibilidade/desempenho.
- Teste com preferências de movimento reduzido e dispositivos de baixo custo.

## Referência da fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Motion.md>
