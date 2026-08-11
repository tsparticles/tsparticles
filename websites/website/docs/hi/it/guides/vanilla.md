---
title: Guida a Vanilla JS
description: Guida completa per integrare tsParticles con JavaScript puro.
---

# Guida a Vanilla JS

## Indice dei Contenuti

1. [Per Iniziare](#per-iniziare)
2. [Particelle di Base](#particelle-di-base)
3. [Effetto Coriandoli](#effetto-coriandoli)
4. [Effetto Fuochi d'Artificio](#effetto-fuochi-dartificio)
5. [Effetto Nastri](#effetto-nastri)
6. [Effetto Neve](#effetto-neve)
7. [Effetto Rete / Collegamenti](#effetto-rete-collegamenti)
8. [Effetto Stelle](#effetto-stelle)
9. [Configurazione Personalizzata](#configurazione-personalizzata)
10. [Contenitori Multipli](#contenitori-multipli)
11. [Controlli Dinamici](#controlli-dinamici)

---

## Per Iniziare

### CDN (avvio rapido)

Aggiungi un `<div>` come contenitore e i tag script nel tuo HTML. Devi includere almeno il motore + un bundle, e devi chiamare il loader prima di `tsParticles.load()`.

```html
<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>tsParticles – Per Iniziare</title>
    <style>
      #tsparticles {
        position: fixed;
        inset: 0;
        z-index: 0;
      }
    </style>
  </head>
  <body>
    <div id="tsparticles"></div>

    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
    <script>
      (async () => {
        await loadSlim(tsParticles);

        await tsParticles.load({
          id: "tsparticles",
          options: {/* ... */},
        });
      })();
    </script>
  </body>
</html>
```

### npm

```bash
npm install @tsparticles/engine @tsparticles/slim
```

Poi importalo e usalo:

```javascript
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

(async () => {
  await loadSlim(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {/* ... */},
  });
})();
```

> **Nota:** Il solo `@tsparticles/engine` non disegna nulla. Devi installare un bundle (`@tsparticles/slim` consigliato) o plugin individuali per ottenere forme visibili.

---

## Particelle di Base

Una configurazione minima che visualizza 100 particelle con forma circolare, colori casuali e movimento delicato. In v4, i colori delle particelle vengono impostati tramite `paint` invece della vecchia proprietà `color`.

```html
<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Particelle di Base</title>
    <style>
      #tsparticles {
        position: fixed;
        inset: 0;
        z-index: 0;
      }
      body {
        margin: 0;
      }
    </style>
  </head>
  <body>
    <div id="tsparticles"></div>

    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
    <script>
      (async () => {
        await loadSlim(tsParticles);

        await tsParticles.load({
          id: "tsparticles",
          options: {
            fpsLimit: 120,
            particles: {
              number: { value: 100 },
              paint: [
                {
                  fill: { color: { value: "#ff0000" }, enable: true },
                },
                {
                  fill: { color: { value: "#00ff00" }, enable: true },
                },
                {
                  fill: { color: { value: "#0000ff" }, enable: true },
                },
                {
                  fill: { color: { value: "#ffff00" }, enable: true },
                },
                {
                  fill: { color: { value: "#ff00ff" }, enable: true },
                },
              ],
              shape: { type: "circle" },
              opacity: {
                value: { min: 0.3, max: 0.8 },
              },
              size: {
                value: { min: 2, max: 6 },
              },
              move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                outModes: { default: "bounce" },
              },
            },
            background: { color: "#1a1a2e" },
          },
        });
      })();
    </script>
  </body>
</html>
```

---

## Effetto Coriandoli

Usa il bundle dedicato `@tsparticles/confetti` per un'esplosione festosa con una singola chiamata di funzione.

```html
<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Coriandoli</title>
    <style>
      body {
        margin: 0;
        background: #000;
      }
    </style>
  </head>
  <body>
    <canvas id="confetti"></canvas>

    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js"></script>
    <script>
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.5, y: 0.5 },
      });
    </script>
  </body>
</html>
```

---

## Effetto Fuochi d'Artificio

Uno spettacolo pirotecnico usando il bundle dedicato `@tsparticles/fireworks` con effetti sonori.

```html
<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fuochi d'Artificio</title>
    <style>
      body {
        margin: 0;
        background: #000;
      }
    </style>
  </head>
  <body>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/fireworks@4/tsparticles.fireworks.bundle.min.js"></script>
    <script>
      fireworks({
        colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"],
        sounds: true,
      });
    </script>
  </body>
</html>
```

---

## Effetto Nastri

Usa il bundle dedicato `@tsparticles/ribbons` per animazioni fluide di nastri che reagiscono alla posizione del mouse.

```html
<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nastri</title>
    <style>
      body {
        margin: 0;
        overflow: hidden;
        background: #000;
      }
    </style>
  </head>
  <body>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/ribbons@4/tsparticles.ribbons.bundle.min.js"></script>
    <script>
      ribbons({
        ribbonOptions: {
          count: 30,
          angle: 45,
          oscillationSpeed: 3,
          oscillationDistance: 40,
          particleDist: 8,
        },
      });
    </script>
  </body>
</html>
```

---

## Effetto Neve

Delicati fiocchi di neve che cadono usando il catalogo preset `@tsparticles/configs`.

```html
<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Effetto Neve</title>
    <style>
      #tsparticles {
        position: fixed;
        inset: 0;
        z-index: 0;
      }
      body {
        margin: 0;
        background: #1a1a2e;
      }
    </style>
  </head>
  <body>
    <div id="tsparticles"></div>

    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/configs@4/tsparticles.configs.min.js"></script>
    <script>
      (async () => {
        await loadSlim(tsParticles);

        await tsParticles.load({
          id: "tsparticles",
          options: {
            preset: "snow",
          },
        });
      })();
    </script>
  </body>
</html>
```

In alternativa, usando il pacchetto preset autonomo:

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/basic@4/tsparticles.basic.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/preset-snow@4/tsparticles.preset.snow.min.js"></script>
<script>
  (async () => {
    await loadBasic(tsParticles);
    await loadSnowPreset(tsParticles);

    await tsParticles.load({
      id: "tsparticles",
      options: { preset: "snow" },
    });
  })();
</script>
```

---

## Effetto Rete / Collegamenti

Un classico visuale di nodi connessi con interattività del mouse. Il bundle `@tsparticles/slim` include l'interazione dei collegamenti e la modalità di presa con il mouse.

```html
<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Rete / Collegamenti</title>
    <style>
      #tsparticles {
        position: fixed;
        inset: 0;
        z-index: 0;
      }
      body {
        margin: 0;
      }
    </style>
  </head>
  <body>
    <div id="tsparticles"></div>

    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
    <script>
      (async () => {
        await loadSlim(tsParticles);

        await tsParticles.load({
          id: "tsparticles",
          options: {
            fpsLimit: 60,
            particles: {
              number: { value: 80, density: { enable: true } },
              paint: {
                color: "#00d4ff",
              },
              shape: { type: "circle" },
              opacity: { value: 0.6 },
              size: { value: { min: 1, max: 4 } },
              links: {
                enable: true,
                distance: 150,
                color: "#00d4ff",
                opacity: 0.4,
                width: 1,
              },
              move: {
                enable: true,
                speed: 1.5,
                direction: "none",
                random: true,
                outModes: { default: "bounce" },
              },
            },
            interactivity: {
              events: {
                onHover: { enable: true, mode: "grab" },
                onClick: { enable: true, mode: "push" },
              },
              modes: {
                grab: { distance: 180, links: { opacity: 0.8 } },
                push: { quantity: 4 },
              },
            },
            background: { color: "#0d1117" },
          },
        });
      })();
    </script>
  </body>
</html>
```

---

## Effetto Stelle

Un cielo stellato notturno usando il catalogo preset `@tsparticles/configs`.

```html
<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Effetto Stelle</title>
    <style>
      #tsparticles {
        position: fixed;
        inset: 0;
        z-index: 0;
      }
      body {
        margin: 0;
        background: #000;
      }
    </style>
  </head>
  <body>
    <div id="tsparticles"></div>

    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/configs@4/tsparticles.configs.min.js"></script>
    <script>
      (async () => {
        await loadSlim(tsParticles);

        await tsParticles.load({
          id: "tsparticles",
          options: {
            preset: "star",
          },
        });
      })();
    </script>
  </body>
</html>
```

In alternativa, usando il pacchetto preset autonomo:

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/preset-stars@4/tsparticles.preset.stars.min.js"></script>
<script>
  (async () => {
    await loadSlim(tsParticles);
    await loadStarsPreset(tsParticles);

    await tsParticles.load({
      id: "tsparticles",
      options: { preset: "stars" },
    });
  })();
</script>
```

---

## Configurazione Personalizzata

Crea una configurazione da zero con sfondo sfumato, effetti interattivi al passaggio del mouse e molteplici tipi di forma usando il bundle slim.

```html
<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Configurazione Personalizzata</title>
    <style>
      #tsparticles {
        position: fixed;
        inset: 0;
        z-index: 0;
      }
      body {
        margin: 0;
        font-family: sans-serif;
      }
      h1 {
        position: relative;
        z-index: 1;
        color: #fff;
        text-align: center;
        padding-top: 2rem;
      }
    </style>
  </head>
  <body>
    <h1>Configurazione Personalizzata</h1>
    <div id="tsparticles"></div>

    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
    <script>
      (async () => {
        await loadSlim(tsParticles);

        await tsParticles.load({
          id: "tsparticles",
          options: {
            fullScreen: { enable: true, zIndex: 0 },
            fpsLimit: 60,
            particles: {
              number: { value: 60, density: { enable: true, width: 800, height: 800 } },
              paint: [
                {
                  fill: { color: { value: "#ff6b6b" }, enable: true },
                },
                {
                  fill: { color: { value: "#feca57" }, enable: true },
                },
                {
                  fill: { color: { value: "#48dbfb" }, enable: true },
                },
                {
                  fill: { color: { value: "#ff9ff3" }, enable: true },
                },
                {
                  fill: { color: { value: "#54a0ff" }, enable: true },
                },
              ],
              shape: {
                type: ["circle", "triangle", "polygon"],
                options: {
                  polygon: { sides: 6 },
                },
              },
              opacity: { value: { min: 0.4, max: 0.8 } },
              size: { value: { min: 3, max: 8 } },
              links: {
                enable: true,
                distance: 200,
                color: "#ffffff",
                opacity: 0.15,
                width: 1,
              },
              move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                outModes: { default: "out" },
                attract: { enable: false },
              },
            },
            interactivity: {
              events: {
                onHover: { enable: true, mode: "attract" },
                onClick: { enable: true, mode: "repulse" },
              },
              modes: {
                attract: { distance: 200, duration: 0.4, factor: 1 },
                repulse: { distance: 200, duration: 0.4 },
              },
            },
            background: {
              color: "#0f0f23",
              opacity: 1,
            },
            themes: [
              {
                name: "light",
                default: { value: false },
                options: {
                  background: { color: "#f0f0f5" },
                  particles: {
                    paint: [
                      {
                        fill: { color: { value: "#e74c3c" }, enable: true },
                      },
                      {
                        fill: { color: { value: "#2ecc71" }, enable: true },
                      },
                      {
                        fill: { color: { value: "#3498db" }, enable: true },
                      },
                      {
                        fill: { color: { value: "#f1c40f" }, enable: true },
                      },
                    ],
                    links: { color: "#333333", opacity: 0.2 },
                    opacity: { value: { min: 0.5, max: 0.9 } },
                  },
                },
              },
            ],
          },
        });
      })();
    </script>
  </body>
</html>
```

---

## Contenitori Multipli

Esegui più istanze indipendenti di particelle sulla stessa pagina, ciascuna con la propria configurazione.

```html
<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Contenitori Multipli</title>
    <style>
      .particle-box {
        width: 45%;
        height: 300px;
        float: left;
        margin: 1%;
        border-radius: 12px;
        overflow: hidden;
        position: relative;
      }
      body {
        margin: 0;
        background: #1a1a2e;
        display: flex;
        flex-wrap: wrap;
        height: 100vh;
        align-items: center;
        justify-content: center;
      }
    </style>
  </head>
  <body>
    <div class="particle-box" id="box1"></div>
    <div class="particle-box" id="box2"></div>
    <div class="particle-box" id="box3"></div>
    <div class="particle-box" id="box4"></div>

    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
    <script>
      (async () => {
        await loadSlim(tsParticles);

        // Contenitore 1 – cerchi con movimento lento
        await tsParticles.load({
          id: "box1",
          options: {
            particles: {
              number: { value: 40 },
              paint: {
                color: "#ff6b6b",
              },
              shape: { type: "circle" },
              opacity: { value: 0.7 },
              size: { value: { min: 2, max: 5 } },
              move: { enable: true, speed: 1, outModes: { default: "bounce" } },
            },
            background: { color: "#2d2d44" },
          },
        });

        // Contenitore 2 – triangoli con collegamenti
        await tsParticles.load({
          id: "box2",
          options: {
            particles: {
              number: { value: 30 },
              paint: {
                color: "#48dbfb",
              },
              shape: { type: "triangle" },
              opacity: { value: 0.6 },
              size: { value: { min: 3, max: 7 } },
              links: { enable: true, distance: 120, color: "#48dbfb", opacity: 0.3 },
              move: { enable: true, speed: 0.8, outModes: { default: "bounce" } },
            },
            background: { color: "#1a1a2e" },
          },
        });

        // Contenitore 3 – esplosione simile a coriandoli
        await tsParticles.load({
          id: "box3",
          options: {
            particles: {
              number: { value: 50 },
              paint: [
                {
                  fill: { color: { value: "#feca57" }, enable: true },
                },
                {
                  fill: { color: { value: "#ff9ff3" }, enable: true },
                },
                {
                  fill: { color: { value: "#54a0ff" }, enable: true },
                },
                {
                  fill: { color: { value: "#5f27cd" }, enable: true },
                },
              ],
              shape: { type: ["circle", "square"] },
              opacity: { value: 0.8 },
              size: { value: { min: 2, max: 6 } },
              move: {
                enable: true,
                speed: 3,
                direction: "top",
                outModes: { default: "destroy" },
              },
            },
            background: { color: "#222f3e" },
          },
        });

        // Contenitore 4 – stelle fluttuanti lente
        await tsParticles.load({
          id: "box4",
          options: {
            particles: {
              number: { value: 20 },
              paint: {
                color: "#ffffff",
              },
              shape: { type: "star" },
              opacity: { value: { min: 0.2, max: 0.8 } },
              size: { value: { min: 1, max: 4 } },
              move: { enable: true, speed: 0.4, direction: "none", outModes: { default: "bounce" } },
            },
            background: { color: "#0d1117" },
          },
        });
      })();
    </script>
  </body>
</html>
```

---

## Controlli Dinamici

Avvia, ferma, metti in pausa e cambia tema a livello di programmazione in fase di esecuzione.

```html
<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Controlli Dinamici</title>
    <style>
      #tsparticles {
        position: fixed;
        inset: 0;
        z-index: 0;
      }
      .controls {
        position: fixed;
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10;
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        justify-content: center;
      }
      .controls button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 6px;
        background: #222;
        color: #fff;
        cursor: pointer;
        font-size: 0.9rem;
        transition: background 0.2s;
      }
      .controls button:hover {
        background: #444;
      }
      body {
        margin: 0;
      }
    </style>
  </head>
  <body>
    <div id="tsparticles"></div>
    <div class="controls">
      <button id="play-btn">▶ Play</button>
      <button id="pause-btn">⏸ Pausa</button>
      <button id="stop-btn">⏹ Stop</button>
      <button id="theme-dark-btn">🌙 Tema Scuro</button>
      <button id="theme-light-btn">☀️ Tema Chiaro</button>
      <button id="restart-btn">🔄 Riavvia</button>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
    <script>
      (async () => {
        await loadSlim(tsParticles);

        const container = await tsParticles.load({
          id: "tsparticles",
          options: {
            fpsLimit: 60,
            particles: {
              number: { value: 80 },
              paint: {
                color: "#00d4ff",
              },
              shape: { type: "circle" },
              opacity: { value: 0.6 },
              size: { value: { min: 2, max: 5 } },
              links: { enable: true, distance: 150, color: "#00d4ff", opacity: 0.3 },
              move: { enable: true, speed: 1.5, outModes: { default: "bounce" } },
            },
            background: { color: "#0d1117" },
            themes: [
              {
                name: "light",
                default: { value: false },
                options: {
                  background: { color: "#f5f5f5" },
                  particles: {
                    paint: {
                      color: "#e74c3c",
                    },
                    links: { color: "#333333" },
                  },
                },
              },
            ],
          },
        });

        document.getElementById("play-btn").addEventListener("click", () => container.play());
        document.getElementById("pause-btn").addEventListener("click", () => container.pause());
        document.getElementById("stop-btn").addEventListener("click", () => container.stop());
        document.getElementById("restart-btn").addEventListener("click", async () => {
          await container.destroy();
          tsParticles.load({ id: "tsparticles", options: container.options });
        });
        document.getElementById("theme-dark-btn").addEventListener("click", () => {
          container.loadTheme("default");
        });
        document.getElementById("theme-light-btn").addEventListener("click", () => {
          container.loadTheme("light");
        });
      })();
    </script>
  </body>
</html>
```

---

Ora hai coperto tutti i principali modelli di integrazione Vanilla JS per tsParticles v4. Ogni esempio è un file HTML autonomo che puoi aprire nel tuo browser per vedere tsParticles in azione.
