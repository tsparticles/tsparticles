---
title: Svelte इंटीग्रेशन
description: "@tsparticles/svelte का उपयोग करके Svelte और SvelteKit एप्लिकेशन में tsParticles को एकीकृत करने के लिए चरण-दर-चरण मार्गदर्शिका।"
---

# Svelte इंटीग्रेशन

`@tsparticles/svelte` पैकेज tsParticles के लिए एक देशी Svelte कम्पोनेंट प्रदान करता है। यह मार्गदर्शिका Svelte (Vite के साथ) और SvelteKit को कवर करती है, जिसमें रिएक्टिव विकल्प, इवेंट हैंडलिंग और एकाधिक इंस्टेंस शामिल हैं।

---

## इंस्टॉलेशन

```bash
npm install @tsparticles/svelte @tsparticles/engine
```

पूर्ण बंडल या प्रीसेट के लिए:

```bash
npm install tsparticles
npm install @tsparticles/preset-snow
npm install @tsparticles/preset-stars
npm install @tsparticles/preset-confetti
npm install @tsparticles/preset-fireworks
```

---

## मूल उपयोग

```svelte
<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import { loadFull } from "tsparticles";
  import type { Engine, ISourceOptions } from "@tsparticles/engine";

  let engineInitialised = false;

  const particlesInit = async (engine: Engine): Promise<void> => {
    await loadFull(engine);
    engineInitialised = true;
  };

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
        outModes: "out",
      },
    },
  };
</script>

<Particles
  id="tsparticles"
  options={options}
  on:init={particlesInit}
/>
```

---

## इंजन आरंभीकरण

अपने ऐप को आवश्यक प्लगइन और प्रीसेट लोड करने के लिए एक `on:init` इवेंट हैंडलर पास करें:

```svelte
<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import { loadFull } from "tsparticles";
  import type { Engine } from "@tsparticles/engine";

  const handleInit = async (event: CustomEvent<Engine>) => {
    const engine = event.detail;
    await loadFull(engine);
  };
</script>

<Particles
  id="tsparticles"
  options={options}
  on:init={handleInit}
/>
```

वैकल्पिक रूप से, माउंट करने से पहले `initParticlesEngine` उपयोगिता का उपयोग करें:

```svelte
<script lang="ts">
  import Particles, { initParticlesEngine } from "@tsparticles/svelte";
  import { loadFull } from "tsparticles";
  import { onMount } from "svelte";

  let ready = false;

  onMount(async () => {
    await initParticlesEngine(async (engine) => {
      await loadFull(engine);
    });
    ready = true;
  });
</script>

{#if ready}
  <Particles id="tsparticles" options={options} />
{/if}
```

---

## बर्फ प्रभाव

```bash
npm install @tsparticles/preset-snow
```

```svelte
<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import { loadSnowPreset } from "@tsparticles/preset-snow";
  import type { Engine, ISourceOptions } from "@tsparticles/engine";

  const handleInit = async (event: CustomEvent<Engine>) => {
    await loadSnowPreset(event.detail);
  };

  const options: ISourceOptions = {
    preset: "snow",
    background: {
      color: "#1a1a2e",
    },
  };
</script>

<Particles
  id="snow"
  {options}
  on:init={handleInit}
/>
```

अतिरिक्त विकल्पों को मर्ज करके प्रीसेट व्यवहार को अनुकूलित करें:

```svelte
<script lang="ts">
  const options: ISourceOptions = {
    preset: "snow",
    background: { color: "#0f0f23" },
    particles: {
      move: {
        speed: 1.5,  // धीमी बर्फबारी
      },
      opacity: {
        value: 0.8,  // अधिक दृश्यमान बर्फ के टुकड़े
      },
    },
  };
</script>
```

---

## तारे प्रभाव

```bash
npm install @tsparticles/preset-stars
```

```svelte
<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import { loadStarsPreset } from "@tsparticles/preset-stars";
  import type { Engine, ISourceOptions } from "@tsparticles/engine";

  const handleInit = async (event: CustomEvent<Engine>) => {
    await loadStarsPreset(event.detail);
  };

  const options: ISourceOptions = {
    preset: "stars",
    background: {
      color: "#000000",
    },
  };
</script>

<Particles
  id="stars"
  {options}
  on:init={handleInit}
/>
```

---

## इंटरैक्टिव पार्टिकल्स

माउस होवर और क्लिक इंटरैक्टिविटी जोड़ें:

