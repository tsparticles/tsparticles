# Wrapper: @tsparticles/jquery

Official jQuery plugin wrapper for `tsParticles`.

## Install

```bash
pnpm add @tsparticles/jquery @tsparticles/engine @tsparticles/slim
```

## Quick setup flow

1. Install package and load it in your jQuery setup.
2. Initialize features once using slim/all as needed.
3. Apply plugin on target element with options.

Le plugin monte les particules directement dans chaque élément DOM sélectionné : aucun `id` n'est
nécessaire sur l'élément.

```js
const container = await $(".particles-background").particles().load(options);
```

La même sélection permet aussi de charger des options depuis une URL JSON avec `.ajax(url)`.

## Monorepo references

- Package folder: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/jquery>
- Demo app: <https://github.com/tsparticles/tsparticles/tree/main/demo/jquery>

## Readme

- Wrapper README: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/jquery#readme>

## Related docs

- [`/guide/wrappers`](/guide/wrappers)
- [`/guide/frameworks`](/guide/frameworks)
