# 选项参考

`tsParticles` 的 options 体系较深，这一页可作为总览地图，帮助你在进入各子选项前先建立整体认知。

## 选择你的配置路径

- **快速视觉结果**: 从 preset 开始并覆盖关键字段。
- **完全控制**: 手动定义 `particles`、`interactivity`、`background`。
- **config-first 路径**: 从 `@tsparticles/configs` 起步，再逐步细化配置。

## 快速导航（本地）

- [`Background & Canvas`](/zh/options/background)
- [`Background Mask`](/zh/options/background-mask)
- [`Full Screen`](/zh/options/fullscreen)
- [`Motion`](/zh/options/motion)
- [`Manual Particles`](/zh/options/manual-particles)
- [`Themes`](/zh/options/themes)
- [`Particles`](/zh/options/particles)
- [`Particles Number`](/zh/options/particles-number)
- [`Particles Move`](/zh/options/particles-move)
- [`Particles Links`](/zh/options/particles-links)
- [`Particles Palette`](/zh/options/particles-palette)
- [`Particles Shape`](/zh/options/particles-shape)
- [`Particles Collisions`](/zh/options/particles-collisions)
- [`Particles Life`](/zh/options/particles-life)
- [`Particles Orbit`](/zh/options/particles-orbit)
- [`Particles Roll`](/zh/options/particles-roll)
- [`Particles Rotate`](/zh/options/particles-rotate)
- [`Interactivity`](/zh/options/interactivity)
- [`Interactivity Click`](/zh/options/interactivity-click)
- [`Interactivity Hover`](/zh/options/interactivity-hover)
- [`Interactivity Div`](/zh/options/interactivity-div)
- [`Interactivity Events`](/zh/options/interactivity-events)
- [`Interactivity Modes`](/zh/options/interactivity-modes)
- [`Plugin: Absorbers`](/zh/options/plugin-absorbers)
- [`Plugin: Emitters`](/zh/options/plugin-emitters)
- [`Plugin: Infection`](/zh/options/plugin-infection)
- [`Plugin: Polygon Mask`](/zh/options/plugin-polygon-mask)
- [`Performance Guide`](/zh/options/performance)

## 粒子深度页面

- [`Particles Bounce`](/zh/options/particles-bounce)
- [`Particles Color`](/zh/options/particles-color)
- [`Particles Destroy`](/zh/options/particles-destroy)
- [`Particles Group`](/zh/options/particles-group)
- [`Particles Opacity`](/zh/options/particles-opacity)
- [`Particles Palette`](/zh/options/particles-palette)
- [`Particles Repulse`](/zh/options/particles-repulse)
- [`Particles Shadow`](/zh/options/particles-shadow)
- [`Particles Size`](/zh/options/particles-size)
- [`Particles Stroke`](/zh/options/particles-stroke)
- [`Particles Tilt`](/zh/options/particles-tilt)
- [`Particles Twinkle`](/zh/options/particles-twinkle)
- [`Particles Wobble`](/zh/options/particles-wobble)
- [`Particles ZIndex`](/zh/options/particles-zindex)

## 参考文档在哪里

- 主 options 文档: [`tsparticles/markdown/Options.md`](https://github.com/tsparticles/tsparticles/blob/main/markdown/Options.md)
- 详细 options 页面: [`tsparticles/markdown/Options/`](https://github.com/tsparticles/tsparticles/tree/main/markdown/Options)
- TypeScript 接口: [`tsparticles/engine/src/Options/Interfaces`](https://github.com/tsparticles/tsparticles/tree/main/engine/src/Options/Interfaces)

## 最常用的 root options

- `background`
- `fullScreen`
- `interactivity`
- `particles`
- `detectRetina`
- `preset`
- `responsive`

## 最常用的区块

- `background`: canvas 背景与遮罩的基础设置。
- `particles.number`: 粒子数量与密度。
- `particles.move`: 速度、方向与 out modes。
- `particles.shape`: 圆形、多边形、图片、表情或自定义。
- `particles.palette`: 快速切换协调色组。
- `interactivity`: hover/click 模式与外部效果。
- `detectRetina`: 高 DPI 屏幕下的画质与性能平衡。

## 粒子地图（嵌套视图）

在进入单页详情前，可先参考下列导航树：

```text
particles
|- number
|- color
|- shape
|- size
|- opacity
|- move
|- links
|- collisions
|- life
|- destroy
|- group
|- orbit
|- repulse
|- roll
|- rotate
|- shadow
|- stroke
|- tilt
|- twinkle
|- wobble
|- zIndex
`- palette
```

建议先读 root 文档，再进入深度页面：

- 基础: [`Particles`](/zh/options/particles)
- 深入阅读: [`Particles Number`](/zh/options/particles-number), [`Particles Move`](/zh/options/particles-move), [`Particles Links`](/zh/options/particles-links)

## 稳妥的 options 配置流程

1. 从 demos 或 presets 中可运行的配置开始。
2. 每次只修改一个区块。
3. 在应用代码中使用 TypeScript（`IOptions`）校验。
4. 将生产配置放到专用 JSON 文件中。

## 最小类型示例

```ts
import type { ISourceOptions } from "@tsparticles/engine";

export const particlesOptions: ISourceOptions = {
  fpsLimit: 60,
  particles: {
    number: { value: 70 },
    move: { enable: true, speed: 1.5 },
  },
};
```

## 性能护栏

- 非必要情况下优先使用 `@tsparticles/slim`。
- 粒子数量应与容器面积成比例。
- 在真实设备上做 profile 后再添加重交互。

## 相关参考

- configs package 文档: <https://github.com/tsparticles/tsparticles/blob/main/utils/configs/README.md>
- presets 目录: <https://github.com/tsparticles/tsparticles/tree/main/presets>
- palettes 目录: <https://github.com/tsparticles/tsparticles/tree/main/palettes>

每个子选项的完整细节，可继续查阅上方链接的 `tsparticles/markdown/Options` 源页面。
