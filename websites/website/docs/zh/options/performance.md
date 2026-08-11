# 性能指南

以下是避免 FPS 下降的主要方法。

## 1) 粒子计数

```ts
particles: {
  number: {
    value: 50,
    density: {
      enable: true,
      area: 900
    }
  }
}
```

更少的粒子 = 更少的绘制调用和更少的碰撞。

## 2) 移动和链接

- 当您不需要能量效果时，减少 `move.speed` 。
- 限制 `links.distance` 和 `links.opacity`。
- 避免全屏使用大量组合（例如 `links` + `collisions` + 高级效果）。

## 3) 互动性

- 只保留一些活动模式。
- 在移动设备上，考虑禁用悬停模式。

## 4) 视网膜并调整大小

```ts
detectRetina: false;
```

在性能优先的环境或较弱的设备上很有用。

## 5) 手动生命周期控制

对于昂贵的部分，使用显式控制：

- 用户点击时的 `start`
- `stop`/`pause` 当该部分不可见时
- 页面/组件拆卸上的 `destroy`
