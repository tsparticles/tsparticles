# Versioning & Migration

Use esta secao para navegar entre as versoes principais do `tsParticles`, acompanhar as releases e entender o versionamento.

## Guias de migracao

- [`Migrar de v3.x`](/pt/migrations/from-v3)
- [`Migrar de v2.x`](/pt/migrations/from-v2)
- [`Migrar de v1.x`](/pt/migrations/from-v1)

## Rota rapida

- De `v3.x`: comecar por [`/pt/migrations/from-v3`](/pt/migrations/from-v3) (foco: mudancas de chaves de opcao + renomeacao de pacotes).
- De `v2.x`: comecar por [`/pt/migrations/from-v2`](/pt/migrations/from-v2) (foco: API `load(...)` + opcoes).
- De `v1.x`: comecar por [`/pt/migrations/from-v1`](/pt/migrations/from-v1) (foco: pacotes, loaders, opcoes).

## Onde a migracao normalmente quebra

As migracoes entre versoes principais quebram em dois lugares:

1. **Forma da API Load** (antigos parametros posicionais vs novo parametro objeto).
2. **Esquema de opcoes** (chaves renomeadas/movidas).

Se sua app compila mas a renderizacao esta errada, comecar pelas opcoes.

## Busca rapida

- [Matriz de renomeacao de opcoes](/pt/migrations/option-rename-matrix) — mapeamento entre chaves legacy e atuais.

## Tambem util

- [Changelog](/pt/migrations/changelog) — ultimas notas de versao.
- [Releases e Versionamento](/pt/migrations/releases) — regras de alinhamento de versoes e checklist de publicacao.
- [Migracao de particles.js](/pt/migrations/particles-js) — migrar de `particles.js` ou `canvas-confetti`.
