# インタラクティブホバー

`interactivity.events.onHover` は、ポインターホバー反応を制御します。

## 例

```ts
interactivity: {
  events: {
    onHover: {
      enable: true,
      mode: ["grab", "bubble"],
    },
  },
  modes: {
    grab: {
      distance: 160,
      links: {
        opacity: 0.4,
      },
    },
    bubble: {
      distance: 180,
      size: 12,
      duration: 2,
    },
  },
}
```

## 実践的な指導

- ホバー エフェクトは、密度の高いシーンではより高価になります。
- モバイルでは、ホバーヘビー モードを無効にすることを検討してください。

## ソース参照

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Hover.md>
