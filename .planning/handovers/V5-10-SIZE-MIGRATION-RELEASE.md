# V5-10 — Gate dimensioni, migrazione e preparazione release

Stato: da eseguire. Dipendenza: 01–09 verificati.

## Responsabilità

Report/budget bundle e relativi check CI, test di integrazione/package consumer,
manifest distribuiti, changelog, README, guide, traduzioni, demo/template/codegen e
planning finale. Correggere regressioni riscontrate coordinandosi con le ownership
precedenti; non annullare modifiche altrui. Questo handover prepara la release,
non autorizza publish, deployment o incremento automatico di versione.

## Lavoro

1. Ricostruire gli artefatti dalla stessa pipeline della baseline, senza usare
   file dist obsoleti. Verificare pack/publishConfig e risoluzione dei consumer
   installati da pacchetto preparato, comprese dichiarazioni e package exports.
2. Completare `V5-BUNDLE-REPORT.md`: raw/min/gzip/Brotli, entry + chunk effettivi,
   delta assoluti e percentuali, dipendenze trattenute, budget e spiegazioni.
   Non contare source map o altri asset come JS, ma registrarli separatamente.
3. Automatizzare gli scenari di dimensione in un target/check coerente con Nx
   e la pipeline esistente; budget versionati con toolchain e motivazioni. Niente
   percentuali o soglie cambiate per far passare il refactor a posteriori.
4. Completare la guida v4 → v5: factory, più engine, plugin registrati per engine,
   random/log (ed eventuale scheduler), wrapper/provider, convenience bundle,
   browser/CDN e lazy, simboli rimossi e nuovi confini dei moduli.
5. Eseguire gli esempi documentati e il codice generato da CLI/MCP. Ricercare
   pattern v4 nelle guide EN, nelle 9 traduzioni, README e template; distinguere
   esempi storici di migrazione dai consumer che devono usare la v5.
6. Allineare `package.json` e `package.dist.json` dei pacchetti modificati, compresi
   i bundle pubblicabili, changelog e typedoc. Non cambiare API per correggere
   soltanto un problema di packaging senza test della risoluzione reale.
7. Aggiornare PROJECT/REQUIREMENTS/ROADMAP/STATE e analisi codebase pertinenti con
   fatti verificati. Conservare lo storico 4.x e il vecchio significato di “v5”
   usato per una revisione del solver fluid: non era la major del prodotto.

## Copertura aggiuntiva obbligatoria

Raccogliere `V5-ENGINE-AUDIT.md`, `V5-PLUGIN-AUDIT.md` e matrice browser di 09.
Verificare copertura completa di sorgenti engine e pacchetti estensione, compresi
Particle, ParticlesManager, utility, opzioni e palette. “Già compatibile” richiede
prove; un file o pacchetto senza esito lascia il gate aperto.

## Checklist finale

- [ ] Nessun singleton/default engine implicito, nessuno stato personalizzato
      random/logger condiviso; eventuali limiti scheduler/cache dichiarati e risolti
      oppure riportati come gate aperto.
- [ ] Registri, eventi, async init e teardown isolati su più engine.
- [ ] Revisione completa engine, ParticlesManager/Particle e matrici plugin/browser chiuse.
- [ ] API plugin/option inheritance e consumer built-package verificati.
- [ ] Scena minima e slim realmente più piccoli in gzip e Brotli; tutti i budget
      soddisfatti. Entry lazy e totale chunk distinti nel report.
- [ ] Nessuna regressione di draw/update/allocazioni non spiegata e accettata.
- [ ] Test mirati, suite completa (`pnpm exec vitest`, più run finito se necessario),
      lint e format passano. Target Nx verificati prima di eseguirli.
- [ ] Rebuild non CLI/non website/non palette previsto da AGENTS; ulteriori build
      dei CLI/generatori/consumer modificati; `pnpm run build:ci` completo.
- [ ] Smoke browser reali e guide/demos/template/codegen funzionanti.
- [ ] Changelog breaking e guida migrazione completi; EN e traduzioni coerenti.

## Consegna

Stato finale per ogni requisito V5, report riproducibile e problemi residui con
passi di riproduzione. Non segnare v5 completata se resta aperto un gate richiesto;
non presentare un limite dell'ambiente come verifica superata. Lasciare al flusso
release separato commit/tag/versionamento, pubblicazione e deployment.

## Approfondimenti di performance e dimensioni

Consultare [V5-IMP-01-MEASUREMENT](improvements/V5-IMP-01-MEASUREMENT.md).
Registrare gli esiti dei candidati assegnati come richiesto dal [piano miglioramenti](V5-IMPROVEMENTS.md).

## Valutazioni architetturali

Raccogliere anche `V5-ARCHITECTURE-DECISIONS.md`, previsto dal
[piano architetturale](V5-ARCHITECTURE.md). Ogni voce ARCH-01–04 deve avere scelta,
alternative, evidenze, impatto sui consumer ed esito; mantenere o rinviare una
riscrittura richiede motivazione e non esenta dai requisiti v5. Verificare la guida
di migrazione per stato/metodi Particle, pacchetti/subpath, options ed estensioni
solo dove le decisioni hanno prodotto cambiamenti effettivi. L'analisi incompleta
di uno dei quattro temi lascia aperto il gate.

## Migrazione colore obbligatoria

Consultare [V5-COLOR — OKLCH](V5-COLORS-OKLCH.md).
Richiedere chiusura C0–C5, V5-COLOR-DECISIONS.md e V5-COLOR-REPORT.md:
matrice pacchetti, prove numeriche/browser, budget e guida breaking per manager,
animazioni e offset. Gamut/HDR non verificati lasciano aperto il gate V5-COLOR.
