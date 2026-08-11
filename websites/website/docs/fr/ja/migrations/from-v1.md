# v1.x から移行

`v1.x` からは、パッケージ、`load(...)`、オプションの順で移行するのがおすすめです。

## 新しい Load API

Before:

```ts
await tsParticles.load("tsparticles", oldOptions);
```

After:

```ts
await tsParticles.load({
  id: "tsparticles",
  options: oldOptions,
});
```

## まず確認する改名

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## リソース

- 改名マトリクス: [`/migrations/option-rename-matrix`](/ja/migrations/option-rename-matrix)
- particles.js からの移行: [`/migrations/particles-js`](/ja/migrations/particles-js)
