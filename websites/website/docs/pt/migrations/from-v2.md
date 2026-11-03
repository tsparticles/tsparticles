# Migrar de v2.x

A passagem de `v2.x` para a versão atual costuma ter duas áreas de ruptura principais:

1. A migração da assinatura de `tsParticles.load(...)`.
2. A migração das chaves de opções (especialmente cor e stroke).

## Migração da API load (importante)

Nas versões modernas, `load` aceita um **único objeto de parâmetros**.

Antes (estilo posicional `v2.x`):

```ts
await tsParticles.load("tsparticles", {
  particles: {
    number: {
      value: 80,
    },
  },
});
```

Depois (objeto único):

```ts
await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      number: {
        value: 80,
      },
    },
  },
});
```

Pode também passar `element`, `url` e `index` no mesmo objeto.

```ts
await tsParticles.load({
  element: document.getElementById("tsparticles") as HTMLElement,
  url: "/particles.json",
  index: 0,
});
```

## Migração das opções principais

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

Antes:

```ts
particles: {
  color: { value: "#00ffcc" },
  stroke: { width: 1, color: "#003344" }
}
```

Depois:

```ts
particles: {
  paint: {
    fill: { value: "#00ffcc" },
    stroke: { width: 1, color: "#003344" }
  }
}
```

## Passos recomendados

1. Atualize todos os pacotes `@tsparticles/*` em conjunto.
2. Verifique se as versões dos wrappers (React/Vue/Angular/etc.) estão na mesma linha major.
3. Converta todas as chamadas `tsParticles.load(id, options)` para parâmetros de objeto.
4. Migre as chaves conhecidas (`color`, `stroke`) para `paint.fill`/`paint.stroke`.
5. Execute uma passagem de regressão visual nas configurações mais complexas.

## Checklist

- Garanta que o lockfile não contenha versões major misturadas.
- Verifique se o bundle escolhido (`basic`, `slim`, `all`) ainda corresponde às funcionalidades ativas.
- Teste novamente os hooks do ciclo de vida do canvas (`loaded`, `particlesLoaded`, caminhos de cleanup).

## Documentação útil de opções

- Matriz de renomeação: [`/migrations/option-rename-matrix`](/pt/migrations/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/pt/options/particles-paint)
- Nota de migração `particles.color`: [`/options/particles-color`](/pt/options/particles-color)
- Nota de migração `particles.stroke`: [`/options/particles-stroke`](/pt/options/particles-stroke)

## Referências

- Regra de alinhamento de versões: [`/migrations/releases`](/pt/migrations/releases)
- Releases do repositório: <https://github.com/tsparticles/tsparticles/releases>