```svelte
<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import { loadFull } from "tsparticles";
  import type { Engine, ISourceOptions } from "@tsparticles/engine";

  const handleInit = async (event: CustomEvent<Engine>) => {
    await loadFull(event.detail);
  };

  const options: ISourceOptions = {
    background: {
      color: "#0d0d0d",
    },
    particles: {
      number: { value: 100 },
      color: { value: "#00d8ff" },
      shape: { type: "circle" },
      opacity: { value: 0.6 },
      size: { value: { min: 1, max: 4 } },
      links: {
        enable: true,
        distance: 120,
        color: "#00d8ff",
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
          links: { opacity: 0.5 },
        },
        push: {
          quantity: 4,
        },
      },
    },
  };
</script>

<Particles
  id="interactive"
  {options}
  on:init={handleInit}
/>
```

---

## इवेंट हैंडलिंग

```svelte
<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import { loadFull } from "tsparticles";
  import type { Container, Engine } from "@tsparticles/engine";

  let container: Container;

  const handleInit = async (event: CustomEvent<Engine>) => {
    await loadFull(event.detail);
  };

  const handleLoaded = (event: CustomEvent<Container>) => {
    container = event.detail;
    console.log("कंटेनर लोड हुआ", container);
  };

  const pause = () => container?.pause();
  const resume = () => container?.play();
  const destroy = () => container?.destroy();
</script>

<div>
  <button on:click={pause}>रोकें</button>
  <button on:click={resume}>पुनरारंभ</button>
  <button on:click={destroy}>नष्ट करें</button>
</div>

<Particles
  id="tsparticles"
  options={options}
  on:init={handleInit}
  on:particlesLoaded={handleLoaded}
/>
```

| इवेंट                | विवरण       | फायर होता है                      |
| -------------------- | ----------- | --------------------------------- |
| `on:init`            | `Engine`    | इंजन आरंभ होने के बाद             |
| `on:particlesLoaded` | `Container` | कंटेनर पूरी तरह तैयार होने के बाद |

---

## टाइपस्क्रिप्ट उदाहरण

पूर्ण टाइप किया गया कम्पोनेंट:

```svelte
<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import { loadFull } from "tsparticles";
  import type {
    Container,
    Engine,
    ISourceOptions,
  } from "@tsparticles/engine";

  let particlesContainer: Container | undefined;

  const options: ISourceOptions = {
    background: {
      color: "#1e1e2e",
    },
    fpsLimit: 60,
    particles: {
      color: {
        value: "#cdd6f4",
      },
      links: {
        color: "#cdd6f4",
        distance: 150,
        enable: true,
        opacity: 0.3,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1.5,
      },
      number: {
        value: 60,
      },
      opacity: {
        value: 0.6,
      },
      size: {
        value: { min: 1, max: 3 },
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
    detectRetina: true,
  };

  const handleInit = async (event: CustomEvent<Engine>) => {
    await loadFull(event.detail);
  };

  const handleLoaded = (event: CustomEvent<Container>) => {
    particlesContainer = event.detail;
  };
</script>

<Particles
  id="tsparticles"
  {options}
  on:init={handleInit}
  on:particlesLoaded={handleLoaded}
/>
```

---

## डायनामिक विकल्प

रिएक्टिव विकल्प इंस्टेंस को पुनः बनाए बिना पार्टिकल्स को अपडेट करते हैं:

```svelte
<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import { loadFull } from "tsparticles";
  import type { Engine, ISourceOptions } from "@tsparticles/engine";

  let color = "#ff0000";

  const handleInit = async (event: CustomEvent<Engine>) => {
    await loadFull(event.detail);
  };

  $: options = {
    background: {
      color: "#000000",
    },
    particles: {
      color: {
        value: color,
      },
      links: {
        color: color,
        enable: true,
        distance: 150,
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
  } satisfies ISourceOptions;
</script>

<div>
  <label>
    पार्टिकल रंग:
    <input type="color" bind:value={color} />
  </label>
</div>

<Particles
  id="dynamic"
  {options}
  on:init={handleInit}
/>
```

`$:` प्रतिक्रियाशील घोषणा हर बार `color` बदलने पर `options` की पुनर्गणना करती है, और `Particles` कम्पोनेंट स्वचालित रूप से नया कॉन्फ़िगरेशन लेता है।

---

## एकाधिक इंस्टेंस

एक ही पेज पर कई स्वतंत्र पार्टिकल सिस्टम रेंडर करें:

