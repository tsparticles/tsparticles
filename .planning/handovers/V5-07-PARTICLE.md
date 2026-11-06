# V5-07 — Revisione completa di Particle

Stato: da eseguire. Dipendenza: 06 completato. Tutta `Particle.ts` è nel perimetro.

## Responsabilità

Dominio Particle, helper di inizializzazione e stato particella, integrazione
Retina/options/modifier/drawer/updater e contratti usati dai plugin. Test correlati.
Non annullare modifiche altrui; mantenere gli invarianti stabiliti in 06.

## Lavoro

1. Inventariare campi, metodi, getter e helper del file completo: costruzione/init,
   options e override di gruppo/shape/effect, posizione/velocità, dimensione/colore,
   bounds, distruzione, reset e stato delle estensioni. Distinguere stato sempre
   necessario da capacità opzionali oggi trattenute dal core.
2. Rivedere la costruzione delle options e l'inizializzazione degli hook in ordine:
   default, preset/override, retina, modifier, shape/effect e updater/plugin.
   Ridurre merge/lavoro duplicato senza alterare precedenze o mutare input condivisi.
3. Rivedere Retina integralmente, sia container che particella: pixel ratio,
   reduce factor, dimensioni e range random. Verificare aggiornamenti dopo resize.
4. Rivedere allocazioni e calcoli ripetuti in getter/update/render, gestione vettori
   e conversioni colore. Non introdurre closure/oggetti per particella per il solo
   scopo di estrarre metodi dal file principale.
5. Valutare estrazione di stato/capacità opzionali verso helper o plugin usando
   evidenze di byte e costo memoria; per ogni cambiamento fornire migrazione dei
   consumer e default equivalenti nei bundle. Nessuna rimozione silenziosa di feature.
6. Verificare riuso tramite pool e lifecycle destroy/reset: nessun dato di shape,
   effetto, modifier, collisione o plugin precedente rimane attivo accidentalmente.
7. Preservare accesso pubblico minimo necessario ai plugin ed estensioni dichiarate
   in TypeScript. Spostare solo implementazioni interne dietro facciate selettive.

## Prove di accettazione

- Test deterministici su precedenze options/gruppi, init posizione/velocità,
  range random/colore, retina, bounds, distruzione e reset/riuso dal pool.
- Ordine hook/modifier/updater/drawer documentato e invariato; non duplicare
  callback destroy o particleCreated su rami di errore e ripartenze.
- Consumer rappresentativi: move/outModes, size/opacity/color/rotate, collisioni,
  links, emitter/absorber, shape/effect custom e plugin con stato esteso.
- Memoria per particella e allocazioni misurate oltre al costo update/draw; nessun
  trasferimento di stato tra gruppi, container o engine con RNG/logger differenti.
- Bundle min/gzip/Brotli della stessa scena confrontati con 06 e baseline;
  suite completa, lint/format e build downstream.

## Consegna

Mappa campi/metodi e decisioni di revisione, API cambiate e migrazioni, report delle
misure. Aggiornare la matrice engine di 03: nessuna area senza owner o verifica.

## Approfondimenti di performance e dimensioni

Consultare [V5-IMP-05-PARTICLE-STATE](improvements/V5-IMP-05-PARTICLE-STATE.md).
Registrare gli esiti dei candidati assegnati come richiesto dal [piano miglioramenti](V5-IMPROVEMENTS.md).

## Valutazioni architetturali

Applicare [ARCH-01 — Modello Particle](architecture/V5-ARCH-01-PARTICLE-MODEL.md),
[ARCH-03 — Options](architecture/V5-ARCH-03-OPTIONS.md) e
[ARCH-04 — Estensioni](architecture/V5-ARCH-04-EXTENSIONS.md).
Confrontare classe, snapshot esplicito e stato plain, definendo quale livello di
serializzazione è utile e supportato. Distinguere spostamento dei metodi da vera
separazione delle dipendenze; coordinare stato mutabile, template options, codec
opzionali e reset con 06/08. Registrare anche le alternative mantenute o scartate.

## Migrazione colore obbligatoria

Consultare [V5-COLOR — OKLCH](V5-COLORS-OKLCH.md).
Completare C3: IOklch e IParticleOklchAnimation, fill/stroke/back color e modifier,
reset/pool, paint/gradient e animazioni h/c/l. Vietati alias s → c e doppio stato
HSL persistente; applicare il contratto legacy e alpha definito in C0.
