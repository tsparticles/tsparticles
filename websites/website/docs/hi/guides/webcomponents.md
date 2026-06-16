# वेब कम्पोनेंट

`@tsparticles/webcomponents` पैकेज के माध्यम से tsParticles का उपयोग मूल वेब कम्पोनेंट के साथ करें। इस दृष्टिकोण के लिए किसी फ्रेमवर्क की आवश्यकता नहीं है — बस सादा जावास्क्रिप्ट और कस्टम तत्व।

## स्थापना

### CDN के माध्यम से

tsParticles कोर और वेब कम्पोनेंट बंडल शामिल करें:

```html
<script src="https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/webcomponents@4/tsparticles.webcomponents.min.js"></script>
```

### npm + बिल्ड के माध्यम से

```bash
npm install @tsparticles/webcomponents tsparticles
```

फिर अपने जावास्क्रिप्ट बंडल में आयात करें:

```javascript
import { initParticlesEngine, defineParticlesElement } from "@tsparticles/webcomponents";
```

## इंजन आरंभीकरण

`<web-particles>` तत्व रेंडर होने से पहले, इंजन को आपकी आवश्यक सुविधाओं के साथ आरंभीकृत किया जाना चाहिए। वांछित प्लगइन लोड करने वाले कॉलबैक के साथ `initParticlesEngine` कॉल करें:

```javascript
import { initParticlesEngine } from "@tsparticles/webcomponents";

const { loadFull } = await import("tsparticles");

await initParticlesEngine(async (engine) => {
  await loadFull(engine);
});
```

> **`loadFull` क्यों?** यह सभी अंतर्निहित आकृतियों (वृत्त, वर्ग, बहुभुज, छवि, आदि), इंटरैक्शन (होवर, क्लिक), और अपडेटर (अपारदर्शिता, आकार, रंग, आदि) को पंजीकृत करता है। छोटे बंडल के लिए, `tsparticles-slim` का उपयोग करें या व्यक्तिगत प्लगइन चुनें।

## कस्टम तत्व परिभाषित करना

इंजन आरंभीकरण के बाद, `<web-particles>` कस्टम तत्व पंजीकृत करें:

```javascript
import { defineParticlesElement } from "@tsparticles/webcomponents";

defineParticlesElement();
```

यह ब्राउज़र के `CustomElementRegistry` के साथ `web-particles` टैग पंजीकृत करता है। इसे कई बार कॉल करना सुरक्षित है — डुप्लिकेट पंजीकरणों को अनदेखा किया जाता है।

## मूल उपयोग

एक बार जब `initParticlesEngine` और `defineParticlesElement` दोनों चल चुके हों, तो तत्व का सीधे HTML में उपयोग करें:

```html
<!DOCTYPE html>
<html lang="hi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>tsParticles वेब कम्पोनेंट</title>
  </head>
  <body>
    <web-particles id="tsparticles"></web-particles>

    <script type="module">
      import { initParticlesEngine, defineParticlesElement } from "@tsparticles/webcomponents";

      const { loadFull } = await import("tsparticles");

      await initParticlesEngine(async (engine) => {
        await loadFull(engine);
      });

      defineParticlesElement();

      const el = document.getElementById("tsparticles");
      el.options = {
        background: { color: "#0d47a1" },
        particles: {
          number: { value: 80 },
          links: { enable: true, color: "#ffffff" },
          move: { enable: true, speed: 2 },
        },
      };
    </script>
  </body>
</html>
```

## कस्टम कॉन्फ़िगरेशन

`<web-particles>` तत्व `options` प्रॉपर्टी (जावास्क्रिप्ट ऑब्जेक्ट) या `options` विशेषता में JSON के माध्यम से कॉन्फ़िगरेशन स्वीकार करता है।

### जावास्क्रिप्ट प्रॉपर्टी के माध्यम से

```javascript
const el = document.querySelector("web-particles");
el.options = {
  background: { color: "#000000" },
  fpsLimit: 60,
  particles: {
    color: { value: ["#ff0000", "#00ff00", "#0000ff"] },
    links: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
    },
    move: {
      enable: true,
      speed: 3,
      outModes: "bounce",
    },
    number: { value: 60 },
    opacity: { value: 0.6 },
    shape: { type: ["circle", "square"] },
    size: { value: { min: 2, max: 6 } },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
      onClick: { enable: true, mode: "push" },
    },
    modes: {
      repulse: { distance: 200 },
      push: { quantity: 4 },
    },
  },
};
```

### HTML विशेषता के माध्यम से (JSON)

```html
<web-particles
  id="tsparticles"
  options='{
    "background": { "color": "#0d47a1" },
    "particles": {
      "number": { "value": 50 },
      "links": { "enable": true, "color": "#ffffff" },
      "move": { "enable": true, "speed": 2 }
    }
  }'
></web-particles>
```

> `options` विशेषता का उपयोग करते समय, मान मान्य JSON होना चाहिए। जटिल कॉन्फ़िगरेशन के लिए प्रॉपर्टी असाइनमेंट पसंद किया जाता है।

## डायनामिक निर्माण

आप पूरी तरह से जावास्क्रिप्ट में `<web-particles>` तत्व बना सकते हैं और उन्हें किसी भी समय DOM में जोड़ सकते हैं:

