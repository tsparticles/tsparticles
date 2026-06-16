---
title: Angular 集成
description: 将 tsParticles 集成到 Angular 应用中的分步指南，使用 @tsparticles/angular。
---

# Angular 集成

`@tsparticles/angular` 包提供了用于 tsParticles 的 Angular 组件、模块和服务。本指南涵盖了传统的 `NgModule` 方式以及 Angular 17+ 的独立组件。

---

## 安装

```bash
npm install @tsparticles/angular @tsparticles/engine
```

如需完整功能集，请安装完整包：

```bash
npm install tsparticles
```

可选的预设包：

```bash
npm install @tsparticles/preset-confetti
npm install @tsparticles/preset-fireworks
npm install @tsparticles/preset-snow
npm install @tsparticles/preset-stars
```

---

## 基本使用（NgModule）

### 1. 导入模块

```typescript
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgParticlesModule } from "@tsparticles/angular";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgParticlesModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### 2. 初始化引擎

```typescript
import { Component, OnInit } from "@angular/core";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import { NgParticlesService } from "@tsparticles/angular";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    void this.ngParticlesService.init(async (engine: Engine) => {
      await loadFull(engine);
    });
  }

  particlesOptions: ISourceOptions = {
    background: {
      color: "#0d47a1",
    },
    fpsLimit: 120,
    particles: {
      number: {
        value: 80,
      },
      color: {
        value: "#ffffff",
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.5,
      },
      size: {
        value: { min: 1, max: 5 },
      },
      links: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        outModes: "out",
      },
    },
  };

  particlesLoaded(container: Container): void {
    console.log("粒子容器已加载", container);
  }
}
```

### 3. 模板

```html
<ngx-particles
  id="tsparticles"
  [options]="particlesOptions"
  (particlesLoaded)="particlesLoaded($event)"
></ngx-particles>
```

---

## 引擎初始化详情

`NgParticlesService.init()` 方法必须且只调用一次，通常在 `AppComponent.ngOnInit()` 中调用。它接收一个回调函数，在其中加载应用所需的插件/预设。

```typescript
import { Component, OnInit } from "@angular/core";
import { NgParticlesService } from "@tsparticles/angular";
import type { Engine } from "@tsparticles/engine";

@Component({ ... })
export class AppComponent implements OnInit {
  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    void this.ngParticlesService.init(async (engine: Engine) => {
      // 只加载所需功能以减小打包体积
      await loadBasic(engine);       // 基础形状 + 移动
      await loadEmittersPlugin(engine); // 发射器形状
    });
  }
}
```

从 `tsparticles` 可用的加载函数：

| 函数                | 描述                             |
| ------------------- | -------------------------------- |
| `loadFull(engine)`  | 所有功能（最大包）               |
| `loadBasic(engine)` | 核心形状（圆形、方形、多边形等） |
| `loadSlim(engine)`  | 大部分功能，移除不常用插件       |
| `loadAll(engine)`   | `loadFull` 的已弃用别名          |

---

## 五彩纸屑效果

```bash
npm install @tsparticles/preset-confetti
```

```typescript
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

// 在 NgParticlesService.init 回调中：
await loadConfettiPreset(engine);
```

```typescript
particlesOptions: ISourceOptions = {
  preset: "confetti",
  background: {
    color: "transparent",
  },
};
```

或者使用便捷的 `<ngx-confetti>` 组件：

```typescript
// app.module.ts
import { NgParticlesModule } from "@tsparticles/angular";

@NgModule({
  imports: [NgParticlesModule],
})
export class AppModule {}
```

```html
<ngx-confetti
  [options]="{
    particleCount: 200,
    colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00']
  }"
></ngx-confetti>
```

---

## 烟花效果

```bash
npm install @tsparticles/preset-fireworks
```

```typescript
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";

// 在 NgParticlesService.init 回调中：
await loadFireworksPreset(engine);
```

```typescript
particlesOptions: ISourceOptions = {
  preset: "fireworks",
  background: {
    color: "#000000",
  },
};
```

或者使用 `<ngx-fireworks>` 组件：

```html
<ngx-fireworks
  [options]="{
    explosion: 8,
    intensity: 30,
    flickering: 50,
    traceLength: 3
  }"
