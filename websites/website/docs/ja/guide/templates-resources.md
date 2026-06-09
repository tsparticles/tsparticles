# テンプレートとリソース

tsParticles には、**スキャフォールドテンプレート**（フレームワークのスケルトン）と**ユースケーステンプレート**（完全なサンプルアプリケーション）の2種類のテンプレートがあります。

## CLI を使ったクイックスタート

テンプレートを使用する最も簡単な方法は、CLI を使うことです：

```bash
npm create tsparticles@latest
```

または、特定のバンドルを直接使用することもできます：

```bash
npm create particles@latest
npm create confetti@latest
npm create ribbons@latest
```

非対話的な使用法：

```bash
npx tsparticles-create app my-project --template scaffold --framework react
npx tsparticles-create app my-project --template confetti --framework vanilla
```

## スキャフォールドテンプレート

スキャフォールドテンプレートは、tsParticles があらかじめ設定された最小限の Vite + TypeScript プロジェクトスケルトンを提供します。以下のフレームワークで利用可能です：

| Framework | CLI option      | Package                           |
| --------- | --------------- | --------------------------------- |
| Vanilla   | `--framework vanilla` | `@tsparticles/template-scaffold` |
| React     | `--framework react`   | `@tsparticles/template-scaffold` |
| Vue 3     | `--framework vue3`    | `@tsparticles/template-scaffold` |
| Angular   | `--framework angular` | `@tsparticles/template-scaffold` |
| Svelte    | `--framework svelte`  | `@tsparticles/template-scaffold` |
| Solid     | `--framework solid`   | `@tsparticles/template-scaffold` |

例：

```bash
npx tsparticles-create app my-react-app --template scaffold --framework react
cd my-react-app
npm install
npm run dev
```

## ユースケーステンプレート

ユースケーステンプレートは、実際の tsParticles の使用例を示す完全なサンプルアプリケーションです。

| Template    | Description                                       | CLI template name | Package                          |
| ----------- | ------------------------------------------------- | ----------------- | -------------------------------- |
| Login       | Login/register page with particle background      | `login`           | `@tsparticles/template-login`    |
| Portfolio   | Personal portfolio with animated hero             | `portfolio`       | `@tsparticles/template-portfolio`|
| Landing     | Marketing landing page with impactful particles   | `landing`         | `@tsparticles/template-landing`  |
| Tic Tac Toe | Tic-tac-toe game with confetti celebration        | `tictactoe`       | `@tsparticles/template-tictactoe`|
| Confetti    | Confetti cannon demo                              | `confetti`        | `@tsparticles/template-confetti` |
| Ribbons     | Ribbon animation demo                             | `ribbons`         | `@tsparticles/template-ribbons`  |
| Particles   | Classic particles.js-style demo                   | `particles`       | `@tsparticles/template-particles`|

例：

```bash
npx tsparticles-create app my-portfolio --template portfolio --framework vanilla
cd my-portfolio
npm install
npm run dev
```

## npm create ラッパー

バンドル固有のテンプレートについては、専用の npm create ラッパーを使用できます：

| Command                           | Template  | Framework | Installed bundle          |
| --------------------------------- | --------- | --------- | ------------------------- |
| `npm create tsparticles@latest`   | Interactive | Interactive | User choice             |
| `npm create particles@latest`     | `particles` | Vanilla    | `@tsparticles/particles` |
| `npm create confetti@latest`      | `confetti`  | Vanilla    | `@tsparticles/confetti`  |
| `npm create ribbons@latest`       | `ribbons`   | Vanilla    | `@tsparticles/ribbons`   |

## CLI リファレンス

```bash
tsparticles-create app [destination] [options]

Options:
  --template <name>     Template to use (scaffold|login|portfolio|landing|tictactoe|confetti|ribbons|particles)
  --framework <name>    Framework (vanilla|react|vue3|angular|svelte|solid)
  --skip-install        Skip npm install after scaffolding
  -h, --help            Display help
```

## 関連ページ

- [`/guide/frameworks`](/guide/frameworks)
- [`/guide/wrappers`](/guide/wrappers)
- [`/demos/`](/demos/)
