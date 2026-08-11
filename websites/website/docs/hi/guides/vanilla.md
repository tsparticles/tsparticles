---
title: वैनिला JS गाइड
description: सादे जावास्क्रिप्ट के साथ tsParticles को एकीकृत करने के लिए पूर्ण गाइड।
---

# वैनिला JS गाइड

## विषय-सूची

1. [आरंभ करना](#getting-started)
2. [मूल कण](#basic-particles)
3. [कॉन्फ़ेटी प्रभाव](#confetti-effect)
4. [आतिशबाजी प्रभाव](#fireworks-effect)
5. [रिबन प्रभाव](#ribbons-effect)
6. [हिम प्रभाव](#snow-effect)
7. [नेटवर्क / लिंक्स प्रभाव](#network-links-effect)
8. [तारे प्रभाव](#stars-effect)
9. [कस्टम कॉन्फ़िगरेशन](#custom-configuration)
10. [एकाधिक कंटेनर](#multiple-containers)
11. [डायनामिक नियंत्रण](#dynamic-controls)

---

## आरंभ करना

### CDN (त्वरित आरंभ)

अपने HTML में एक `<div>` प्लेसहोल्डर और स्क्रिप्ट टैग जोड़ें। आपको कम से कम इंजन + एक बंडल की आवश्यकता है, और `tsParticles.load()` से पहले लोडर को कॉल करना होगा।

```html
<!DOCTYPE html>
<html lang="hi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>tsParticles – आरंभ करना</title>
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

फिर इसे आयात करें और उपयोग करें:

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

> **नोट:** `@tsparticles/engine` अकेला कुछ नहीं बनाता। दृश्य आकार प्राप्त करने के लिए आपको एक बंडल (`@tsparticles/slim` अनुशंसित) या व्यक्तिगत प्लगइन्स स्थापित करना होगा।

---

## मूल कण

एक न्यूनतम कॉन्फ़िगरेशन जो 100 कणों को गोलाकार आकार, यादृच्छिक रंग और हल्की गति के साथ प्रस्तुत करता है। v4 में, कण रंग पुराने `color` गुण के बजाय `paint` के माध्यम से सेट किए जाते हैं।

```html
<!DOCTYPE html>
<html lang="hi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>मूल कण</title>
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

## कॉन्फ़ेटी प्रभाव

एक उत्सवपूर्ण विस्फोट के लिए समर्पित `@tsparticles/confetti` बंडल का उपयोग करें, जो एक ही फ़ंक्शन कॉल से काम करता है।

```html
<!DOCTYPE html>
<html lang="hi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>कॉन्फ़ेटी</title>
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

## आतिशबाजी प्रभाव

ध्वनि प्रभावों के साथ समर्पित `@tsparticles/fireworks` बंडल का उपयोग करके एक आतिशबाजी प्रदर्शन।

```html
<!DOCTYPE html>
<html lang="hi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>आतिशबाजी</title>
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

## रिबन प्रभाव

प्रवाहमान रिबन एनिमेशन के लिए समर्पित `@tsparticles/ribbons` बंडल का उपयोग करें जो माउस की स्थिति पर प्रतिक्रिया करते हैं।

```html
<!DOCTYPE html>
<html lang="hi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>रिबन</title>
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

## हिम प्रभाव

`@tsparticles/configs` प्रीसेट कैटलॉग का उपयोग करके हल्के से गिरते बर्फ के टुकड़े।

```html
<!DOCTYPE html>
<html lang="hi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>हिम प्रभाव</title>
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

वैकल्पिक रूप से, स्वतंत्र प्रीसेट पैकेज का उपयोग करके:

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

## नेटवर्क / लिंक्स प्रभाव

माउस इंटरैक्टिविटी के साथ एक क्लासिक कनेक्टेड-नोड्स विज़ुअल। `@tsparticles/slim` बंडल में लिंक्स इंटरैक्शन और माउस ग्रैब मोड शामिल है।

```html
<!DOCTYPE html>
<html lang="hi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>नेटवर्क / लिंक्स</title>
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

## तारे प्रभाव

`@tsparticles/configs` प्रीसेट कैटलॉग का उपयोग करके एक तारों भरा रात का आकाश।

```html
<!DOCTYPE html>
<html lang="hi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>तारे प्रभाव</title>
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

वैकल्पिक रूप से, स्वतंत्र प्रीसेट पैकेज का उपयोग करके:

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

## कस्टम कॉन्फ़िगरेशन

स्लिम बंडल का उपयोग करके ग्रेडिएंट बैकग्राउंड, इंटरैक्टिव होवर प्रभाव और एकाधिक आकार प्रकारों के साथ स्क्रैच से एक कॉन्फ़िगरेशन बनाएं।

```html
<!DOCTYPE html>
<html lang="hi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>कस्टम कॉन्फ़िग</title>
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
    <h1>कस्टम कॉन्फ़िगरेशन</h1>
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

## एकाधिक कंटेनर

एक ही पेज पर अनेक स्वतंत्र कण इंस्टेंस चलाएं, प्रत्येक का अपना कॉन्फ़िगरेशन होता है।

```html
<!DOCTYPE html>
<html lang="hi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>एकाधिक कंटेनर</title>
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

        // कंटेनर 1 – धीमी गति वाले वृत्त
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

        // कंटेनर 2 – लिंक्स के साथ त्रिकोण
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

        // कंटेनर 3 – कॉन्फ़ेटी-जैसा विस्फोट
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

        // कंटेनर 4 – धीमी गति से तैरते तारे
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

## डायनामिक नियंत्रण

प्रोग्रामेटिक रूप से रनटाइम पर प्रारंभ करें, रोकें, थामें और थीम बदलें।

```html
<!DOCTYPE html>
<html lang="hi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>डायनामिक नियंत्रण</title>
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
      <button id="play-btn">▶ चलाएं</button>
      <button id="pause-btn">⏸ विराम</button>
      <button id="stop-btn">⏹ रोकें</button>
      <button id="theme-dark-btn">🌙 डार्क थीम</button>
      <button id="theme-light-btn">☀️ लाइट थीम</button>
      <button id="restart-btn">🔄 पुनः आरंभ</button>
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

अब आपने tsParticles v4 के लिए हर प्रमुख वैनिला JS एकीकरण पैटर्न को कवर कर लिया है। प्रत्येक उदाहरण एक स्वतंत्र HTML फ़ाइल है जिसे आप अपने ब्राउज़र में खोलकर tsParticles को क्रियाशील देख सकते हैं।
