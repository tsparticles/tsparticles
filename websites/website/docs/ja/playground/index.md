# 遊び場

ユースケースごとに分割:

- [`Configs Playground`](/ja/playground/configs): 完全な編集可能なオプションを備えた豊富なデモ。
- [`Shapes Playground`](/ja/playground/shapes): `shape.type` に特化したデモ。利用可能な場合は形状固有のオプションも含みます。
- [`Presets Playground`](/ja/playground/presets): 公式プリセット名のデモ (`{ preset: "..." }`)。
- [`Palettes Playground`](/ja/playground/palettes): プリセット プロジェクトからのパレットに焦点を当てたデモ。
- [`Bundles Playground`](/ja/playground/bundles): `@tsparticles/confetti`、`@tsparticles/fireworks`、`@tsparticles/particles`、および `@tsparticles/ribbons` の専用プレイグラウンド。

実行は常に **ユーザーによるトリガーのみ** (自動再生はありません)。

## 共有フロー

レイアウトはどの遊び場でも一貫しています。

1. まずキャンバスをプレビューします。
2. 開始/一時停止/再開/破棄のコントロール。
3. オプションの JSON エディター。

4. メニューからデモを選択します。
5. `Start` を押して実行します (自動再生なし)。
6. エディターで JSON を編集します。
7. もう一度 `Start` を押して、新しいオプションを再ロードします。
8. `Pause`/`Resume` を使用して、パフォーマンスと CPU 使用率を制御します。

> 注: `Destroy` はコンテナ インスタンスを完全に解放します。

## 推奨されるワークフロー

・効果が安定するまでここで試作します。

- 最終的な JSON をプロジェクトにコピーします。
- アプリケーション コードに `ISourceOptions` を使用して入力します。
