# Temas

`themes` permite definir conjuntos de opções nomeadas (por exemplo claro e escuro) e alternar em tempo de execução.

## Exemplo

```ts
themes: [
  {
    name: "dark",
    default: {
      value: true,
      mode: "dark",
    },
    options: {
      background: {
        color: "#000000",
      },
    },
  },
  {
    name: "light",
    default: {
      value: true,
      mode: "light",
    },
    options: {
      background: {
        color: "#ffffff",
      },
    },
  },
];
```

## Orientação prática

- Manter um objeto de opções de base estável.
- Substitua apenas o que difere por tema.
- Emparelhe com o estado do modo escuro no nível do aplicativo.

## Referência da fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Themes.md>
