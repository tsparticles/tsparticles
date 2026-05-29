# Parco giochi

Suddiviso per caso d'uso:

- [`Configs Playground`](/it/playground/configs): demo più ricche con opzioni completamente modificabili.
- [`Shapes Playground`](/it/playground/shapes): demo focalizzate su `shape.type`, con opzioni specifiche per forma quando disponibili.
- [`Presets Playground`](/it/playground/presets): demo ufficiali con nomi preimpostati (`{ preset: "..." }`).
- [`Palettes Playground`](/it/playground/palettes): demo incentrate sulla tavolozza dal progetto dei preset.
- [`Bundles Playground`](/it/playground/bundles): campi da gioco dedicati per `@tsparticles/confetti`, `@tsparticles/fireworks`, `@tsparticles/particles` e `@tsparticles/ribbons`.

L'esecuzione è sempre **solo attivata dall'utente** (nessuna riproduzione automatica).

## Flusso condiviso

Il layout è coerente in tutti i parchi gioco:

1. Prima l'anteprima della tela.
2. Controlli per Avvio/Pausa/Riprendi/Distruggi.
3. Editor JSON per le opzioni.

4. Scegli una demo dal menu.
5. Premi `Start` per eseguirlo (nessuna riproduzione automatica).
6. Modifica il JSON nell'editor.
7. Premi di nuovo `Start` per ricaricare con le nuove opzioni.
8. Utilizzare `Pause`/`Resume` per controllare le prestazioni e l'utilizzo della CPU.

> Nota: `Destroy` rilascia completamente l'istanza del contenitore.

## Flusso di lavoro suggerito

- Prototipa qui finché l'effetto non è stabile.
- Copia il JSON finale nel tuo progetto.
- Digitalo con `ISourceOptions` nel codice dell'applicazione.
