# एस्ट्रो इंटीग्रेशन

अपनी एस्ट्रो साइट में आधिकारिक `@tsparticles/astro` इंटीग्रेशन पैकेज के साथ tsParticles का उपयोग करें।

## इंस्टॉलेशन

एस्ट्रो इंटीग्रेशन और tsParticles कोर को अपने पैकेज मैनेजर के माध्यम से इंस्टॉल करें:

```bash
npm install @tsparticles/astro tsparticles
```

```bash
pnpm add @tsparticles/astro tsparticles
```

```bash
yarn add @tsparticles/astro tsparticles
```

## इंजन आरंभीकरण

tsParticles एक मॉड्यूलर आर्किटेक्चर का उपयोग करता है। पार्टिकल्स रेंडर करने से पहले, आपको आवश्यक सुविधाओं के साथ इंजन को आरंभ करना होगा। एक क्लाइंट स्क्रिप्ट बनाएँ (जैसे, `src/scripts/particles-init.ts`) या अपने एस्ट्रो कम्पोनेंट में इनलाइन `<script>` का उपयोग करें:

```typescript
import { initParticlesEngine } from "@tsparticles/astro";

void initParticlesEngine(async (engine) => {
  const { loadFull } = await import("tsparticles");
  await loadFull(engine);
});
```

> `initParticlesEngine` `tsParticles.init()` के चारों ओर एक रैपर है जो सुनिश्चित करता है कि `<Particles>` कम्पोनेंट माउंट होने से पहले इंजन तैयार है। यह एक `Promise` लौटाता है जो आरंभीकरण पूरा होने पर हल होता है।

## मूल उपयोग

`<Particles />` कम्पोनेंट को किसी भी `.astro` टेम्पलेट में रखें। अपना कॉन्फ़िगरेशन `options` प्रॉप के माध्यम से पास करें:

```astro
---
import Particles from "@tsparticles/astro";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  background: {
    color: "#000000",
  },
  particles: {
    number: { value: 80 },
    links: { enable: true, color: "#ffffff" },
    move: { enable: true, speed: 2 },
  },
};
---

<Particles id="tsparticles" options={options} />

<script>
  import { initParticlesEngine } from "@tsparticles/astro";

  void initParticlesEngine(async (engine) => {
    const { loadFull } = await import("tsparticles");
    await loadFull(engine);
  });
</script>
```

> `id` प्रॉप अंतर्निहित कैनवास कंटेनर `<div>` को पास किया जाता है। इसका उपयोग स्टाइलिंग या `document.getElementById()` के माध्यम से अनिवार्य पहुँच के लिए करें।

## टाइपस्क्रिप्ट सपोर्ट

इंटीग्रेशन पूर्ण टाइपस्क्रिप्ट घोषणाओं के साथ आता है। अपने कॉन्फ़िगरेशन को टाइप करने के लिए `@tsparticles/engine` से `ISourceOptions` का उपयोग करें:

```typescript
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  background: { color: "#0d47a1" },
  fpsLimit: 60,
  particles: {
    color: {
      value: ["#ff0000", "#00ff00", "#0000ff"],
    },
    move: {
      enable: true,
      speed: 3,
      outModes: "bounce",
    },
    number: {
      value: 50,
      density: { enable: true },
    },
    opacity: { value: 0.5 },
    shape: { type: "circle" },
    size: { value: { min: 2, max: 6 } },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
    },
    modes: {
      repulse: { distance: 200 },
    },
  },
};
```

## कस्टम कॉन्फ़िगरेशन

नीचे एक अधिक विस्तृत कॉन्फ़िगरेशन है जिसे आप किसी भी एस्ट्रो पेज में डाल सकते हैं:

```astro
---
import Particles from "@tsparticles/astro";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  autoPlay: true,
  background: {
    color: "#0d47a1",
    image: "",
    position: "50% 50%",
    repeat: "no-repeat",
    size: "cover",
  },
  backgroundMode: {
    enable: true,
    zIndex: -1,
  },
  fpsLimit: 120,
  particles: {
    color: {
      value: "#ffffff",
      animation: {
        enable: true,
        speed: 20,
        sync: false,
      },
    },
    links: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
      triangles: {
        enable: true,
        opacity: 0.1,
      },
    },
    move: {
      enable: true,
      speed: 3,
      direction: "none",
      random: true,
      straight: false,
      outModes: "out",
      attract: { enable: false },
    },
    number: {
      value: 80,
      density: {
        enable: true,
      },
    },
    opacity: {
      value: 0.5,
      animation: {
        enable: true,
        speed: 1,
        sync: false,
      },
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 5 },
      animation: {
        enable: true,
        speed: 3,
        sync: false,
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
      resize: true,
    },
    modes: {
      grab: {
        distance: 200,
        links: { opacity: 0.5 },
      },
      push: { quantity: 4 },
    },
  },
  detectRetina: true,
};
---

<Particles id="tsparticles" options={options} />

<script>
  import { initParticlesEngine } from "@tsparticles/astro";

  void initParticlesEngine(async (engine) => {
    const { loadFull } = await import("tsparticles");
    await loadFull(engine);
  });
</script>
```

