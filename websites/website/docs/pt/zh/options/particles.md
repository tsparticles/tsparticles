# 粒子

`particles` 内的选项控制粒子的外观和运动。

## 最常用的组

- `particles.number`
- `particles.move`
- `particles.links`
- `particles.palette`
- `particles.paint`
- `particles.shape`
- `particles.size`
- `particles.opacity`

详见详细页面：

- [`Particles Number`](/zh/options/particles-number)
- [`Particles Move`](/zh/options/particles-move)
- [`Particles Links`](/zh/options/particles-links)
- [`Particles Palette`](/zh/options/particles-palette)
- [`Particles Paint`](/zh/options/particles-paint)
- [`Particles Shape`](/zh/options/particles-shape)

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

- `value`：基本粒子计数。
- `density.enable`：使计数适应容器大小。

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

- `speed`：感知的移动速度。
- `outModes.default`：边缘行为（`out`、`bounce`、...）。

## `particles.links`

```ts
links: {
  enable: true,
  distance: 140,
  opacity: 0.28,
  color: "#7aa0ff"
}
```

启用粒子之间的链接，对于“网络”英雄部分很有用。

## `particles.palette`

```ts
palette: "sunset";
```

- 从注册的调色板 ID 导入颜色和混合默认值。
- 根据调色板自动填充 `paint.fill` 或 `paint.stroke`。
- 对于多变体调色板，`paint` 作为变体数组加载。
- 当您想要快速交换颜色情绪时，对于预设和演示非常有用。

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

- `shape.type`：单一类型或类型列表。
- `size.value`：自然变化的推荐范围。
- `opacity.value`：平均透明度。

## 接下来要检查的高级组

- `particles.collisions`
- `particles.life`
- `particles.orbit`
- `particles.roll`
- `particles.rotate`
- `particles.tilt`
- `particles.twinkle`
- `particles.wobble`

详细页面：

- [`Particles Bounce`](/zh/options/particles-bounce)
- [`Particles Paint`](/zh/options/particles-paint)
- [`Particles Destroy`](/zh/options/particles-destroy)
- [`Particles Group`](/zh/options/particles-group)
- [`Particles Collisions`](/zh/options/particles-collisions)
- [`Particles Life`](/zh/options/particles-life)
- [`Particles Palette`](/zh/options/particles-palette)
- [`Particles Opacity`](/zh/options/particles-opacity)
- [`Particles Orbit`](/zh/options/particles-orbit)
- [`Particles Repulse`](/zh/options/particles-repulse)
- [`Particles Roll`](/zh/options/particles-roll)
- [`Particles Rotate`](/zh/options/particles-rotate)
- [`Particles Shadow`](/zh/options/particles-shadow)
- [`Particles Size`](/zh/options/particles-size)
- [`Particles Tilt`](/zh/options/particles-tilt)
- [`Particles Twinkle`](/zh/options/particles-twinkle)
- [`Particles Wobble`](/zh/options/particles-wobble)
- [`Particles ZIndex`](/zh/options/particles-zindex)
- [`Particles Move`](/zh/options/particles-move)
- [`Particles Number`](/zh/options/particles-number)
- [`Particles Links`](/zh/options/particles-links)
- [`Particles Shape`](/zh/options/particles-shape)

源页面：<https://github.com/tsparticles/tsparticles/tree/main/markdown/Options/Particles>
