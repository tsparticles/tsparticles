# Migrar de v3.x

Em `v3.x`, os maiores riscos de migracao sao a **compatibilidade das opcoes** e as **alteracoes de pacotes**.

## Mudancas prioritarias

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## Renomeacao de pacotes

Alguns pacotes `v3.x` foram renomeados ou reestruturados:

| Pacote v3                           | Pacote atual                    | Nota                                          |
| ----------------------------------- | ------------------------------- | --------------------------------------------- |
| `@tsparticles/move-base`            | `@tsparticles/plugin-move`      | Unificados em um unico plugin                 |
| `@tsparticles/move-parallax`        | `@tsparticles/plugin-move`      | Unificados em um unico plugin                 |
| `@tsparticles/updater-color`        | `@tsparticles/updater-paint`    | Substituido pelo sistema paint                |
| `@tsparticles/updater-stroke-color` | `@tsparticles/updater-paint`    | Substituido pelo sistema paint                |
| `@tsparticles/plugin-hsv-color`     | `@tsparticles/plugin-hsv-color` | Movido para `plugins/colors/hsv/`, mesmo nome |
| (nao necessario no v3 - integrado)  | `@tsparticles/plugin-interactivity` | Necessario para todos os plugins de interacao (grab, bubble, repulse, etc.) funcionarem |

## Exemplos de mapeamento de opcoes

Antes (estilo `v3.x`):

```ts
const options = {
  particles: {
    color: {
      value: "#ff0000",
    },
    stroke: {
      width: 2,
      color: "#000000",
    },
  },
};
```

Depois (atual):

```ts
const options = {
  particles: {
    paint: {
      fill: {
        value: "#ff0000",
      },
      stroke: {
        width: 2,
        color: "#000000",
      },
    },
  },
};
```

## Migracao da Load API

Antes (chamada posicional legada):

```ts
await tsParticles.load("tsparticles", options);
```

Depois (parametro objeto):

```ts
await tsParticles.load({
  id: "tsparticles",
  options,
});
```

## Passos recomendados

1. Alinhe todos os pacotes `@tsparticles/*` para a versao mais recente.
2. Substitua as chaves de opcao obsoletas (`particles.color`, `particles.stroke`) por `particles.paint.*`.
3. Atualize os pacotes renomeados em `package.json` (ver tabela acima).
4. Se voce usa plugins de interacao (grab, bubble, repulse, etc.), instale `@tsparticles/plugin-interactivity` e carregue-o com `await loadInteractivityPlugin(tsParticles)` antes de carregar qualquer plugin de interacao.
5. Verifique se plugins/formas personalizados sao carregados antes de `tsParticles.load(...)`.
6. Reteste interacoes e cenas criticas de desempenho.

## Funcoes de carregamento granulares

Alguns pacotes expoem funcoes de carregamento individuais para carregar apenas o necessario, reduzindo o tamanho do bundle.

### Plugins

- **`@tsparticles/plugin-absorbers`**: `loadAbsorbersPluginSimple` (apenas ciclo de vida e desenho dos absorvedores), `loadAbsorbersInteraction` (apenas interacao clique/hover) ou `loadAbsorbersPlugin` (ambos).
- **`@tsparticles/plugin-emitters`**: `loadEmittersPluginSimple` (apenas ciclo de vida e desenho dos emissores), `loadEmittersInteraction` (apenas interacao clique/hover) ou `loadEmittersPlugin` (ambos).

### Formas

- **`@tsparticles/shape-polygon`**: `loadGenericPolygonShape` (poligono) ou `loadTriangleShape` (triangulo) individualmente, ou `loadPolygonShape` para ambos.
- **`@tsparticles/shape-cards`**: `loadClubsSuitShape`, `loadDiamondsSuitShape`, `loadHeartsSuitShape`, `loadSpadesSuitShape` (naipes individuais), `loadCardSuitsShape` (todos os naipes), `loadFullCardsShape` (imagens de cartas) ou `loadCardsShape` (todos).

Todos os outros pacotes de formas (arrow, circle, cog, emoji, heart, image, infinity, line, matrix, path, rounded-polygon, rounded-rect, spiral, square, squircle, star, text) exportam diretamente uma unica funcao `load*Shape`.

## Recursos

- Matriz de renomeacao: [`/migrations/option-rename-matrix`](/pt/migrations/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/pt/options/particles-paint)
