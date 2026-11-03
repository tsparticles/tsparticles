# V5-03 — Cartelle di dominio e superficie pubblica minima

Stato: da eseguire. Dipendenza: 02 completato e firme stabilizzate.

## Responsabilità

Struttura/import del core, `exports.ts`, `export-types.ts`, package exports engine,
controlli di dipendenza e consumer che importano simboli riclassificati. Non
riscrivere algoritmi o lifecycle; non annullare modifiche di altri agent.

## Revisione obbligatoria di tutto l'engine

Produrre `V5-ENGINE-AUDIT.md` censendo tutti i file sotto `engine/src/`, incluse
aree poco grandi o già modulari. Colonne: file/area, responsabilità, export/consumer,
stato condiviso, dipendenze/costo, owner/handover, decisione, evidenza di verifica.
Ogni nuovo file va incluso nella matrice; nessuna area esclusa per numero di righe.

| Area                                                                | Owner della revisione                                            |
| ------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Entry, Engine e inizializzazione                                    | 01; servizi in 02; API/import in 03                              |
| PluginManager e registri/loader                                     | 01–03; impatto su estensioni in 08                               |
| Container e lifecycle                                               | 04                                                               |
| CanvasManager e RenderManager                                       | 05                                                               |
| ParticlesManager e SpatialHashGrid                                  | 06                                                               |
| Particle e Retina                                                   | 07                                                               |
| EventListeners ed EventDispatcher                                   | 04, con verifica canvas in 05                                    |
| Math/Color/Log/Error/Type/Options utility, ranges/vectors/constants | 02/03 per revisione completa; ottimizzazioni pertinenti in 04–07 |
| Classi e interfacce options, tipi/enums, export                     | 03; test compatibilità in 08                                     |
| Browser/lazy e distribuzione                                        | 01 per migrazione; 09 per rifinitura                             |

03 è responsabile della revisione delle aree residue e dell'assegnazione esplicita
di qualsiasi file non coperto dalla tabella. Esito “mantenuto” ammesso con ragione
tecnica, consumer e verifica; non equivale a file ignorato. Il gate finale richiede
copertura completa della matrice, senza pretendere riscritture inutili.

## Struttura di partenza proposta

```text
engine/src/Core/
  Engine/
    index.ts             # facciata selettiva del dominio
    Engine.ts
    ...                  # servizi e registrazione interni
  Container/
    index.ts
    Container.ts
    ...                  # helper lifecycle interni
  Canvas/
    index.ts
    CanvasManager.ts
    ...                  # helper canvas/style interni
  Rendering/
    index.ts
    RenderManager.ts
  Particles/
    index.ts
    Particle.ts
    ParticlesManager.ts
```

Adattare il perimetro di `Interfaces/`, `Utils/` e `Retina` al grafo rilevato;
non spostare ogni file per simmetria. I nomi finali vanno registrati in STRUCTURE.

## Lavoro

1. Inventariare export e usi: pubblici richiesti da app, contratti plugin, runtime
   necessari a ereditarietà, dettagli interni. Le classi option estese dai plugin,
   `IOptionLoader.load()`, animazioni e i tipi Container/Particle sono sensibili.
2. Disegnare un grafo senza cicli e distinguere import runtime da `import type`.
   Tenere le facciate con soli export espliciti; all'interno del dominio usare
   import diretti dei sibling, senza reimportare il proprio barrel o la root engine.
3. Introdurre cartelle e aggiornare import `.js`, dichiarazioni emesse, typedoc e
   test. Mantenere i tipi pubblici necessari nei root export; rimuovere solo simboli
   intenzionalmente privati, con elenco breaking e alternativa documentata.
4. Nessun `export *` indiscriminato nelle nuove facciate. Un helper interno può
   avere `export` per altri file dello stesso dominio: non va riesportato da index.
5. Enforce dei confini con la configurazione di dipendenze/ESLint già in repo:
   vietare deep import tra domini e dai consumer. `package.json#exports` limita
   i subpath pubblici, ma da solo non blocca import relativi interni o accesso fisico.
6. Verificare root e `./lazy` in source e `package.dist.json`. Introdurre subpath
   aggiuntivi solo se necessari a consumer reali e con misure di inclusione.
7. Non forzare estrazioni di capacità opzionali: proporle con byte recuperabili,
   costo migrazione/default e contratto plugin prima di implementarle in 04/05.

## Prove di accettazione

- Nessun ciclo runtime nuovo; un tentativo di deep import vietato è rilevato dal
  controllo scelto. Verificare anche un'importazione pubblica valida.
- Consumer TypeScript rappresentativi: option loader plugin, classe derivata,
  tipi di callback e custom plugin compilano tramite API pubblica.
- Smoke del pacchetto costruito: ESM/CJS/browser/lazy e tipi risolti correttamente;
  nessun export runtime accidentale di classi prima esportate solo come tipi.
- Confronto bundle con 02: lo spostamento non deve introdurre costi ingiustificati.
  Nessuna dichiarazione di risparmio basata soltanto su file più piccoli.
- Build downstream, suite e lint/format conformi.

## Consegna

Inventario completo `V5-ENGINE-AUDIT.md`, con ogni file assegnato e stato di revisione.

Matrice public/internal, grafo dei domini, regole applicate, elenco rimozioni API e
misure. Aggiornare ARCHITECTURE/STRUCTURE e stato. I due handover seguenti usano i
nuovi percorsi; i nomi vecchi nei loro riferimenti identificano le responsabilità.
