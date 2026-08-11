# 插件选项：发射器

`emitters` 动态生成粒子并且是插件驱动的。

## 示例

```ts
emitters: {
  position: {
    x: 50,
    y: 50,
  },
  rate: {
    quantity: 5,
    delay: 0.2,
  },
}
```

## 注释

- 非常适合爆发效果和动态粒子生成。
- 保持排放率平衡以避免性能峰值。

## 来源参考

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Plugins/Emitters.md>
