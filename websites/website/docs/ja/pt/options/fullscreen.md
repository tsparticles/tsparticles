# Tela cheia

Use `fullScreen` para controlar se a tela ocupa toda a janela de visualização.

## Configuração típica

```ts
fullScreen: {
  enable: true,
  zIndex: -1,
}
```

- `enable`: alterna o comportamento da janela de visualização completa.
- `zIndex`: útil para manter as partículas atrás do conteúdo do aplicativo.

## Seções incorporadas

Para visualizações de documentos, cartões e painéis de playground:

```ts
fullScreen: {
  enable: false,
}
```

Isso evita a sobreposição com o layout da página e outras telas.

## Referência da fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/FullScreen.md>
