# 运动

当您需要动画级控制（包括简化运动行为）时，`motion` 非常有用。

## 基本结构

```ts
motion: {
  disable: false,
  reduce: {
    factor: 4,
    value: true,
  },
}
```

- `disable`：停止与运动相关的行为。
- `reduce`：允许在受限设备或减少运动的环境中使用更柔和的动画。

## 实用指导

- 保留默认值，除非您有可访问性/性能要求。
- 使用减少运动偏好和低端设备进行测试。

## 来源参考

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Motion.md>
