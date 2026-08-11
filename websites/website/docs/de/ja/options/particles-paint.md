# パーティクルペイント

`particles.paint` は、パーティクルの塗りつぶしとストロークのスタイル オプションをグループ化します。

## 例

```ts
particles: {
  paint: {
    fill: {
      enable: true,
      color: {
        value: ["#60a5fa", "#a78bfa", "#f472b6"],
      },
    },
    stroke: {
      width: 1,
      color: {
        value: "#ffffff",
      },
    },
  },
}
```

## 入力 (`particles.paint.fill`)

- パーティクルの内部の色を定義します。
- 静的な値、配列、カラー アニメーションをサポートします。

## ストローク (`particles.paint.stroke`)

- アウトラインの幅と色を定義します。
- 形状のコントラストを高めるのに役立ちます。

## ソース参照

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Paint.md>
