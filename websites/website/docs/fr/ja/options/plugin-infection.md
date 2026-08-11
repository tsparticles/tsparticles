# プラグイン オプション: 感染

`infection` は、感染のような伝播動作のためのプラグイン オプションです。

## 例

```ts
infection: {
  stages: [
    {
      color: {
        value: "#22c55e",
      },
      radius: 20,
    },
  ],
}
```

## 注意事項

- 予測可能な動作を実現するには、明確なステージ定義を使用します。
- 最初に粒子数を少なくして目視でテストします。

## ソース参照

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Plugins/Infection.md>
