# Invólucro: @tsparticles/react

Wrapper oficial do React para `tsParticles`.

## Instalar

```bash
pnpm add @tsparticles/react @tsparticles/engine @tsparticles/slim
```

## Fluxo de configuração rápida

1. Instale o pacote wrapper + motor + carregador.
2. Coloque `ParticlesProvider` na raiz do seu aplicativo (por exemplo, `main.tsx` ou `layout.tsx`) — ele deve ser renderizado apenas uma vez para todo o ciclo de vida do aplicativo.
3. Inicialize uma vez com `ParticlesProvider` e `loadSlim`.
4. Renderize o componente `Particles` com opções digitadas.

## Referências Monorepo

- Pasta do pacote: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/react>
- Aplicativo de demonstração: <https://github.com/tsparticles/tsparticles/tree/main/demo/react>

## Leia-me

- LEIA-ME do wrapper: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/react#readme>

## Documentos relacionados

- [`/guide/wrappers`](/pt/guide/wrappers)
- [`/guide/frameworks`](/pt/guide/frameworks)
