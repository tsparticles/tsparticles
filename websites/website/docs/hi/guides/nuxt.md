---
title: Nuxt इंटीग्रेशन
description: Nuxt 3 / Nuxt 4 एप्लिकेशन में tsParticles को एकीकृत करने के लिए चरण-दर-चरण मार्गदर्शिका।
---

# Nuxt इंटीग्रेशन

यह मार्गदर्शिका आधिकारिक `@tsparticles/vue3` रैपर का उपयोग करके **Nuxt 3** (और Nuxt 4) प्रोजेक्ट में tsParticles को एकीकृत करने को कवर करती है। Nuxt सर्वर-साइड और क्लाइंट-साइड दोनों पर चलता है, इसलिए आपको पार्टिकल कम्पोनेंट को SSR से बचाना होगा।

## इंस्टॉलेशन

Vue 3 रैपर और अपनी पसंद का इंजन बंडल इंस्टॉल करें:

```bash
npm install @tsparticles/vue3 tsparticles
```

छोटे बंडल के लिए, `tsparticles` के बजाय `@tsparticles/slim` इंस्टॉल करें:

```bash
npm install @tsparticles/vue3 @tsparticles/slim
```

## मूल उपयोग

Nuxt कम्पोनेंट को डिफ़ॉल्ट रूप से सर्वर पर रेंडर करता है। चूँकि tsParticles को ब्राउज़र `canvas` API की आवश्यकता है, आपको `<vue-particles>` कम्पोनेंट को `<client-only>` टैग में लपेटना होगा:

```vue
<template>
  <div class="page">
    <client-only>
      <vue-particles id="tsparticles" :options="options" @particles-loaded="particlesLoaded" />
    </client-only>
    <h1>मेरा Nuxt ऐप</h1>
  </div>
</template>

<script setup lang="ts">
import type { ISourceOptions, Container } from "@tsparticles/engine";

const options: ISourceOptions = {
  fullScreen: {
    zIndex: -1,
  },
  background: {
    color: "#0d47a1",
  },
  particles: {
    number: { value: 80 },
    links: { enable: true, color: "#ffffff" },
    move: { enable: true },
    size: { value: 3 },
  },
};

const particlesLoaded = (container?: Container) => {
  console.log("पार्टिकल्स कंटेनर तैयार", container?.id);
};
</script>

<style scoped>
.page {
  position: relative;
}
</style>
```

`<client-only>` रैपर सुनिश्चित करता है कि `<vue-particles>` कम्पोनेंट केवल ब्राउज़र में माउंट हो, जिससे हाइड्रेशन बेमेल को रोका जा सके।

## कॉन्फ़िगरेशन

टाइप-सुरक्षित कॉन्फ़िगरेशन के लिए पूर्ण `ISourceOptions` प्रकार का उपयोग करें। आप अपने विकल्पों को इनलाइन परिभाषित कर सकते हैं या उन्हें एक अलग कॉन्फ़िग फ़ाइल से आयात कर सकते हैं:

```vue
<script setup lang="ts">
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  fpsLimit: 60,
  background: {
    color: "#000000",
  },
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
      },
    },
    color: {
      value: ["#ff0000", "#00ff00", "#0000ff"],
    },
    shape: {
      type: ["circle", "square", "triangle"],
    },
    opacity: {
      value: 0.8,
    },
    size: {
      value: { min: 1, max: 8 },
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
      speed: 3,
      direction: "none",
      random: false,
      straight: false,
      outModes: "bounce",
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse",
      },
      onClick: {
        enable: true,
        mode: "push",
      },
    },
  },
};
</script>
```

## बर्फ प्रभाव

बर्फ प्रीसेट का उपयोग करके एक सर्दियों की बर्फबारी प्रभाव बनाएँ:

```bash
npm install @tsparticles/preset-snow
```

```vue
<template>
  <client-only>
    <vue-particles id="snow" :options="options" @particles-loaded="onLoad" />
  </client-only>
</template>

<script setup lang="ts">
import { loadSnowPreset } from "@tsparticles/preset-snow";
import { tsParticles } from "@tsparticles/engine";
import type { Container } from "@tsparticles/engine";

// कम्पोनेंट माउंट होने से पहले प्रीसेट लोड करें
await loadSnowPreset(tsParticles);

const options = {
  preset: "snow",
  fullScreen: { zIndex: -1 },
  background: {
    color: "#1a1a2e",
  },
};

const onLoad = (container?: Container) => {
  console.log("बर्फ प्रभाव तैयार", container?.id);
};
</script>
```

क्योंकि प्रीसेट `<script setup>` में टॉप-लेवल `await` के साथ लोड किया जाता है, यह कम्पोनेंट रेंडर होने से पहले तैयार होने की गारंटी है।

## इंटरैक्टिव पार्टिकल्स

