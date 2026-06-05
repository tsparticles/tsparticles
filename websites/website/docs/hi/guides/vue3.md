---
title: Vue 3 एकीकरण
description: @tsparticles/vue3 का उपयोग करके Vue 3 अनुप्रयोगों में tsParticles को एकीकृत करने के लिए चरण-दर-चरण मार्गदर्शिका।
---

# Vue 3 एकीकरण

`@tsparticles/vue3` पैकेज tsParticles के लिए एक मूल Vue 3 घटक और प्लगइन प्रणाली प्रदान करता है। यह मार्गदर्शिका मूल सेटअप से लेकर डायनामिक थीम स्विचिंग और कस्टम प्रीसेट जैसे उन्नत पैटर्न तक सब कुछ कवर करती है।

---

## स्थापना

```bash
npm install @tsparticles/vue3 @tsparticles/engine
```

वैकल्पिक रूप से कोई प्रीसेट या पूर्ण बंडल स्थापित करें:

```bash
# पूर्ण बंडल (सभी सुविधाएँ)
npm install tsparticles

# विशिष्ट प्रीसेट
npm install @tsparticles/preset-confetti
npm install @tsparticles/preset-fireworks
npm install @tsparticles/preset-snow
npm install @tsparticles/preset-stars

# उपयोगिता कॉन्फ़िग
npm install @tsparticles/configs
```

---

## मूल उपयोग

अपने ऐप एंट्री पॉइंट में प्लगइन पंजीकृत करें, फिर `<vue-particles>` घटक का कहीं भी उपयोग करें।

### ऐप एंट्री (`main.ts`)

```typescript
import { createApp } from "vue";
import App from "./App.vue";
import type { Engine } from "@tsparticles/engine";
import { ParticlesPlugin } from "@tsparticles/vue3";
import { loadFull } from "tsparticles";

const app = createApp(App);

app.use(ParticlesPlugin, {
  init: async (engine: Engine) => {
    await loadFull(engine);
  },
});

app.mount("#app");
```

### घटक (`App.vue`)

```vue
<script setup lang="ts">
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  background: {
    color: "#0d47a1",
  },
  fpsLimit: 120,
  particles: {
    number: {
      value: 80,
    },
    color: {
      value: "#ffffff",
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.5,
    },
    size: {
      value: { min: 1, max: 5 },
    },
    links: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: false,
      straight: false,
      outModes: "out",
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse",
      },
    },
    modes: {
      repulse: {
        distance: 100,
      },
    },
  },
};
</script>

<template>
  <vue-particles id="tsparticles" :options="options" />
</template>
```

---

## घटक के साथ `particlesInit` का उपयोग

यदि आप वैश्विक प्लगइन का उपयोग नहीं करना चाहते हैं, तो सीधे `init` कॉलबैक पास करें:

```vue
<script setup lang="ts">
import type { Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadFull(engine);
};
</script>

<template>
  <vue-particles id="tsparticles" :options="options" :init="particlesInit" />
</template>
```

---

## ईवेंट

घटक कई जीवनचक्र ईवेंट उत्सर्जित करता है:

```vue
<script setup lang="ts">
import type { Container } from "@tsparticles/engine";

const particlesLoaded = async (container: Container): Promise<void> => {
  console.log("पार्टिकल्स कंटेनर लोड हुआ", container);
};

const particlesInit = async (engine: Engine): Promise<void> => {
  console.log("इंजन आरंभीकृत हुआ");
  await loadFull(engine);
};
</script>

<template>
  <vue-particles id="tsparticles" :options="options" :init="particlesInit" @particles-loaded="particlesLoaded" />
</template>
```

---

## कॉन्फ़ेटी प्रभाव

उत्सवों के लिए कॉन्फ़ेटी प्रीसेट का उपयोग करें:

```bash
npm install @tsparticles/preset-confetti
```

```vue
<script setup lang="ts">
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadConfettiPreset(engine);
};

const options: ISourceOptions = {
  preset: "confetti",
  background: {
    color: "transparent",
  },
};
</script>

<template>
  <vue-particles id="confetti" :options="options" :init="particlesInit" />
</template>
```

एक बार के विस्फोट के लिए, प्रीसेट लोड करें फिर किसी विधि के अंदर प्रोग्रामेटिक रूप से `tsParticles.load()` कॉल करें।

---

## आतिशबाजी प्रभाव

आतिशबाजी प्रीसेट उच्च-प्रभाव वाले कण विस्फोट बनाता है:

```bash
npm install @tsparticles/preset-fireworks
```

