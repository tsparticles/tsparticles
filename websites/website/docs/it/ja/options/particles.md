# 粒子

`particles` 内のオプションは、パーティクルの外観と動きを制御します。

## 最もよく使用されるグループ

- `particles.number`
- `particles.move`
- `particles.links`
- `particles.palette`
- `particles.paint`
- `particles.shape`
- `particles.size`
- `particles.opacity`

詳細ページを参照してください:

- [`Particles Number`](/ja/options/particles-number)
- [`Particles Move`](/ja/options/particles-move)
- [`Particles Links`](/ja/options/particles-links)
- [`Particles Palette`](/ja/options/particles-palette)
- [`Particles Paint`](/ja/options/particles-paint)
- [`Particles Shape`](/ja/options/particles-shape)

## `particles.number`

```ts
particles: {
  number: {
    value: 70,
    density: {
      enable: true,
      area: 800
    }
  }
}
```

- `value`: 基本粒子数。
- `density.enable`: カウントをコンテナーのサイズに適応させます。

## `particles.move`

```ts
move: {
  enable: true,
  speed: 1.6,
  direction: "none",
  outModes: {
    default: "out"
  }
}
```

- `speed`: 知覚される移動速度。
- `outModes.default`: エッジ動作 (`out`、`bounce`、...)。

## `particles.links`

```ts
links: {
  enable: true,
  distance: 140,
  opacity: 0.28,
  color: "#7aa0ff"
}
```

パーティクル間のリンクを有効にし、「ネットワーク」ヒーロー セクションに役立ちます。

## `particles.palette`

```ts
palette: "sunset";
```

- 登録されたパレット ID から色とブレンドのデフォルトをインポートします。
- パレットに応じて `paint.fill` または `paint.stroke` を自動的に設定します。
- マルチバリアント パレットでは、`paint` がバリアントの配列としてロードされます。
- 色の雰囲気をすばやく交換したい場合は、プリセットやデモを使用すると便利です。

## `particles.shape`、`size`、`opacity`

```ts
shape: {
  type: ["circle", "square"]
},
size: {
  value: {
    min: 1,
    max: 5
  }
},
opacity: {
  value: 0.7
}
```

- `shape.type`: 単一のタイプまたはタイプのリスト。
- `size.value`: 自然な変動の推奨範囲。
- `opacity.value`: 平均的な透明度。

## 次に確認する高度なグループ

- `particles.collisions`
- `particles.life`
- `particles.orbit`
- `particles.roll`
- `particles.rotate`
- `particles.tilt`
- `particles.twinkle`
- `particles.wobble`

詳細ページ:

- [`Particles Bounce`](/ja/options/particles-bounce)
- [`Particles Paint`](/ja/options/particles-paint)
- [`Particles Destroy`](/ja/options/particles-destroy)
- [`Particles Group`](/ja/options/particles-group)
- [`Particles Collisions`](/ja/options/particles-collisions)
- [`Particles Life`](/ja/options/particles-life)
- [`Particles Palette`](/ja/options/particles-palette)
- [`Particles Opacity`](/ja/options/particles-opacity)
- [`Particles Orbit`](/ja/options/particles-orbit)
- [`Particles Repulse`](/ja/options/particles-repulse)
- [`Particles Roll`](/ja/options/particles-roll)
- [`Particles Rotate`](/ja/options/particles-rotate)
- [`Particles Shadow`](/ja/options/particles-shadow)
- [`Particles Size`](/ja/options/particles-size)
- [`Particles Tilt`](/ja/options/particles-tilt)
- [`Particles Twinkle`](/ja/options/particles-twinkle)
- [`Particles Wobble`](/ja/options/particles-wobble)
- [`Particles ZIndex`](/ja/options/particles-zindex)
- [`Particles Move`](/ja/options/particles-move)
- [`Particles Number`](/ja/options/particles-number)
- [`Particles Links`](/ja/options/particles-links)
- [`Particles Shape`](/ja/options/particles-shape)

ソースページ: <https://github.com/tsparticles/tsparticles/tree/main/markdown/Options/Particles>