इंटरैक्टिविटी मोड जोड़कर क्लिक और होवर इंटरैक्शन सक्षम करें:

```vue
<template>
  <client-only>
    <vue-particles id="interactive" :options="options" />
  </client-only>
</template>

<script setup lang="ts">
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  fullScreen: { zIndex: -1 },
  particles: {
    number: { value: 50 },
    links: {
      enable: true,
      distance: 150,
    },
    move: {
      enable: true,
      speed: 2,
    },
    size: {
      value: { min: 1, max: 4 },
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "grab", // पार्टिकल्स कर्सर से जुड़ते हैं
      },
      onClick: {
        enable: true,
        mode: "push", // क्लिक पर पार्टिकल्स जोड़ें
      },
    },
    modes: {
      grab: {
        distance: 200,
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
```

उपलब्ध इंटरैक्शन मोड में शामिल हैं: `grab`, `bubble`, `connect`, `repulse`, `push`, `remove`, `attract`, और `slow`।

## इवेंट हैंडलिंग

`<vue-particles>` कम्पोनेंट कई लाइफसाइकिल इवेंट उत्सर्जित करता है:

```vue
<template>
  <client-only>
    <vue-particles
      id="event-demo"
      :options="options"
      @particles-loaded="onLoaded"
      @particles-init="onInit"
      @particles-destroy="onDestroy"
    />
  </client-only>
</template>

<script setup lang="ts">
import type { Container, Engine } from "@tsparticles/engine";

const options = {
  fullScreen: { zIndex: -1 },
  particles: {
    number: { value: 60 },
    links: { enable: true },
    move: { enable: true },
  },
};

const onInit = (engine: Engine) => {
  console.log("इंजन आरंभ हुआ", engine);
};

const onLoaded = (container: Container) => {
  console.log("कंटेनर लोड हुआ", container.id);
};

const onDestroy = () => {
  console.log("कंटेनर नष्ट हुआ");
};
</script>
```

| इवेंट                | पेलोड       | विवरण                                                  |
| -------------------- | ----------- | ------------------------------------------------------ |
| `@particles-init`    | `Engine`    | एक बार फायर होता है जब tsParticles इंजन आरंभ होता है  |
| `@particles-loaded`  | `Container` | हर बार फायर होता है जब कंटेनर लोडिंग या रीलोडिंग पूरी करता है |
| `@particles-destroy` | कोई नहीं   | फायर होता है जब कंटेनर नष्ट होता है                   |

## पूर्ण टाइपस्क्रिप्ट उदाहरण

स्पष्ट आयात और लाइफसाइकिल जागरूकता के साथ एक पूर्ण, टाइप किया गया कम्पोनेंट:

```vue
<template>
  <div class="particles-wrapper">
    <client-only>
      <vue-particles
        id="full-example"
        :options="options"
        @particles-loaded="onParticlesLoaded"
        @particles-init="onParticlesInit"
      />
    </client-only>
    <div class="controls">
      <button @click="togglePause">{{ paused ? "पुनरारंभ" : "रोकें" }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { loadFull } from "tsparticles";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

const containerRef = ref<Container | undefined>(undefined);
const paused = ref(false);

const options: ISourceOptions = {
  fullScreen: { zIndex: -1 },
  background: { color: "#0a0a23" },
  particles: {
    color: { value: "#00ff00" },
    number: { value: 80 },
    links: { enable: true, color: "#00ff00", distance: 150 },
    move: { enable: true, speed: 1.5 },
    size: { value: { min: 1, max: 4 } },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
    },
    modes: {
      repulse: { distance: 120 },
    },
  },
};

const onParticlesInit = async (engine: Engine) => {
  await loadFull(engine);
};

const onParticlesLoaded = (container: Container) => {
  containerRef.value = container;
};

const togglePause = () => {
  if (containerRef.value) {
    if (paused.value) {
      containerRef.value.play();
    } else {
      containerRef.value.pause();
    }
    paused.value = !paused.value;
  }
};
</script>

<style scoped>
.particles-wrapper {
  position: relative;
  min-height: 100vh;
}
.controls {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 10;
}
</style>
```

## पेज इंटीग्रेशन

कम्पोनेंट को पेज के टेम्पलेट में रखकर किसी विशिष्ट Nuxt पेज में पार्टिकल पृष्ठभूमि जोड़ें:

```vue
<template>
  <div>
    <client-only>
      <vue-particles id="page-particles" :options="options" />
    </client-only>

    <div class="content">
      <h1>हमारे बारे में</h1>
      <p>यह सामग्री पार्टिकल कैनवास के ऊपर बैठती है।</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  fullScreen: { zIndex: -1 },
  background: { color: "#1a1a2e" },
  particles: {
    number: { value: 50 },
    color: { value: "#e94560" },
    links: { enable: true, color: "#e94560" },
    move: { enable: true },
  },
};
</script>

<style scoped>
.content {
  position: relative;
  z-index: 1;
  padding: 2rem;
  color: white;
}
</style>
```

