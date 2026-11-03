# V5-09 — Rifinire la distribuzione browser senza singleton

Stato: da eseguire. Contratto minimo e migrazione funzionante già in 01;
rifinitura e verifica finale dopo 08. Non rimandare a questo punto build rotte.

## Responsabilità

Entry browser/bundle/lazy di engine, bundle e feature; package exports/browser,
manifest dist/CDN; `cli/utils/{rollup-plugin,rolldown-plugin,webpack-config}/`,
generatori e relativi test, esempi script/CDN e module-script. Non annullare
modifiche altrui. Conservare i formati supportati salvo decisione motivata esplicita.

## Evidenza di partenza

Rollup ha policy dedicate `config/iifePolicy.ts` e `config/entry.ts`: scope globali
sotto `__tsParticlesInternals`, mapping degli external, bootstrap namespace/Proxy
ed entry `browser`/`bundle`/lazy. Anche il sorgente dei feature browser espone
loader globali. Questa infrastruttura richiede revisione oltre alla rimozione
`globalThis.tsParticles`; verificare le implementazioni degli altri bundler.

## Lavoro

1. Inventariare prodotti supportati: ESM consumer browser, script classici IIFE/UMD
   dove previsti, bundle completi/autocontenuti, engine + feature esterne e lazy.
   Separare API pubblica del bootstrap dal namespace interno dei moduli.
2. Definire in 01 e consolidare qui nome namespace, factory, loader e API convenience.
   Caricare script rende disponibili definizioni; l'app crea e conserva i propri
   engine e passa quello scelto a ogni loader. Esempio minimo e due engine devono
   restare semplici. Nessun default engine reintrodotto per comodità CDN.
3. Rivedere registri globali, mapping degli external e bootstrap: mantenere solo
   l'infrastruttura necessaria a risolvere moduli, senza istanze, servizi o flag
   globali di registrazione che impediscano il secondo engine.
4. Analizzare duplicazione di core/helper tra engine, slim/full/all e feature
   autonome: confrontare distribuzioni autocontenute e con external usando il costo
   totale della pagina. Stabilire modalità di composizione supportate e relativo
   ordine script; gli ordini non supportati devono fallire con errore chiaro.
5. Definire caricamenti ripetuti, più bundle sulla pagina, collisioni di namespace
   e version mismatch. Non sovrascrivere motori già creati o ricollegare plugin
   silenziosamente a una versione incompatibile. Testare gli ordini documentati.
6. Verificare lazy: URL/base path dei chunk da CDN, minificato/non minificato,
   dynamic import e dipendenze esterne. Misurare chunk caricati per stessa scena;
   niente risparmio dichiarato per semplice spostamento di codice.
7. Allineare Rollup (standard), Rolldown e Webpack per gli output effettivamente
   supportati. Controllare entry selection, global name, externals, minificazione,
   exports e `sideEffects`. La risoluzione browser dei moduli standard resta pura.
8. Aggiornare README/guide/CDN, template e generatori. Esplicitare breaking change
   del precedente auto-bootstrap; testare il codice pubblicato negli esempi.

## Prove di accettazione

- Browser reale: bundle completo → factory → loader → load, e engine + singole
  feature; due engine con set plugin diversi; stessa feature installata su entrambi.
- Slim + full oppure due bundle supportati sulla stessa pagina: nessuna istanza
  implicita, nessuna perdita dei motori esistenti o deduplicazione globale scorretta.
- Lazy servito da un percorso CDN realistico, chunk caricati correttamente;
  errori di modulo/versione chiari. Testare anche reimport/script duplicati.
- ESM browser e package conditions non scrivono globals; lo script classico espone
  soltanto il bootstrap documentato e le definizioni necessarie.
- Output e pacchetto distribuito coerenti per tutti i bundler/formati supportati;
  test delle policy/mapping oltre agli smoke degli artefatti costruiti.
- Report dimensioni: pagina completa e feature selettive, duplicazioni residue,
  byte entry/chunk, gzip/Brotli e costo startup.

## Consegna

Matrice formato/entry/bundler, contratto browser definitivo con esempi, test reali
ed esiti, cambiamenti ai manifest e misure. Il gate 10 include questa matrice.

## Approfondimenti di performance e dimensioni

Consultare [V5-IMP-02-BUNDLE-GRAPH](improvements/V5-IMP-02-BUNDLE-GRAPH.md).
Registrare gli esiti dei candidati assegnati come richiesto dal [piano miglioramenti](V5-IMPROVEMENTS.md).
