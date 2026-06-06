# 捆绑包：tsparticles（Full）

`tsparticles`（npm：`tsparticles`，加载器：`loadFull`）是官方的完整捆绑包。包含 Slim 的所有功能，加上发射器、吸收器、文本形状和高级动画（摆动、滚动、倾斜、闪烁、销毁）。

## 包含的功能

继承 `@tsparticles/slim` 的全部功能，外加：

**额外的形状：** 文本（支持自定义字体）

**额外的外部交互：**

- drag（用鼠标拖拽粒子）
- trail（鼠标后的粒子拖尾）

**额外的更新器：**

- destroy（粒子销毁动画）
- roll（滚动）
- tilt（3D 倾斜）
- twinkle（间歇闪烁）
- wobble（摆动）

**插件：**

- absorbers（吸收粒子黑洞）
- emitters（持续粒子源）
- emitters-shape-circle、emitters-shape-square（发射器形状）

## 何时使用

- 需要发射器（持续生成粒子）
- 需要吸收器（吸收粒子）
- 需要带有自定义字体的文本形状
- 需要高级动画（摆动、倾斜、滚动、闪烁）
- 在使用单个插件之前的良好过渡选择

## 安装

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/engine tsparticles
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

await loadFull(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    background: { color: "#000" },
    particles: {
      number: { value: 50 },
      shape: { type: "text", options: { text: ["🔥", "✨", "⭐"] } },
      size: { value: 24 },
      move: { enable: true, speed: 1 },
      wobble: { enable: true, distance: 10 },
    },
    emitters: {
      direction: "top",
      rate: { quantity: 2, delay: 0.3 },
    },
  },
});
```

### CDN（script 标签）

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.bundle.min.js"></script>
<script>
  (async () => {
    await loadFull(tsParticles);

    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 80 },
          move: { enable: true, speed: 2 },
        },
        absorbers: [{ color: "#ff0000", size: { value: 50 } }],
      },
    });
  })();
</script>
```

## `tsparticles` 与 `@tsparticles/all` 的区别

| 方面     | `tsparticles`（full）                             | `@tsparticles/all`                                               |
| -------- | ------------------------------------------------- | ---------------------------------------------------------------- |
| 大小     | 适中                                              | 非常大                                                           |
| 形状     | 圆形、方形、星形、多边形、线条、图片、emoji、文本 | 所有形状（心形、扑克花色、箭头、螺旋、齿轮、圆角矩形等）         |
| 交互     | Slim + drag + trail                               | 全部（cannon、light、pop、particle、repulse）                    |
| 路径     | 仅 Quad 缓动                                      | 14 种路径生成器                                                  |
| 效果     | 无                                                | 5 种效果（气泡、滤镜、阴影等）                                   |
| 导出     | 无                                                | 图片、JSON、视频                                                 |
| 额外插件 | absorbers、emitters                               | 全部（声音、主题、拖尾、缩放、多边形遮罩、画布遮罩、背景遮罩等） |
| 缓动     | Quad                                              | 15 种缓动                                                        |

## 常见错误

- 混淆 `tsparticles` 和 `@tsparticles/all`——它们是不同的包。
- 在 `loadFull(tsParticles)` 之前调用 `tsParticles.load()`。
- npm 包名是 `tsparticles`（不是 `@tsparticles/full`），加载器是 `loadFull`。

## 参见

- [捆绑包概览](/zh/guide/bundles)
- [安装指南](/zh/guide/installation)
