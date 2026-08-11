# インタラクティブクリック

`interactivity.events.onClick` は、ユーザーがキャンバスをクリック/タップしたときに何が起こるかを定義します。

## 例

```ts
interactivity: {
  events: {
    onClick: {
      enable: true,
      mode: ["push", "repulse"],
    },
  },
  modes: {
    push: {
      quantity: 4,
    },
    repulse: {
      distance: 120,
      duration: 0.4,
    },
  },
}
```

## 実践的な指導

- 1 つのモードから始めて、必要な場合にのみモードを組み合わせます。
- FPS を安定させるには、`quantity` と `distance` を適度に保ちます。

## ソース参照

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Click.md>
