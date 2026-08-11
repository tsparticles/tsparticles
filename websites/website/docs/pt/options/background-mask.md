# Máscara de fundo

`backgroundMask` permite que as partículas perfurem ou se misturem com uma camada de fundo mascarada.

## Exemplos

### Cobertura estática (legacy)

```ts
backgroundMask: {
  enable: true,
  cover: {
    color: {
      value: "#0b1020",
    },
    opacity: 1,
  },
}
```

### Draw callback dinâmico _(desde 4.3.0)_

```ts
backgroundMask: {
  enable: true,
  cover: {
    draw: (ctx) => {
      const t = performance.now() * 0.001;
      ctx.fillStyle = `hsl(${(t * 30) % 360}, 70%, 50%)`;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    },
  },
}
```

### Elemento externo _(desde 4.3.0)_

```ts
backgroundMask: {
  enable: true,
  cover: {
    element: "#myVideo",
    opacity: 0.8,
  },
}
```

## Propriedades

| Propriedade | Tipo                       | Descrição                                                   |
| ----------- | -------------------------- | ----------------------------------------------------------- |
| `enable`    | `boolean`                  | Ativa o mascaramento de fundo                               |
| `composite` | `GlobalCompositeOperation` | Operação de composição canvas (padrão: `"destination-out"`) |
| `cover`     | `BackgroundMaskCover`      | Configuração de cobertura                                   |

### `cover` (BackgroundMaskCover)

| Propriedade | Tipo                                                                                         | Descrição                                                                                      |
| ----------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `color`     | `string` / `OptionsColor`                                                                    | Cor de cobertura                                                                               |
| `image`     | `string`                                                                                     | URL da imagem de cobertura                                                                     |
| `opacity`   | `number`                                                                                     | Nível alfa de cobertura (0..1, padrão: `1`)                                                    |
| `element`   | `string` / `HTMLCanvasElement` / `OffscreenCanvas` / `HTMLVideoElement` / `HTMLImageElement` | Elemento externo ou seletor CSS desenhado automaticamente a cada frame _(desde 4.3.0)_         |
| `draw`      | `(context: BackgroundDrawContext, delta: IDelta) => void`                                    | Callback de desenho personalizado no contexto principal do canvas a cada frame _(desde 4.3.0)_ |

### Ordem das camadas _(desde 4.3.0)_

1. `clear()` — limpeza de pixels do canvas
2. `cover.element` desenho automático (se definido)
3. `cover.draw` callback (se definido)
4. Cobertura estática (cor/imagem) — fallback
5. Operação de composição global

## Quando usar

- Efeitos semelhantes a holofotes.
- Seções de heróis com alto contraste.
- Interações em camadas em fundos escuros.

## Referência da fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/BackgroundMask.md>
