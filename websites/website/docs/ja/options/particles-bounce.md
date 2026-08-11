パーティクルのバウンス数

`particles.bounce` は、衝突または境界がバウンス ロジックを適用する場合のリバウンド動作をカスタマイズします。

## 例

```ts
particles: {
  bounce: {
    horizontal: {
      value: 1,
    },
    vertical: {
      value: 1,
    },
  },
}
```

## 実践的な指導

- `1` 付近の値は自然なリバウンドを保ちます。
- 値を高くすると、元気に見えますが、現実的ではなくなります。

## ソース参照

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Bounce.md>
