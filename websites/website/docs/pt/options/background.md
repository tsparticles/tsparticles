# Plano de fundo e tela

Esta seção controla a camada de tela e o comportamento de tela cheia.

## Propriedades principais

- `background.color`
- `background.opacity`
- `background.image`
- `background.position`
- `background.repeat`
- `background.size`

## `background`

```ts
background: {
  color: "#0b1020",
  image: "",
  position: "50% 50%",
  repeat: "no-repeat",
  size: "cover"
}
```

- `color`: cor de fundo da tela.
- `opacity`: canal alfa para a camada de fundo.
- `image`: imagem de fundo opcional.
- `position`, `repeat`, `size`: comportamento semelhante ao CSS.
- `element`: seletor CSS opcional, `HTMLCanvasElement` ou `OffscreenCanvas` para o draw callback. Se omitido, a tela de partículas é usada.
- `draw`: callback opcional por quadro `(context, delta) => void` para renderização personalizada do fundo.

## `fullScreen`

```ts
fullScreen: {
  enable: true,
  zIndex: -1
}
```

- `enable`: torna a janela de visualização completa da tela.
- `zIndex`: útil para colocar partículas atrás do seu conteúdo.

Para playgrounds incorporados e visualizações de documentos in-line, defina:

```ts
fullScreen: {
  enable: false,
}
```

## `detectRetina`

```ts
detectRetina: true;
```

Melhora a renderização em telas HiDPI, mas aumenta a carga de GPU/CPU.

## Notas práticas

- Para landing pages, use `fullScreen.enable: true` com `zIndex: -1`.
- Se você notar lentidão no celular, tente `detectRetina: false`.
- Se uma configuração for projetada para tela cheia, desative `fullScreen` antes de incorporá-la em uma seção limitada.