## प्रीसेट का उपयोग

मैन्युअल रूप से कॉन्फ़िगरेशन बनाने के बजाय, इंजन आरंभीकरण के दौरान एक प्रीसेट लोड करें और विकल्पों में इसका संदर्भ दें:

```astro
---
import Particles from "@tsparticles/astro";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  preset: "stars",
  background: { color: "#000000" },
};
---

<Particles id="tsparticles" options={options} />

<script>
  import { initParticlesEngine } from "@tsparticles/astro";

  void initParticlesEngine(async (engine) => {
    const { loadStarsPreset } = await import("tsparticles-preset-stars");
    await loadStarsPreset(engine);
  });
</script>
```

## अन्य फ्रेमवर्क के साथ एकीकरण

क्योंकि एस्ट्रो React, Vue, Svelte और Solid जैसे UI फ्रेमवर्क का समर्थन करता है, आप `.astro` फ़ाइलों के भीतर फ्रेमवर्क-विशिष्ट tsParticles कम्पोनेंट का उपयोग कर सकते हैं:

### एस्ट्रो में React

```astro
---
import Particles from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  background: { color: "#000" },
  particles: {
    number: { value: 60 },
    links: { enable: true },
    move: { enable: true },
  },
};
---

<Particles client:load id="tsparticles" options={options} />
```

### एस्ट्रो में Vue

```astro
---
import Particles from "@tsparticles/vue3";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  background: { color: "#000" },
  particles: {
    number: { value: 60 },
    links: { enable: true },
    move: { enable: true },
  },
};
---

<Particles client:load id="tsparticles" :options="options" />
```

> `client:load` निर्देश एस्ट्रो को बताता है कि पेज लोड होने पर तुरंत कम्पोनेंट को हाइड्रेट करें। विलंबित लोडिंग के लिए `client:visible` का उपयोग करें।

## पूर्ण पेज उदाहरण

एक संपूर्ण एस्ट्रो पेज जिसमें पार्टिकल्स एनिमेटेड पृष्ठभूमि के रूप में कार्य कर रहे हैं:

```astro
---
import Layout from "../layouts/Layout.astro";
import Particles from "@tsparticles/astro";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
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
---

<Layout title="पार्टिकल्स पृष्ठभूमि">
  <main>
    <h1>स्वागत है</h1>
    <p>इस पेज पर tsParticles द्वारा संचालित पार्टिकल पृष्ठभूमि है।</p>
  </main>
  <Particles id="bg-particles" options={options} />
</Layout>

<style is:global>
  #bg-particles {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  main {
    position: relative;
    z-index: 1;
    color: white;
    text-align: center;
    padding-top: 20vh;
  }
</style>

<script>
  import { initParticlesEngine } from "@tsparticles/astro";

  void initParticlesEngine(async (engine) => {
    const { loadFull } = await import("tsparticles");
    await loadFull(engine);
  });
</script>
```

## कम्पोनेंट प्रॉप्स

| प्रॉप                | प्रकार           | डिफ़ॉल्ट                  | विवरण                                    |
| -------------------- | ---------------- | ------------------------- | ---------------------------------------- |
| `id`                 | `string`         | `"tsparticles"`           | कंटेनर के लिए DOM एलिमेंट आईडी           |
| `options`            | `ISourceOptions` | `{}`                      | पूर्ण tsParticles कॉन्फ़िगरेशन ऑब्जेकट   |
| `url`                | `string`         | —                         | दूरस्थ JSON URL से कॉन्फ़िगरेशन लोड करें |
| `particlesClassName` | `string`         | `"tsparticles-canvas-el"` | कैनवास एलिमेंट के लिए CSS क्लास          |
| `container`          | `object`         | —                         | पूर्व-मौजूद `Container` इंस्टेंस (उन्नत) |
