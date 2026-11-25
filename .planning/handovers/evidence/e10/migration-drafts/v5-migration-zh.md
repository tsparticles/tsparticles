# v5 迁移指南 — E10 工作草稿

状态：E10 进行中（2026-11-25）。当前候选版本已通过 E9 已安装包和浏览器检查。本指南介绍 engine、wrapper、bundle 和颜色方面已实现的 v5 契约。根据更新后的 E10 大小标准，E0 大小上限仍作为诊断参考保留，并不表示已通过。runtime、分配和保留标准仍未完成：强制 HDR 下 M6/500 帧的 p95 仍高于固定的 E0 上限。

MCP 生成的 TypeScript 示例和 CLI Vanilla scaffold 使用重新构建的候选包通过了类型检查和 Chrome 初始化；CLI scaffold 也通过了生产构建。九类已打包模板均不含已移除的 Vue 2、Nuxt 2 或 Nuxt 3 变体。Vanilla、React、Vue 3、Solid 和 Lit 之外的生成组合、意大利语/西班牙语/法语/德语首稿之外的翻译、更广泛的 consumer review，以及硬件上的 HDR/browser 检查仍待完成。草稿和语言状态记录在 [`migration-drafts/`](README.md)。这些是内部草稿，不能作为最终发布指南。

当前网站的默认和本地化 Vanilla 指南逐字节相同，并引用已发布的 v4 CDN 包。v5 迁移页准备好发布前，这些 singleton 示例仍属于 v4 文档，不计入 v5 consumer 检查。

## Engine 所有权

将 `tsParticles` singleton 的导入替换为 `createEngine()`。在应用范围内保存返回的实例，传给每个 loader，并显式提供给 wrapper/provider。本地变量仍可命名为 `tsParticles`。组件 teardown 只管理它拥有的 container，不应销毁同一 engine 上无关的 container。

在 E2 实现中，随机数/logger 配置和动画调度归各自实例所有。将自定义 plugin 注册到 `container.engine`（或 `container.pluginManager.engine`），使 runtime 服务跟随所属 engine。

## 已移除的框架集成

| 集成                                 | 迁移目标                                    | 移除 / 验证      |
| ------------------------------------ | ------------------------------------------- | ---------------- |
| Vue 2 wrapper、demo 和 starter 引用  | 将应用迁移到 Vue 3 和 `@tsparticles/vue3`   | E1 移除；E9 复查 |
| Nuxt 2 wrapper、demo 和 starter 引用 | 将应用迁移到 Nuxt 4 和 `@tsparticles/nuxt4` | E1 移除；E9 复查 |
| Nuxt 3 wrapper、demo 和 starter 引用 | 将应用迁移到 Nuxt 4 和 `@tsparticles/nuxt4` | E1 移除；E9 复查 |

框架升级是应用迁移，不是简单的包名替换。E0 引用搜索位于 [`../../e0/retirement-references.txt`](../../e0/retirement-references.txt)。移除时还要检查 installer、生成文本、文档和翻译。矩阵也包含仍受支持、必须使用显式 engine 的 consumer。

## 已弃用的 API

返回 RGB 的 `colorMix()` 已移除。engine 的旧 helper `getStyleFromRgb()` 和 `getStyleFromHsl()`、HSV plugin 的 `getStyleFromHsv()`，以及 OKLCH 包的本地 formatter `getStyleFromOklch()` 也已移除。使用 `rgbToOklch()` 转换 RGB，使用 `rgbToOklch(hslToRgbFloat(color))` 转换 HSL；HSV option 则通过已注册的 HSV color manager 和 `rangeColorToOklch(engine.pluginManager, { value: { hsv: color } })` 解析。将规范化结果传给 engine 的 `getStyleFromOklch()`，由它处理目标 gamut 和 HDR 设置。如果输出确实只能是 RGB，则使用 `mapOklchToSrgb(result).rgb`。

### Interactor 生命周期钩子

