# Abhängigkeitsdiagramm

Dies ist eine praktische Karte der Paketschichtung, die in der Haupt-README-Datei `tsParticles` offengelegt wird.

Die vollständige, ausführliche Grafik finden Sie unter:

- <https://github.com/tsparticles/tsparticles/blob/main/README.md#dependency-graph>

## Paketfluss auf hoher Ebene

```text
tsParticles Engine
`- tsParticles Basic
   |- tsParticles Particles
   |- tsParticles Confetti
   |- tsParticles Fireworks
   `- tsParticles Slim
      `- tsparticles
         `- tsParticles All
```

## So verwenden Sie diese Karte

- Beginnen Sie mit `engine` + `slim` für die meisten Produktions-Apps.

- Wechseln Sie zu `tsparticles`, wenn Sie zusätzliche integrierte Interaktionen/Plugins benötigen.
- Wechseln Sie nur dann zu `all`, wenn Sie den vollständigen Funktionsumfang benötigen.
- Verwenden Sie dedizierte Bundles (`confetti`, `fireworks`, `particles`) für gezielte Effekte.

## Verwandte Seiten

- [`/guide/getting-started`](/de/guide/getting-started)
- [`/guide/installation`](/de/guide/installation)
- [`/options/performance`](/de/options/performance)
