# シェイプカタログ

このカタログでは、`particles.shape.type` の代表的な値を一覧化し、`particles.shape.options` でシェイプ固有の制御が追加される場面を示します。

ソースフォルダー:

- <https://github.com/tsparticles/tsparticles/tree/main/shapes>
- シェイプオプション参照: [`/options/particles-shape`](/ja/options/particles-shape)

## よく使うシェイプタイプ

- `circle` (デフォルト、追加のシェイプオプションなし)
- `square` / `edge` (追加のシェイプオプションなし)
- `triangle` (追加のシェイプオプションなし)
- `line` (追加のシェイプオプションなし)
- `polygon` (`options.polygon.sides`)
- `star` (`options.star.sides`, `options.star.inset`)
- `text` (`options.text.value`, `font`, `weight`, `style`, `close`)
- `emoji` (`options.emoji.value`)
- `image` / `images` (`options.image.src`, `name`, `width`, `height`, `gif`, `replaceColor`, `close`)

## エイリアスとバンドルに関するメモ

- `square` と `edge` は同じシェイプのエイリアスです。
- `character` と `char` は同じオプショングループのエイリアスです。
- `image` と `images` は同じオプションオブジェクトを使います。
- 高度なシェイプの多くは `@tsparticles/slim` (または `@tsparticles/all`) か専用シェイプパッケージが必要です。

Start/Pause コントロールと編集可能な JSON で素早く試すには [`/playground/shapes`](/ja/playground/shapes) を使ってください。
