# ラッパー: @tsparticles/nextjs

`@tsparticles/react` に基づいて構築された公式 Next.js ラッパー。

## インストール

```bash
pnpm add @tsparticles/nextjs @tsparticles/engine @tsparticles/slim
```

## 簡単なセットアップの流れ

1. Next.js ラッパーと依存関係をインストールします。
2. パーティクル キャンバスに対してのみクライアント側でレンダリングを続けます。
3. `NextParticlesProvider` をアプリのルート（`layout.tsx` または `_app.tsx`）に配置します — 1 回だけレンダリングする必要があります。
4. エンジンを一度初期化し、ラッパー コンポーネントをレンダリングします。

## モノリポジトリ参照

- パッケージフォルダー: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/nextjs>
- デモ アプリ: <https://github.com/tsparticles/tsparticles/tree/main/demo/nextjs>、<https://github.com/tsparticles/tsparticles/tree/main/demo/nextjs-legacy>

## リードミー

- ラッパー README: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/nextjs#readme>

## 関連ドキュメント

- [`/guide/wrappers`](/ja/guide/wrappers)
- [`/guide/frameworks`](/ja/guide/frameworks)
