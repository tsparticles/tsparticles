# 模板和资源

tsParticles 提供两类模板：**脚手架模板**（框架骨架）和**用例模板**（完整示例应用）。

## 通过 CLI 快速开始

使用模板最简单的方式是通过 CLI：

```bash
npm create tsparticles@latest
```

或者直接使用特定的包：

```bash
npm create particles@latest
npm create confetti@latest
npm create ribbons@latest
```

非交互式用法：

```bash
npx tsparticles-create app my-project --template scaffold --framework react
npx tsparticles-create app my-project --template confetti --framework vanilla
```

## 脚手架模板

脚手架模板提供了一个最小的 Vite + TypeScript 项目骨架，并预配置了 tsParticles。以下框架可用：

| 框架    | CLI 选项              | 包                               |
| ------- | --------------------- | -------------------------------- |
| Vanilla | `--framework vanilla` | `@tsparticles/template-scaffold` |
| React   | `--framework react`   | `@tsparticles/template-scaffold` |
| Vue 3   | `--framework vue3`    | `@tsparticles/template-scaffold` |
| Angular | `--framework angular` | `@tsparticles/template-scaffold` |
| Svelte  | `--framework svelte`  | `@tsparticles/template-scaffold` |
| Solid   | `--framework solid`   | `@tsparticles/template-scaffold` |

示例：

```bash
npx tsparticles-create app my-react-app --template scaffold --framework react
cd my-react-app
npm install
npm run dev
```

## 用例模板

用例模板是完整的示例应用，展示了 tsParticles 的实际应用场景。

| 模板        | 描述                         | CLI 模板名称 | 包                                |
| ----------- | ---------------------------- | ------------ | --------------------------------- |
| Login       | 带粒子背景的登录/注册页面    | `login`      | `@tsparticles/template-login`     |
| Portfolio   | 带动画英雄区的个人作品集     | `portfolio`  | `@tsparticles/template-portfolio` |
| Landing     | 带冲击力粒子的营销着陆页     | `landing`    | `@tsparticles/template-landing`   |
| Tic Tac Toe | 带五彩纸屑庆祝的井字游戏     | `tictactoe`  | `@tsparticles/template-tictactoe` |
| Confetti    | 五彩纸屑大炮演示             | `confetti`   | `@tsparticles/template-confetti`  |
| Ribbons     | 丝带动画演示                 | `ribbons`    | `@tsparticles/template-ribbons`   |
| Particles   | 经典的 particles.js 风格演示 | `particles`  | `@tsparticles/template-particles` |

示例：

```bash
npx tsparticles-create app my-portfolio --template portfolio --framework vanilla
cd my-portfolio
npm install
npm run dev
```

## npm create 包装器

对于特定包的模板，您可以使用专用的 npm create 包装器：

| 命令                            | 模板        | 框架    | 安装的包                 |
| ------------------------------- | ----------- | ------- | ------------------------ |
| `npm create tsparticles@latest` | 交互式      | 交互式  | 用户选择                 |
| `npm create particles@latest`   | `particles` | Vanilla | `@tsparticles/particles` |
| `npm create confetti@latest`    | `confetti`  | Vanilla | `@tsparticles/confetti`  |
| `npm create ribbons@latest`     | `ribbons`   | Vanilla | `@tsparticles/ribbons`   |

## CLI 参考

```bash
tsparticles-create app [destination] [options]

Options:
  --template <name>     Template to use (scaffold|login|portfolio|landing|tictactoe|confetti|ribbons|particles)
  --framework <name>    Framework (vanilla|react|vue3|angular|svelte|solid)
  --skip-install        Skip npm install after scaffolding
  -h, --help            Display help
```

## 相关页面

- [`/guide/frameworks`](/guide/frameworks)
- [`/guide/wrappers`](/guide/wrappers)
- [`/demos/`](/demos/)
