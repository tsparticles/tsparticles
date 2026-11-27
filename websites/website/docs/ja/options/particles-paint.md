# Particles Paint

`particles.paint` groups particle fill and stroke style options.

## Example

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

## Fill (`particles.paint.fill`)

- Defines the particle inner color.
- Supports static values, arrays, and color animation.
- 色のアニメーションでは、OKLCH の各チャンネルを個別に設定します。`h` は度数の色相、`c` は OKLab 単位のクロマ、`l` は 0〜100 の明度です。従来の HSL チャンネル `s` は移行メッセージとともに拒否されます。

## Stroke (`particles.paint.stroke`)

- Defines outline width and color.
- Useful to increase shape contrast.

## Source reference

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Paint.md>
