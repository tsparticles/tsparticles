# Migrar de v1.x

Migrar de `v1.x` para a versão atual geralmente exige uma atualização completa das dependências e uma verificação da configuração.

Os principais bloqueios práticos são:

1. Padrões antigos de pacotes e imports.
2. A forma da chamada `tsParticles.load(...)`.
3. As chaves de opções atualizadas nos esquemas modernos.

## Migração da API load

O `load` moderno aceita um único objeto de parâmetros.

Antes (estilo posicional legado):

```ts
await tsParticles.load("tsparticles", oldOptions);
```

Depois:

```ts
await tsParticles.load({
  id: "tsparticles",
  options: oldOptions,
});
```

Se carregar de JSON:

```ts
await tsParticles.load({
  id: "tsparticles",
  url: "/particles.json",
});
```

## Migração das opções principais

Comece procurando estas chaves nas configurações:

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

Exemplo de reescrita:

```ts
// antes
particles: {
  color: { value: ["#ff6b6b", "#4ecdc4"] },
  stroke: { width: 0 }
}

// depois
particles: {
  paint: {
    fill: { value: ["#ff6b6b", "#4ecdc4"] },
    stroke: { width: 0 }
  }
}
```

## Passos recomendados

1. Substitua os nomes antigos dos pacotes pelos pacotes `@tsparticles/*` atuais.
2. Comece com `@tsparticles/engine` + `@tsparticles/slim` e depois adicione os plugins necessários.
3. Converta as chamadas `load` antigas para a assinatura baseada em objeto `load({ ... })`.
4. Valide as chaves de opções com a documentação atual e corrija os campos renomeados ou removidos.
5. Execute verificações visuais e de desempenho em desktop e mobile.

## Checklist

- Remova imports obsoletos da estrutura antiga de pacotes.
- Confirme que interações, links e formas personalizadas continuam a funcionar como esperado.
- Para configurações no estilo `particles.js`, considere a camada de compatibilidade.

## Documentação útil de opções

- Matriz de renomeação: [`/migrations/option-rename-matrix`](/pt/migrations/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/pt/options/particles-paint)
- Nota de migração `particles.color`: [`/options/particles-color`](/pt/options/particles-color)
- Nota de migração `particles.stroke`: [`/options/particles-stroke`](/pt/options/particles-stroke)

## Referências

- Compatibilidade legada e bridge particles.js: [`/migrations/particles-js`](/pt/migrations/particles-js)
- Matriz de instalação: [`/guide/installation`](/pt/guide/installation)
- Releases do repositório: <https://github.com/tsparticles/tsparticles/releases>
