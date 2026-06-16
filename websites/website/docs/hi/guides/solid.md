---
title: SolidJS इंटीग्रेशन
description: आधिकारिक @tsparticles/solid रैपर का उपयोग करके SolidJS एप्लिकेशन में tsParticles को एकीकृत करने के लिए चरण-दर-चरण मार्गदर्शिका।
---

# SolidJS इंटीग्रेशन

यह मार्गदर्शिका आधिकारिक `@tsparticles/solid` रैपर का उपयोग करके **SolidJS** प्रोजेक्ट में tsParticles को एकीकृत करने को कवर करती है। SolidJS का बारीक-दाने वाला रिएक्टिविटी मॉडल tsParticles के साथ अच्छी तरह से काम करता है — विकल्प परिवर्तन पूर्ण पुनः आरंभीकरण के बिना लक्षित कैनवास अपडेट ट्रिगर करते हैं।

## इंस्टॉलेशन

SolidJS रैपर और अपनी पसंद का इंजन बंडल इंस्टॉल करें:

```bash
npm install @tsparticles/solid tsparticles
```

छोटे बंडल के लिए, इसके बजाय `@tsparticles/slim` का उपयोग करें:

```bash
npm install @tsparticles/solid @tsparticles/slim
```

## मूल उपयोग

SolidJS पूरी तरह से ब्राउज़र में चलता है (कोई SSR नहीं), इसलिए आपको सर्वर रेंडरिंग के खिलाफ गार्ड करने की आवश्यकता नहीं है। हालाँकि, पार्टिकल्स रेंडर करने से पहले इंजन को एसिंक रूप से आरंभ किया जाना चाहिए।

इंजन सुविधाएँ लोड करने के लिए `onMount` के अंदर `initParticlesEngine` का उपयोग करें, फिर `<Show>` के साथ सशर्त रूप से `<Particles>` कम्पोनेंट रेंडर करें:

```tsx
import { loadFull } from "tsparticles";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

const App: Component = () => {
  const [initialized, setInitialized] = createSignal(false);

  onMount(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    }).then(() => setInitialized(true));
  });

  const options: ISourceOptions = {
    fullScreen: { zIndex: -1 },
    background: { color: "#0d47a1" },
    particles: {
      number: { value: 80 },
      links: { enable: true, color: "#ffffff" },
      move: { enable: true },
      size: { value: 3 },
    },
  };

  return (
    <Show when={initialized()}>
      <Particles id="tsparticles" options={options} />
    </Show>
  );
};

export default App;
```

`<Show>` कम्पोनेंट सुनिश्चित करता है कि `<Particles>` एलिमेंट इंजन तैयार होने के बाद ही DOM में डाला जाए।

## इंजन आरंभीकरण

`initParticlesEngine` फ़ंक्शन एक कॉलबैक स्वीकार करता है जो `Engine` इंस्टेंस प्राप्त करता है। अपने कॉन्फ़िगरेशन को आवश्यक सुविधाओं को पंजीकृत करने के लिए इस कॉलबैक का उपयोग करें:

```tsx
import { initParticlesEngine } from "@tsparticles/solid";
import { loadFull } from "tsparticles";
import { loadSlim } from "@tsparticles/slim";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";
import type { Engine } from "@tsparticles/engine";

// न्यूनतम — केवल मूल आकार और हलचल
initParticlesEngine((engine: Engine) => loadSlim(engine)).then(() => {
  console.log("इंजन तैयार (स्लिम)");
});

// पूर्ण — हर सुविधा शामिल
initParticlesEngine((engine: Engine) => loadFull(engine)).then(() => {
  console.log("इंजन तैयार (पूर्ण)");
});

// केवल प्रीसेट — एक विशिष्ट प्रीसेट के लिए आवश्यक सुविधाएँ
initParticlesEngine((engine: Engine) => loadConfettiPreset(engine)).then(() => {
  console.log("कॉन्फ़ेटी प्रीसेट लोड हुआ");
});
```

`initParticlesEngine` को अपने ऐप में एक बार कॉल करें — आमतौर पर रूट कम्पोनेंट के `onMount` में। इंजन इंस्टेंस कैश हो जाता है, इसलिए बाद के कॉल तुरंत लौट आते हैं।

## सशर्त रेंडरिंग

इंजन आरंभ होने तक रेंडरिंग स्थगित करने के लिए SolidJS के `<Show>` नियंत्रण प्रवाह का उपयोग करें:

```tsx
import { createSignal, Show, onMount } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import { loadFull } from "tsparticles";
import type { Engine } from "@tsparticles/engine";
import type { Component } from "solid-js";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);

  onMount(() => {
    initParticlesEngine((engine: Engine) => loadFull(engine)).then(() => setReady(true));
  });

  return (
    <Show when={ready()} fallback={<p>पार्टिकल्स लोड हो रहे हैं...</p>}>
      <Particles
        id="tsparticles"
        options={{
          fullScreen: { zIndex: -1 },
          particles: { number: { value: 50 }, move: { enable: true } },
        }}
      />
    </Show>
  );
};
```

`fallback` प्रॉप इंजन आरंभ होने के दौरान एक लोडिंग संकेतक दिखाता है।

