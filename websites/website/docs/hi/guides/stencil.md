---
title: स्टेंसिल गाइड
description: स्टेंसिल कम्पोनेंट के साथ tsParticles को एकीकृत करने के लिए पूर्ण मार्गदर्शिका।
---

# स्टेंसिल गाइड

## विषय सूची

1. [इंस्टॉलेशन](#installation)
2. [कस्टम एलिमेंट पंजीकरण](#custom-elements-registration)
3. [मूल उपयोग](#basic-usage)
4. [इंजन आरंभीकरण](#engine-initialization)
5. [कस्टम कॉन्फ़िगरेशन](#custom-configuration)
6. [कम्पोनेंट लाइफसाइकिल](#component-lifecycle)
7. [टाइपस्क्रिप्ट उदाहरण](#typescript-example)

---

## इंस्टॉलेशन

स्टेंसिल रैपर और tsParticles इंजन को npm के माध्यम से इंस्टॉल करें:

```bash
npm install @tsparticles/stencil tsparticles
```

वैकल्पिक रूप से मैन्युअल कॉन्फ़िगरेशन कम करने के लिए एक प्रीसेट बंडल इंस्टॉल करें:

```bash
npm install @tsparticles/slim
```

---

## कस्टम एलिमेंट पंजीकरण

`@tsparticles/stencil` पैकेज एक `defineCustomElements` फ़ंक्शन प्रदान करता है जो `<stencil-particles>` कस्टम एलिमेंट को ब्राउज़र के साथ पंजीकृत करता है। अपने ऐप में कहीं भी कम्पोनेंट का उपयोग करने से पहले इसे एक बार कॉल करें।

```tsx
import { defineCustomElements } from "@tsparticles/stencil/loader";

// <stencil-particles> एलिमेंट पंजीकृत करें
defineCustomElements();
```

लेज़ी-लोडिंग का उपयोग करने वाले स्टेंसिल प्रोजेक्ट के लिए, रेंडरिंग से पहले एलिमेंट उपलब्ध होना सुनिश्चित करने के लिए इसे `componentWillLoad` या अपने ऐप के रूट कम्पोनेंट में कॉल करें।

---

## मूल उपयोग

एक बार कस्टम एलिमेंट पंजीकृत हो जाने पर, आप आवश्यक इंजन सुविधाओं को लोड करने के लिए `options` प्रॉप और `init` कॉलबैक के साथ अपने JSX में `<stencil-particles>` का उपयोग कर सकते हैं।

```tsx
import { Component, h } from "@stencil/core";
import type { ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const options: ISourceOptions = {
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

@Component({ tag: "my-particles" })
export class MyParticles {
  render() {
    return (
      <stencil-particles
        container-id="tsparticles"
        options={options}
        init={async (engine) => {
          await loadSlim(engine);
        }}
      />
    );
  }
}
```

---

## इंजन आरंभीकरण

`init` प्रॉप इंजन इंस्टेंस प्राप्त करता है और आपको आवश्यक सुविधाएँ लोड करने देता है। यह `loadSlim`, `loadFull`, या व्यक्तिगत अपडेटर/इंटरैक्शन प्लगइन कॉल करने के लिए अनुशंसित स्थान है।

```tsx
import { loadSlim } from "@tsparticles/slim";
import { loadFull } from "tsparticles";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

// विकल्प A: हल्का (वृत्त, मूल हलचल, लिंक)
init={async engine => { await loadSlim(engine); }}

// विकल्प B: पूर्ण सुविधा सेट (सभी आकार, प्रभाव, प्रीसेट)
init={async engine => { await loadFull(engine); }}

// विकल्प C: प्रीसेट (कॉन्फ़ेटी, आतिशबाज़ी, बर्फ, तारे)
init={async engine => { await loadConfettiPreset(engine); }}
```

इंजन इंस्टेंस आरंभीकरण के बाद `container-id` विशेषता के माध्यम से भी पहुँच योग्य है, जिससे यदि आवश्यक हो तो बाद में पार्टिकल सिस्टम को प्रोग्रामेटिक रूप से नियंत्रित किया जा सकता है।

---

## कस्टम कॉन्फ़िगरेशन

नीचे इंटरैक्टिविटी, एकाधिक आकार प्रकार और होवर/क्लिक मोड के साथ एक पूर्ण कॉन्फ़िगरेशन है।

```tsx
import { Component, h } from "@stencil/core";
import type { ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const fullOptions: ISourceOptions = {
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
  background: {
    color: "#0f0f23",
  },
};

@Component({ tag: "app-particles" })
export class AppParticles {
  render() {
    return (
      <stencil-particles
        container-id="tsparticles"
        options={fullOptions}
        init={async (engine) => {
          await loadSlim(engine);
        }}
      />
    );
  }
}
```

---

## कम्पोनेंट लाइफसाइकिल

स्टेंसिल में, एकमुश्त सेटअप के लिए अनुशंसित लाइफसाइकिल हुक `componentWillLoad` है। इसका उपयोग कस्टम एलिमेंट पंजीकृत करने और आरंभीकरण स्थिति प्रबंधित करने के लिए करें ताकि `<stencil-particles>` कम्पोनेंट केवल तब रेंडर हो जब इंजन तैयार हो।

```tsx
import { Component, h, State } from "@stencil/core";
import type { ISourceOptions } from "@tsparticles/engine";
import { defineCustomElements } from "@tsparticles/stencil/loader";
import { loadSlim } from "@tsparticles/slim";

@Component({ tag: "app-root" })
export class AppRoot {
  @State() private engineReady = false;

  private options: ISourceOptions = {
    particles: {
      number: { value: 50 },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.6 },
      size: { value: { min: 1, max: 4 } },
      move: {
        enable: true,
        speed: 1,
        outModes: { default: "bounce" },
      },
    },
    background: { color: "#1a1a2e" },
  };

  componentWillLoad() {
    defineCustomElements();
    this.engineReady = true;
  }

  render() {
    return (
      <div>
        <h1>tsParticles + स्टेंसिल</h1>
        {this.engineReady && (
          <stencil-particles
            container-id="tsparticles"
            options={this.options}
            init={async (engine) => {
              await loadSlim(engine);
            }}
          />
        )}
      </div>
    );
  }
}
```

`@State()` का उपयोग यह सुनिश्चित करता है कि इंजन तैयार होने पर कम्पोनेंट पुनः रेंडर होता है, और सशर्त रेंडर कस्टम एलिमेंट परिभाषित होने से पहले पार्टिकल्स कंटेनर को माउंट होने से रोकता है।

---

## टाइपस्क्रिप्ट उदाहरण

यहाँ एक पूर्ण, टाइप किया गया स्टेंसिल एप्लिकेशन कम्पोनेंट है जो स्लिम प्रीसेट, होवर इंटरैक्टिविटी और एक कस्टम डार्क थीम के साथ tsParticles को एकीकृत करता है।

```tsx
import { Component, h, State, Prop } from "@stencil/core";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { defineCustomElements } from "@tsparticles/stencil/loader";
import { loadSlim } from "@tsparticles/slim";

@Component({
  tag: "app-home",
  styleUrl: "app-home.css",
  shadow: true,
})
export class AppHome {
  @State() private initialized = false;

  @Prop() readonly title: string = "स्वागत है";

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

  componentWillLoad() {
    defineCustomElements();
    this.initialized = true;
  }

  private handleInit = async (engine: Engine): Promise<void> => {
    await loadSlim(engine);
  };

  private handleLoaded = async (container?: Container): Promise<void> => {
    this.container = container;
    console.log("पार्टिकल्स कंटेनर लोड हुआ:", container?.id);
  };

  render() {
    return (
      <div class="home">
        <h1>{this.title}</h1>
        <p>tsParticles और स्टेंसिल द्वारा संचालित</p>

        {this.initialized && (
          <stencil-particles
            container-id="tsparticles"
            options={this.options}
            init={this.handleInit}
            particlesLoaded={this.handleLoaded}
          />
        )}
      </div>
    );
  }
}
```

`particlesLoaded` इवेंट पहला फ्रेम रेंडर होने पर फायर होता है, जो आपको प्रोग्रामेटिक नियंत्रण (प्ले, पॉज़, स्टॉप, थीम स्विच) के लिए `Container` इंस्टेंस तक पहुँच प्रदान करता है।

---

आपके पास अब स्टेंसिल एप्लिकेशन में tsParticles को एकीकृत करने के लिए आवश्यक सब कुछ है। प्रत्येक उदाहरण आत्मनिर्भर है और आपके प्रोजेक्ट में कॉपी करने के लिए तैयार है।
