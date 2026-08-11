# カラーフォーマット

tsParticles は、`background`、`particles.paint`、プラグイン設定などのオプションにわたって複数のカラー形式を受け入れます。

## 一般的な形式

```ts
color: "#60a5fa";
```

```ts
color: {
  value: {
    r: 96,
    g: 165,
    b: 250,
  },
}
```

```ts
color: {
  value: "hsl(220, 90%, 70%)",
}
```

## 実践的な指導

- ドキュメントや例では読みやすさを考慮して 16 進数を優先します。
- より豊かなランダム化されたシーンには、色の配列を使用します。
- テキストの背後でエフェクトを使用する場合は、コントラストを高く保ちます。

## ソース参照

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Color.md>
- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Color.md>
