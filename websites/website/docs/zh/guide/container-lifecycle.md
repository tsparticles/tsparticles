# 容器生命周期

`Container` 是 `tsParticles.load(...)` 返回的运行时实例。

## 基本生命周期

```ts
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

container = await tsParticles.load({ id: "tsparticles", options });
container.pause();
container.play();
container.destroy();
```

## 推荐模式

- `start`：使用当前选项创建/重新创建容器。
- `stop`: `pause()` 当不可见或不需要时。
- `resume`: `play()` 当用户想要恢复动画时。
- `destroy`：关于路线/组件拆卸的免费资源。

## 来源参考

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Container.md>
