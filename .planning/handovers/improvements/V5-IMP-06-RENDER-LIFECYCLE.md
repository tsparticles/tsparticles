# V5-IMP-06 — Rendering, hook e costo del lifecycle

Stato: da analizzare. Priorità media. Owner: 04/05; consumer plugin in 08.
Prerequisito: [IMP-01](V5-IMP-01-MEASUREMENT.md).

## Evidenze iniziali

Nel codice analizzato RenderManager.clear crea un Set per i plugin visitati ed
enumera Object.values(DrawLayer). CanvasManager combina chiavi CSS con un Set
nel setup dello stile. Il primo percorso può essere per frame; il secondo è di
setup/resize. Non assegnare la stessa priorità a entrambi senza profili.

### R1 — Piano di esecuzione degli hook

Mappare array per fase/layer, deduplicazione e ordine degli hook canvasClear.
Valutare una lista deduplicata costruita a init/refresh anziché a ogni clear, o un
buffer locale riusabile. Conservare precedenza dei plugin dedicati, short-circuit
sul primo true, fallback e posizione dei plugin presenti su più layer.

Verificare se plugin/layer possono essere mutati durante start, frame o callback:
se sì, definire invalidazione o mantenere il percorso dinamico. Non trasformare
un'API mutabile in uno snapshot permanente. Testare refresh e rimozione plugin.

### R2 — Enumerazioni e lavoro per frame

Confrontare lista costante dei layer numerici con Object.values sul numeric enum,
che include anche nomi inversi. Mantenere ordine e comportamento dei layer supportati;
non hardcodare numeri in più file. Misurare byte e tempo: il guadagno può essere
minore del costo di nuove astrazioni. Evitare iteratori/closure extra nel percorso
per particella senza una ragione misurata.

### R3 — Stato canvas e operazioni ripetute

Profilare save/restore, trasformazioni, stile, compositing e clear nella scena M8.
Valutare riduzioni di assegnazioni solo se si conosce lo stato del contesto:
shape/effect/custom draw e plugin possono modificarlo. Un cache di stato richiede
invalidazione dopo callback esterne oppure un contratto verificato.

Batching per colore/shape può alterare blending, z-order e hook; trattarlo come
esperimento esplicito, con immagini confrontabili e ordine invariato dove richiesto.
Non introdurre batching generale solo perché riduce chiamate canvas in un microbench.

### R4 — Setup, resize e teardown

Su M6/M8/M9 misurare caricamento e resize separatamente dal frame. Eliminare setup
ripetuto soltanto se options, pixel ratio e canvas non sono cambiati. Coalescere
resize/eventi può aiutare ma deve preservare il risultato e la gestione degli eventi
attesi dai plugin, senza ritardare indefinitamente il lavoro.

Controllare MutationObserver, media listener HDR e scheduler per engine: pause,
refresh e destroy devono cancellare/rimuovere solo le risorse possedute. La cache
del trasferimento HTMLCanvas→OffscreenCanvas segue il vincolo della risorsa browser;
non ricrearla automaticamente per engine né trasferire una seconda volta il canvas.

## Verifica e consegna

Scenari base senza plugin, trail/clear custom, layer multipli, HDR/background mask,
export, resize e callback custom. Registrare numero callback, allocazioni/frame,
update/draw/startup, listener vivi dopo teardown e delta bundle. Eseguire smoke
browser con stessa configurazione/viewport e descrivere tolleranza del confronto
visivo. Chiudere R1–R4 in 04/05; esiti e limiti entrano nel gate 10.
