# Involucro: @tsparticles/nextjs

Wrapper Next.js ufficiale basato su `@tsparticles/react`.

## Installa

```bash
pnpm add @tsparticles/nextjs @tsparticles/engine @tsparticles/slim
```

## Flusso di configurazione rapido

1. Installa il wrapper e le dipendenze Next.js.
2. Continua a eseguire il rendering lato client solo per il Canvas delle particelle.
3. Posiziona `NextParticlesProvider` alla radice della tua app (`layout.tsx` o `_app.tsx`) — deve essere renderizzato una sola volta.
4. Inizializzare il motore una volta ed eseguire il rendering del componente wrapper.

## Riferimenti a Monorepo

- Cartella del pacchetto: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/nextjs>
- App dimostrative: <https://github.com/tsparticles/tsparticles/tree/main/demo/nextjs>, <https://github.com/tsparticles/tsparticles/tree/main/demo/nextjs-legacy>

## Leggimi

- LEGGIMI wrapper: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/nextjs#readme>

## Documenti correlati

- [`/guide/wrappers`](/it/guide/wrappers)
- [`/guide/frameworks`](/it/guide/frameworks)
