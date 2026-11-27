# Guia de migração para v5 — rascunho E10

Status: rascunho E10 atualizado em 2026-11-27. As verificações E9 dos pacotes instalados e do navegador foram aprovadas para o candidato atual. Este guia descreve os contratos v5 implementados para engine, wrappers, bundles e cores. Os limites de tamanho E0 continuam visíveis como referências de diagnóstico conforme o critério de tamanho E10 atualizado; eles não são apresentados como aprovados. O follow-up do renderer sem callback passa nas 30 verificações de runtime E0, incluindo as linhas com HDR forçado. Em M4/500, update e render estão dentro dos limites E0; o p95 do frame é 7,20 ms, 0,05 ms acima da referência histórica E5. A verificação HDR em hardware e as revisões documentais necessárias continuam abertas.

O exemplo TypeScript gerado pelo MCP e os 20 scaffolds CLI (Vanilla e 19 frameworks) passam na verificação de tipos, no build de produção e na inicialização do Chrome sem erros de página ou console. As nove famílias de templates empacotadas não contêm variantes removidas de Vue 2, Nuxt 2 ou Nuxt 3. Continuam pendentes a revisão linguística dos nove rascunhos e a verificação HDR/navegador em hardware. Este é um rascunho interno, não o guia de migração definitivo para publicação.

Os guias Vanilla padrão e localizados do site atual são idênticos byte a byte e usam os pacotes CDN v4 publicados. Seus exemplos de singleton continuam como documentação v4 até a página de migração v5 estar pronta; não contam como verificações de consumidores v5.

## Propriedade da engine

Substitua imports do singleton `tsParticles` por `createEngine()`. Mantenha a instância retornada no escopo da aplicação, passe-a a cada loader e forneça-a explicitamente aos wrappers e providers. Uma variável local ainda pode se chamar `tsParticles`. O teardown do componente gerencia seu container e não deve destruir containers não relacionados que usem a mesma engine.

A personalização de aleatoriedade/logger e o agendamento de animações pertencem a cada instância na implementação E2. Registre plugins personalizados em `container.engine` (ou `container.pluginManager.engine`) para que os serviços runtime acompanhem a engine proprietária.

## Integrações de frameworks removidas

| Integração                                    | Destino da migração                                 | Remoção / verificação           |
| --------------------------------------------- | --------------------------------------------------- | ------------------------------- |
| Wrapper Vue 2, demo e referências do starter  | Migrar a aplicação para Vue 3 e `@tsparticles/vue3` | Removidos em E1; revistos em E9 |
| Wrapper Nuxt 2, demo e referências do starter | Migrar para Nuxt 4 e `@tsparticles/nuxt4`           | Removidos em E1; revistos em E9 |
| Wrapper Nuxt 3, demo e referências do starter | Migrar para Nuxt 4 e `@tsparticles/nuxt4`           | Removidos em E1; revistos em E9 |

Atualizações de framework são migrações da aplicação, não simples renomeações de pacotes. A busca de referências E0 está em [`../../e0/retirement-references.txt`](../../e0/retirement-references.txt); ao remover, revise instaladores, textos gerados, documentação e traduções. A matriz também inclui consumidores mantidos que precisam usar engines explícitas.

## APIs obsoletas

`colorMix()`, que retornava RGB, foi removida. Também foram removidos os helpers obsoletos da engine `getStyleFromRgb()` e `getStyleFromHsl()`, o `getStyleFromHsv()` do plugin HSV e o formatador local `getStyleFromOklch()` do pacote OKLCH. Converta RGB com `rgbToOklch()`, HSL com `rgbToOklch(hslToRgbFloat(color))` e resolva opções HSV pelo gerenciador de cores HSV registrado, usando `rangeColorToOklch(engine.pluginManager, { value: { hsv: color } })`. Passe o resultado canônico ao `getStyleFromOklch()` da engine, que trata gamut e HDR. Se a saída realmente precisar ser apenas RGB, use `mapOklchToSrgb(result).rgb`.

### Hooks do ciclo de vida dos interactors

As classes base dos interactors fornecem um `reset()` padrão sem efeito. A classe base externa também fornece um `clear()` sem efeito. O manager seleciona hooks personalizados após inicializar os interactors, inclusive durante a inicialização do redraw. Mantenha overrides que guardam estado ou executam trabalho no reset e adicione o modificador TypeScript `override` ao usar `noImplicitOverride`.

