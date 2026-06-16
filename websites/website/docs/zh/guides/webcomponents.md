# Web Components

通过 `@tsparticles/webcomponents` 包将 tsParticles 与原生的 Web Components 一起使用。这种方法无需任何框架——只需要原生 JavaScript 和自定义元素。

## 安装

### 通过 CDN

包含 tsParticles 核心和 Web Components 包：

```html
<script src="https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/webcomponents@4/tsparticles.webcomponents.min.js"></script>
```

### 通过 npm + 构建

```bash
npm install @tsparticles/webcomponents tsparticles
```

然后导入到你的 JavaScript 包中：

```javascript
import { initParticlesEngine, defineParticlesElement } from "@tsparticles/webcomponents";
```

## 引擎初始化

在 `<web-particles>` 元素能够渲染之前，必须使用所需功能初始化引擎。使用回调调用 `initParticlesEngine`，加载所需的插件：

```javascript
import { initParticlesEngine } from "@tsparticles/webcomponents";

const { loadFull } = await import("tsparticles");

await initParticlesEngine(async (engine) => {
  await loadFull(engine);
});
```

> **为什么需要 `loadFull`？** 它注册所有内置形状（圆形、方形、多边形、图片等）、交互（悬停、点击）和更新器（透明度、大小、颜色等）。对于更小的包，使用 `tsparticles-slim` 或按需选择单个插件。

## 定义自定义元素

引擎初始化后，注册 `<web-particles>` 自定义元素：

```javascript
import { defineParticlesElement } from "@tsparticles/webcomponents";

defineParticlesElement();
```

这将 `web-particles` 标签注册到浏览器的 `CustomElementRegistry`。可以安全地多次调用——重复注册会被忽略。

## 基本使用

`initParticlesEngine` 和 `defineParticlesElement` 都运行后，直接在 HTML 中使用该元素：

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>tsParticles Web Components</title>
  </head>
  <body>
    <web-particles id="tsparticles"></web-particles>

    <script type="module">
      import { initParticlesEngine, defineParticlesElement } from "@tsparticles/webcomponents";

      const { loadFull } = await import("tsparticles");

      await initParticlesEngine(async (engine) => {
        await loadFull(engine);
      });

      defineParticlesElement();

      const el = document.getElementById("tsparticles");
      el.options = {
        background: { color: "#0d47a1" },
        particles: {
          number: { value: 80 },
          links: { enable: true, color: "#ffffff" },
          move: { enable: true, speed: 2 },
        },
      };
    </script>
  </body>
</html>
```

## 自定义配置

`<web-particles>` 元素通过 `options` 属性（JavaScript 对象）或通过 `options` 属性（JSON）接受配置。

### 通过 JavaScript 属性

```javascript
const el = document.querySelector("web-particles");
el.options = {
  background: { color: "#000000" },
  fpsLimit: 60,
  particles: {
    color: { value: ["#ff0000", "#00ff00", "#0000ff"] },
    links: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
    },
    move: {
      enable: true,
      speed: 3,
      outModes: "bounce",
    },
    number: { value: 60 },
    opacity: { value: 0.6 },
    shape: { type: ["circle", "square"] },
    size: { value: { min: 2, max: 6 } },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
      onClick: { enable: true, mode: "push" },
    },
    modes: {
      repulse: { distance: 200 },
      push: { quantity: 4 },
    },
  },
};
```

### 通过 HTML 属性（JSON）

```html
<web-particles
  id="tsparticles"
  options='{
    "background": { "color": "#0d47a1" },
    "particles": {
      "number": { "value": 50 },
      "links": { "enable": true, "color": "#ffffff" },
      "move": { "enable": true, "speed": 2 }
    }
  }'
></web-particles>
```

> 使用 `options` 属性时，该值必须是有效的 JSON。对于复杂配置，推荐使用属性赋值方式。

## 动态创建

你可以完全在 JavaScript 中创建 `<web-particles>` 元素，并随时将其添加到 DOM：

```javascript
import { initParticlesEngine, defineParticlesElement } from "@tsparticles/webcomponents";

const { loadFull } = await import("tsparticles");

await initParticlesEngine(async (engine) => {
  await loadFull(engine);
});

defineParticlesElement();

