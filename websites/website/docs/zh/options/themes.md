# 主题

`themes` 允许您定义命名选项集（例如亮和暗）并在运行时进行切换。

## 示例

```ts
themes: [
  {
    name: "dark",
    default: {
      value: true,
      mode: "dark",
    },
    options: {
      background: {
        color: "#000000",
      },
    },
  },
  {
    name: "light",
    default: {
      value: true,
      mode: "light",
    },
    options: {
      background: {
        color: "#ffffff",
      },
    },
  },
];
```

## 实用指导

- 保持稳定的基础选项对象。
- 仅覆盖每个主题的不同内容。
- 与应用程序级暗模式状态配对。

## 来源参考

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Themes.md>
