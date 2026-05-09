# Guia de bundles

Esta pagina ajuda voce a escolher o bundle certo do `tsParticles` e configurar tudo rapidamente.

## Comparacao de pacotes

| Pacote                   | Ideal para                                                    | Estilo de setup                                |
| ------------------------ | ------------------------------------------------------------- | ---------------------------------------------- |
| `@tsparticles/basic`     | Configuracoes super leves                                     | `tsParticles` + `await loadBasic(tsParticles)` |
| `@tsparticles/slim`      | A maioria dos sites/apps                                      | `tsParticles` + `await loadSlim(tsParticles)`  |
| `tsparticles`            | Conjunto completo de recursos oficiais com controle do engine | `tsParticles` + `await loadFull(tsParticles)`  |
| `@tsparticles/all`       | Todos os recursos, prototipagem rapida                        | `tsParticles` + `await loadAll(tsParticles)`   |
| `@tsparticles/confetti`  | Efeitos de confete com uma chamada                            | `await confetti(options)`                      |
| `@tsparticles/fireworks` | Efeitos de fogos com uma chamada                              | `await fireworks(options)`                     |
| `@tsparticles/particles` | API simples para fundo de particulas                          | `await particles(options)`                     |

## Guias por bundle

- Basic: [`/guide/bundles-basic`](/pt/guide/bundles-basic)
- Slim: [`/guide/bundles-slim`](/pt/guide/bundles-slim)
- tsparticles (Full): [`/guide/bundles-full`](/pt/guide/bundles-full)
- All: [`/guide/bundles-all`](/pt/guide/bundles-all)
- Confetti: [`/guide/bundles-confetti`](/pt/guide/bundles-confetti)
- Fireworks: [`/guide/bundles-fireworks`](/pt/guide/bundles-fireworks)
- Particles: [`/guide/bundles-particles`](/pt/guide/bundles-particles)

## Instalacao

Instale o caminho de pacote que combina com seu caso de uso.

```bash
pnpm add @tsparticles/engine @tsparticles/basic
pnpm add @tsparticles/engine @tsparticles/slim
pnpm add @tsparticles/engine tsparticles
pnpm add @tsparticles/engine @tsparticles/all
pnpm add @tsparticles/confetti
pnpm add @tsparticles/fireworks
pnpm add @tsparticles/particles
```

Precisa de links CDN e de outras variantes de gerenciador de pacotes?

- Veja [`/guide/installation`](/pt/guide/installation).

## Exemplos de setup

### Bundles com engine + loader (`basic`, `slim`, `full`, `all`)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

await loadSlim(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      number: { value: 80 },
      move: { enable: true, speed: 2 },
    },
  },
});
```

Para os outros presets, troque apenas o import/funcao do loader:

- `@tsparticles/basic` -> `loadBasic`
- `tsparticles` -> `loadFull`
- `@tsparticles/all` -> `loadAll`

### APIs focadas (`confetti`, `fireworks`, `particles`)

```ts
import { confetti } from "@tsparticles/confetti";
import { fireworks } from "@tsparticles/fireworks";
import { particles } from "@tsparticles/particles";

await confetti({ count: 80, spread: 60 });
await fireworks({ sounds: false });
await particles({ count: 100, links: true });
```

Essas APIs sao ideais quando voce quer integrar rapido sem conectar manualmente varios plugins do engine.

## Regras praticas de escolha

1. Comece com `@tsparticles/slim` na maioria dos projetos.
2. Use `@tsparticles/basic` se o tamanho do bundle for a prioridade principal e os recursos forem simples.
3. Use `tsparticles` quando precisar de uma base full com muitos recursos e `loadFull`.
4. Use `@tsparticles/all` para prototipagem ou quando precisar de muitos recursos imediatamente.
5. Use `@tsparticles/confetti`, `@tsparticles/fireworks` ou `@tsparticles/particles` quando sua UI precisar de um efeito focado com setup minimo.

## Paginas relacionadas

- Bundles focados no playground: [`/playground/bundles`](/pt/playground/bundles)
- Caminho de inicio: [`/guide/getting-started`](/pt/guide/getting-started)
- Matriz de instalacao: [`/guide/installation`](/pt/guide/installation)
- Visao geral de wrappers: [`/guide/wrappers`](/pt/guide/wrappers)
