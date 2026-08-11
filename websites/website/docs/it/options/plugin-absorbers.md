# Opzione plugin: Assorbitori

`absorbers` è un'opzione plug-in e richiede che le funzionalità di assorbimento siano disponibili nel pacchetto/configurazione.

## Esempio

```ts
absorbers: {
  position: {
    x: 50,
    y: 50,
  },
  size: {
    value: 20,
  },
}
```

## Note

- Convalidare la disponibilità del plug-in prima di utilizzare le opzioni di assorbimento.
- Inizia con un'istanza dell'assorbitore, quindi ridimensiona gradualmente.

## Riferimento alla fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Plugins/Absorbers.md>
