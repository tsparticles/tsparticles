# リリースとバージョン管理

このプロジェクトは現在、単一のリポジトリ `tsparticles/tsparticles` から配布されています。

<WebsiteVersionInfo />

## リリース作業が行われる場所

- モノリポジトリのルート: <https://github.com/tsparticles/tsparticles>
- バンドル: <https://github.com/tsparticles/tsparticles/tree/main/bundles>
- エンジン: <https://github.com/tsparticles/tsparticles/tree/main/engine>
- ラッパー: <https://github.com/tsparticles/tsparticles/tree/main/wrappers>
- プリセット: <https://github.com/tsparticles/tsparticles/tree/main/presets>
- パレット: <https://github.com/tsparticles/tsparticles/tree/main/palettes>

## バージョン調整ルール

- すべての `@tsparticles/*` パッケージを同じリリースラインに揃えてください。
- 1 つのアプリ内に異なるベータ版やメジャー バージョンを混在させないでください。

## 実際のリリースチェックリスト

1. ワークスペース `package.json` ファイル内のターゲット パッケージのバージョンを確認します。
2. 影響を受けるプロジェクトをビルドしてテストします。
3. ドキュメントのリンクとプレイグラウンドの動作を検証します。
4. モノリポジトリのリリースフローから公開します。
