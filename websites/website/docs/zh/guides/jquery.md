# jQuery 集成

使用官方 jQuery 插件封装将 tsParticles 集成到你的 jQuery 项目中。

## 安装

### 通过 CDN

通过 script 标签引入 jQuery、tsParticles 和 jQuery 插件：

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/jquery@4/tsparticles.jquery.min.js"></script>
```

---

### 通过 npm + 构建

安装所需包：

```bash
npm install jquery @tsparticles/jquery tsparticles
```

导入到你的项目中：

```javascript
import $ from "jquery";
import "@tsparticles/jquery";
```

## 引擎初始化

在渲染粒子之前，必须使用所需功能初始化 tsParticles 引擎。通过 `$.particles.init` 完成：

```javascript
(async () => {
  await $.particles.init(async (engine) => {
    const { loadFull } = await import("tsparticles");
    await loadFull(engine);
  });
})();
```

> **为什么需要这样做？** tsParticles 采用模块化架构。`loadFull` 注册所有内置形状、交互和更新器。你可以导入更小的包（例如 `tsparticles-slim`）来减小打包体积。

## 基本使用

引擎初始化完毕且 DOM 就绪后，选择一个容器元素并调用 `.particles().load()`：

```javascript
$(document).ready(async () => {
  await $.particles.init(async (engine) => {
    const { loadFull } = await import("tsparticles");
    await loadFull(engine);
  });

  $("#tsparticles")
    .particles()
    .load({
      background: {
        color: "#0d47a1",
      },
      particles: {
        number: { value: 80 },
        links: { enable: true, color: "#ffffff" },
        move: { enable: true },
      },
    });
});
```

容器元素必须存在于 DOM 中：

```html
<div id="tsparticles"></div>
```

## 自定义配置

`.load()` 方法接受完整的 `ISourceOptions` 对象。以下是一个综合示例：

```javascript
$("#tsparticles")
  .particles()
  .load({
    background: {
      color: "#000000",
    },
    fpsLimit: 120,
    particles: {
      color: {
        value: ["#ff0000", "#00ff00", "#0000ff"],
      },
      move: {
        direction: "none",
        enable: true,
        outModes: "bounce",
        speed: 4,
      },
      number: {
        density: {
          enable: true,
        },
        value: 60,
      },
      opacity: {
        value: 0.6,
      },
      shape: {
        type: ["circle", "square", "triangle"],
      },
      size: {
        value: { min: 2, max: 8 },
      },
      links: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
    },
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
        },
      },
    },
  });
```

## 预设加载

如果你已安装预设包（例如 `tsparticles-preset-stars`），在引擎初始化时加载它并在配置中引用：

```bash
npm install tsparticles-preset-stars
```

```javascript
(async () => {
  await $.particles.init(async (engine) => {
    const { loadStarsPreset } = await import("tsparticles-preset-stars");
    await loadStarsPreset(engine);
  });

  $("#tsparticles")
    .particles()
    .load({
      preset: "stars",
      background: { color: "#0d47a1" },
    });
})();
```

## 事件处理与容器控制

`.particles()` 返回一个 jQuery 插件实例。要访问底层的 tsParticles `Container` 并调用 `play()`、`pause()` 或 `destroy()` 等方法：

```javascript
const $container = $("#tsparticles");

// 加载粒子
$container.particles().load({
  /* 选项 */
});

// 几秒后播放/暂停
setTimeout(() => {
  const container = $container.particles().getContainer();
  container?.pause();
}, 5000);
```

## 完整示例

以下是一个完整的、自包含的 HTML 页面，通过 CDN 加载 tsParticles 并呈现带有交互效果的粒子场景：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>tsParticles + jQuery</title>
    <style>
      #tsparticles {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: #0d47a1;
      }
    </style>
  </head>
  <body>
    <div id="tsparticles"></div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/jquery@4/tsparticles.jquery.min.js"></script>
    <script>
      $(document).ready(async () => {
        await $.particles.init(async (engine) => {
          await tsParticles.loadFull(engine);
        });

        $("#tsparticles")
          .particles()
          .load({
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
            background: { color: "#0d47a1" },
          });
      });
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

| 方法                               | 描述                                    |
| ---------------------------------- | --------------------------------------- |
| `$.particles.init(fn)`             | 使用加载器回调初始化引擎                |
| `$(el).particles()`                | 在元素上创建粒子插件实例                |
| `$(el).particles().load(opts)`     | 加载并启动粒子配置                      |
| `$(el).particles().destroy()`      | 销毁粒子实例并清理                      |
| `$(el).particles().getContainer()` | 返回底层的 `Container` 以进行命令式控制 |
