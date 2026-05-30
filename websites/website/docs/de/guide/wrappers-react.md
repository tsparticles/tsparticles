# Wrapper: @tsparticles/react

Offizieller React-Wrapper für `tsParticles`.

## Installieren

```bash
pnpm add @tsparticles/react @tsparticles/engine @tsparticles/slim
```

## Schneller Einrichtungsablauf

1. Wrapper-, Engine- und Loader-Paket installieren.
2. Platzieren Sie `ParticlesProvider` auf der Stammebene Ihrer App (z. B. `main.tsx` oder `layout.tsx`) — es muss nur einmal für die gesamte App-Lebensdauer gerendert werden.
3. Einmal initialisieren mit `ParticlesProvider` und `loadSlim`.
4. Rendern Sie die Komponente `Particles` mit typisierten Optionen.

## Monorepo-Referenzen

- Paketordner: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/react>
- Demo-App: <https://github.com/tsparticles/tsparticles/tree/main/demo/react>

## Readme

- Wrapper-README: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/react#readme>

## Verwandte Dokumente

- [`/guide/wrappers`](/de/guide/wrappers)
- [`/guide/frameworks`](/de/guide/frameworks)
