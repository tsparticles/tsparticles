# Migração e compatibilidade

Se você estiver migrando de `particles.js`, use esta ordem:

1. substitua o script/pacote antigo por `@tsparticles/engine` + pacote (`@tsparticles/slim`)
2. mova sua configuração antiga e mapeie campos não suportados de forma incremental
3. teste as interacoes (hover/clique/links) uma por uma

## Notas canônicas de migração

- Fonte oficial do guia de migração: [`tsparticles/markdown/pjsMigration.md`](https://github.com/tsparticles/tsparticles/blob/main/markdown/pjsMigration.md)
- Exemplos de compatibilidade herdada estão disponíveis nas pastas de demonstração.

## Pacote de compatibilidade

Se você precisar de uma camada de ponte ao migrar configurações legadas:

- npm: <https://www.npmjs.com/package/@tsparticles/pjs>
- jsDelivr: <https://www.jsdelivr.com/package/npm/@tsparticles/pjs>

Leitura adicional:

- Artigo sobre migração: <https://dev.to/matteobruni/migrating-from-particles-js-to-tsparticles-2a6m>
- 5 razões para mudar: <https://dev.to/matteobruni/5-reasons-to-use-tsparticles-and-not-particles-js-1gbe>

## Dicas comuns de mapeamento

- O antigo `particlesJS(...)` init torna-se `tsParticles.load({ id, options })`.
- Muitos valores legados ainda têm equivalentes diretos em `particles`, `interactivity` e `detectRetina`.
- Nova arquitetura orientada por plugins significa que alguns recursos avançados exigem carregamento explícito de pacotes.

## Checklist de migração para produção

- Verifique a paridade visual em desktop e dispositivos móveis.
- Verifique o impacto da CPU/GPU em dispositivos de baixo custo.
- Verifique se nenhuma chave de opção é ignorada silenciosamente.
- Fixe as versões exatas do pacote antes da semana de lançamento.

## Migração de canvas-confetti para `@tsparticles/confetti`

Se você estiver migrando de `canvas-confetti`, a opção mais fácil é substituir chamadas imperativas por chamadas de API `@tsparticles/confetti`.

## Mapeamento típico

- `confetti({...})` -> `await confetti({...})`
- tela personalizada -> `const local = await confetti.create(canvas, defaults)` então `await local({...})`
- disparos repetidos -> mantenha seus temporizadores/loops existentes, chame `await confetti(...)` nesses retornos de chamada

## Exemplo de conversão

Antes (estilo `canvas-confetti`):

```ts
import confetti from "canvas-confetti";

confetti({
  particleCount: 90,
  spread: 70,
  origin: { x: 0.5, y: 0.6 },
});
```

Depois (`@tsparticles/confetti`):

```ts
import { confetti } from "@tsparticles/confetti";

await confetti({
  count: 90,
  spread: 70,
  position: { x: 50, y: 60 },
});
```

## Notas sobre o nome da opção

- `particleCount` -> `count`
- `origin.x`/`origin.y` em `0..1` -> `position.x`/`position.y` em `0..100`
- `startVelocity`, `spread`, `angle` e `colors` mantêm a mesma semântica

Para API completa e ajudantes, consulte: <https://github.com/tsparticles/tsparticles/tree/main/bundles/confetti#readme>
