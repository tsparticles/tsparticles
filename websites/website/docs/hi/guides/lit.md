---
title: लिट
description: आधिकारिक @tsparticles/lit वेब कम्पोनेंट रैपर के साथ tsParticles को लिट में एकीकृत करें।
---

# लिट इंटीग्रेशन

`@tsparticles/lit` पैकेज एक `<lit-particles>` कस्टम एलिमेंट प्रदान करता है जो लिट के साथ बनाया गया है, जिससे आप किसी भी लिट प्रोजेक्ट या सादे HTML पेज में tsParticles का घोषणात्मक रूप से उपयोग कर सकते हैं।

## इंस्टॉलेशन

```bash
npm install @tsparticles/lit tsparticles
```

पैकेज पूरी तरह से टाइप किया गया है और पार्टिकल विकल्पों को प्रतिक्रियाशील रूप से अपडेट करने के लिए लिट के रिएक्टिव कंट्रोलर पैटर्न शामिल करता है।

## इंजन आरंभीकरण

`<lit-particles>` कम्पोनेंट को पंजीकृत करने या अपने एप्लिकेशन में आयात करने से पहले `initParticlesEngine` कॉल करें। यह ठीक एक बार होना चाहिए।

```typescript
import { initParticlesEngine } from "@tsparticles/lit";
import { loadFull } from "tsparticles";

void initParticlesEngine(async (engine) => {
  await loadFull(engine);
});
```

अनुकूलित बंडल आकार के लिए, केवल अपने प्रोजेक्ट को आवश्यक सुविधाएँ आयात करें:

```typescript
import { initParticlesEngine } from "@tsparticles/lit";
import { loadBasic } from "@tsparticles/basic";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

void initParticlesEngine(async (engine) => {
  await loadBasic(engine);
  await loadConfettiPreset(engine);
});
```

## मूल उपयोग

इंजन आरंभ होने के बाद, किसी भी लिट टेम्पलेट या HTML फ़ाइल में `<lit-particles>` एलिमेंट का उपयोग करें:

```typescript
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "@tsparticles/lit";

@customElement("my-app")
class MyApp extends LitElement {
  private options = {
    background: {
      color: "#0d1117",
    },
    particles: {
      number: { value: 60 },
      color: { value: "#58a6ff" },
      links: {
        enable: true,
        color: "#58a6ff",
      },
      move: { enable: true, speed: 2 },
    },
  };

  render() {
    return html` <lit-particles id="tsparticles" .options="${this.options}"> </lit-particles> `;
  }
}
```

`.options` सिंटैक्स (आगे डॉट के साथ) लिट की प्रॉपर्टी बाइंडिंग है, जो सुनिश्चित करता है कि ऑब्जेकट को विशेषता के रूप में क्रमबद्ध करने के बजाय संदर्भ द्वारा पास किया जाता है।

## सादा HTML उपयोग

एक बार `@tsparticles/lit` बंडल या लोड हो जाने पर, एलिमेंट सादे HTML में भी काम करता है:

```html
<!DOCTYPE html>
<html>
  <head>
    <script type="module" src="bundle.js"></script>
  </head>
  <body>
    <lit-particles id="tsparticles"></lit-particles>
  </body>
</html>
```

आप एक न्यूनतम विकल्प ऑब्जेकट को JSON विशेषता के रूप में पास कर सकते हैं:

```html
<lit-particles
  id="tsparticles"
  options='{"background":{"color":"#000"},"particles":{"number":{"value":30}}}'
></lit-particles>
```

## कस्टम कॉन्फ़िगरेशन

एक पूर्ण tsParticles कॉन्फ़िगरेशन को लिट प्रॉपर्टी के रूप में पास करें:

