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

Плагин монтирует частицы непосредственно в каждый выбранный DOM-элемент, поэтому элементу не нужен
атрибут `id`:

```js
const container = await $(".particles-background").particles().load(options);
```

Эту же выборку можно использовать с `.ajax(url)`, чтобы загрузить параметры из JSON по URL.

## Monorepo references

- Package folder: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/jquery>
- Demo app: <https://github.com/tsparticles/tsparticles/tree/main/demo/jquery>

## Readme

- Wrapper README: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/jquery#readme>

## Related docs

- [`/guide/wrappers`](/guide/wrappers)
- [`/guide/frameworks`](/guide/frameworks)