></ngx-fireworks>
```

> 避免自动启动烟花效果；将其绑定到用户操作（点击、滚动）上，以防止不必要的资源消耗。

---

## 自定义粒子配置

带交互功能的完整自定义粒子设置：

```typescript
import { Component, OnInit } from "@angular/core";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import { NgParticlesService } from "@tsparticles/angular";

@Component({
  selector: "app-particles",
  templateUrl: "./particles.component.html",
})
export class ParticlesComponent implements OnInit {
  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    void this.ngParticlesService.init(async (engine: Engine) => {
      await loadFull(engine);
    });
  }

  particlesOptions: ISourceOptions = {
    background: {
      color: "#0d0d0d",
    },
    fpsLimit: 60,
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
        },
      },
      color: {
        value: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"],
      },
      shape: {
        type: ["circle", "square", "triangle"],
      },
      opacity: {
        value: 0.8,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          sync: false,
        },
      },
      size: {
        value: { min: 2, max: 8 },
        random: true,
        anim: {
          enable: true,
          speed: 4,
          size_min: 1,
          sync: false,
        },
      },
      links: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.3,
        width: 1,
        triangles: {
          enable: true,
          color: "#ffffff",
          opacity: 0.05,
        },
      },
      move: {
        enable: true,
        speed: 3,
        direction: "none",
        random: true,
        straight: false,
        outModes: "bounce",
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 600,
        },
      },
      life: {
        duration: {
          value: 5,
          random: true,
        },
        count: 0,
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab",
        },
        onClick: {
          enable: true,
          mode: "push",
        },
        resize: {
          enable: true,
        },
      },
      modes: {
        grab: {
          distance: 200,
          links: {
            opacity: 0.5,
          },
        },
        push: {
          quantity: 4,
        },
      },
    },
    detectRetina: true,
  };

  particlesLoaded(container: Container): void {
    console.log("容器已加载", container);
  }
}
```

```html
<ngx-particles
  id="tsparticles"
  [options]="particlesOptions"
  (particlesLoaded)="particlesLoaded($event)"
></ngx-particles>
```

---

## 事件

`ngx-particles` 组件触发 `particlesLoaded` 事件：

```typescript
import type { Container } from "@tsparticles/engine";

// 组件方法
onParticlesLoaded(container: Container): void {
  // 访问容器 API
  container.pause();
  container.play();
  container.destroy();
  container.exportImage().then((blob) => { /* ... */ });
}
```

```html
<ngx-particles
  id="tsparticles"
  [options]="particlesOptions"
  (particlesLoaded)="onParticlesLoaded($event)"
></ngx-particles>
```

容器引用让你拥有完整的程序化控制权：暂停、恢复、销毁、导出等功能。

---

## 模板语法与条件渲染

使用 Angular 结构型指令来切换组件：

```html
<button (click)="showParticles = !showParticles">切换粒子</button>

<ngx-particles
  *ngIf="showParticles"
  id="tsparticles"
  [options]="particlesOptions"
  (particlesLoaded)="particlesLoaded($event)"
></ngx-particles>
```

```typescript
export class AppComponent {
  showParticles = true;
  // ...
}
```

当 `*ngIf` 求值为 `false` 时，组件（包括画布和所有粒子实例）将被销毁。重新创建时将从头开始重新初始化。

---

## 独立组件（Angular 17+）

在 Angular 17+ 中，你可以直接将 `NgParticlesModule` 导入到独立组件中：

```typescript
import { Component, OnInit } from "@angular/core";
import { NgParticlesModule, NgParticlesService } from "@tsparticles/angular";
import { loadFull } from "tsparticles";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

