---
layout: home

title: tsParticles
titleTemplate: 表現力のあるパーティクル背景を数分で作成

hero:
  name: tsParticles
  text: 高性能なパーティクルエンジンと、使いやすい開発ワークフロー
  tagline: あらゆる framework で、インタラクティブな背景・エフェクト・紙吹雪をすばやく導入できます。
  image:
    src: https://particles.js.org/images/banner3.png
    alt: tsParticles
  actions:
    - theme: brand
      text: はじめる
      link: /ja/guide/getting-started
    - theme: alt
      text: Playground を開く
      link: /ja/playground/
    - theme: alt
      text: すぐ使えるデモ
      link: /ja/demos/

features:
  - title: すばやい立ち上げ
    details: 最小構成から始めて、presets・plugins・カスタム shape へ段階的に拡張できます。
  - title: framework 対応
    details: React、Vue、Angular、Svelte、Solid、Web Components、Vanilla JavaScript をサポート。
  - title: 本番運用を重視
    details: "@tsparticles/basic、@tsparticles/slim、tsparticles、@tsparticles/all で bundle サイズを調整できます。"
  - title: 用途別 API
    details: "@tsparticles/particles、@tsparticles/confetti、@tsparticles/fireworks を 1 回の呼び出しで導入できます。"
---

## このドキュメントの狙い

このサイトは、最も多い質問 **「いま tsParticles をどう使うのか？」** に最短で答えられるように再設計されています。

- 5 分以内に動くスニペットから開始できます。
- 多数のリポジトリを横断せずに適切な package を選べます。
- options、config、presets、palettes をすばやく見つけられます。
- 重いエフェクトは、明示的な開始/一時停止コントロールで必要なときだけ有効化できます。

## 最初に読むべきページ

1. [`/guide/getting-started`](/ja/guide/getting-started): インストール、初回レンダリング、最小オプション。
2. [`/guide/installation`](/ja/guide/installation): CDN/package manager の導入マトリクスと import パターン。
3. [`/playground/`](/ja/playground/): コマンドでデモを起動し、JSON をライブ編集。
4. [`/demos/`](/ja/demos/): 本番向けレシピをそのまま利用。
5. [`/options/`](/ja/options/): ルート options の地図と詳細ページへの導線。
6. [`/migrations/particles-js`](/ja/migrations/particles-js): particles.js からの移行手順と互換性メモ。
7. [`/guide/wrappers`](/ja/guide/wrappers): 公式 wrappers と framework 別リンク。
8. [`/guide/plugins-customization`](/ja/guide/plugins-customization): カスタム shape、presets、plugin 拡張。
9. [`/guide/templates-resources`](/ja/guide/templates-resources): スターターリポジトリと共有リソース。
10. [`/guide/video-tutorials`](/ja/guide/video-tutorials): 公式動画デモと参考資料。
11. [`/guide/dependency-graph`](/ja/guide/dependency-graph): engine と bundles の依存関係マップ。

## 主要ソースと重要フォルダー

- メイン monorepo: [github.com/tsparticles/tsparticles](https://github.com/tsparticles/tsparticles)
- メイン README（クイックスタート、wrappers、presets）: [README.md](https://github.com/tsparticles/tsparticles/blob/main/README.md)
- wrappers フォルダー: [`tsparticles/wrappers`](https://github.com/tsparticles/tsparticles/tree/main/wrappers)
- demo アプリ フォルダー: [`tsparticles/demo`](https://github.com/tsparticles/tsparticles/tree/main/demo)
- presets フォルダー: [`tsparticles/presets`](https://github.com/tsparticles/tsparticles/tree/main/presets)
- palettes フォルダー: [`tsparticles/palettes`](https://github.com/tsparticles/tsparticles/tree/main/palettes)
- root options ソース: [`tsparticles/markdown/Options.md`](https://github.com/tsparticles/tsparticles/blob/main/markdown/Options.md)
- migration ソース: [`tsparticles/markdown/pjsMigration.md`](https://github.com/tsparticles/tsparticles/blob/main/markdown/pjsMigration.md)

## プロジェクトを支援する

- Matteo Bruni をスポンサー: <https://github.com/matteobruni>
- tsParticles organization をスポンサー: <https://github.com/tsparticles>
