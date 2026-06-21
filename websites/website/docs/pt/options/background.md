# Plano de fundo e tela

Esta seção controla a camada de tela e o comportamento de tela cheia.

## Ordem das camadas (de trás para frente)

1. **Fundo CSS** (`color`, `image`, `position`, `repeat`, `size`) — aplicado como estilo DOM da tela
2. **`clear()`** — limpeza de pixels da tela por quadro
3. **`background.element` desenho automático** — se definido, `ctx.drawImage(element, ...)`
4. **`background.draw` callback** — se definido, chamado com o contexto de renderização principal + delta
5. **Partículas** — desenhadas por cima

`element` e `draw` são **camadas independentes**. Ambos são opcionais e podem ser usados juntos ou separadamente.

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

| Chave      | Tipo                                                                                         | Descrição                                                                                            |
| ---------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `color`    | `string` / `object`                                                                          | Cor de fundo da tela.                                                                                |
| `opacity`  | `number`                                                                                     | Canal alfa para a cor de fundo, de `0` a `1`.                                                        |
| `image`    | `string`                                                                                     | Valor CSS `background-image` (ex. `url('...')`).                                                     |
| `position` | `string`                                                                                     | Valor CSS `background-position`.                                                                     |
| `repeat`   | `string`                                                                                     | Valor CSS `background-repeat`.                                                                       |
| `size`     | `string`                                                                                     | Valor CSS `background-size`.                                                                         |
| `element`  | `string` / `HTMLCanvasElement` / `OffscreenCanvas` / `HTMLVideoElement` / `HTMLImageElement` | Elemento externo desenhado automaticamente a cada quadro via `drawImage`. Não gerenciado pelo motor. |
| `draw`     | `(context, delta) => void`                                                                   | Callback por quadro para renderização personalizada de fundo no contexto principal da tela.          |

### `element`

Quando `element` é definido, o conteúdo visual atual do elemento é desenhado na tela principal a cada quadro via `ctx.drawImage()`. O elemento **não é gerenciado pelo motor** — o código externo gerencia sua renderização.

Tipos de elemento suportados:

- `HTMLCanvasElement` / `OffscreenCanvas`
- `HTMLVideoElement` (desenha o quadro atual)
- `HTMLImageElement`
- String seletor CSS correspondente a qualquer um dos acima no DOM

```json
{
  "background": {
    "element": "#my-bg-canvas"
  }
}
```

```ts
// Desenhar automaticamente um elemento <video> externo como fundo
tsParticles.load({
  id: "tsparticles",
  options: {
    background: {
      element: "#bg-video",
    },
  },
});
```

### `draw`

Um callback por quadro para renderização personalizada do fundo. Sempre recebe o **contexto principal da tela** (`OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D`), nunca o contexto do elemento.

```json
{
  "background": {
    "draw": "(ctx, delta) => { ctx.fillStyle = 'blue'; ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height); }"
  }
}
```

(TypeScript usa uma referência de função, não uma string.)

```ts
import { type BackgroundDrawContext, type IDelta } from "@tsparticles/engine";

const drawBackground = (ctx: BackgroundDrawContext, delta: IDelta): void => {
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};
```

### Elemento + Draw combinados

Ambas as camadas são executadas independentemente a cada quadro. O elemento é desenhado primeiro, depois o callback draw:

```ts
import { type BackgroundDrawContext, type IDelta } from "@tsparticles/engine";

tsParticles.load({
  id: "tsparticles",
  options: {
    background: {
      element: "#bg-canvas",
      draw: (ctx: BackgroundDrawContext, delta: IDelta) => {
        ctx.fillStyle = `rgba(0,0,0,${0.05 * delta.factor})`;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      },
    },
  },
});
```

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
