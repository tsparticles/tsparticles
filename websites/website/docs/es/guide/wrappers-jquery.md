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

El complemento monta las partículas directamente en cada elemento DOM seleccionado, por lo que
el elemento no necesita un `id`:

```js
const container = await $(".particles-background").particles().load(options);
```

También puedes usar la misma selección para cargar opciones desde una URL JSON con `.ajax(url)`.

## Monorepo references

- Package folder: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/jquery>
- Demo app: <https://github.com/tsparticles/tsparticles/tree/main/demo/jquery>

## Readme

- Wrapper README: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/jquery#readme>

## Related docs

- [`/guide/wrappers`](/guide/wrappers)
- [`/guide/frameworks`](/guide/frameworks)