## प्रीसेट उपयोग

त्वरित, पूर्व-डिज़ाइन किए गए कॉन्फ़िगरेशन के लिए `@tsparticles/configs` का उपयोग करें:

```bash
npm install @tsparticles/configs
```

```tsx
import configs from "@tsparticles/configs";
import { loadFull } from "tsparticles";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Engine } from "@tsparticles/engine";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);

  onMount(() => {
    initParticlesEngine((engine: Engine) => loadFull(engine)).then(() => setReady(true));
  });

  return (
    <Show when={ready()}>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <Particles id="basic" options={configs.basic} />
        <Particles id="bubbles" options={configs.bubbles} />
      </div>
    </Show>
  );
};

export default App;
```

उपलब्ध कॉन्फ़िग में शामिल हैं: `basic`, `bubbles`, `snow`, `stars`, `fireworks`, `confetti`, `links`, और अधिक।

## इंटरैक्टिव पार्टिकल्स

`interactivity` अनुभाग कॉन्फ़िगर करके क्लिक और होवर इंटरैक्शन जोड़ें:

```tsx
import { loadFull } from "tsparticles";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);

  onMount(() => {
    initParticlesEngine((engine: Engine) => loadFull(engine)).then(() => setReady(true));
  });

  const options: ISourceOptions = {
    fullScreen: { zIndex: -1 },
    particles: {
      number: { value: 60 },
      links: { enable: true, distance: 150 },
      move: { enable: true, speed: 2 },
      size: { value: { min: 1, max: 4 } },
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

  return (
    <Show when={ready()}>
      <Particles id="interactive" options={options} />
    </Show>
  );
};

export default App;
```

- **होवर मोड**: `grab`, `bubble`, `repulse`, `attract`, `slow`, `connect`
- **क्लिक मोड**: `push`, `remove`, `repulse`, `bubble`, `attract`, `pause`

## कस्टम कॉन्फ़िगरेशन

एकाधिक पार्टिकल आकार, रंग पैलेट और गति सेटिंग्स के साथ एक पूर्ण कस्टम कॉन्फ़िगरेशन:

```tsx
import { loadFull } from "tsparticles";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);

  onMount(() => {
    initParticlesEngine((engine: Engine) => loadFull(engine)).then(() => setReady(true));
  });

  const options: ISourceOptions = {
    fullScreen: { zIndex: -1 },
    background: { color: "#0a0a23" },
    fpsLimit: 60,
    particles: {
      color: {
        value: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"],
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: "none",
        random: true,
        straight: false,
        outModes: "bounce",
        attract: { enable: true, rotateX: 600, rotateY: 1200 },
      },
      number: {
        value: 40,
        density: { enable: true },
      },
      opacity: {
        value: { min: 0.3, max: 0.8 },
        animation: {
          enable: true,
          speed: 0.5,
          sync: false,
        },
      },
      size: {
        value: { min: 2, max: 8 },
        animation: {
          enable: true,
          speed: 2,
          sync: false,
        },
      },
      links: {
        enable: true,
        distance: 200,
        color: "#ffffff",
        opacity: 0.3,
        width: 1,
      },
      shape: {
        type: ["circle", "square", "triangle", "polygon"],
        options: {
          polygon: { sides: 6 },
        },
      },
      twinkle: {
        particles: {
          enable: true,
          frequency: 0.05,
          opacity: 1,
        },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        onClick: { enable: true, mode: "bubble" },
      },
      modes: {
        repulse: { distance: 120 },
        bubble: { distance: 200, size: 10, opacity: 0.8 },
      },
    },
    detectRetina: true,
  };

  return (
    <Show when={ready()}>
      <Particles id="custom" options={options} />
    </Show>
  );
};

export default App;
```

## पूर्ण टाइपस्क्रिप्ट उदाहरण

कंटेनर संदर्भ, इंजन आरंभीकरण और मैन्युअल नियंत्रण के साथ एक पूर्ण टाइप किया गया कम्पोनेंट:

```tsx
import { loadFull } from "tsparticles";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);
  const [container, setContainer] = createSignal<Container | undefined>(undefined);
  const [paused, setPaused] = createSignal(false);

  onMount(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    }).then(() => setReady(true));
  });

  const options: ISourceOptions = {
    fullScreen: { zIndex: -1 },
    background: { color: "#1a1a2e" },
    particles: {
      color: { value: "#e94560" },
      number: { value: 80 },
      links: { enable: true, color: "#e94560", distance: 150 },
      move: { enable: true, speed: 2 },
      size: { value: { min: 1, max: 5 } },
    },
  };

  const particlesLoaded = (c?: Container) => {
    setContainer(c);
  };

  const togglePause = () => {
    const c = container();
    if (c) {
      if (paused()) {
        c.play();
      } else {
        c.pause();
      }
      setPaused(!paused());
    }
  };

  return (
    <Show when={ready()}>
      <Particles id="full-example" options={options} particlesLoaded={particlesLoaded} />
      <button
        onClick={togglePause}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 10,
          padding: "8px 16px",
        }}
      >
        {paused() ? "पुनरारंभ" : "रोकें"}
      </button>
    </Show>
  );
};

export default App;
```