function createParticles(container, config) {
  const el = document.createElement("web-particles");
  el.id = "dynamic-particles";
  el.style.position = "absolute";
  el.style.width = "100%";
  el.style.height = "100%";
  el.style.top = "0";
  el.style.left = "0";
  el.options = config;
  container.appendChild(el);
  return el;
}

// 使用
const particles = createParticles(document.body, {
  background: { color: "#1a1a2e" },
  particles: {
    number: { value: 100 },
    links: { enable: true, color: "#e94560" },
    move: { enable: true, speed: 1 },
  },
});
```

## 扩展自定义元素

你可以继承 `ParticlesElement` 来创建带有内置配置的自定义元素：

```javascript
import { initParticlesEngine, ParticlesElement } from "@tsparticles/webcomponents";

const { loadFull } = await import("tsparticles");

await initParticlesEngine(async (engine) => {
  await loadFull(engine);
});

class MyParticlesBackground extends ParticlesElement {
  constructor() {
    super();
    this.style.position = "fixed";
    this.style.top = "0";
    this.style.left = "0";
    this.style.width = "100%";
    this.style.height = "100%";
    this.style.zIndex = "-1";
  }

  connectedCallback() {
    this.options = {
      background: { color: "#0d47a1" },
      particles: {
        number: { value: 80 },
        links: { enable: true, color: "#ffffff" },
        move: { enable: true, speed: 2 },
      },
    };
    super.connectedCallback();
  }
}

customElements.define("my-particles-bg", MyParticlesBackground);
```

使用：

```html
<my-particles-bg></my-particles-bg>
```

## 容器访问和控制

自定义元素暴露了 tsParticles `Container` 实例，用于命令式控制：

```javascript
const el = document.querySelector("web-particles");

// 访问容器（在 connectedCallback 之后可用）
const container = el.container;
container?.pause();
container?.play();

// 销毁并清理
el.dispose();
```

## 完整示例

一个使用 CDN 脚本的完整 HTML 页面：

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>tsParticles Web Components 演示</title>
    <style>
      body {
        margin: 0;
        overflow: hidden;
      }
      web-particles {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
      .content {
        position: relative;
        z-index: 1;
        color: white;
        text-align: center;
        padding-top: 20vh;
        font-family: sans-serif;
      }
    </style>
  </head>
  <body>
    <div class="content">
      <h1>tsParticles + Web Components</h1>
      <p>原生自定义元素，无需框架。</p>
    </div>

    <web-particles id="tsparticles"></web-particles>

    <script type="module">
      import {
        initParticlesEngine,
        defineParticlesElement,
      } from "https://cdn.jsdelivr.net/npm/@tsparticles/webcomponents@4/tsparticles.webcomponents.min.js";

      const tsParticles = window.tPparticles;

      await initParticlesEngine(async (engine) => {
        await tsParticles.loadFull(engine);
      });

      defineParticlesElement();

      const el = document.getElementById("tsparticles");
      el.options = {
        background: { color: "#0d47a1" },
        fpsLimit: 60,
        particles: {
          number: { value: 100 },
          color: { value: "#ffffff" },
          links: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
          },
          move: {
            enable: true,
            speed: 2,
            outModes: "out",
          },
          size: {
            value: { min: 1, max: 4 },
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
            onClick: { enable: true, mode: "push" },
          },
          modes: {
            grab: { distance: 200, links: { opacity: 0.5 } },
            push: { quantity: 4 },
          },
        },
      };
    </script>
  </body>
</html>
```


## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## API 参考

| 导出 / 属性                     | 类型                     | 描述                                  |
| ------------------------------- | ------------------------ | ------------------------------------- |
| `initParticlesEngine(callback)` | `function`               | 使用插件加载器初始化 tsParticles 引擎 |
| `defineParticlesElement()`      | `function`               | 注册 `<web-particles>` 自定义元素     |
| `ParticlesElement`              | `class`                  | 可继承的基础类用于创建自定义元素      |
| `element.options`               | `ISourceOptions`         | 获取/设置粒子配置对象                 |
| `element.container`             | `Container \| undefined` | 底层 `Container` 的只读引用           |
| `element.dispose()`             | `function`               | 销毁粒子实例并清理资源                |
