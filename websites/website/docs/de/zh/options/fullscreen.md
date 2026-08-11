# 全屏

使用 `fullScreen` 控制画布是否占据整个视口。

## 典型设置

```ts
fullScreen: {
  enable: true,
  zIndex: -1,
}
```

- `enable`：切换全视口行为。
- `zIndex`：有助于将粒子保留在应用内容后面。

## 嵌入部分

对于文档预览、卡片和游乐场面板：

```ts
fullScreen: {
  enable: false,
}
```

这可以避免与页面布局和其他画布重叠。

## 来源参考

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/FullScreen.md>
