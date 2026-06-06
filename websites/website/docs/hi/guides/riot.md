---
title: Riot गाइड
description: Riot.js कम्पोनेंट के साथ tsParticles को एकीकृत करने के लिए पूर्ण मार्गदर्शिका।
---

# Riot गाइड

## विषय सूची

1. [इंस्टॉलेशन](#installation)
2. [इंजन आरंभीकरण](#engine-initialization)
3. [मूल उपयोग](#basic-usage)
4. [सशर्त रेंडरिंग](#conditional-rendering)
5. [प्रीसेट उपयोग](#preset-usage)
6. [कस्टम कॉन्फ़िगरेशन](#custom-configuration)
7. [पूर्ण कम्पोनेंट](#full-component)

---

## इंस्टॉलेशन

Riot रैपर और tsParticles इंजन को npm के माध्यम से इंस्टॉल करें:

```bash
npm install @tsparticles/riot tsparticles
```

त्वरित सेटअप के लिए वैकल्पिक रूप से प्रीसेट कॉन्फ़िग इंस्टॉल करें:

```bash
npm install @tsparticles/configs
npm install @tsparticles/slim
```

---

## इंजन आरंभीकरण

Riot रैपर एक `initParticlesEngine` फ़ंक्शन निर्यात करता है। पार्टिकल्स कम्पोनेंट रेंडर होने से पहले इंजन तैयार करने के लिए इसे अपने कम्पोनेंट के `onBeforeMount` लाइफसाइकिल हुक में कॉल करें।

```html
<my-component>
  <script>
    import { initParticlesEngine } from "@tsparticles/riot";
    import { loadSlim } from "@tsparticles/slim";

    export default {
      onBeforeMount() {
        if (typeof window !== "undefined") {
          initParticlesEngine(async (engine) => {
            await loadSlim(engine);
          });
        }
      },
    };
  </script>
</my-component>
```

इंजन एक बार आरंभ होता है और आपके ऐप में सभी `<riot-particles>` इंस्टेंस के बीच साझा होता है।

---

## मूल उपयोग

इंजन आरंभ करने के बाद, अपने टेम्पलेट में `<riot-particles>` कम्पोनेंट का उपयोग करें। कॉन्फ़िगरेशन को JSON-स्ट्रिंगिफ़ाइड ऑब्जेकट या अपने कम्पोनेंट पर एक प्रॉपर्टी के संदर्भ के रूप में पास करें।

```html
<my-component>
  <riot-particles id="tsparticles" options="{particlesConfig}" />

  <script>
    import RiotParticles, { initParticlesEngine } from "@tsparticles/riot";
    import { loadSlim } from "@tsparticles/slim";

    export default {
      particlesConfig: {
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
      },
      onBeforeMount() {
        if (typeof window !== "undefined") {
          initParticlesEngine(async (engine) => {
            await loadSlim(engine);
          });
        }
      },
    };
  </script>
</my-component>
```

---

## सशर्त रेंडरिंग

पार्टिकल्स कम्पोनेंट के रेंडरिंग में तब तक देरी करने के लिए एक स्थिति प्रॉपर्टी के साथ Riot के `if={}` निर्देश का उपयोग करें जब तक इंजन आरंभीकरण पूरा न हो जाए। यह लेआउट शिफ्ट से बचाता है और सुनिश्चित करता है कि कम्पोनेंट को एक तैयार इंजन प्राप्त हो।

```html
<my-component>
  <riot-particles if="{state.particlesInitialized}" id="tsparticles" options="{particlesConfig}" />

  <script>
    import RiotParticles, { initParticlesEngine } from "@tsparticles/riot";
    import { loadSlim } from "@tsparticles/slim";

    export default {
      particlesConfig: {
        particles: {
          number: { value: 50 },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: { value: 0.6 },
          size: { value: { min: 1, max: 4 } },
          move: { enable: true, speed: 1, outModes: { default: "bounce" } },
        },
        background: { color: "#1a1a2e" },
      },
      onBeforeMount() {
        this.state.particlesInitialized = false;
        if (typeof window !== "undefined") {
          initParticlesEngine(async (engine) => {
            await loadSlim(engine);
          }).then(() => {
            this.update({ particlesInitialized: true });
          });
        }
      },
    };
  </script>
</my-component>
```

`this.update()` कॉल करने से एक पुनः रेंडर ट्रिगर होता है ताकि प्रॉमिस हल होने पर `<riot-particles>` टैग दिखाई दे।

---

## प्रीसेट उपयोग

`@tsparticles/configs` पैकेज कॉन्फ़ेटी, आतिशबाज़ी, बर्फ और तारे जैसे सामान्य प्रभावों के लिए पूर्व-निर्मित कॉन्फ़िगरेशन प्रदान करता है। उन्हें सीधे अपने विकल्प ऑब्जेकट के रूप में उपयोग करें।

```html
<my-component>
  <riot-particles if="{state.particlesInitialized}" id="tsparticles" options="{particlesConfig}" />

  <script>
    import RiotParticles, { initParticlesEngine } from "@tsparticles/riot";
    import { loadFull } from "tsparticles";
    import configs from "@tsparticles/configs";

    export default {
      particlesConfig: configs.basic,
      onBeforeMount() {
        this.state.particlesInitialized = false;
        if (typeof window !== "undefined") {
          initParticlesEngine(async (engine) => {
            await loadFull(engine);
          }).then(() => {
            this.update({ particlesInitialized: true });
          });
        }
      },
    };
  </script>
</my-component>
```

उपलब्ध प्रीसेट में `basic`, `confetti`, `fireworks`, `snow`, `stars`, और अधिक शामिल हैं। प्रत्येक प्रीसेट को इंजन कॉलबैक में अपने संबंधित प्रीसेट पैकेज को लोड करने की आवश्यकता होती है। उदाहरण के लिए, `configs.fireworks` को `loadFireworksPreset` की आवश्यकता है।

---

## कस्टम कॉन्फ़िगरेशन

इंटरैक्टिविटी, एकाधिक आकार और उन्नत एनीमेशन विकल्पों के साथ एक कस्टम कॉन्फ़िगरेशन बनाएँ।

```html
<my-component>
  <riot-particles if="{state.particlesInitialized}" id="tsparticles" options="{particlesConfig}" />

  <script>
    import RiotParticles, { initParticlesEngine } from "@tsparticles/riot";
    import { loadSlim } from "@tsparticles/slim";

    export default {
      particlesConfig: {
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
      },
      onBeforeMount() {
        this.state.particlesInitialized = false;
        if (typeof window !== "undefined") {
          initParticlesEngine(async (engine) => {
            await loadSlim(engine);
          }).then(() => {
            this.update({ particlesInitialized: true });
          });
        }
      },
    };
  </script>
</my-component>
```

---

## पूर्ण कम्पोनेंट

नीचे एक पूर्ण `.riot` फ़ाइल है जो सब कुछ एक साथ जोड़ती है: `onBeforeMount` में इंजन आरंभीकरण, स्थिति के साथ सशर्त रेंडरिंग, इंटरैक्टिविटी के साथ एक समृद्ध कॉन्फ़िगरेशन, और लोडेड इवेंट के लिए कम्पोनेंट के अंतर्निहित समर्थन के माध्यम से एक `particlesLoaded` कॉलबैक।

```html
<my-component>
  <div class="particles-wrapper">
    <h1>tsParticles + Riot.js</h1>

    {#if state.particlesInitialized}
    <riot-particles id="tsparticles" options="{particlesConfig}" />
    {:else}
    <p>पार्टिकल इंजन लोड हो रहा है...</p>
    {/if}
  </div>

  <script>
    import RiotParticles, { initParticlesEngine } from "@tsparticles/riot";
    import { loadSlim } from "@tsparticles/slim";

    export default {
      state: {
        particlesInitialized: false,
      },
      particlesConfig: {
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
      },
      onBeforeMount() {
        if (typeof window !== "undefined") {
          initParticlesEngine(async (engine) => {
            await loadSlim(engine);
          }).then(() => {
            this.update({ particlesInitialized: true });
          });
        }
      },
    };
  </script>

  <style scoped>
    .particles-wrapper {
      position: relative;
      min-height: 100vh;
    }
    .particles-wrapper h1 {
      position: relative;
      z-index: 1;
      color: #fff;
      text-align: center;
      padding-top: 2rem;
    }
    .particles-wrapper p {
      position: relative;
      z-index: 1;
      color: #aaa;
      text-align: center;
    }
  </style>
</my-component>
```

---

आपके पास अब Riot.js एप्लिकेशन में tsParticles को एकीकृत करने के लिए आवश्यक सब कुछ है। प्रत्येक उदाहरण आत्मनिर्भर है और आपके प्रोजेक्ट में कॉपी करने के लिए तैयार है।
