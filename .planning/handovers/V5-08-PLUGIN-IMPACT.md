# V5-08 — Audit dell'ecosistema plugin dopo la rimozione del singleton

Stato: da eseguire. Audit iniziale obbligatorio in 01/02; questo handover completa
la verifica dopo 07, con i contratti del core stabilizzati.

## Responsabilità

Tutti i pacchetti di estensione: `plugins/`, `interactions/`, `updaters/`, `shapes/`,
`effects/`, `paths/`, `presets/`, `palettes/` e utility runtime consumate dagli stessi.
Entrypoint normali/lazy/browser, implementazioni, cache e test. Non riscrivere
pacchetti già corretti; non annullare modifiche altrui.

## Lavoro

1. Produrre `V5-PLUGIN-AUDIT.md` con una riga per pacchetto e colonne: loader con
   engine esplicito, dipendenze RNG/log/scheduler, stato/cache di modulo,
   estensioni Engine/PluginManager/Container/Particle, entrypoint browser/lazy,
   esito build/test e azione richiesta. Nessuna categoria saltata per esclusioni
   automatiche della build standard (incluse palette).
2. Partire dall'ipotesi che molti loader siano già corretti: i loader osservati,
   come `loadCircleShape(engine)`, ricevono un Engine. Verificarne l'intera catena,
   senza concludere che la sola firma garantisca isolamento.
3. Cercare import del vecchio singleton, lookup di globals, flag loaded/initialized,
   promesse condivise, cache con valori custom e uso diretto/transitivo dei servizi.
   Una definizione immutabile può essere condivisa; registrazioni, manager mutabili
   e cache che dipendono dal contesto devono rispettare engine/container proprietario.
4. Verificare plugin che estendono API dell'engine/plugin manager o del container
   (move, interactivity, temi, export e altri): nessuna closure cattura il primo
   engine, nessuna estensione installata solo sul primo registrato.
5. Migrare i consumer delle API rifinite in 03–07; controllare option loader,
   ereditarietà, augmentations/type export e accesso ai campi Particle.
6. Correggere solo i difetti dimostrati, aggiornando test e manifest/changelog dove
   serve. Per pacchetti invariati registrare evidenze di compatibilità.

## Prove di accettazione

- Stesso loader su A e B, in ordine inverso e in concorrenza; chiamate ripetute su A
  non duplicano registrazioni e non impediscono il caricamento su B.
- Due engine con combinazioni di plugin diverse: preset/palette, path/easing,
  custom shape/updater e API aggiunte rimangono locali.
- Runtime interleaved con RNG/logger distinti e errori async: nessuna dipendenza
  da import order, dal primo engine o da stato ambientale.
- Distruzione/refresh di un container non invalida asset condivisi ancora in uso
  né lascia registrazioni/listener sull'altro engine. Distinguere cache risorse e stato.
- Tutti i pacchetti censiti hanno un esito; build compatibilità sull'intero insieme,
  test mirati per ogni difetto e scenari di integrazione per famiglie, suite completa.
- Bundle/lazy/browser verificati anche nel percorso CDN di 09.

## Consegna

Matrice pacchetto per pacchetto, elenco modifiche effettivamente necessarie e
residui riproducibili. L'assenza di modifiche è un risultato valido con prove;
non dichiarare “tutti a posto” sulla sola ricerca del nome `tsParticles`.