यदि आप **हर** पेज पर पार्टिकल्स चाहते हैं, तो कम्पोनेंट को अलग-अलग पेजों के बजाय `layouts/default.vue` में जोड़ें।

## Nuxt 4 नोट्स

Nuxt 4 Nuxt 3 के `<client-only>` और `<script setup>` पैटर्न के साथ पिछड़ी संगतता बनाए रखता है। उपरोक्त सभी उदाहरण Nuxt 4 में बिना किसी बदलाव के काम करते हैं।

Nuxt 4 के लिए मुख्य विचार:

- **Nitropack 2**: सर्वर इंजन अपग्रेड किया गया है, लेकिन यह `<vue-particles>` जैसे क्लाइंट-ओनली कम्पोनेंट को प्रभावित नहीं करता है।
- **Vue 3.5+**: Nuxt 4 एक नए Vue संस्करण के साथ आता है — `@tsparticles/vue3` बिना किसी समस्या के Vue 3.3+ के साथ संगत है।
- **सख्त SSR जाँच**: यदि आप हाइड्रेशन चेतावनी देखते हैं, तो सुनिश्चित करें कि `<vue-particles>` हमेशा `<client-only>` के अंदर हो और सर्वर पर कभी रेंडर न हो।
- **हाइब्रिड रेंडरिंग**: यदि कुछ पेजों के लिए `ssr: false` वाले रूट नियमों का उपयोग कर रहे हैं, तो आप उन पेजों पर `<client-only>` छोड़ सकते हैं, लेकिन इसे हमेशा शामिल करना सुरक्षित है।

यदि आप `@tsparticles/vue` पैकेज (vue 2) के साथ Nuxt 2 से अपग्रेड कर रहे हैं, तो आपको Nuxt 3 / 4 के लिए `@tsparticles/vue3` पर माइग्रेट करना होगा — API संगत नहीं हैं।

## प्रीसेट गैलरी

उपरोक्त पैटर्न को इनमें से किसी भी आधिकारिक प्रीसेट के साथ जोड़ें:

| प्रीसेट   | पैकेज                            | प्रभाव                  |
| --------- | -------------------------------- | ----------------------- |
| Confetti  | `@tsparticles/preset-confetti`   | रंगीन कॉन्फ़ेटी विस्फोट |
| Fireworks | `@tsparticles/preset-fireworks`  | आतिशबाजी विस्फोट        |
| Snow      | `@tsparticles/preset-snow`       | गिरती बर्फ              |
| Stars     | `@tsparticles/preset-stars`      | टिमटिमाता रात का आकाश  |
| Links     | `@tsparticles/preset-links`      | जुड़ा नोड नेटवर्क       |
| Bubbles   | `@tsparticles/preset-bubbles`    | तैरते बुलबुले           |

```vue
<template>
  <client-only>
    <vue-particles id="preset-demo" :options="{ preset: 'stars' }" />
  </client-only>
</template>

<script setup lang="ts">
import { loadStarsPreset } from "@tsparticles/preset-stars";
import { tsParticles } from "@tsparticles/engine";

await loadStarsPreset(tsParticles);
</script>
```

## समस्या निवारण

| लक्षण                            | कारण                                     | समाधान                                                        |
| -------------------------------- | ---------------------------------------- | ------------------------------------------------------------- |
| खाली स्क्रीन / हाइड्रेशन त्रुटि | `<vue-particles>` सर्वर पर रेंडर हुआ    | `<client-only>` में लपेटें                                    |
| प्रीसेट का कोई प्रभाव नहीं      | कम्पोनेंट माउंट से पहले प्रीसेट लोड नहीं हुआ | `<script setup>` में टॉप-लेवल await के साथ `loadXPreset()` कॉल करें |
| कैनवास व्यूपोर्ट नहीं भरता     | `fullScreen` सक्षम नहीं                  | विकल्पों में `fullScreen: { zIndex: -1 }` जोड़ें               |
| नियंत्रण रोक/चालू नहीं करते     | कंटेनर रेफ सेट नहीं                     | `@particles-loaded` हैंडलर में कंटेनर असाइन करें              |

## अगले कदम

- तैयार Vue कॉन्फ़िगरेशन के लिए [इंटरैक्टिव डेमो](/demos/) देखें।
- पार्टिकल पैरामीटर की पूरी सूची के लिए [विकल्प संदर्भ](/options/) पढ़ें।
- और अधिक पूर्व-निर्मित प्रभावों के लिए [प्रीसेट पेज](/demos/presets) पर जाएँ।
