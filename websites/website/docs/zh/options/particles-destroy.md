# 粒子破坏

`particles.destroy` 控制粒子被破坏时发生的情况。

## 示例

```ts
particles: {
  destroy: {
    mode: "split",
    split: {
      count: 2,
      factor: {
        value: 0.5,
      },
    },
  },
}
```

## 实用指导

- 在复杂的分割链之前从简单的 `mode` 设置开始。
- 使用大分割计数时重新检查性能。

## 来源参考

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Destroy.md>
