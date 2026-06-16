---
title: React गाइड
description: "@tsparticles/react का उपयोग करके React के साथ tsParticles को एकीकृत करने के लिए पूर्ण मार्गदर्शिका।"
---

# React गाइड

## विषय सूची

1. [इंस्टॉलेशन](#installation)
2. [मूल उपयोग](#basic-usage)
3. [कॉन्फ़ेटी प्रभाव](#confetti-effect)
4. [आतिशबाज़ी प्रभाव](#fireworks-effect)
5. [बर्फ प्रभाव](#snow-effect)
6. [इंटरैक्टिव लिंक](#interactive-links)
7. [थीम स्विचिंग](#theme-switching)
8. [ParticlesProvider](#particlesprovider)
9. [प्रदर्शन अनुकूलन](#performance-optimization)
10. [कस्टम कॉन्फ़िगरेशन](#custom-configuration)

---

## इंस्टॉलेशन

```bash
npm install @tsparticles/react tsparticles
```

या Yarn के साथ:

```bash
yarn add @tsparticles/react tsparticles
```

`@tsparticles/react` आधिकारिक React रैपर है। `tsparticles` पैकेज कोर इंजन है।

---

## मूल उपयोग

सबसे सरल सेटअप: एक विकल्प ऑब्जेकट के साथ `<Particles />` कम्पोनेंट रेंडर करें।

```jsx
import { useCallback } from "react";
import Particles from "@tsparticles/react";

export default function App() {
  const particlesLoaded = useCallback(async (container) => {
    console.log("पार्टिकल्स कंटेनर लोड हुआ", container);
  }, []);

  const options = {
    fpsLimit: 120,
    particles: {
      number: { value: 80 },
      color: { value: "#00d4ff" },
      shape: { type: "circle" },
      opacity: { value: 0.6 },
      size: { value: { min: 2, max: 5 } },
      move: {
        enable: true,
        speed: 2,
        outModes: { default: "bounce" },
      },
    },
    background: { color: "#0d1117" },
  };

  return <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />;
}
```

**महत्वपूर्ण**: `<Particles />` कम्पोनेंट को पहले इंजन आरंभ होने की आवश्यकता है। कम्पोनेंट रेंडर करने से पहले अपने प्रीसेट लोड करने के लिए `@tsparticles/react` से `initParticlesEngine` या `<ParticlesProvider>` का उपयोग करें।

---

## कॉन्फ़ेटी प्रभाव

कॉन्फ़ेटी प्रीसेट का उपयोग करके एक कॉन्फ़ेटी विस्फोट रेंडर करें।

```jsx
import Particles from "@tsparticles/react";

export default function Confetti() {
  const options = {
    preset: "confetti",
    fullScreen: { enable: true, zIndex: -1 },
    confetti: {
      colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"],
      particleCount: 150,
      spread: 70,
      origin: { x: 0.5, y: 0.5 },
    },
  };

  return <Particles id="confetti" options={options} />;
}
```

सुनिश्चित करें कि आपने कॉन्फ़ेटी प्रीसेट लोड किया है:

```bash
npm install @tsparticles/preset-confetti
```

फिर इसे अपने ऐप एंट्री पॉइंट में पंजीकृत करें:

```jsx
import { initParticlesEngine } from "@tsparticles/react";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

initParticlesEngine(async (engine) => {
  await loadConfettiPreset(engine);
});
```

---

## आतिशबाज़ी प्रभाव

एक पूर्ण-स्क्रीन आतिशबाजी प्रदर्शन।

```jsx
import { useCallback, useMemo } from "react";
import Particles from "@tsparticles/react";

export default function Fireworks() {
  const particlesLoaded = useCallback(async (container) => {
    console.log("आतिशबाज़ी लोड हुई", container);
  }, []);

  const options = useMemo(
    () => ({
      preset: "fireworks",
      fullScreen: { enable: true, zIndex: -1 },
      fireworks: {
        background: "#000000",
        brightness: 100,
        colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"],
        intensity: 30,
        life: { min: 4, max: 8 },
        traces: 20,
        explosion: { min: 30, max: 60 },
      },
    }),
    [],
  );

  return <Particles id="fireworks" particlesLoaded={particlesLoaded} options={options} />;
}
```

प्रीसेट इंस्टॉल करें:

```bash
npm install @tsparticles/preset-fireworks
```

---

## बर्फ प्रभाव

बर्फ प्रीसेट का उपयोग करके हल्की गिरती बर्फ।

```jsx
import { useCallback, useMemo } from "react";
import Particles from "@tsparticles/react";

export default function Snow() {
  const particlesLoaded = useCallback(async (container) => {
    console.log("बर्फ लोड हुई", container);
  }, []);

  const options = useMemo(
    () => ({
      preset: "snow",
      fullScreen: { enable: true, zIndex: -1 },
      snow: {
        color: "#ffffff",
        opacity: { min: 0.3, max: 0.9 },
        size: { min: 1, max: 4 },
        speed: { min: 0.5, max: 2 },
        wobble: true,
      },
    }),
    [],
  );

  return <Particles id="snow" particlesLoaded={particlesLoaded} options={options} />;
}
```

प्रीसेट इंस्टॉल करें:

```bash
npm install @tsparticles/preset-snow
```

---

## इंटरैक्टिव लिंक

माउस होवर ग्रैब और क्लिक पुश के साथ एक जुड़ा-नोड्स नेटवर्क।

```jsx
import { useCallback, useMemo } from "react";
import Particles from "@tsparticles/react";

export default function InteractiveLinks() {
  const particlesLoaded = useCallback(async (container) => {
    console.log("इंटरैक्टिव लिंक लोड हुए", container);
  }, []);

  const options = useMemo(
    () => ({
      fpsLimit: 60,
      particles: {
        number: { value: 80, density: { enable: true } },
        color: { value: "#00d4ff" },
        shape: { type: "circle" },
        opacity: { value: 0.6 },
        size: { value: { min: 1, max: 4 } },
        links: {
          enable: true,
          distance: 150,
          color: "#00d4ff",
          opacity: 0.4,
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
          grab: { distance: 180, links: { opacity: 0.8 } },
          push: { quantity: 4 },
        },
      },
      background: { color: "#0d1117" },
    }),
    [],
  );

  return <Particles id="interactive-links" particlesLoaded={particlesLoaded} options={options} />;
}
```

---

## थीम स्विचिंग

एकाधिक थीम परिभाषित करें और एक बटन क्लिक के साथ उनके बीच स्विच करें।

```jsx
import { useCallback, useMemo, useRef, useState } from "react";
import Particles from "@tsparticles/react";

export default function ThemeSwitcher() {
  const containerRef = useRef(null);
  const [currentTheme, setCurrentTheme] = useState("dark");

  const particlesLoaded = useCallback(async (container) => {
    containerRef.current = container;
  }, []);

  const options = useMemo(
    () => ({
      fpsLimit: 60,
      particles: {
        number: { value: 60 },
        color: { value: "#00d4ff" },
        shape: { type: "circle" },
        opacity: { value: 0.6 },
        size: { value: { min: 2, max: 5 } },
        links: { enable: true, distance: 150, color: "#00d4ff", opacity: 0.3 },
        move: { enable: true, speed: 1.5, outModes: { default: "bounce" } },
      },
      background: { color: "#0d1117" },
      themes: [
        {
          name: "dark",
          default: { value: true },
          options: {
            background: { color: "#0d1117" },
            particles: { color: { value: "#00d4ff" }, links: { color: "#00d4ff" } },
          },
        },
        {
          name: "light",
          options: {
            background: { color: "#f5f5f5" },
            particles: { color: { value: "#e74c3c" }, links: { color: "#333333" } },
          },
        },
        {
          name: "forest",
          options: {
            background: { color: "#1a3a1a" },
            particles: { color: { value: "#7ec850" }, links: { color: "#7ec850" } },
          },
        },
      ],
    }),
    [],
  );

  const switchTheme = useCallback((theme) => {
    setCurrentTheme(theme);
    if (containerRef.current) {
      containerRef.current.loadTheme(theme);
    }
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <Particles id="theme-switcher" particlesLoaded={particlesLoaded} options={options} />
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          gap: 8,
        }}
      >
        <button onClick={() => switchTheme("dark")} style={btnStyle(currentTheme === "dark")}>
          गहरा
        </button>
        <button onClick={() => switchTheme("light")} style={btnStyle(currentTheme === "light")}>
          हल्का
        </button>
        <button onClick={() => switchTheme("forest")} style={btnStyle(currentTheme === "forest")}>
          वन
        </button>
      </div>
    </div>
  );
}

const btnStyle = (active) => ({
  padding: "8px 16px",
  border: "none",
  borderRadius: 6,
  background: active ? "#333" : "#666",
  color: "#fff",
  cursor: "pointer",
});
```

---

## ParticlesProvider

एप रूट पर एक बार इंजन आरंभ करने के लिए `ParticlesProvider` का उपयोग करें। यह अनुशंसित दृष्टिकोण है जब आपके पास कई पार्टिकल कम्पोनेंट हों या कस्टम प्रीसेट का उपयोग करें।

```jsx
// App.jsx
import { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Home from "./Home";

const engineInit = async (engine) => {
  await loadSlim(engine);
  // यहाँ अतिरिक्त प्रीसेट लोड करें:
  // await loadConfettiPreset(engine);
  // await loadFireworksPreset(engine);
  // await loadSnowPreset(engine);
};

export default function App() {
  return (
    <ParticlesProvider load={engineInit}>
      <Home />
    </ParticlesProvider>
  );
}
```

```jsx
// Home.jsx
import Particles from "@tsparticles/react";

export default function Home() {
  return (
    <Particles
      id="tsparticles"
      options={{
        particles: {
          number: { value: 50 },
          color: { value: "#ff6b6b" },
          shape: { type: "circle" },
          opacity: { value: 0.7 },
          size: { value: { min: 2, max: 6 } },
          move: { enable: true, speed: 1, outModes: { default: "bounce" } },
        },
        background: { color: "#1a1a2e" },
      }}
    />
  );
}
```

अपने ट्री को `ParticlesProvider` से लपेटने पर, हर चाइल्ड `<Particles />` कम्पोनेंट एक ही इंजन इंस्टेंस प्राप्त करता है। यह हर माउंट पर इंजन को पुनः आरंभ करने से बचाता है।

---

## प्रदर्शन अनुकूलन

अनावश्यक पुनः रेंडर को रोकने के लिए हमेशा कॉलबैक और विकल्पों को मेमोइज़ करें।

```jsx
import { useCallback, useMemo, useState } from "react";
import Particles from "@tsparticles/react";

export default function PerformanceExample() {
  const [visible, setVisible] = useState(true);

  // कॉलबैक मेमोइज़ करें — रेंडर के बीच स्थिर संदर्भ
  const particlesLoaded = useCallback(async (container) => {
    // प्रति कंटेनर माउंट एक बार कॉल होता है
    console.log("कंटेनर तैयार", container?.id);
  }, []);

  // विकल्प ऑब्जेकट मेमोइज़ करें — केवल डिपेंडेंसी बदलने पर पुनर्गणना
  const options = useMemo(
    () => ({
      fpsLimit: 60,
      particles: {
        number: { value: 100, density: { enable: true } },
        color: { value: ["#ff6b6b", "#feca57", "#48dbfb"] },
        shape: { type: "circle" },
        opacity: { value: { min: 0.3, max: 0.7 } },
        size: { value: { min: 2, max: 5 } },
        links: {
          enable: true,
          distance: 120,
          color: "random",
          opacity: 0.3,
        },
        move: {
          enable: true,
          speed: 1,
          outModes: { default: "bounce" },
        },
      },
      background: { color: "#0d1117" },
    }),
    [],
  );

  // कम-शक्ति वाले उपकरणों पर कैनवास रिज़ॉल्यूशन कम करें
  const responsiveOptions = useMemo(
    () => ({
      ...options,
      detectRetina: window.devicePixelRatio <= 2,
      fpsLimit: window.innerWidth < 768 ? 30 : 60,
    }),
    [options],
  );

  return (
    <div>
      <button onClick={() => setVisible((v) => !v)}>{visible ? "छिपाएँ" : "दिखाएँ"} पार्टिकल्स</button>
      {visible && <Particles id="perf-particles" particlesLoaded={particlesLoaded} options={responsiveOptions} />}
    </div>
  );
}
```

**मुख्य सुझाव**:

- हमेशा `options` ऑब्जेकट के लिए `useMemo` का उपयोग करें।
- हमेशा `particlesLoaded` हैंडलर के लिए `useCallback` का उपयोग करें।
- मोबाइल पर `fpsLimit` कम करें।
- 2x से अधिक पिक्सेल अनुपात वाले उपकरणों पर कैनवास आकार आधा करने के लिए `detectRetina: false` सेट करें।
- जब यह ऑफ-स्क्रीन हो तो सशर्त रूप से `<Particles />` अनमाउंट करें।

---


## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## कस्टम कॉन्फ़िगरेशन

एकाधिक आकार, इंटरैक्टिविटी, थीम और ग्रेडिएंट पृष्ठभूमि को मिलाकर एक पूर्ण कस्टम उदाहरण।

```jsx
import { useCallback, useMemo } from "react";
import Particles from "@tsparticles/react";

export default function CustomConfig() {
  const particlesLoaded = useCallback(async (container) => {
    console.log("कस्टम कॉन्फ़िग लोड हुआ", container);
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: { enable: true, zIndex: 0 },
      fpsLimit: 60,
      particles: {
        number: { value: 60, density: { enable: true, width: 800, height: 800 } },
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
      themes: [
        {
          name: "light",
          default: { value: false },
          options: {
            background: { color: "#f0f0f5" },
            particles: {
              color: { value: ["#e74c3c", "#2ecc71", "#3498db", "#f1c40f"] },
              links: { color: "#333333", opacity: 0.2 },
              opacity: { value: { min: 0.5, max: 0.9 } },
            },
          },
        },
      ],
    }),
    [],
  );

  return <Particles id="custom-config" particlesLoaded={particlesLoaded} options={options} />;
}
```

---

आपने अब React में tsParticles का उपयोग करने के मुख्य पैटर्न को कवर कर लिया है। प्रत्येक उदाहरण आत्मनिर्भर है और एक कम्पोनेंट फ़ाइल में डालने के लिए तैयार है।
