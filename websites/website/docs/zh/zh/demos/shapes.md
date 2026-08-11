# 形状目录

本目录列出了最常用的 `particles.shape.type` 值，并说明何时可以通过 `particles.shape.options` 添加形状专属控制。

源码目录：

- <https://github.com/tsparticles/tsparticles/tree/main/shapes>
- 形状选项参考：[`/options/particles-shape`](/zh/options/particles-shape)

## 常见形状类型

- `circle`（默认，无额外形状选项）
- `square` / `edge`（无额外形状选项）
- `triangle`（无额外形状选项）
- `line`（无额外形状选项）
- `polygon`（`options.polygon.sides`）
- `star`（`options.star.sides`、`options.star.inset`）
- `text`（`options.text.value`、`font`、`weight`、`style`、`close`）
- `emoji`（`options.emoji.value`）
- `image` / `images`（`options.image.src`、`name`、`width`、`height`、`gif`、`replaceColor`、`close`）

## 别名与 bundle 说明

- `square` 与 `edge` 是同一种形状的别名。
- `character` 与 `char` 是同一组选项的别名。
- `image` 与 `images` 使用同一个选项对象。
- 大多数高级形状需要 `@tsparticles/slim`（或 `@tsparticles/all`）或独立 shape 包。

如需通过 Start/Pause 控件和可编辑 JSON 快速测试，请使用 [`/playground/shapes`](/zh/playground/shapes)。
