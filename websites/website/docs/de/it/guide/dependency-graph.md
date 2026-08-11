# Grafico delle dipendenze

Questa è una mappa pratica della stratificazione dei pacchetti esposta nel file README principale `tsParticles`.

Per il grafico completo ed esaustivo si veda:

- <https://github.com/tsparticles/tsparticles/blob/main/README.md#dependency-graph>

## Flusso dei pacchetti di alto livello

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

## Come utilizzare questa mappa

- Inizia da `engine` + `slim` per la maggior parte delle app di produzione.
- Passa a `tsparticles` se hai bisogno di interazioni/plugin integrati aggiuntivi.
- Passa a `all` solo quando hai bisogno del set completo di funzionalità.
- Utilizza pacchetti dedicati (`confetti`, `fireworks`, `particles`) per effetti mirati.

## Pagine correlate

- [`/guide/getting-started`](/it/guide/getting-started)
- [`/guide/installation`](/it/guide/installation)
- [`/options/performance`](/it/options/performance)
