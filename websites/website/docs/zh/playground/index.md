# 游乐场

按用例划分：

- [`Configs Playground`](/zh/playground/configs)：更丰富的演示，具有完整的可编辑选项。
- [`Shapes Playground`](/zh/playground/shapes)：聚焦 `shape.type` 的演示，在可用时提供形状专属选项。
- [`Presets Playground`](/zh/playground/presets)：官方预设名称演示 (`{ preset: "..." }`)。
- [`Palettes Playground`](/zh/playground/palettes)：来自预设项目的以调色板为中心的演示。
- [`Bundles Playground`](/zh/playground/bundles)：`@tsparticles/confetti`、`@tsparticles/fireworks`、`@tsparticles/particles` 和 `@tsparticles/ribbons` 的专用游乐场。

执行始终**仅由用户触发**（无自动播放）。

## 共享流程

各个游乐场的布局是一致的：

1. 首先画布预览。
2. 启动/暂停/恢复/销毁控件。
3. 选项的 JSON 编辑器。

4. 从菜单中选择一个演示。
5. 按 `Start` 运行它（无自动播放）。
6. 在编辑器中编辑 JSON。
7. 再次按 `Start` 以重新加载新选项。
8. 使用`Pause`/`Resume`来控制性能和CPU使用率。

> 注意：`Destroy` 完全释放容器实例。

## 建议的工作流程

- 在此进行原型制作，直至效果稳定。
- 将最终的 JSON 复制到您的项目中。
- 在应用程序代码中键入 `ISourceOptions`。