```typescript
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { ISourceOptions } from "@tsparticles/engine";
import "@tsparticles/lit";

@customElement("my-particles")
class MyParticles extends LitElement {
  @property({ type: Object })
  options: ISourceOptions = {
    background: {
      color: "#0d1117",
    },
    fpsLimit: 120,
    fullScreen: {
      enable: true,
      zIndex: -1,
    },
    particles: {
      color: {
        value: ["#ff5733", "#33ff57", "#3357ff"],
      },
      links: {
        color: "#ffffff",
        enable: true,
        opacity: 0.3,
        distance: 150,
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: "none",
        random: true,
      },
      number: {
        value: 100,
        density: {
          enable: true,
        },
      },
      opacity: {
        value: 0.6,
        animation: {
          enable: true,
          speed: 0.5,
          minimumValue: 0.1,
        },
      },
      size: {
        value: { min: 1, max: 5 },
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 1,
        },
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab",
        },
        onClick: {
          enable: true,
          mode: "push",
        },
      },
      modes: {
        grab: {
          distance: 180,
          links: {
            opacity: 0.5,
          },
        },
        push: {
          quantity: 4,
        },
      },
    },
  };

  render() {
    return html` <lit-particles id="tsparticles" .options="${this.options}"> </lit-particles> `;
  }
}
```

## इवेंट हैंडलिंग

`<lit-particles>` एलिमेंट द्वारा प्रेषित `particles-loaded` कस्टम इवेंट को सुनें:

```typescript
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import type { Container } from "@tsparticles/engine";
import "@tsparticles/lit";

@customElement("my-app")
class MyApp extends LitElement {
  private handleParticlesLoaded(e: CustomEvent<Container>) {
    const container = e.detail;
    console.log("पार्टिकल्स लोड हुए:", container);
    container?.refresh();
  }

  render() {
    return html` <lit-particles id="tsparticles" @particles-loaded="${this.handleParticlesLoaded}"> </lit-particles> `;
  }
}
```

## टाइपस्क्रिप्ट उदाहरण

`initParticlesEngine`, रिएक्टिव विकल्प और इवेंट हैंडलिंग के साथ एक पूर्ण टाइप किया गया लिट एलिमेंट:

```typescript
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { initParticlesEngine } from "@tsparticles/lit";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import "@tsparticles/lit";

void initParticlesEngine(async (engine) => {
  await loadFull(engine);
});

@customElement("particles-background")
class ParticlesBackground extends LitElement {
  @property({ type: Object })
  options: ISourceOptions = {};

  @property({ type: Boolean, attribute: "fullscreen" })
  fullscreen = true;

  protected onParticlesLoaded(e: CustomEvent<Container>) {
    console.log("कंटेनर तैयार:", e.detail.id);
  }

  render() {
    return html`
      <lit-particles
        id="particles-bg"
        .options="${this.options}"
        ?fullScreen="${this.fullscreen}"
        @particles-loaded="${this.onParticlesLoaded}"
      >
      </lit-particles>
    `;
  }
}
```


## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## डायनामिक अपडेट

क्योंकि `<lit-particles>` लिट की रिएक्टिव प्रॉपर्टीज़ का उपयोग करता है, `options` प्रॉपर्टी बदलने से पार्टिकल्स स्वचालित रूप से अपडेट हो जाते हैं:

```typescript
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { ISourceOptions } from "@tsparticles/engine";
import "@tsparticles/lit";

@customElement("dynamic-particles")
class DynamicParticles extends LitElement {
  @state()
  private theme: "light" | "dark" = "dark";

  private get options(): ISourceOptions {
    return this.theme === "dark"
      ? {
          background: { color: "#0d1117" },
          particles: { color: { value: "#58a6ff" } },
        }
      : {
          background: { color: "#ffffff" },
          particles: { color: { value: "#0969da" } },
        };
  }

  private toggleTheme() {
    this.theme = this.theme === "dark" ? "light" : "dark";
  }

  render() {
    return html`
      <button @click="${this.toggleTheme}">${this.theme === "dark" ? "हल्का" : "गहरा"} पर स्विच करें</button>
      <lit-particles id="tsparticles" .options="${this.options}"> </lit-particles>
    `;
  }
}
```

कम्पोनेंट `options` प्रॉपर्टी पर नज़र रखता है और जब भी यह बदलता है, आंतरिक रूप से `refresh()` कॉल करता है, रनटाइम पर पार्टिकल कॉन्फ़िगरेशन को सहजता से अपडेट करता है।