```vue
<script setup lang="ts">
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadFireworksPreset(engine);
};

const options: ISourceOptions = {
  preset: "fireworks",
  background: {
    color: "#000000",
  },
};
</script>

<template>
  <vue-particles id="fireworks" :options="options" :init="particlesInit" />
</template>
```

> **टिप:** आतिशबाजी प्रीसेट संसाधन-गहन है। इसे घटक से बंधे `v-if` को टॉगल करके उपयोगकर्ता इंटरैक्शन (जैसे, बटन क्लिक) पर ट्रिगर करें।

---

## बर्फ प्रभाव

बर्फ प्रीसेट के साथ गिरती बर्फ का अनुकरण करें:

```bash
npm install @tsparticles/preset-snow
```

```vue
<script setup lang="ts">
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { loadSnowPreset } from "@tsparticles/preset-snow";

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadSnowPreset(engine);
};

const options: ISourceOptions = {
  preset: "snow",
  background: {
    color: "#1a1a2e",
  },
};
</script>

<template>
  <vue-particles id="snow" :options="options" :init="particlesInit" />
</template>
```

---

## इंटरैक्टिव कण

होवर और क्लिक इंटरैक्टिविटी मोड जोड़ें:

```vue
<script setup lang="ts">
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  background: {
    color: "#0d0d0d",
  },
  particles: {
    number: {
      value: 100,
    },
    color: {
      value: "#00ff00",
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.6,
    },
    size: {
      value: { min: 1, max: 4 },
    },
    links: {
      enable: true,
      distance: 120,
      color: "#00ff00",
      opacity: 0.3,
      width: 1,
    },
    move: {
      enable: true,
      speed: 3,
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
</script>

<template>
  <vue-particles id="interactive" :options="options" />
</template>
```

उपलब्ध इंटरैक्शन मोड: `grab`, `repulse`, `bubble`, `connect`, `push`, `remove`, `trail`, `attract`, `light`.

---

## थीम स्विचिंग

रिएक्टिव ऑप्शन ऑब्जेक्ट को अपडेट करके रनटाइम पर कण थीम को गतिशील रूप से बदलें:

```vue
<script setup lang="ts">
import { ref } from "vue";
import type { ISourceOptions } from "@tsparticles/engine";

const isDark = ref(true);

const options = ref<ISourceOptions>({
  background: {
    color: "#000000",
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
    },
    number: {
      value: 60,
    },
    move: {
      enable: true,
      speed: 2,
    },
    size: {
      value: { min: 1, max: 3 },
    },
  },
});

const toggleTheme = () => {
  isDark.value = !isDark.value;
  options.value = {
    ...options.value,
    background: {
      color: isDark.value ? "#000000" : "#f0f0f0",
    },
    particles: {
      ...options.value.particles,
      color: {
        value: isDark.value ? "#ffffff" : "#333333",
      },
      links: {
        ...(options.value.particles?.links as object),
        color: isDark.value ? "#ffffff" : "#333333",
      },
    },
  };
};
</script>

<template>
  <div>
    <button @click="toggleTheme">{{ isDark ? "लाइट" : "डार्क" }} पर स्विच करें</button>
    <vue-particles id="theme-particles" :options="options" />
  </div>
</template>
```

