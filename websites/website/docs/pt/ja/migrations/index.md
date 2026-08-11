# Versioning & Migration

このセクションでは、`tsParticles` のメジャーバージョン間の移行、リリースの追跡、バージョニングの理解に使用します。

## 移行ガイド

- [`v3.x から移行`](/ja/migrations/from-v3)
- [`v2.x から移行`](/ja/migrations/from-v2)
- [`v1.x から移行`](/ja/migrations/from-v1)

## クイックルート

- `v3.x` から： [`/ja/migrations/from-v3`](/ja/migrations/from-v3) から開始（焦点：オプションキーの変更 + パッケージ名変更）。
- `v2.x` から： [`/ja/migrations/from-v2`](/ja/migrations/from-v2) から開始（焦点：`load(...)` API + オプション）。
- `v1.x` から： [`/ja/migrations/from-v1`](/ja/migrations/from-v1) から開始（焦点：パッケージ、ローダー、オプション）。

## 移行で通常発生する問題

ほとんどのメジャーバージョン移行は2箇所で問題が発生します：

1. **Load API の形式**（古い位置引数 vs 新しいオブジェクト引数）。
2. **オプションスキーマ**（名前変更/移動されたキー）。

アプリがコンパイルできても表示がおかしい場合は、オプションマッピングから始めてください。

## クイックルックアップ

- [オプション名変更マトリックス](/ja/migrations/option-rename-matrix) — レガシーと現在のオプションキーのクイックマッピング。

## 参考情報

- [Changelog](/ja/migrations/changelog) — 最新リリースノート。
- [リリースとバージョニング](/ja/migrations/releases) — バージョン調整ルールとリリースチェックリスト。
- [particles.js からの移行](/ja/migrations/particles-js) — レガシー `particles.js` または `canvas-confetti` からの移行。
