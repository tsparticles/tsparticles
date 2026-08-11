# ラッパー: @tsparticles/react

`tsParticles` の公式 React ラッパー。

## インストール

```bash
pnpm add @tsparticles/react @tsparticles/engine @tsparticles/slim
```

## 簡単なセットアップの流れ

1. ラッパー + エンジン + ローダー パッケージをインストールします。
2. `ParticlesProvider` をアプリのルート（例：`main.tsx` または `layout.tsx`）に配置します — アプリのライフサイクル全体で 1 回だけレンダリングする必要があります。
3. `ParticlesProvider` および `loadSlim` を使用して 1 回初期化します。
4. 型指定されたオプションを使用して `Particles` コンポーネントをレンダリングします。

## モノリポジトリ参照

- パッケージフォルダー: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/react>
- デモアプリ: <https://github.com/tsparticles/tsparticles/tree/main/demo/react>

## リードミー

- ラッパー README: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/react#readme>

## 関連ドキュメント

- [`/guide/wrappers`](/ja/guide/wrappers)
- [`/guide/frameworks`](/ja/guide/frameworks)