वैकल्पिक रूप से, शून्य-कॉन्फ़िग स्विचिंग के लिए अंतर्निहित [themes](https://particles.js.org/docs/interfaces/Options_Interfaces_IOptions.IOptions.html#themes) विकल्प और कंटेनर पर `theme` प्रॉपर्टी का उपयोग करें।

---

## @tsparticles/configs से कस्टम प्रीसेट

`@tsparticles/configs` पैकेज पूर्व-निर्मित कॉन्फ़िगरेशन ऑब्जेक्ट निर्यात करता है:

```bash
npm install @tsparticles/configs
```

```vue
<script setup lang="ts">
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { loadLinksPreset } from "@tsparticles/preset-links";
import particlesConfig from "@tsparticles/configs/particles.json";

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadLinksPreset(engine);
};

const options: ISourceOptions = {
  ...particlesConfig,
  background: {
    color: "#1e1e2e",
  },
};
</script>

<template>
  <vue-particles id="config-particles" :options="options" :init="particlesInit" />
</template>
```

तैयार-से-उपयोग लेआउट के लिए `@tsparticles/configs` पैकेज में उपलब्ध कॉन्फ़िग देखें।

---

## इंजन आरंभीकरण दृष्टिकोण

इंजन को आरंभ करने के दो तरीके हैं:

### 1. वैश्विक प्लगइन (अनुशंसित)

```typescript
// main.ts
import { createApp } from "vue";
import App from "./App.vue";
import type { Engine } from "@tsparticles/engine";
import { ParticlesPlugin } from "@tsparticles/vue3";
import { loadFull } from "tsparticles";

createApp(App)
  .use(ParticlesPlugin, {
    init: async (engine: Engine) => {
      await loadFull(engine);
    },
  })
  .mount("#app");
```

इंजन फिर वैश्विक रूप से उपलब्ध है और सभी `<vue-particles>` इंस्टेंस इसे साझा करते हैं।

### 2. घटक-स्तरीय आरंभीकरण

प्रत्येक `<vue-particles>` इंस्टेंस को एक `:init` कॉलबैक पास करें। तब उपयोगी जब विभिन्न घटकों को विभिन्न प्लगइन सेट की आवश्यकता हो:

```vue
<template>
  <vue-particles id="a" :options="optionsA" :init="initA" />
  <vue-particles id="b" :options="optionsB" :init="initB" />
</template>
```

### 3. पार्टिकल्स प्रोवाइडर (कम्पोज़िशन API)

इंजन तक प्रोग्रामेटिक रूप से पहुँचने के लिए प्रोवाइडर का उपयोग करें:

```vue
<script setup lang="ts">
import { useParticles } from "@tsparticles/vue3";
import { loadFull } from "tsparticles";

const { init } = useParticles();

await init(async (engine: Engine) => {
  await loadFull(engine);
});
</script>
```

---

## नामित निर्यात + TypeScript

सभी भागों के साथ पूर्ण TypeScript उदाहरण:

```vue
<script setup lang="ts">
import { ref } from "vue";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

const particlesContainer = ref<Container | null>(null);

const options: ISourceOptions = {
  background: {
    color: "#0d47a1",
  },
  fpsLimit: 60,
  particles: {
    number: {
      value: 50,
    },
    color: {
      value: "#ffd700",
    },
    shape: {
      type: ["circle", "triangle", "polygon"],
    },
    opacity: {
      value: 0.7,
      random: true,
    },
    size: {
      value: { min: 2, max: 8 },
      random: true,
    },
    links: {
      enable: true,
      distance: 200,
      color: "#ffd700",
      opacity: 0.3,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: true,
      straight: false,
      outModes: "bounce",
      attract: {
        enable: false,
      },
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "bubble",
      },
      onClick: {
        enable: true,
        mode: "repulse",
      },
    },
    modes: {
      bubble: {
        distance: 200,
        size: 12,
        duration: 0.3,
      },
      repulse: {
        distance: 200,
      },
    },
  },
  detectRetina: true,
};

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadFull(engine);
};

const particlesLoaded = async (container: Container): Promise<void> => {
  particlesContainer.value = container;
  console.log("कंटेनर तैयार", container);
};
</script>

<template>
  <vue-particles id="tsparticles" :options="options" :init="particlesInit" @particles-loaded="particlesLoaded" />
</template>
```

---

## API संदर्भ

| प्रॉप      | प्रकार                                | डिफ़ॉल्ट         | विवरण                         |
| --------- | ----------------------------------- | --------------- | ------------------------------ |
| `id`      | `string`                            | `"tsparticles"` | कैनवास तत्व आईडी              |
| `options` | `ISourceOptions`                    | `{}`            | कण कॉन्फ़िगरेशन               |
| `init`    | `(engine: Engine) => Promise<void>` | —               | इंजन आरंभीकरण कॉलबैक          |
| `url`     | `string`                            | —               | JSON कॉन्फ़िग लोड करने का URL |

| ईवेंट               | पेलोड     | विवरण                                        |
| ------------------- | ----------- | --------------------------------------------- |
| `@particles-loaded` | `Container` | जब कंटेनर पूरी तरह से आरंभीकृत हो जाता है तब फायर होता है |
| `@particles-init`   | `Engine`    | इंजन आरंभीकृत होने के बाद फायर होता है        |

---

## समस्या निवारण

- **त्रुटि: `tsparticles is not defined`** — सुनिश्चित करें कि घटक रेंडर होने से पहले `init` कॉलबैक के अंदर `tsparticles` (या आपके आवश्यक प्रीसेट) लोड किए गए हैं।
- **कैनवस दिखाई नहीं दे रहा** — सत्यापित करें कि पैरेंट कंटेनर में गैर-शून्य ऊँचाई है। `#tsparticles { height: 100vh; }` जैसा CSS नियम जोड़ें।
- **प्रदर्शन संबंधी समस्याएँ** — कम-अंत वाले उपकरणों पर `fpsLimit` कम करें, `particles.number.value` घटाएँ, या `detectRetina` अक्षम करें।
- **SSR (Nuxt)** — `<vue-particles>` घटक केवल-क्लाइंट है। इसे `<ClientOnly>` में लपेटें या `client:only` डायरेक्टिव का उपयोग करें।
