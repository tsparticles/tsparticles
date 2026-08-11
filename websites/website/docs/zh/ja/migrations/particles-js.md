# 移行と互換性

`particles.js` から移行する場合は、次の順序を使用します。

1. 古いスクリプト/パッケージを `@tsparticles/engine` + バンドル (`@tsparticles/slim`) に置き換えます。
2. 古い構成を移動し、サポートされていないフィールドを段階的にマップします
3. インタラクション (ホバー/クリック/リンク) を 1 つずつテストします

## 正規移行に関する注意事項

- 公式移行ガイドのソース: [`tsparticles/markdown/pjsMigration.md`](https://github.com/tsparticles/tsparticles/blob/main/markdown/pjsMigration.md)
- 従来の互換性サンプルはデモ フォルダーで入手できます。

## 互換性パッケージ

レガシー構成の移行中にブリッジ層が必要な場合:

- npm: <https://www.npmjs.com/package/@tsparticles/pjs>
- jsDelivr: <https://www.jsdelivr.com/package/npm/@tsparticles/pjs>

さらに読む:

- 移行記事: <https://dev.to/matteobruni/migrating-from-particles-js-to-tsparticles-2a6m>
- 切り替える 5 つの理由: <https://dev.to/matteobruni/5-reasons-to-use-tsparticles-and-not-particles-js-1gbe>

## 一般的なマッピングのヒント

- 古い `particlesJS(...)` init は `tsParticles.load({ id, options })` になります。
- 多くの従来の値には、`particles`、`interactivity`、および `detectRetina` に直接相当する値がまだあります。
- 新しいプラグイン駆動のアーキテクチャにより、一部の高度な機能には明示的なパッケージの読み込みが必要になります。

## 本番環境向けの移行チェックリスト

- デスクトップとモバイルの視覚的な同等性を検証します。
- ローエンドデバイスに対する CPU/GPU の影響を確認します。
- オプション キーがサイレントに無視されていないことを確認します。
- リリース週前に正確なパッケージ バージョンを固定します。

## Canvas-confetti から `@tsparticles/confetti` への移行

`canvas-confetti` から移行する場合、最も簡単な切り替えは、命令型呼び出しを `@tsparticles/confetti` API 呼び出しに置き換えることです。

## 一般的なマッピング

- `confetti({...})` -> `await confetti({...})`
- カスタム キャンバス -> `const local = await confetti.create(canvas, defaults)`、次に `await local({...})`
- 繰り返しのショット -> 既存のタイマー/ループを保持し、それらのコールバックで `await confetti(...)` を呼び出します

## 変換例

前 (`canvas-confetti` スタイル):

```ts
import confetti from "canvas-confetti";

confetti({
  particleCount: 90,
  spread: 70,
  origin: { x: 0.5, y: 0.6 },
});
```

後 (`@tsparticles/confetti`):

```ts
import { confetti } from "@tsparticles/confetti";

await confetti({
  count: 90,
  spread: 70,
  position: { x: 50, y: 60 },
});
```

## オプション名の注意事項

- `particleCount` -> `count`
- `0..1` の `origin.x`/`origin.y` -> `0..100` の `position.x`/`position.y`
- `startVelocity`、`spread`、`angle`、および `colors` は同じセマンティクスを維持します

完全な API とヘルパーについては、<https://github.com/tsparticles/tsparticles/tree/main/bundles/confetti#readme> を参照してください。
