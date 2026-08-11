# インタラクティブイベント

`interactivity.events` は、対話モードがいつトリガーされるかを制御します。

## 例

```ts
interactivity: {
  events: {
    onHover: {
      enable: true,
      mode: ["grab", "bubble"],
    },
    onClick: {
      enable: true,
      mode: ["push", "repulse"],
    },
    resize: true,
  },
}
```

- `onHover`: ポインターのホバー動作。
- `onClick`: クリック/タップ動作。
- `resize`: ビューポートの変更後も動作の一貫性を保ちます。

## ソース参照

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Events.md>
- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Click.md>
- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Hover.md>
- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Div.md>
