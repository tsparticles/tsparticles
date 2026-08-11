# インタラクティブ性

`interactivity` オプションは、ホバー/クリックに対するパーティクルの反応方法を定義します。

焦点を絞った参考資料については、次のとおりです。

- [`Interactivity Click`](/ja/options/interactivity-click)
- [`Interactivity Hover`](/ja/options/interactivity-hover)
- [`Interactivity Div`](/ja/options/interactivity-div)
- [`Interactivity Events`](/ja/options/interactivity-events)
- [`Interactivity Modes`](/ja/options/interactivity-modes)

## 基本構造

```ts
interactivity: {
  events: {
    onHover: {
      enable: true,
      mode: ["grab", "bubble"]
    },
    onClick: {
      enable: true,
      mode: ["push", "repulse"]
    }
  },
  modes: {
    grab: {
      distance: 170,
      links: {
        opacity: 0.45
      }
    },
    bubble: {
      distance: 180,
      size: 12,
      duration: 2
    },
    push: {
      quantity: 6
    },
    repulse: {
      distance: 130,
      duration: 0.35
    }
  }
}
```

## 最も使用されるイベント

- `onHover`: ユーザーへの即時フィードバック。
- `onClick`: バーストまたは対象を絞ったアクション。
- `resize`: ウィンドウのサイズ変更時にキャンバスの動作の一貫性を保ちます。
- `onDiv`: 特定の要素上のインタラクションをターゲットにします。

## ベストプラクティス

- ローエンド デバイスで一度に多くのモードを有効にしないでください。
- パフォーマンスの急上昇を避けるために、`distance` を適度に保ちます。
- エフェクトが重い場合は、`Start/Pause` による手動制御を使用してください。

## 詳細な参考資料

- クリック: <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Click.md>
- ホバー: <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Hover.md>
- ディビジョン: <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Div.md>
