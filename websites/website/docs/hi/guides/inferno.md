---
title: इन्फेर्नो गाइड
description: इन्फेर्नो एप्लिकेशन के साथ tsParticles को एकीकृत करने के लिए पूर्ण मार्गदर्शिका।
---

# इन्फेर्नो गाइड

## विषय सूची

1. [इंस्टॉलेशन](#installation)
2. [मूल उपयोग](#basic-usage)
3. [इंजन आरंभीकरण](#engine-initialization)
4. [कस्टम कॉन्फ़िगरेशन](#custom-configuration)
5. [प्रीसेट उपयोग](#preset-usage)
6. [कम्पोनेंट पैटर्न](#component-pattern)
7. [टाइपस्क्रिप्ट उदाहरण](#typescript-example)

---

## इंस्टॉलेशन

इन्फेर्नो रैपर और tsParticles इंजन को npm के माध्यम से इंस्टॉल करें:

```bash
npm install @tsparticles/inferno tsparticles
```

वैकल्पिक रूप से छोटे बंडल के लिए स्लिम प्रीसेट इंस्टॉल करें:

```bash
npm install @tsparticles/slim
```

---

## मूल उपयोग

`@tsparticles/inferno` पैकेज दो आइटम निर्यात करता है: `ParticlesProvider` और `Particles`. अपने पार्टिकल कम्पोनेंट को `ParticlesProvider` से रैप करें जो इंजन सेटअप के लिए एक `init` कॉलबैक स्वीकार करता है, फिर पार्टिकल कैनवास रेंडर करने के लिए `<Particles>` का उपयोग करें।

```tsx
import { render } from "inferno";
import { Particles, ParticlesProvider } from "@tsparticles/inferno";
import { loadSlim } from "@tsparticles/slim";

const options = {
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

function App() {
  return (
    <ParticlesProvider
      init={async (engine) => {
        await loadSlim(engine);
      }}
    >
      <Particles id="tsparticles" options={options} />
    </ParticlesProvider>
  );
}

render(<App />, document.getElementById("app"));
```

`ParticlesProvider` को हर `<Particles>` कम्पोनेंट का पूर्वज होना चाहिए। यह इंजन को एक बार आरंभ करता है और इसे संदर्भ के माध्यम से सभी चिल्ड्रन को प्रदान करता है।

---

## इंजन आरंभीकरण

`ParticlesProvider` एक `init` प्रॉप स्वीकार करता है जो इंजन इंस्टेंस प्राप्त करता है। यह वह जगह है जहाँ आप अपने ऐप को आवश्यक सुविधाएँ, आकार, प्रीसेट या अपडेटर लोड करते हैं।

```tsx
// हल्का — वृत्त पार्टिकल्स, मूल हलचल, लिंक
<ParticlesProvider init={async engine => {
  const { loadSlim } = await import("@tsparticles/slim");
  await loadSlim(engine);
}}>

// पूर्ण सुविधा सेट — सभी आकार, इंटरैक्शन, प्रभाव
<ParticlesProvider init={async engine => {
  const { loadFull } = await import("tsparticles");
  await loadFull(engine);
}}>

// प्रीसेट-विशिष्ट — कॉन्फ़ेटी, आतिशबाज़ी, बर्फ, तारे
<ParticlesProvider init={async engine => {
  const { loadConfettiPreset } = await import("@tsparticles/preset-confetti");
  await loadConfettiPreset(engine);
}}>
```

कॉलबैक के अंदर डायनामिक `import()` का उपयोग करने से कोड स्प्लिटिंग सक्षम होती है: प्रीसेट या सुविधा मॉड्यूल केवल तब लोड होते हैं जब पार्टिकल कम्पोनेंट माउंट होता है।

---

## कस्टम कॉन्फ़िगरेशन

नीचे इंटरैक्टिविटी, एकाधिक आकार प्रकार और एक गहरे ग्रेडिएंट पृष्ठभूमि के साथ एक पूर्ण-सुविधायुक्त कॉन्फ़िगरेशन है।

```tsx
import { render } from "inferno";
import { Particles, ParticlesProvider } from "@tsparticles/inferno";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
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

function App() {
  return (
    <ParticlesProvider
      init={async (engine) => {
        const { loadSlim } = await import("@tsparticles/slim");
        await loadSlim(engine);
      }}
    >
      <Particles id="tsparticles" options={options} />
    </ParticlesProvider>
  );
}

render(<App />, document.getElementById("app"));
```

---

## प्रीसेट उपयोग

`@tsparticles/configs` पैकेज पूर्व-निर्मित कॉन्फ़िगरेशन प्रदान करता है जिसे आप सीधे `options` प्रॉप में पास कर सकते हैं। उन्हें `ParticlesProvider` init कॉलबैक में संबंधित प्रीसेट लोडर के साथ जोड़ें।

```tsx
import { render } from "inferno";
import { Particles, ParticlesProvider } from "@tsparticles/inferno";
import configs from "@tsparticles/configs";

function App() {
  return (
    <ParticlesProvider
      init={async (engine) => {
        const { loadFull } = await import("tsparticles");
        await loadFull(engine);
      }}
    >
      <Particles id="tsparticles" options={configs.confetti} />
    </ParticlesProvider>
  );
}

render(<App />, document.getElementById("app"));
```

आप `configs.confetti` को किसी भी उपलब्ध प्रीसेट से बदल सकते हैं: `configs.basic`, `configs.fireworks`, `configs.snow`, `configs.stars`, आदि।

---

## कम्पोनेंट पैटर्न

बड़े एप्लिकेशन के लिए, अपने पार्टिकल लॉजिक को `particlesLoaded` कॉलबैक के साथ एक समर्पित कम्पोनेंट में संरचित करें ताकि `Container` इंस्टेंस तक पहुँचा जा सके।

```tsx
import { render, Component } from "inferno";
import { Particles, ParticlesProvider } from "@tsparticles/inferno";
import type { Container, ISourceOptions } from "@tsparticles/engine";

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

class ParticlesBackground extends Component {
  private container?: Container;

  handleParticlesLoaded(container?: Container) {
    this.container = container;
    console.log("पार्टिकल्स लोड हुए:", container?.id);
  }

  render() {
    return (
      <ParticlesProvider
        init={async (engine) => {
          const { loadSlim } = await import("@tsparticles/slim");
          await loadSlim(engine);
        }}
      >
        <Particles id="tsparticles" options={options} particlesLoaded={this.handleParticlesLoaded} />
      </ParticlesProvider>
    );
  }
}

function App() {
  return (
    <div>
      <h1 style={{ position: "relative", zIndex: 1, color: "#fff" }}>tsParticles + इन्फेर्नो</h1>
      <ParticlesBackground />
    </div>
  );
}

render(<App />, document.getElementById("app"));
```

---


## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## टाइपस्क्रिप्ट उदाहरण

यहाँ एक पूर्ण, टाइप किया गया इन्फेर्नो एप्लिकेशन है जिसमें एक उत्तरदायी पार्टिकल कॉन्फ़िगरेशन और पूर्ण-स्क्रीन पृष्ठभूमि है।

```tsx
import { render } from "inferno";
import { Particles, ParticlesProvider } from "@tsparticles/inferno";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

const particlesOptions: ISourceOptions = {
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

function handleInit(engine: Engine): Promise<void> {
  return import("@tsparticles/slim").then(({ loadSlim }) => loadSlim(engine));
}

function handleParticlesLoaded(container?: Container): void {
  console.log("tsParticles कंटेनर तैयार:", container?.id);
}

function App() {
  return (
    <ParticlesProvider init={handleInit}>
      <div style={{ position: "relative", zIndex: 1, color: "#fff", textAlign: "center", paddingTop: "2rem" }}>
        <h1>tsParticles + इन्फेर्नो</h1>
        <p>पूर्ण टाइपस्क्रिप्ट एकीकरण</p>
      </div>
      <Particles id="tsparticles" options={particlesOptions} particlesLoaded={handleParticlesLoaded} />
    </ParticlesProvider>
  );
}

render(<App />, document.getElementById("app"));
```

---

आपके पास अब इन्फेर्नो एप्लिकेशन में tsParticles को एकीकृत करने के लिए आवश्यक सब कुछ है। प्रत्येक उदाहरण आत्मनिर्भर है और आपके प्रोजेक्ट में कॉपी करने के लिए तैयार है।
