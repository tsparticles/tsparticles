# パーティクルグループ

`particles.groups` を使用すると、同じシーン内で名前付きパーティクル バリアントを定義できます。

## 例

```ts
particles: {
  groups: {
    blue: {
      color: {
        value: "#60a5fa",
      },
      number: {
        value: 30,
      },
    },
    pink: {
      color: {
        value: "#f472b6",
      },
      number: {
        value: 20,
      },
    },
  },
}
```

## ソース参照

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Group.md>