@Component({
  selector: "app-particles",
  standalone: true,
  imports: [NgParticlesModule],
  template: `
    <ngx-particles
      id="tsparticles"
      [options]="particlesOptions"
      (particlesLoaded)="particlesLoaded($event)"
    ></ngx-particles>
  `,
})
export class ParticlesComponent implements OnInit {
  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    void this.ngParticlesService.init(async (engine: Engine) => {
      await loadFull(engine);
    });
  }

  particlesOptions: ISourceOptions = {
    background: { color: "#000" },
    particles: {
      number: { value: 50 },
      color: { value: "#fff" },
      shape: { type: "circle" },
      move: { enable: true, speed: 2 },
    },
  };

  particlesLoaded(container: Container): void {
    console.log("已加载", container);
  }
}
```

无需 `NgModule` 包装——只需在组件的 `imports` 数组中导入 `NgParticlesModule`。

---

## 完整组件示例

### app.component.ts

```typescript
import { Component, OnInit } from "@angular/core";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { NgParticlesService } from "@tsparticles/angular";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "tsParticles Angular 演示";

  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    void this.ngParticlesService.init(async (engine: Engine) => {
      await loadSlim(engine);
    });
  }

  particlesOptions: ISourceOptions = {
    autoPlay: true,
    background: {
      color: "#1e1e2e",
      image: "",
      position: "50% 50%",
      repeat: "no-repeat",
      size: "cover",
    },
    backgroundMask: {
      cover: {
        color: "#1e1e2e",
      },
      enable: false,
    },
    fullScreen: {
      enable: true,
      zIndex: -1,
    },
    detectRetina: true,
    fpsLimit: 60,
    particles: {
      color: {
        value: "#cdd6f4",
      },
      links: {
        color: "#cdd6f4",
        distance: 150,
        enable: true,
        opacity: 0.3,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
      },
      number: {
        value: 60,
      },
      opacity: {
        value: 0.6,
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
  };

  particlesLoaded(container: Container): void {
    console.log("粒子已加载", container);
  }
}
```

### app.component.html

```html
<div style="position: relative; width: 100%; height: 100vh;">
  <ngx-particles
    id="tsparticles"
    [options]="particlesOptions"
    (particlesLoaded)="particlesLoaded($event)"
  ></ngx-particles>

  <div
    style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; text-align: center;"
  >
    <h1>{{ title }}</h1>
    <p>粒子正在后台运行。</p>
  </div>
</div>
```

### app.component.css

```css
:host {
  display: block;
  width: 100%;
  height: 100%;
}
```

---

## API 参考

| 组件     | 选择器          | 描述                 |
| -------- | --------------- | -------------------- |
| 粒子     | `ngx-particles` | 完整的粒子系统组件   |
| 五彩纸屑 | `ngx-confetti`  | 预配置的五彩纸屑效果 |
| 烟花     | `ngx-fireworks` | 预配置的烟花效果     |

### `ngx-particles` 输入属性

| 输入属性  | 类型             | 默认值          | 描述               |
| --------- | ---------------- | --------------- | ------------------ |
| `id`      | `string`         | `"tsparticles"` | 画布元素 ID        |
| `options` | `ISourceOptions` | `{}`            | 粒子配置           |
| `url`     | `string`         | —               | 远程 JSON 配置 URL |
| `theme`   | `string`         | —               | Theme name (requires `@tsparticles/plugin-themes`; safe no-op otherwise). |

### `ngx-particles` 输出事件

| 输出事件          | 负载类型    | 描述                   |
| ----------------- | ----------- | ---------------------- |
| `particlesLoaded` | `Container` | 当容器初始化完成时触发 |

---


## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## 故障排除

- **空白/不可见画布** — 确保父元素有明确的高度（例如 `height: 100vh`）。画布会采用容器尺寸。
- **`NgParticlesService.init()` 被多次调用** — 只调用一次，通常在 `AppComponent.ngOnInit()` 中。后续调用安全但多余。
- **找不到模块** — 确认 `@tsparticles/angular` 已在 `package.json` 的依赖项中列出，并且已导入 `NgParticlesModule`。
- **`NullInjectorError: No provider for NgParticlesService`** — 你必须在提供该组件的模块中导入 `NgParticlesModule`（或重新导出它）。
