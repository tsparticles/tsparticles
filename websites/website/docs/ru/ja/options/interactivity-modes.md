# インタラクティブモード

`interactivity.modes` は、イベントで使用されるモード固有の設定を定義します。

## 例

```ts
interactivity: {
  modes: {
    grab: {
      distance: 170,
      links: {
        opacity: 0.45,
      },
    },
    bubble: {
      distance: 180,
      size: 12,
      duration: 2,
    },
    push: {
      quantity: 6,
    },
    repulse: {
      distance: 130,
      duration: 0.35,
    },
  },
}
```

## 実践的な指導

- 実際に使用するモードのみを有効にします。
- 安定したパフォーマンスを得るために適度な距離を保ちます。
- 負荷の高いモードの組み合わせには、開始/一時停止コントロールを使用します。

関連ページ：

- [`Interactivity Click`](/ja/options/interactivity-click)
- [`Interactivity Hover`](/ja/options/interactivity-hover)
- [`Interactivity Div`](/ja/options/interactivity-div)

## ソース参照

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Modes.md>
