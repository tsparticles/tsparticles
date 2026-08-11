# Invólucro: @tsparticles/nextjs

Wrapper Next.js oficial desenvolvido em `@tsparticles/react`.

## Instalar

```bash
pnpm add @tsparticles/nextjs @tsparticles/engine @tsparticles/slim
```

## Fluxo de configuração rápida

1. Instale o wrapper e as dependências Next.js.
2. Continue renderizando do lado do cliente apenas para tela de partículas.
3. Coloque `NextParticlesProvider` na raiz do seu aplicativo (`layout.tsx` ou `_app.tsx`) — ele deve ser renderizado apenas uma vez.
4. Inicialize o mecanismo uma vez e renderize o componente wrapper.

## Referências Monorepo

- Pasta do pacote: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/nextjs>
- Aplicativos de demonstração: <https://github.com/tsparticles/tsparticles/tree/main/demo/nextjs>, <https://github.com/tsparticles/tsparticles/tree/main/demo/nextjs-legacy>

## Leia-me

- LEIA-ME do wrapper: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/nextjs#readme>

## Documentos relacionados

- [`/guide/wrappers`](/pt/guide/wrappers)
- [`/guide/frameworks`](/pt/guide/frameworks)
