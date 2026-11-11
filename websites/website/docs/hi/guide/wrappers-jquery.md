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

यह plugin चुने गए प्रत्येक DOM element में सीधे mount करता है, इसलिए element पर `id` होना ज़रूरी
नहीं है:

```js
const container = await $(".particles-background").particles().load(options);
```

JSON URL से options लोड करने के लिए उसी selection के साथ `.ajax(url)` भी इस्तेमाल किया जा सकता है।

## Monorepo references

- Package folder: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/jquery>
- Demo app: <https://github.com/tsparticles/tsparticles/tree/main/demo/jquery>

## Readme

- Wrapper README: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/jquery#readme>

## Related docs

- [`/guide/wrappers`](/guide/wrappers)
- [`/guide/frameworks`](/guide/frameworks)
