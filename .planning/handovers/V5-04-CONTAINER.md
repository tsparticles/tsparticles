# V5-04 — Ridurre Container senza alterarne il lifecycle

Stato: da eseguire. Dipendenza: 03 completato.

## Responsabilità

Dominio Container, relativi helper options/lifecycle/eventi, test del container e
consumer dei contratti eventualmente modificati. Non modificare canvas/render
salvo gli adattamenti di firma necessari. Non annullare modifiche altrui.

## Lavoro

1. Partire da una tabella stato/transizioni: init/start/play/pause/stop/destroy,
   refresh/reset, delay/duration, hidden/resize e cancellazioni async. Mappare ordine
   degli eventi e hook plugin prima di cambiare il codice.
2. Profilare il contributo al bundle: option load, init plugin/drawer/updater,
   callback dispatch, loop frame, export e branches. Selezionare duplicazioni o
   dipendenze evitabili sulla base del report, non del numero di metodi.
3. Estrarre helper coesi e non pubblici nella cartella Container quando condividono
   responsabilità reali. Ridurre passaggi e logica duplicata; mantenere lo stato
   del lifecycle in un solo proprietario. Evitare nuove classi manager obbligatorie
   se aumentano codice, allocazioni o complessità di teardown.
4. Preservare il caricamento dinamico di Container da Engine e l'accesso ai
   servizi per engine definiti in 02. Testare riferimenti e cleanup dopo refresh.
5. Valutare i rami opzionali trattenuti: usare gli hook già esistenti quando
   permettono di escludere codice. Ogni spostamento in plugin richiede compatibilità
   con bundle standard, loader e options, test e nota di migrazione.
6. Misurare dopo ogni gruppo coeso di modifiche. Annullare estrazioni peggiorative
   salvo motivazione architetturale esplicita separata dal risultato di dimensioni.

## Prove di accettazione

- Start/stop/destroy ripetuti, play/pause, refresh/reset mantengono ordine eventi,
  hook, options effettive e cleanup; nessuna duplicazione di listener o plugin.
- Destroy durante delay/start/init async e refresh concorrenti non lasciano timer,
  frame o container registrati; promesse vengono risolte/rifiutate come da contratto.
- Due engine e più container: azioni e logger/RNG restano locali.
- Timing deterministico con fake scheduler, senza asserzioni su elapsed reale.
- Test di gruppi, particelle, background, export e tema opzionale pertinenti passano.
- Confronto gzip/Brotli e benchmark della stessa scena rispetto a 03 e baseline.
  Nessuna allocazione aggiunta per frame senza prova di beneficio.
- Suite, lint/format e build downstream completati.

## Consegna

Tabella lifecycle, componenti realmente estratti, byte prima/dopo e prove. Se la
riduzione non è dimostrata, riportare il risultato senza presentarlo come obiettivo
raggiunto. Aggiornare architettura, changelog se API cambiata e stato in indice.

## Approfondimenti di performance e dimensioni

Consultare [V5-IMP-06-RENDER-LIFECYCLE](improvements/V5-IMP-06-RENDER-LIFECYCLE.md).
Registrare gli esiti dei candidati assegnati come richiesto dal [piano miglioramenti](V5-IMPROVEMENTS.md).
