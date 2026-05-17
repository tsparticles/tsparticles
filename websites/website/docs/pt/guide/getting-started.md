# Primeiros passos

Este caminho é a configuração confiável mais rápida para `tsParticles` em 2026.

## Lista de verificação rápida

1. Instale `@tsparticles/engine`.
2. Escolha um caminho de tempo de execução (`@tsparticles/slim`, `@tsparticles/all`, APIs focadas como `@tsparticles/particles` ou apenas pacotes personalizados).
3. Carregue seu pacote uma vez.
4. Comece com opções manuais, um objeto de configuração ou uma predefinição.

## 1) Instale o mecanismo + um pacote predefinido

Use `@tsparticles/engine` mais `@tsparticles/slim` para um ótimo equilíbrio padrão de tamanho/recursos.

```bash
pnpm add @tsparticles/engine @tsparticles/slim
```

Precisa de links CDN, variantes `npm`/`yarn` ou exemplos `require(...)`?

- Consulte [`/guide/installation`](/pt/guide/installation).

## 2) Crie um contêiner em HTML

```html
<div id="tsparticles"></div>
```

## 3) Inicializar tsParticles

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const options = {
  background: {
    color: "#0b1020",
  },
  particles: {
    number: {
      value: 80,
    },
    links: {
      enable: true,
      distance: 150,
      opacity: 0.35,
    },
    move: {
      enable: true,
      speed: 2,
    },
  },
};

(async () => {
  await loadSlim(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options,
  });
})();
```

## 4) Escolha o pacote certo

- `@tsparticles/slim`: a maioria dos aplicativos deve começar aqui.
- `@tsparticles/basic`: conjunto de recursos menor para configurações muito leves.
- `@tsparticles/all`: tudo incluído, mais fácil para prototipagem rápida.

Se você precisar de uma API focada em vez da configuração direta de `tsParticles`:

- `@tsparticles/particles`: API de fundo de partículas simplificada
- `@tsparticles/confetti`: API de confete em uma unica chamada
- `@tsparticles/fireworks`: API de fogos de artifício em uma unica chamada

## 5) Use predefinições/configurações quando precisar de velocidade

Se você preferir efeitos pré-construídos:

```bash
pnpm add @tsparticles/configs
```

Em seguida, carregue uma configuração por chave, como o [app `demo/vite`](https://github.com/tsparticles/tsparticles/blob/main/demo/vite/src/main.ts).

Se você preferir configurações baseadas em nomes de predefinições, use o catálogo oficial de predefinições em [`/demos/presets`](/pt/demos/presets).

## Mapa de documentação rápida

- Opções de raiz: [`/options/`](/pt/options/)
- Referência de wrappers: [`/guide/wrappers`](/pt/guide/wrappers)
- Catálogo de predefinições: [`/demos/presets`](/pt/demos/presets)
- Catálogo de paletas: [`/demos/palettes`](/pt/demos/palettes)
- Catalogo de formas: [`/demos/shapes`](/pt/demos/shapes)
- Migração de particles.js: [`/migrations/particles-js`](/pt/migrations/particles-js)
- Formatos de cores: [`/guide/color-formats`](/pt/guide/color-formats)
- Ciclo de vida do contêiner: [`/guide/container-lifecycle`](/pt/guide/container-lifecycle)
- Plug-ins e personalização: [`/guide/plugins-customization`](/pt/guide/plugins-customization)

## Solução de problemas

- Tela em branco: verifique se `#tsparticles` existe antes de chamar `tsParticles.load`.
- Recurso ausente: você provavelmente precisará de outro plugin/pacote (forma, interação, atualizador).
- Erros de digitação nas opções: mantenha seus pacotes alinhados à mesma versão principal/secundária.
