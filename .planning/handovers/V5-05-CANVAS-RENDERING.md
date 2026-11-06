# V5-05 — CanvasManager, rendering e altri costi del core

Stato: da eseguire. Dipendenza: 04 completato.

## Responsabilità

Domini Canvas/Rendering, helper colore/HDR/style strettamente correlati, adattamenti
ai contratti condivisi e relativi test. ParticlesManager, Particle e Retina
sono revisionati integralmente nei successivi handover 06/07. Non introdurre
nuovi package solo per distribuire i file. Non annullare modifiche di altri agent.

## Lavoro

1. Analizzare insieme `CanvasManager` e `RenderManager`: gestione risorsa/canvas,
   style/fullscreen, resize/zoom, contesti, colori/HDR, pipeline draw e hook plugin.
   Coordinare dipendenze e misure con le revisioni obbligatorie di
   `ParticlesManager` (06) e `Particle`/Retina (07).
2. Introdurre helper privati di dominio quando eliminano duplicazioni o dipendenze;
   non aggiungere un oggetto/closure per particella o per frame per ridurre le righe.
3. Separare codice DOM e trasformazioni pure se il grafo consente esclusione reale.
   Un import dinamico sempre eseguito sposta byte, non li elimina. Misurare somma
   dei chunk, startup e costo runtime delle eventuali capacità lazy.
4. Preservare OffscreenCanvas, trasferimento una tantum, ownership e canvas fornito
   dal consumer. La WeakMap dei trasferimenti è una cache della risorsa browser:
   per-engine non significa trasferire due volte lo stesso HTMLCanvasElement.
5. Conservare pipeline background/background mask, layer e ordine hook, blending,
   trasformazioni/zoom e source canvas dei plugin export. Non eliminare HDR,
   P3, tone mapping o fallback per ottenere una cifra migliore.
6. Ridurre dipendenze obbligatorie solo con un percorso opzionale completo: loader,
   options, bundle che lo abilita, fallback esplicito e test. Nessun enablement
   nascosto basato sull'engine globale o sugli effetti collaterali dell'import.
7. Misurare risultato sull'entry minimale e sui bundle, più prestazioni di draw/update
   e allocazioni. Confronti omogenei; riportare eventuale costo dei nuovi confini.

## Prove di accettazione

- DOM canvas e OffscreenCanvas esplicito, resize/fullscreen/zoom, teardown e
  riutilizzo DOM dopo destroy, errori supporto/trasferimento con codici corretti.
- Ownership definita per stesso canvas con engine distinti; nessun trasferimento
  ripetuto, nessun listener/MutationObserver/media listener perso o duplicato.
- HDR richiesto vs color space effettivo, P3/sRGB e fallback, tone mapping e
  alpha/blending; test dei layer e hook di background/mask/export.
- Smoke in browser reale di scena base, links/collisioni, emitter/absorber,
  HDR/background mask e due engine contemporanei. Registrare ambiente e screenshot
  quando utili; segnalare il gate aperto se non eseguibile.
- Suite completa, lint/format e build downstream; budget intermedi rispettati.

## Consegna

Misure per scenario, prove browser e inventario responsabilità finali. Registrare
anche ottimizzazioni considerate e scartate quando spiegano un tradeoff concreto.
Aggiornare ARCHITECTURE/STRUCTURE, changelog se necessario e indice.

## Approfondimenti di performance e dimensioni

Consultare [V5-IMP-02-BUNDLE-GRAPH](improvements/V5-IMP-02-BUNDLE-GRAPH.md), [V5-IMP-06-RENDER-LIFECYCLE](improvements/V5-IMP-06-RENDER-LIFECYCLE.md).
Registrare gli esiti dei candidati assegnati come richiesto dal [piano miglioramenti](V5-IMPROVEMENTS.md).

## Migrazione colore obbligatoria

Consultare [V5-COLOR — OKLCH](V5-COLORS-OKLCH.md).
Eseguire C1/C2 e integrazione minima C3: conversioni senza clipping anticipato,
output OKLCH/P3 e fallback, capability gamut/precisione/HDR separate, superfici
intermedie e test numerici/browser. La revisione integrale Particle resta in 07.
