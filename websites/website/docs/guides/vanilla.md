---
title: Vanilla JS Guide
description: Complete guide for integrating tsParticles with plain JavaScript.
---

# Vanilla JS Guide

## Table of Contents

1. [Getting Started](#getting-started)
2. [Basic Particles](#basic-particles)
3. [Confetti Effect](#confetti-effect)
4. [Fireworks Effect](#fireworks-effect)
5. [Snow Effect](#snow-effect)
6. [Network / Links Effect](#network-links-effect)
7. [Stars Effect](#stars-effect)
8. [Custom Configuration](#custom-configuration)
9. [Multiple Containers](#multiple-containers)
10. [Dynamic Controls](#dynamic-controls)

---

## Getting Started

### CDN (quick start)

Add a `<div>` placeholder and a script tag in your HTML:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>tsParticles – Getting Started</title>
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

    <script src="https://cdn.jsdelivr.net/npm/tsparticles@3/tsparticles.bundle.min.js"></script>
    <script>
      tsParticles.load({
        id: "tsparticles",
        options: {
          /* ... */
        },
      });
    </script>
  </body>
</html>
```

### npm

```bash
npm install tsparticles
```

Then import and use it:

```javascript
import { tsParticles } from "tsparticles";

tsParticles.load({
  id: "tsparticles",
  options: {
    /* ... */
  },
});
```

---

## Basic Particles

A minimal configuration that renders 100 particles with a circular shape, random colours, and gentle movement.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Basic Particles</title>
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

    <script src="https://cdn.jsdelivr.net/npm/tsparticles@3/tsparticles.bundle.min.js"></script>
    <script>
      tsParticles.load({
        id: "tsparticles",
        options: {
          fpsLimit: 120,
          particles: {
            number: { value: 100 },
            color: { value: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"] },
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
    </script>
  </body>
</html>
```

---

## Confetti Effect

Use the built-in confetti preset for a celebratory burst.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Confetti</title>
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

    <script src="https://cdn.jsdelivr.net/npm/tsparticles@3/tsparticles.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/preset-confetti@3/tsparticles.preset.confetti.bundle.min.js"></script>
    <script>
      tsParticles.load({
        id: "tsparticles",
        options: {
          preset: "confetti",
          fullScreen: { enable: true, zIndex: -1 },
        },
      });
    </script>
  </body>
</html>
```

---

## Fireworks Effect

A fireworks show with particles exploding across the screen.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fireworks</title>
    <style>
      body {
        margin: 0;
        background: #000;
      }
    </style>
  </head>
  <body>
    <script src="https://cdn.jsdelivr.net/npm/tsparticles@3/tsparticles.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/preset-fireworks@3/tsparticles.preset.fireworks.bundle.min.js"></script>
    <script>
      tsParticles.load({
        id: "tsparticles",
        options: {
          preset: "fireworks",
          fullScreen: { enable: true, zIndex: -1 },
          fireworks: {
            background: "#000000",
            brightness: 100,
            colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"],
            intensity: 30,
            life: { min: 4, max: 8 },
            traces: 20,
            explosion: { min: 30, max: 60 },
          },
        },
      });
    </script>
  </body>
</html>
```

---

## Snow Effect

Gentle falling snowflakes using the snow preset.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Snow Effect</title>
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

    <script src="https://cdn.jsdelivr.net/npm/tsparticles@3/tsparticles.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/preset-snow@3/tsparticles.preset.snow.bundle.min.js"></script>
    <script>
      tsParticles.load({
        id: "tsparticles",
        options: {
          preset: "snow",
          fullScreen: { enable: true, zIndex: -1 },
          snow: {
            color: "#ffffff",
            opacity: { min: 0.3, max: 0.9 },
            size: { min: 1, max: 4 },
            speed: { min: 0.5, max: 2 },
            wobble: true,
          },
        },
      });
    </script>
  </body>
</html>
```

---

## Network Links Effect

A classic connected-nodes visual with mouse interactivity.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Network / Links</title>
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

    <script src="https://cdn.jsdelivr.net/npm/tsparticles@3/tsparticles.bundle.min.js"></script>
    <script>
      tsParticles.load({
        id: "tsparticles",
        options: {
          fpsLimit: 60,
          particles: {
            number: { value: 80, density: { enable: true } },
            color: { value: "#00d4ff" },
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
    </script>
  </body>
</html>
```

---

## Stars Effect

A starry-night sky using the stars preset.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Stars Effect</title>
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

    <script src="https://cdn.jsdelivr.net/npm/tsparticles@3/tsparticles.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/preset-stars@3/tsparticles.preset.stars.bundle.min.js"></script>
    <script>
      tsParticles.load({
        id: "tsparticles",
        options: {
          preset: "stars",
          fullScreen: { enable: true, zIndex: -1 },
          stars: {
            color: "#ffffff",
            opacity: { min: 0.2, max: 1 },
            size: { min: 0.5, max: 2.5 },
            moveSpeed: 0.3,
            twinkle: true,
          },
        },
      });
    </script>
  </body>
</html>
```

---

## Custom Configuration

Build a configuration from scratch with a gradient background, interactive hover effects, and multiple shape types.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Custom Config</title>
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
    <h1>Custom Configuration</h1>
    <div id="tsparticles"></div>

    <script src="https://cdn.jsdelivr.net/npm/tsparticles@3/tsparticles.bundle.min.js"></script>
    <script>
      tsParticles.load({
        id: "tsparticles",
        options: {
          fullScreen: { enable: true, zIndex: 0 },
          fpsLimit: 60,
          particles: {
            number: { value: 60, density: { enable: true, width: 800, height: 800 } },
            color: {
              value: ["#ff6b6b", "#feca57", "#48dbfb", "#ff9ff3", "#54a0ff"],
            },
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
                  color: { value: ["#e74c3c", "#2ecc71", "#3498db", "#f1c40f"] },
                  links: { color: "#333333", opacity: 0.2 },
                  opacity: { value: { min: 0.5, max: 0.9 } },
                },
              },
            },
          ],
        },
      });
    </script>
  </body>
</html>
```

---

## Multiple Containers

Run multiple independent particle instances on the same page, each with its own configuration.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Multiple Containers</title>
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

    <script src="https://cdn.jsdelivr.net/npm/tsparticles@3/tsparticles.bundle.min.js"></script>
    <script>
      // Container 1 – circles with slow movement
      tsParticles.load({
        id: "box1",
        options: {
          particles: {
            number: { value: 40 },
            color: { value: "#ff6b6b" },
            shape: { type: "circle" },
            opacity: { value: 0.7 },
            size: { value: { min: 2, max: 5 } },
            move: { enable: true, speed: 1, outModes: { default: "bounce" } },
          },
          background: { color: "#2d2d44" },
        },
      });

      // Container 2 – triangles with links
      tsParticles.load({
        id: "box2",
        options: {
          particles: {
            number: { value: 30 },
            color: { value: "#48dbfb" },
            shape: { type: "triangle" },
            opacity: { value: 0.6 },
            size: { value: { min: 3, max: 7 } },
            links: { enable: true, distance: 120, color: "#48dbfb", opacity: 0.3 },
            move: { enable: true, speed: 0.8, outModes: { default: "bounce" } },
          },
          background: { color: "#1a1a2e" },
        },
      });

      // Container 3 – confetti-like burst
      tsParticles.load({
        id: "box3",
        options: {
          particles: {
            number: { value: 50 },
            color: { value: ["#feca57", "#ff9ff3", "#54a0ff", "#5f27cd"] },
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

      // Container 4 – slow floating stars
      tsParticles.load({
        id: "box4",
        options: {
          particles: {
            number: { value: 20 },
            color: { value: "#ffffff" },
            shape: { type: "star" },
            opacity: { value: { min: 0.2, max: 0.8 } },
            size: { value: { min: 1, max: 4 } },
            move: { enable: true, speed: 0.4, direction: "none", outModes: { default: "bounce" } },
          },
          background: { color: "#0d1117" },
        },
      });
    </script>
  </body>
</html>
```

---

## Dynamic Controls

Programmatically start, stop, pause, and switch themes at runtime.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dynamic Controls</title>
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
      <button id="pause-btn">⏸ Pause</button>
      <button id="stop-btn">⏹ Stop</button>
      <button id="theme-dark-btn">🌙 Dark Theme</button>
      <button id="theme-light-btn">☀️ Light Theme</button>
      <button id="restart-btn">🔄 Restart</button>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/tsparticles@3/tsparticles.bundle.min.js"></script>
    <script>
      (async () => {
        const container = await tsParticles.load({
          id: "tsparticles",
          options: {
            fpsLimit: 60,
            particles: {
              number: { value: 80 },
              color: { value: "#00d4ff" },
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
                    color: { value: "#e74c3c" },
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
          // Reload with the same options
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

You have now covered every major Vanilla JS integration pattern. Each example is a standalone HTML file you can open in your browser to see tsParticles in action.