Interactor 基类默认提供无操作的 `reset()`。外部 interactor 基类也提供无操作的 `clear()`。manager 在 interactor 初始化后选择自定义钩子，包括 redraw 初始化。保留维护状态或在 reset 阶段执行工作的 override；使用 `noImplicitOverride` 时添加 TypeScript `override` 修饰符。

参阅[已弃用 API 清单](../../e9/deprecated-migrations.md)，了解移除的颜色 formatter、Confetti 和 Ribbons option，以及保留的 opt-in particles.js 兼容接口。若将编译器升级到 Stencil 5，且注册必须在 hydration 前完成，请移除 `applyPolyfills()` 并等待 `defineCustomElements()`。当前 tsParticles Stencil wrapper 使用 Stencil 4，仍声明 `applyPolyfills()`。

## 颜色、选项和公开契约

颜色输入仍支持 RGB、HSL、HSV、HWB、Lab、LCH、OKLab、CSS 字符串、数组和范围。粒子动画现在采用 OKLCH：将旧 HSL 动画分量 `{ h, s, l }` 替换为 `{ h, c, l }`。Hue 仍为角度；chroma 和 lightness 使用 v5 OKLCH 数值尺度；alpha 仍是独立的不透明度值。不要把 HSL 饱和度复制到 chroma。请在输入边界转换颜色，或保留受支持的 CSS/RGB 输入让 engine 解析。实现颜色扩展点的 manager 必须遵循当前 OKLCH manager 契约。接受的输入、gamut mapping、alpha 和 HDR 行为见[颜色决策](../../../V5-COLOR-DECISIONS.md)。

## E1 实现的显式 Engine API

```ts
import { createEngine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const engine = createEngine();
await loadSlim(engine);
const container = await engine.load({ id: "particles", options: {} });
container?.destroy();
```

root、`/lazy` 和 browser module 入口不会创建 engine，也不会向 `globalThis` 发布对象。经典 Rollup 脚本公开 factory/loader namespace：

```js
const engine = tsParticles.createEngine();
await tsParticles.loadSlim(engine);
await engine.load({ id: "particles", options: {} });
```

独立 bundle 包含 engine 定义；外部 feature 脚本必须先加载匹配的 engine 及其依赖。保持包版本一致。namespace 存放定义，不是 engine。加载其他 bundle 不会销毁已创建的 engine。同一个 canvas 只能有一个所有者，即使 engine 副本来自不同 bundle 也一样。转移 canvas 前先销毁所有者。不同 canvas 上的相同 ID 在各 engine 间仍相互独立。

当应用需要隔离 plugin registry、随机源、logger、scheduler 或 container 所有权时，请使用独立 engine。每个要使用某 feature 的 engine 都必须注册该 feature：

```ts
import { createEngine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const editor = createEngine();
const preview = createEngine();
await Promise.all([loadSlim(editor), loadSlim(preview)]);

const editorContainer = await editor.load({ id: "editor", options: {} });
const previewContainer = await preview.load({ id: "preview", options: {} });

editorContainer?.destroy();
previewContainer?.destroy();
```

便利包导出 `createConfetti(engine)`、`createFireworks(engine)`、`createParticles(engine)` 和 `createRibbons(engine)`。返回的可调用函数绑定到该 engine，并保留 `init`、`create` 和 `version`：

```ts
import { createEngine } from "@tsparticles/engine";
import { createConfetti } from "@tsparticles/confetti";

const confetti = createConfetti(createEngine());
await confetti({ count: 30, spread: 70 });
```

`initPjs(engine)` 返回 `{ particlesJS, pJSDom, Particles }`，但不会将这些兼容 API 赋给 `globalThis`。`loadConfigs(engine)` 会将 catalog 和 palette 显式注册到该 engine。