## सिग्नल के साथ डायनामिक विकल्प

SolidJS की ताकतों में से एक बारीक-दाने वाली रिएक्टिविटी है — आप पार्टिकल विकल्पों को चलाने के लिए सिग्नल का उपयोग कर सकते हैं और कैनवास कुशलतापूर्वक अपडेट होगा:

```tsx
import { loadFull } from "tsparticles";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);
  const [color, setColor] = createSignal("#ff0000");
  const [particleCount, setParticleCount] = createSignal(60);

  onMount(() => {
    initParticlesEngine((engine: Engine) => loadFull(engine)).then(() => setReady(true));
  });

  // विकल्प एक नियमित ऑब्जेकट हैं — इसे Particles कम्पोनेंट के
  // आंतरिक ट्रैकिंग के माध्यम से प्रतिक्रियाशील रूप से पढ़ा जाएगा
  const options = (): ISourceOptions => ({
    fullScreen: { zIndex: -1 },
    background: { color: "#000" },
    particles: {
      color: { value: color() },
      number: { value: particleCount() },
      links: { enable: true, color: color() },
      move: { enable: true },
    },
  });

  return (
    <Show when={ready()}>
      <Particles id="dynamic" options={options()} particlesLoaded={() => {}} />
      <div style={{ position: "fixed", top: 16, right: 16, zIndex: 10 }}>
        <label>
          रंग:
          <input type="color" value={color()} onInput={(e) => setColor(e.currentTarget.value)} />
        </label>
        <label>
          गणना:
          <input
            type="range"
            min={10}
            max={200}
            value={particleCount()}
            onInput={(e) => setParticleCount(Number(e.currentTarget.value))}
          />
          {particleCount()}
        </label>
      </div>
    </Show>
  );
};

export default App;
```

क्योंकि `options` एक फ़ंक्शन है जो सिग्नल तक पहुँचता है, हर बार `color()` या `particleCount()` बदलने पर, `<Particles>` कम्पोनेंट एक नया विकल्प ऑब्जेकट प्राप्त करता है और मौजूदा कैनवास पर केवल बदली हुई प्रॉपर्टी लागू करता है।

## कस्टम ओवरराइड के साथ प्रीसेट

एक प्रीसेट लोड करें, फिर एक अनुकूलित प्रभाव के लिए कस्टम ओवरराइड मर्ज करें:

```tsx
import { loadSnowPreset } from "@tsparticles/preset-snow";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);

  onMount(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSnowPreset(engine);
    }).then(() => setReady(true));
  });

  const options: ISourceOptions = {
    preset: "snow",
    fullScreen: { zIndex: -1 },
    background: { color: "#0d0d2b" },
    particles: {
      // बर्फ के रंग को नीला करने के लिए ओवरराइड करें
      color: { value: "#88ccff" },
      // बर्फ के टुकड़ों की संख्या बढ़ाएँ
      number: { value: 300 },
    },
  };

  return (
    <Show when={ready()}>
      <Particles id="custom-snow" options={options} />
    </Show>
  );
};

export default App;
```

प्रीसेट प्रत्येक विकल्प के लिए डिफ़ॉल्ट मान प्रदान करता है, और आपके ओवरराइड शीर्ष पर मर्ज हो जाते हैं — आपको केवल उन प्रॉपर्टी को निर्दिष्ट करने की आवश्यकता है जिन्हें आप बदलना चाहते हैं।


## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## समस्या निवारण

| लक्षण                          | कारण                                    | समाधान                                                                           |
| ------------------------------ | --------------------------------------- | -------------------------------------------------------------------------------- |
| खाली DOM एलिमेंट               | रेंडर से पहले इंजन आरंभ नहीं हुआ        | `<Particles>` को `<Show when={initialized()}>` में लपेटें                        |
| कोई पार्टिकल्स दिखाई नहीं देते | `move.enable` या `number.value` गायब है | सुनिश्चित करें `particles.move.enable: true` और `particles.number.value > 0`     |
| कैनवास सामग्री के पीछे         | fullScreen में `zIndex` गायब है         | `fullScreen: { zIndex: -1 }` का उपयोग करें                                       |
| विकल्प परिवर्तन परिलक्षित नहीं | ऑब्जेकट संदर्भ नहीं बदल रहा             | विकल्पों को फ़ंक्शन या स्टोर में लपेटें; स्थिर ऑब्जेकट से बचें                   |
| इंजन नहीं मिला                 | `loadFull` या `loadSlim` आयात गायब      | `tsparticles` या `@tsparticles/slim` इंस्टॉल करें और `loadFull(engine)` कॉल करें |

## अगले कदम

- उपयोग के लिए तैयार कॉन्फ़िगरेशन के लिए [कॉन्फ़िग प्लेग्राउंड](/playground/configs) देखें।
- पैरामीटर की पूरी सूची के लिए [विकल्प संदर्भ](/options/) पढ़ें।
- GitHub पर रैपर आंतरिक के लिए [SolidJS स्रोत](https://github.com/tsparticles/solid) देखें।
