# Guida alle prestazioni

Ecco le principali leve per evitare cali di FPS.

## 1) Conteggio delle particelle

```ts
particles: {
  number: {
    value: 50,
    density: {
      enable: true,
      area: 900
    }
  }
}
```

Meno particelle = meno chiamate di estrazione e meno collisioni.

## 2) Movimento e collegamenti

- Riduci `move.speed` quando non hai bisogno di un effetto energetico.
- Limita `links.distance` e `links.opacity`.
- Evita combinazioni pesanti (ad esempio `links` + `collisions` + effetti avanzati) a schermo intero.

## 3) Interattività

- Mantieni attive solo alcune modalità.
- Sui dispositivi mobili, valuta la possibilità di disattivare la modalità passaggio del mouse.

## 4) Retina e ridimensionamento

```ts
detectRetina: false;
```

Utile in contesti incentrati sulle prestazioni o su dispositivi più deboli.

## 5) Controllo manuale del ciclo di vita

Per le sezioni costose, utilizza controlli espliciti:

- `start` al clic dell'utente
- `stop`/`pause` quando la sezione non è visibile
- `destroy` sullo smontaggio della pagina/del componente
