---
title: एम्बर गाइड
description: एम्बर.जेएस एप्लिकेशन के साथ tsParticles को एकीकृत करने के लिए पूर्ण मार्गदर्शिका।
---

# एम्बर गाइड

## विषय सूची

1. [इंस्टॉलेशन](#installation)
2. [इंजन आरंभीकरण](#engine-initialization)
3. [मूल उपयोग](#basic-usage)
4. [कस्टम कॉन्फ़िगरेशन](#custom-configuration)
5. [इवेंट हैंडलिंग](#event-handling)
6. [सशर्त रेंडरिंग](#conditional-rendering)
7. [टाइपस्क्रिप्ट उदाहरण](#typescript-example)

---

## इंस्टॉलेशन

एम्बर ऐडऑन और tsParticles इंजन को ember-cli के माध्यम से इंस्टॉल करें:

```bash
ember install @tsparticles/ember
```

यह ऐडऑन और इसकी सह-निर्भरता `tsparticles` को इंस्टॉल करेगा। आप वैकल्पिक रूप से प्रीसेट पैकेज जोड़ सकते हैं:

```bash
npm install @tsparticles/slim
```

---

## इंजन आरंभीकरण

ऐडऑन एक `initParticlesEngine` उपयोगिता निर्यात करता है जिसे आप एप्लिकेशन स्तर पर एक बार कॉल करते हैं। यह एक एसिंक कॉलबैक प्राप्त करता है जहाँ आप अपने ऐप को आवश्यक सुविधाएँ, प्रीसेट या आकार लोड करते हैं।

```typescript
import { initParticlesEngine } from "@tsparticles/ember/utils/init-particles-engine";
import { loadFull } from "tsparticles";

// इसे एप्लिकेशन बूटस्ट्रैप के दौरान कॉल करें
if (typeof window !== "undefined") {
  void initParticlesEngine(async (engine) => {
    await loadFull(engine);
  });
}
```

इस कॉल के लिए सामान्य स्थान एप्लिकेशन रूट का `beforeModel` हुक, एक एप्लिकेशन कंट्रोलर का कंस्ट्रक्टर, या एक इंस्टेंस इनिशियलाइज़र है। इंजन सिंगलटन एक बार आरंभ होता है और आपके ऐप में सभी `<Particles>` कम्पोनेंट के बीच साझा होता है।

---

## मूल उपयोग

इंजन आरंभ करने के बाद, किसी भी टेम्पलेट में `<Particles>` कम्पोनेंट का उपयोग करें। अपना पार्टिकल कॉन्फ़िगरेशन `@options` आर्गुमेंट के माध्यम से पास करें।

```hbs
{{! app/templates/application.hbs }}

<Particles @options={{this.options}} />
```

```typescript
// app/controllers/application.ts
import Controller from "@ember/controller";
import type { ISourceOptions } from "@tsparticles/engine";

export default class ApplicationController extends Controller {
  options: ISourceOptions = {
    fpsLimit: 60,
    particles: {
      number: { value: 80 },
      color: { value: "#00d4ff" },
      shape: { type: "circle" },
      opacity: { value: 0.6 },
      size: { value: { min: 2, max: 5 } },
      links: {
        enable: true,
        distance: 150,
        color: "#00d4ff",
        opacity: 0.3,
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
    background: { color: "#0d1117" },
  };
}
```

---

## कस्टम कॉन्फ़िगरेशन

इंटरैक्टिविटी, एकाधिक आकार और उत्तरदायी घनत्व के साथ एक समृद्ध कॉन्फ़िगरेशन बनाएँ।

```typescript
import Controller from "@ember/controller";
import type { ISourceOptions } from "@tsparticles/engine";

export default class IndexController extends Controller {
  options: ISourceOptions = {
    fullScreen: { enable: true, zIndex: -1 },
    fpsLimit: 60,
    particles: {
      number: {
        value: 60,
        density: { enable: true, width: 800, height: 800 },
      },
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
    background: { color: "#0f0f23" },
  };
}
```

```hbs
<Particles @options={{this.options}} />
```

---

## इवेंट हैंडलिंग

`<Particles>` कम्पोनेंट एक `@particlesLoaded` एक्शन फायर करता है जब कंटेनर आरंभीकरण पूरा कर लेता है और पहला फ्रेम रेंडर हो जाता है। प्रोग्रामेटिक नियंत्रण के लिए `Container` इंस्टेंस तक पहुँचने के लिए इसका उपयोग करें।

```typescript
import Controller from "@ember/controller";
import { action } from "@ember/object";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default class ApplicationController extends Controller {
  options: ISourceOptions = {
    /* ... */
  };

  @action
  loadedCallback(container: Container) {
    console.log("पार्टिकल्स लोड हुए", container?.id);

    // प्रोग्रामेटिक नियंत्रण उदाहरण:
    setTimeout(() => {
      container.pause();
      console.log("पार्टिकल्स 5 सेकंड बाद रुक गए");
    }, 5000);
  }
}
```

```hbs
<Particles @options={{this.options}} @particlesLoaded={{this.loadedCallback}} />
```

यदि आप एक अलग एक्शन परिभाषित नहीं करना चाहते तो आप टेम्पलेट हेल्पर के साथ इनलाइन कॉलबैक पैटर्न का भी उपयोग कर सकते हैं।

---

## सशर्त रेंडरिंग

`<Particles>` कम्पोनेंट कब रेंडर होगा यह नियंत्रित करने के लिए एम्बर के `{{if}}` हेल्पर का उपयोग `@tracked` प्रॉपर्टी के साथ करें। यह तब उपयोगी होता है जब इंजन आरंभीकरण एसिंक होता है और आप इंजन तैयार होने से पहले कम्पोनेंट को रेंडर करने से बचना चाहते हैं।

```typescript
import Controller from "@ember/controller";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { initParticlesEngine } from "@tsparticles/ember/utils/init-particles-engine";
import { loadSlim } from "@tsparticles/slim";

export default class ApplicationController extends Controller {
  @tracked engineReady = false;

  options: ISourceOptions = {
    particles: {
      number: { value: 50 },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.6 },
      size: { value: { min: 1, max: 4 } },
      move: { enable: true, speed: 1, outModes: { default: "bounce" } },
    },
    background: { color: "#1a1a2e" },
  };

  constructor(...args: any[]) {
    super(...args);
    if (typeof window !== "undefined") {
      void initParticlesEngine(async (engine: Engine) => {
        await loadSlim(engine);
      }).then(() => {
        this.engineReady = true;
      });
    }
  }
}
```

```hbs
{{#if this.engineReady}}
  <Particles @options={{this.options}} @particlesLoaded={{this.loadedCallback}} />
{{else}}
  <p>पार्टिकल्स लोड हो रहे हैं...</p>
{{/if}}
```

`@tracked` डेकोरेटर सुनिश्चित करता है कि प्रॉमिस हल होने पर टेम्पलेट स्वचालित रूप से पुनः रेंडर हो।

---


## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## टाइपस्क्रिप्ट उदाहरण

नीचे एक पूर्ण, टाइप किया गया एम्बर एप्लिकेशन कंट्रोलर है जो स्लिम प्रीसेट, इंटरैक्टिविटी और लाइफसाइकिल प्रबंधन के साथ पूर्ण एकीकरण पैटर्न प्रदर्शित करता है।

```typescript
// app/controllers/application.ts
import Controller from "@ember/controller";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { initParticlesEngine } from "@tsparticles/ember/utils/init-particles-engine";
import { loadSlim } from "@tsparticles/slim";

export default class ApplicationController extends Controller {
  @tracked private engineReady = false;

  private container?: Container;

  private readonly options: ISourceOptions = {
    fullScreen: { enable: true, zIndex: -1 },
    fpsLimit: 60,
    particles: {
      number: { value: 80, density: { enable: true } },
      color: { value: "#6366f1" },
      shape: { type: "circle" },
      opacity: { value: { min: 0.3, max: 0.7 } },
      size: { value: { min: 2, max: 6 } },
      links: {
        enable: true,
        distance: 160,
        color: "#6366f1",
        opacity: 0.25,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1.2,
        direction: "none",
        random: false,
        straight: false,
        outModes: { default: "bounce" },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        onClick: { enable: true, mode: "push" },
      },
      modes: {
        grab: { distance: 180, links: { opacity: 0.6 } },
        push: { quantity: 3 },
      },
    },
    background: { color: "#0a0a1a" },
  };

  constructor(...args: any[]) {
    super(...args);
    if (typeof window !== "undefined") {
      void initParticlesEngine(async (engine: Engine) => {
        await loadSlim(engine);
      }).then(() => {
        this.engineReady = true;
      });
    }
  }

  @action
  private handleParticlesLoaded(container?: Container): void {
    this.container = container;
    console.log("कंटेनर में पार्टिकल्स लोड हुए:", container?.id);
  }
}
```

```hbs
{{! app/templates/application.hbs }}

{{#if this.engineReady}}
  <div class="app-container">
    <h1>tsParticles + एम्बर</h1>
    <Particles @options={{this.options}} @particlesLoaded={{this.handleParticlesLoaded}} />
  </div>
{{else}}
  <div class="loading">
    <p>पार्टिकल इंजन आरंभ हो रहा है...</p>
  </div>
{{/if}}
```

---

आपके पास अब एम्बर.जेएस एप्लिकेशन में tsParticles को एकीकृत करने के लिए आवश्यक सब कुछ है। प्रत्येक उदाहरण आत्मनिर्भर है और आपके प्रोजेक्ट में कॉपी करने के लिए तैयार है।
