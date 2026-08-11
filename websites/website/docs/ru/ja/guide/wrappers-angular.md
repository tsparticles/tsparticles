# ラッパー: @tsparticles/angular

`tsParticles` の公式 Angular ラッパー (`<ngx-particles />`)。

## インストール

```bash
pnpm add @tsparticles/angular @tsparticles/engine @tsparticles/slim
```

## 簡単なセットアップの流れ

1. アプリ起動時に `NgParticlesService` を一度登録します。
2. `loadSlim(engine)` を使用して機能をロードします。
3. テンプレートで `<ngx-particles [id] [options] />` をレンダリングします。

## モノリポジトリ参照

- パッケージフォルダー: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/angular>
- デモアプリ: <https://github.com/tsparticles/tsparticles/tree/main/demo/angular>

## リードミー

- ラッパー README: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/angular#readme>

## 関連ドキュメント

- [`/guide/wrappers`](/ja/guide/wrappers)
- [`/guide/frameworks`](/ja/guide/frameworks)