```javascript
import { initParticlesEngine, defineParticlesElement } from "@tsparticles/webcomponents";

const { loadFull } = await import("tsparticles");

await initParticlesEngine(async (engine) => {
  await loadFull(engine);
});

defineParticlesElement();

function createParticles(container, config) {
  const el = document.createElement("web-particles");
  el.id = "dynamic-particles";
  el.style.position = "absolute";
  el.style.width = "100%";
  el.style.height = "100%";
  el.style.top = "0";
  el.style.left = "0";
  el.options = config;
  container.appendChild(el);
  return el;
}

// उपयोग
const particles = createParticles(document.body, {
  background: { color: "#1a1a2e" },
  particles: {
    number: { value: 100 },
    links: { enable: true, color: "#e94560" },
    move: { enable: true, speed: 1 },
  },
});
```

## कस्टम तत्व का विस्तार

आप अंतर्निहित कॉन्फ़िगरेशन के साथ अपना स्वयं का कस्टम तत्व बनाने के लिए `ParticlesElement` को उपवर्गित कर सकते हैं:

```javascript
import { initParticlesEngine, ParticlesElement } from "@tsparticles/webcomponents";

const { loadFull } = await import("tsparticles");

await initParticlesEngine(async (engine) => {
  await loadFull(engine);
});

class MyParticlesBackground extends ParticlesElement {
  constructor() {
    super();
    this.style.position = "fixed";
    this.style.top = "0";
    this.style.left = "0";
    this.style.width = "100%";
    this.style.height = "100%";
    this.style.zIndex = "-1";
  }

  connectedCallback() {
    this.options = {
      background: { color: "#0d47a1" },
      particles: {
        number: { value: 80 },
        links: { enable: true, color: "#ffffff" },
        move: { enable: true, speed: 2 },
      },
    };
    super.connectedCallback();
  }
}

customElements.define("my-particles-bg", MyParticlesBackground);
```

उपयोग:

```html
<my-particles-bg></my-particles-bg>
```

## कंटेनर एक्सेस और नियंत्रण

कस्टम तत्व अनिवार्य नियंत्रण के लिए tsParticles `Container` इंस्टेंस को उजागर करता है:

```javascript
const el = document.querySelector("web-particles");

// कंटेनर तक पहुँच (connectedCallback के बाद उपलब्ध)
const container = el.container;
container?.pause();
container?.play();

// नष्ट करें और साफ करें
el.dispose();
```

## पूर्ण उदाहरण

CDN स्क्रिप्ट के साथ वेब कम्पोनेंट मॉड्यूल का उपयोग करते हुए एक पूर्ण HTML पृष्ठ:

```html
<!DOCTYPE html>
<html lang="hi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>tsParticles वेब कम्पोनेंट डेमो</title>
    <style>
      body {
        margin: 0;
        overflow: hidden;
      }
      web-particles {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
      .content {
        position: relative;
        z-index: 1;
        color: white;
        text-align: center;
        padding-top: 20vh;
        font-family: sans-serif;
      }
    </style>
  </head>
  <body>
    <div class="content">
      <h1>tsParticles + वेब कम्पोनेंट</h1>
      <p>मूल कस्टम तत्व, किसी फ्रेमवर्क की आवश्यकता नहीं।</p>
    </div>

    <web-particles id="tsparticles"></web-particles>

    <script type="module">
      import {
        initParticlesEngine,
        defineParticlesElement,
      } from "https://cdn.jsdelivr.net/npm/@tsparticles/webcomponents@4/tsparticles.webcomponents.min.js";

      const tsParticles = window.tPparticles;

      await initParticlesEngine(async (engine) => {
        await tsParticles.loadFull(engine);
      });

      defineParticlesElement();

      const el = document.getElementById("tsparticles");
      el.options = {
        background: { color: "#0d47a1" },
        fpsLimit: 60,
        particles: {
          number: { value: 100 },
          color: { value: "#ffffff" },
          links: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
          },
          move: {
            enable: true,
            speed: 2,
            outModes: "out",
          },
          size: {
            value: { min: 1, max: 4 },
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
            onClick: { enable: true, mode: "push" },
          },
          modes: {
            grab: { distance: 200, links: { opacity: 0.5 } },
            push: { quantity: 4 },
          },
        },
      };
    </script>
  </body>
</html>
```


## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## API संदर्भ

| निर्यात / प्रॉपर्टी             | प्रकार                   | विवरण                                                       |
| ------------------------------- | ------------------------ | ----------------------------------------------------------- |
| `initParticlesEngine(callback)` | `function`               | प्लगइन लोडर के साथ tsParticles इंजन आरंभीकृत करें           |
| `defineParticlesElement()`      | `function`               | `<web-particles>` कस्टम तत्व पंजीकृत करें                   |
| `ParticlesElement`              | `class`                  | आधार वर्ग जिसे आप कस्टम तत्वों के लिए विस्तारित कर सकते हैं |
| `element.options`               | `ISourceOptions`         | कण कॉन्फ़िगरेशन ऑब्जेक्ट प्राप्त/सेट करें                   |
| `element.container`             | `Container \| undefined` | अंतर्निहित `Container` का केवल-पढ़ने योग्य संदर्भ           |
| `element.dispose()`             | `function`               | कण इंस्टेंस नष्ट करें और संसाधन साफ करें                    |