```svelte
<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import { loadFull } from "tsparticles";
  import type { Engine, ISourceOptions } from "@tsparticles/engine";

  const handleInit = async (event: CustomEvent<Engine>) => {
    await loadFull(event.detail);
  };

  const fireOptions: ISourceOptions = {
    background: { color: "#1a0000" },
    particles: {
      color: { value: "#ff4500" },
      number: { value: 40 },
      move: { enable: true, speed: 1 },
      size: { value: { min: 2, max: 6 } },
      opacity: { value: 0.8 },
    },
  };

  const waterOptions: ISourceOptions = {
    background: { color: "#000d1a" },
    particles: {
      color: { value: "#00bfff" },
      number: { value: 60 },
      move: { enable: true, speed: 0.5, direction: "top" },
      size: { value: { min: 1, max: 3 } },
      opacity: { value: 0.5 },
    },
  };
</script>

<div style="display: grid; grid-template-columns: 1fr 1fr; height: 100vh;">
  <div style="position: relative;">
    <Particles id="fire" options={fireOptions} on:init={handleInit} />
  </div>
  <div style="position: relative;">
    <Particles id="water" options={waterOptions} on:init={handleInit} />
  </div>
</div>
```

प्रत्येक `<Particles>` कम्पोनेंट को अपना स्वयं का `id`, कैनवास और इंजन संदर्भ मिलता है।

---

## SvelteKit उपयोग

SvelteKit में, कैनवास को ब्राउज़र वातावरण की आवश्यकता है। कम्पोनेंट के लिए SSR अक्षम करें:

```svelte
<script lang="ts">
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  let Component: typeof import("@tsparticles/svelte").default;

  onMount(async () => {
    if (browser) {
      const module = await import("@tsparticles/svelte");
      Component = module.default;
    }
  });
</script>

{#if Component}
  <svelte:component this={Component} id="tsparticles" options={options} />
{/if}
```

या आयात को क्लाइंट-ओनली कम्पोनेंट में लपेटें। SvelteKit 2+ के लिए, आप `vite-plugin-svelte` SSR बहिष्करण का भी उपयोग कर सकते हैं।

---

## API संदर्भ

| प्रॉप     | प्रकार           | डिफ़ॉल्ट        | विवरण                                                                     |
| --------- | ---------------- | --------------- | ------------------------------------------------------------------------- |
| `id`      | `string`         | `"tsparticles"` | कैनवास एलिमेंट आईडी                                                       |
| `options` | `ISourceOptions` | `{}`            | पार्टिकल कॉन्फ़िगरेशन ऑब्जेकट                                             |
| `url`     | `string`         | —               | दूरस्थ JSON कॉन्फ़िग का URL                                               |
| `theme`   | `string`         | —               | Theme name (requires `@tsparticles/plugin-themes`; safe no-op otherwise). |

| इवेंट                | विवरण       | विवरण                                                                    |
| -------------------- | ----------- | ------------------------------------------------------------------------ |
| `on:init`            | `Engine`    | जब इंजन आरंभ होता है तब फायर होता है (प्लगइन लोड करने के लिए उपयोग करें) |
| `on:particlesLoaded` | `Container` | जब कंटेनर पूरी तरह तैयार होता है तब फायर होता है                         |

---

## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## समस्या निवारण

- **कैनवास दिखाई नहीं देता** — सुनिश्चित करें कि पैरेंट कंटेनर में स्पष्ट आयाम हों (`height: 100%`, `height: 100vh`, या एक निश्चित पिक्सेल मान)।
- **`loadFull is not a function`** — सत्यापित करें कि `tsparticles` इंस्टॉल है और आप `tsparticles` से `loadFull` आयात कर रहे हैं (`@tsparticles/engine` से नहीं)।
- **रिएक्टिविटी काम नहीं कर रही** — सुनिश्चित करें कि `options` एक प्रतिक्रियाशील चर है (`$:` या `let` एक प्रतिक्रियाशील स्रोत से बंधा)। सादे `const` मान अपडेट नहीं होंगे।
- **SvelteKit खाली स्क्रीन** — `@tsparticles/svelte` को डायनामिक रूप से आयात करें या ऊपर SvelteKit अनुभाग में दिखाए अनुसार `browser` गार्ड का उपयोग करें।
- **`event.detail` के लिए टाइपस्क्रिप्ट त्रुटियाँ** — इवेंट हैंडलर के लिए `CustomEvent<Engine>` और `CustomEvent<Container>` प्रकार का उपयोग करें।