Consulte o [inventário de APIs obsoletas](../../e9/deprecated-migrations.md) para formatadores de cor removidos, opções de Confetti e Ribbons e a superfície opcional de compatibilidade particles.js mantida. Ao atualizar o compilador para Stencil 5, remova `applyPolyfills()` e aguarde `defineCustomElements()` quando o registro precisar terminar antes da hidratação. O wrapper tsParticles para Stencil usa Stencil 4 e ainda declara `applyPolyfills()`.

## Cores, opções e contratos públicos

As entradas de cor ainda aceitam RGB, HSL, HSV, HWB, Lab, LCH, OKLab, strings CSS, arrays e intervalos compatíveis. A animação de partículas agora usa OKLCH: troque os componentes HSL antigos `{ h, s, l }` por `{ h, c, l }`. O matiz continua sendo um ângulo; croma e luminosidade usam a escala numérica OKLCH do v5, e alfa continua separado como opacidade. Não copie a saturação HSL para o croma. Converta cores no limite de entrada ou mantenha uma entrada CSS/RGB compatível para análise pela engine. Gerenciadores que implementam a extensão de cor devem seguir o contrato atual do gerenciador OKLCH; consulte as [decisões de cor](../../../V5-COLOR-DECISIONS.md) para entradas, gamut, alfa e HDR.

## APIs com engine explícita implementadas em E1

```ts
import { createEngine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const engine = createEngine();
await loadSlim(engine);
const container = await engine.load({ id: "particles", options: {} });
container?.destroy();
```

As entradas root, `/lazy` e browser module não criam engines nem publicam objetos em `globalThis`. Scripts clássicos Rollup expõem o namespace de factories e loaders:

```js
const engine = tsParticles.createEngine();
await tsParticles.loadSlim(engine);
await engine.load({ id: "particles", options: {} });
```

Um bundle independente inclui definições da engine; scripts externos de features precisam primeiro da engine correspondente e suas dependências. Mantenha as versões dos pacotes alinhadas. O namespace contém definições, não uma engine. Carregar outro bundle não destrói uma engine criada anteriormente. A propriedade do mesmo canvas é exclusiva, inclusive entre cópias da engine em bundles distintos. Destrua o proprietário antes de transferir o canvas. IDs iguais em canvases distintos continuam independentes entre engines.

Use uma engine separada quando a aplicação precisar de registros de plugins, fontes aleatórias, loggers, schedulers ou propriedade de containers isolados. Registre cada feature necessária em todas as engines que a utilizarão:

```ts
import { createEngine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const editor = createEngine();
const preview = createEngine();
await Promise.all([loadSlim(editor), loadSlim(preview)]);

const editorContainer = await editor.load({ id: "editor", options: {} });
const previewContainer = await preview.load({ id: "preview", options: {} });

editorContainer?.destroy();
previewContainer?.destroy();
```

Pacotes de conveniência exportam `createConfetti(engine)`, `createFireworks(engine)`, `createParticles(engine)` e `createRibbons(engine)`. A função retornada fica vinculada a essa engine e mantém `init`, `create` e `version`:

```ts
import { createEngine } from "@tsparticles/engine";
import { createConfetti } from "@tsparticles/confetti";

const confetti = createConfetti(createEngine());
await confetti({ count: 30, spread: 70 });
```

`initPjs(engine)` retorna `{ particlesJS, pJSDom, Particles }` e não atribui essas APIs de compatibilidade a `globalThis`. `loadConfigs(engine)` registra explicitamente o catálogo e as paletas nessa engine.