| Wrapper 系列                                  | Engine 所有权和注册                                                                                                                       |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| React / Next.js                               | 将 `engine` 传给 `ParticlesProvider`，并提供会加载所需 plugin 的 `init` registrar。                                                       |
| Vue 3                                         | 使用 `{ engine, init }` 安装 particles provider；在后代中调用 `useParticlesProvider()`。                                                  |
| Angular                                       | 将 engine 传给 `service.init(engine, registrar)`，并为每个独立 engine 使用单独的 service provider。便利组件通过 `engine` input 接收实例。 |
| Preact、Solid、Inferno、Svelte、Stencil、Riot | 通过 component/provider API 提供 engine；若可用，用 `initParticlesEngine(engine, registrar)` 初始化。                                     |
| Qwik                                          | 在客户端创建并注册，通过 `noSerialize` 保存；不要在服务器渲染期间创建 engine。                                                            |
| Custom elements                               | 将 `.engine` 设为 property；它不是可序列化的 HTML attribute。                                                                             |
| Nuxt 4                                        | 使用已配置初始化 module 导出的 `engine` 和 `registerParticles`。                                                                          |

各 wrapper README 说明了框架专属签名和 SSR 限制。不要在 provider 内重新创建 module-level 隐式 engine。

组件 teardown 只销毁它拥有的 container。共享 engine 的生命周期由应用负责；丢弃 engine 前必须完成待处理的加载并销毁 containers。Runtime 服务属于各自 engine，应在加载 container 前配置：

```ts
const engine = createEngine();
engine.setRandom(myRandomFn);
engine.setLogger(myLogger);
engine.setAnimationFunctions(requestFrame, cancelFrame);
const container = await engine.load({ id: "particles", options });
```

旧的全局 API `setParticlesRandom`、`getParticlesRandom`、`getParticlesRandomFn`、`setParticlesLogger` 和 `getParticlesLogger` 已移除。请改用 `engine.setRandom`、`engine.getRandom`、`engine.getRandomFn`、`engine.setLogger` 和 `engine.getLogger`。自定义 plugin 可通过 `container.engine` 或 `container.pluginManager.engine` 找到所属 engine。Runtime helper 接收显式随机 provider；使用所属 engine 稳定的 `getRandomFn()` provider，使后续随机源修改生效且不影响其他 engine。动画调度也按 engine 隔离；创建 container 帧的 scheduler 负责取消这些帧。

### 初始化顺序

对于公开 `initParticlesEngine` 的 wrapper，在应用初始化时调用 `initParticlesEngine(engine, registrar)`。组件可以提前挂载：它们会等待该 engine 初始化，不会创建或初始化隐式 engine。jQuery 使用 `$.particles(engine).init(registrar)`。React/Vue provider 和 Angular service 初始化也会执行相同步骤。注册失败会拒绝当前等待者，之后可重新初始化。

## 模块和浏览器入口

标准 ESM API 请导入包根路径。需要延迟入口时使用 `/lazy` 子路径；动态加载不会恢复旧 singleton。已安装包检查覆盖 root 和 `/lazy` 的 ESM `import`、CJS `require` 和 `browser` 条件。

经典浏览器输出中，Rollup namespace 包含 factory 和 feature loader。namespace 脚本加载后创建 engine，并传给每个 loader。外部 feature 脚本依赖匹配的 engine 和共享依赖；使用一致的版本，并遵循 bundle browser README 中的加载顺序。独立 bundle 包含所选 features。加载 browser 入口或导入包根路径都不会自动创建 engine。

## 包边界和已移除的 Singleton API

从 `@tsparticles/engine` 导入 runtime 类型和 `createEngine`，然后只导入应用需要的 feature 包，例如 `@tsparticles/slim` 或专用 interaction、shape、updater 包。便利包是独立 adapter。优先使用已声明的 exports，不要导入其他包的内部 `dist` 或源码路径。E10 已安装包报告是当前 `exports`、类型声明和模块解析检查的依据。

导出的 engine singleton 和全局 engine 修改 helper 已移除。将 `setParticlesRandom`、`getParticlesRandom`、`getParticlesRandomFn`、`setParticlesLogger` 和 `getParticlesLogger` 替换为 container 所属 engine 上的对应方法。如果应用曾使用 `tsParticles.load`、`tsParticles.loadJSON` 或 `tsParticles.dom`，请在显式 engine 上调用这些操作，或保留返回的 container。不要从导入的 ESM/CJS 包访问 `window.tsParticles`；经典浏览器 bundle 会单独公开文档所述的 namespace。
