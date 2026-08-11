# コンテナのライフサイクル

`Container` は、`tsParticles.load(...)` によって返されるランタイム インスタンスです。

## 基本的なライフサイクル

```ts
import type { Container } from "@tsparticles/engine";

let container: Container | undefined;

container = await tsParticles.load({ id: "tsparticles", options });
container.pause();
container.play();
container.destroy();
```

## 推奨パターン

- `start`: 現在のオプションを使用してコンテナーを作成/再作成します。
- `stop`: `pause()` 表示されない、または必要ない場合。
- `resume`: `play()` ユーザーがアニメーションを戻したい場合。
- `destroy`: ルート/コンポーネントのティアダウンでリソースを解放します。

## ソース参照

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Container.md>
