# 从 v1.x 迁移

从 `v1.x` 迁移到当前版本通常需要完整更新依赖并验证配置。

最常见的实际障碍是：

1. 旧的包和导入模式。
2. `tsParticles.load(...)` 的调用形式。
3. 现代 schema 中更新后的选项键。

## 迁移 Load API

现代 `load` 接受单个参数对象。

之前（旧的位置参数风格）：

```ts
await tsParticles.load("tsparticles", oldOptions);
```

之后：

```ts
await tsParticles.load({
  id: "tsparticles",
  options: oldOptions,
});
```

如果从 JSON 加载：

```ts
await tsParticles.load({
  id: "tsparticles",
  url: "/particles.json",
});
```

## 主要选项迁移

先在配置中搜索这些键：

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

重写示例：

```ts
// 之前
particles: {
  color: { value: ["#ff6b6b", "#4ecdc4"] },
  stroke: { width: 0 }
}

// 之后
particles: {
  paint: {
    fill: { value: ["#ff6b6b", "#4ecdc4"] },
    stroke: { width: 0 }
  }
}
```

## 建议步骤

1. 将旧的包名替换为当前的 `@tsparticles/*` 包。
2. 从 `@tsparticles/engine` + `@tsparticles/slim` 开始，然后添加所需插件。
3. 将旧的 `load` 调用转换为基于对象的 `load({ ... })` 签名。
4. 对照当前文档校验选项键，修正重命名或删除的字段。
5. 在桌面和移动端执行视觉与性能检查。

## 检查清单

- 移除旧包结构中的过时导入。
- 确认交互、链接和自定义形状仍按预期工作。
- 对于 `particles.js` 风格的配置，考虑兼容层。

## 有用的选项文档

- 重命名矩阵: [`/migrations/option-rename-matrix`](/zh/migrations/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/zh/options/particles-paint)
- `particles.color` 迁移说明: [`/options/particles-color`](/zh/options/particles-color)
- `particles.stroke` 迁移说明: [`/options/particles-stroke`](/zh/options/particles-stroke)

## 参考资料

- 旧版兼容与 particles.js 桥接: [`/migrations/particles-js`](/zh/migrations/particles-js)
- 安装矩阵: [`/guide/installation`](/zh/guide/installation)
- 仓库发布: <https://github.com/tsparticles/tsparticles/releases>
