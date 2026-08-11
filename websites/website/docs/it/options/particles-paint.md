# Vernice particellare

`particles.paint` raggruppa le opzioni di riempimento particellare e stile del tratto.

## Esempio

```ts
particles: {
  paint: {
    fill: {
      enable: true,
      color: {
        value: ["#60a5fa", "#a78bfa", "#f472b6"],
      },
    },
    stroke: {
      width: 1,
      color: {
        value: "#ffffff",
      },
    },
  },
}
```

## Compila (`particles.paint.fill`)

- Definisce il colore interno della particella.
- Supporta valori statici, matrici e animazioni a colori.

## Corsa (`particles.paint.stroke`)

- Definisce la larghezza e il colore del contorno.
- Utile per aumentare il contrasto della forma.

## Riferimento alla fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Paint.md>