| Família de wrapper                            | Propriedade e registro da engine                                                                                                                                    |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| React / Next.js                               | Passe `engine` a `ParticlesProvider` e forneça um registrar `init` que carregue os plugins necessários.                                                             |
| Vue 3                                         | Instale o provider particles com `{ engine, init }`; chame `useParticlesProvider()` nos descendentes.                                                               |
| Angular                                       | Passe uma engine a `service.init(engine, registrar)` e use um provider separado por engine independente. Componentes de conveniência recebem `engine` como entrada. |
| Preact, Solid, Inferno, Svelte, Stencil, Riot | Forneça a engine pela API do componente/provider e inicialize-a com `initParticlesEngine(engine, registrar)` quando disponível.                                     |
| Qwik                                          | Crie e registre no cliente e mantenha a engine com `noSerialize`; não a crie durante a renderização no servidor.                                                    |
| Custom elements                               | Defina `.engine` como propriedade; não é um atributo HTML serializado.                                                                                              |
| Nuxt 4                                        | Use `engine` e `registerParticles` exportados pelo módulo de inicialização configurado.                                                                             |

Consulte o README de cada wrapper para assinaturas específicas e limites SSR. Não recrie uma engine implícita em nível de módulo dentro de um provider.

O teardown de um componente destrói somente seu container. A aplicação administra a vida útil da engine compartilhada e deve concluir cargas pendentes e destruir containers antes de descartá-la. Serviços runtime pertencem a cada engine. Configure-os antes de carregar um container:

```ts
const engine = createEngine();
engine.setRandom(myRandomFn);
engine.setLogger(myLogger);
engine.setAnimationFunctions(requestFrame, cancelFrame);
const container = await engine.load({ id: "particles", options });
```

As antigas APIs globais `setParticlesRandom`, `getParticlesRandom`, `getParticlesRandomFn`, `setParticlesLogger` e `getParticlesLogger` foram removidas. Use `engine.setRandom`, `engine.getRandom`, `engine.getRandomFn`, `engine.setLogger` e `engine.getLogger`. Plugins personalizados acessam a proprietária por `container.engine` ou `container.pluginManager.engine`. Helpers runtime recebem um provedor aleatório explícito; use o `getRandomFn()` estável da engine proprietária para que mudanças futuras na fonte tenham efeito sem afetar outras engines. O agendamento de animações também é por engine; o scheduler que criou os frames de cada container é responsável por cancelá-los.

### Ordem de inicialização

Nos wrappers que expõem `initParticlesEngine`, chame `initParticlesEngine(engine, registrar)` durante a inicialização da aplicação. Componentes podem ser montados antes: aguardam a inicialização dessa engine e não criam nem inicializam uma engine implícita. Para jQuery, use `$.particles(engine).init(registrar)`. Providers React/Vue e a inicialização do serviço Angular fazem o mesmo. Se o registro falhar, os aguardantes atuais são rejeitados e uma nova tentativa de inicialização é possível.

## Entradas de módulos e navegador

Importe a raiz do pacote para a API ESM padrão. Use o subpath `/lazy` quando precisar da entrada adiada; o carregamento dinâmico não restaura o singleton antigo. As verificações de pacotes instalados cobrem `import` ESM, `require` CJS e a condição `browser` para as entradas root e `/lazy`.

Na saída clássica para navegador, o namespace Rollup contém factories e loaders de features. Crie a engine após carregar o script namespace e passe-a a cada loader. Scripts externos dependem da engine correspondente e de dependências compartilhadas; use versões coerentes e a ordem do README browser do bundle. Um bundle independente contém as features selecionadas. Nem a entrada browser nem a importação da raiz do pacote criam uma engine automaticamente.

## Limites de pacotes e APIs singleton removidas

Importe tipos runtime e `createEngine` de `@tsparticles/engine`, depois apenas os pacotes de features necessários, como `@tsparticles/slim` ou um pacote dedicado de interação, forma ou updater. Pacotes de conveniência são adapters separados. Prefira exports declarados a caminhos internos `dist` ou código-fonte de outro pacote. O relatório E10 de pacotes instalados é a referência para verificações atuais de `exports`, declarações e resolução.

O singleton de engine exportado e os helpers globais de mutação da engine foram removidos. Troque `setParticlesRandom`, `getParticlesRandom`, `getParticlesRandomFn`, `setParticlesLogger` e `getParticlesLogger` pelos métodos correspondentes da engine proprietária do container. Se a aplicação usava `tsParticles.load`, `tsParticles.loadJSON` ou `tsParticles.dom`, chame essas operações na engine explícita ou mantenha o container retornado. Não acesse `window.tsParticles` por um pacote ESM/CJS importado; bundles clássicos de navegador expõem o namespace documentado separadamente.
