# インタラクティブ部門

`interactivity.events.onDiv` は、特定の HTML 要素に対話モードを適用します。

## 例

```ts
interactivity: {
  events: {
    onDiv: {
      selectors: ["#cta", ".interactive-zone"],
      enable: true,
      mode: "repulse",
      type: "circle",
    },
  },
  modes: {
    repulse: {
      distance: 140,
      duration: 0.3,
    },
  },
}
```

## 実践的な指導

- キャンバス全体のリアクションではなく、ターゲットを絞った UX ゾーンに使用します。
- セレクター リストを明示的に保ち、保守しやすくします。

## ソース参照

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Div.md>
