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

O plugin monta as partículas diretamente em cada elemento DOM selecionado, então o elemento não
precisa ter um `id`:

```js
const container = await $(".particles-background").particles().load(options);
```

A mesma seleção pode ser usada com `.ajax(url)` para carregar opções de uma URL JSON.

## Monorepo references

- Package folder: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/jquery>
- Demo app: <https://github.com/tsparticles/tsparticles/tree/main/demo/jquery>

## Readme

- Wrapper README: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/jquery#readme>

## Related docs

- [`/guide/wrappers`](/guide/wrappers)
- [`/guide/frameworks`](/guide/frameworks)
