---
title: Next.js इंटीग्रेशन
description: App Router का उपयोग करके Next.js एप्लिकेशन में tsParticles को एकीकृत करने के लिए चरण-दर-चरण मार्गदर्शिका।
---

# Next.js इंटीग्रेशन

यह मार्गदर्शिका **App Router** (Next.js 13+) का उपयोग करके Next.js प्रोजेक्ट में tsParticles को एकीकृत करने को कवर करती है। लीगेसी Pages Router के लिए, नीचे [लीगेसी Pages Router](#legacy-pages-router) अनुभाग देखें।

## इंस्टॉलेशन

`@tsparticles/react` रैपर और पूर्ण `tsparticles` इंजन (या छोटे बिल्ड के लिए स्लिम बंडल) इंस्टॉल करें:

```bash
npm install @tsparticles/react tsparticles
```

यदि आप छोटा `@tsparticles/slim` बंडल पसंद करते हैं:

```bash
npm install @tsparticles/react @tsparticles/slim
```

## मूल उपयोग (App Router)

Next.js App Router कम्पोनेंट डिफ़ॉल्ट रूप से सर्वर-साइड होते हैं। चूँकि tsParticles को ब्राउज़र `canvas` API की आवश्यकता है, आपको कम्पोनेंट को `"use client"` निर्देश से चिह्नित करना होगा।

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default function ParticlesBackground() {
  const particlesLoaded = useCallback((container?: Container) => {
    console.log("पार्टिकल्स लोड हुए", container);
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { zIndex: -1 },
      background: { color: "#0d47a1" },
      particles: {
        number: { value: 80 },
        links: { enable: true, color: "#ffffff" },
        move: { enable: true },
        size: { value: 3 },
      },
    }),
    [],
  );

  return <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />;
}
```

इसे `components/particles-background.tsx` के रूप में बनाएँ और किसी भी पेज या लेआउट में आयात करें। क्योंकि फ़ाइल `"use client"` से शुरू होती है, यह क्लाइंट पर रेंडर होगी — ठीक वहीं जहाँ tsParticles को होना चाहिए।

## थीम स्विचिंग

वर्तमान थीम स्थिति से विकल्प प्राप्त करके tsParticles को Next.js थीम टॉगल के साथ जोड़ें:

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useMemo, useState, useCallback } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default function ThemeAwareParticles() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  const particlesLoaded = useCallback((_container?: Container) => {}, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { zIndex: -1 },
      background: {
        color: theme === "dark" ? "#000000" : "#ffffff",
      },
      particles: {
        color: { value: theme === "dark" ? "#ffffff" : "#000000" },
        number: { value: 100 },
        links: {
          enable: true,
          color: theme === "dark" ? "#ffffff" : "#000000",
        },
        move: { enable: true },
      },
    }),
    [theme],
  );

  return (
    <>
      <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />
      <button
        onClick={toggleTheme}
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 10,
          padding: "8px 16px",
        }}
      >
        {theme === "dark" ? "हल्का" : "गहरा"} मोड पर स्विच करें
      </button>
    </>
  );
}
```

`options` ऑब्जेकट `useMemo` के माध्यम से हर बार `theme` बदलने पर पुनः बनाया जाता है, इसलिए कैनवास स्वचालित रूप से अपडेट होता है।

## कॉन्फ़ेटी प्रभाव

बटन क्लिक जैसी घटनाओं पर उत्सवपूर्ण कॉन्फ़ेटी ट्रिगर करने के लिए `@tsparticles/preset-confetti` का उपयोग करें:

```bash
npm install @tsparticles/preset-confetti
```

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo, useState } from "react";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";
import type { Container, ISourceOptions, Engine } from "@tsparticles/engine";

export default function ConfettiButton() {
  const [active, setActive] = useState(false);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadConfettiPreset(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container?: Container) => {
      if (active && container) {
        await container.play();
      }
    },
    [active],
  );

  const options: ISourceOptions = useMemo(
    () => ({
      preset: "confetti",
      fullScreen: { zIndex: 1000 },
    }),
    [],
  );

  const handleCelebrate = useCallback(() => {
    setActive(true);
    setTimeout(() => setActive(false), 5000);
  }, []);

  return (
    <>
      {active && <Particles id="confetti" init={particlesInit} particlesLoaded={particlesLoaded} options={options} />}
      <button onClick={handleCelebrate} style={{ position: "fixed", top: 16, left: 16, zIndex: 10 }}>
        जश्न मनाएँ!
      </button>
    </>
  );
}
```

`init` कॉलबैक पार्टिकल्स बनने से पहले कॉन्फ़ेटी प्रीसेट को इंजन में लोड करता है।

## आतिशबाज़ी प्रभाव

इसी तरह, आतिशबाज़ी प्रीसेट एक शानदार आतिशबाजी प्रदर्शन बनाता है:

```bash
npm install @tsparticles/preset-fireworks
```

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo, useRef } from "react";
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";
import type { Container, Engine } from "@tsparticles/engine";

export default function FireworksBackground() {
  const containerRef = useRef<Container | undefined>(undefined);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFireworksPreset(engine);
  }, []);

  const particlesLoaded = useCallback((container?: Container) => {
    containerRef.current = container;
  }, []);

  const options = useMemo(
    () => ({
      preset: "fireworks" as const,
      fullScreen: { zIndex: -1 },
      background: {
        color: "#000",
      },
    }),
    [],
  );

  return <Particles id="fireworks" init={particlesInit} particlesLoaded={particlesLoaded} options={options} />;
}
```

## कंटेनर रेफ के साथ पूर्ण टाइपस्क्रिप्ट उदाहरण

एनीमेशन को प्रोग्रामेटिक रूप से नियंत्रित करने के लिए `Container` इंस्टेंस तक पहुँचें (प्ले, पॉज़, नष्ट करें, इमेज निर्यात करें):

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo, useRef } from "react";
import { loadFull } from "tsparticles";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

export default function ControllableParticles() {
  const containerRef = useRef<Container | undefined>(undefined);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback((container?: Container) => {
    containerRef.current = container;
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { zIndex: -1 },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: { enable: true, mode: "push" },
          onHover: { enable: true, mode: "repulse" },
        },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 100 },
        },
      },
      particles: {
        color: { value: "#ff0000" },
        links: {
          enable: true,
          color: "#ff0000",
          distance: 150,
        },
        move: { enable: true, speed: 2 },
        number: { value: 60 },
        size: { value: { min: 1, max: 5 } },
      },
    }),
    [],
  );

  const handlePause = useCallback(() => {
    containerRef.current?.pause();
  }, []);

  const handlePlay = useCallback(() => {
    containerRef.current?.play();
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Particles id="tsparticles" init={particlesInit} particlesLoaded={particlesLoaded} options={options} />
      <div
        style={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 10,
          display: "flex",
          gap: 8,
        }}
      >
        <button onClick={handlePause}>रोकें</button>
        <button onClick={handlePlay}>चलाएँ</button>
      </div>
    </div>
  );
}
```

मुख्य बिंदु:

- `particlesInit` इंजन सुविधाएँ लोड करता है (प्रति कम्पोनेंट माउंट केवल एक बार चलता है)।
- `particlesLoaded` हर बार फायर होता है जब कंटेनर पूरी तरह से आरंभ हो जाता है।
- `containerRef` `Container` इंस्टेंस रखता है ताकि आप बाद में इसकी विधियाँ कॉल कर सकें।

## प्रदर्शन: useMemo और useCallback

कैनवास के अनावश्यक पुनः रेंडर को रोकने के लिए स्थिर या शायद ही बदलने वाले विकल्पों को हमेशा `useMemo` में और इवेंट हैंडलर को `useCallback` में लपेटें:

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo, useState } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default function PerformanceExample() {
  const [particlesCount, setParticlesCount] = useState(80);

  // स्थिर कॉलबैक — डिप्स बदलने तक पुनः नहीं बनता
  const particlesLoaded = useCallback((container?: Container) => {
    console.log("कंटेनर तैयार", container?.id);
  }, []);

  // स्थिर विकल्प ऑब्जेकट — कैनवास पुनः आरंभीकरण रोकता है
  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { zIndex: -1 },
      particles: {
        number: { value: particlesCount },
        links: { enable: true },
        move: { enable: true },
      },
    }),
    [particlesCount],
  );

  return (
    <div>
      <Particles id="performance-particles" particlesLoaded={particlesLoaded} options={options} />
      <button onClick={() => setParticlesCount((c) => c + 20)}>20 पार्टिकल्स जोड़ें</button>
    </div>
  );
}
```

इन अनुकूलनों के बिना, प्रत्येक पैरेंट री-रेंडर एक नया `options` ऑब्जेकट बनाएगा, जिससे कैनवास पुनः बनाया जाएगा।

## पेज इंटीग्रेशन

पेज सामग्री को प्रभावित किए बिना पेज लेआउट में पार्टिकल पृष्ठभूमि जोड़ें:

```tsx
// app/layout.tsx (सर्वर कम्पोनेंट)
import dynamic from "next/dynamic";

const ParticlesBackground = dynamic(() => import("@/components/particles-background"), { ssr: false });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi">
      <body>
        <ParticlesBackground />
        <main style={{ position: "relative", zIndex: 1 }}>{children}</main>
      </body>
    </html>
  );
}
```

`ssr: false` के साथ `dynamic()` का उपयोग करें ताकि सुनिश्चित हो सके कि कम्पोनेंट सर्वर-साइड रेंडरिंग के दौरान कभी न चले। पार्टिकल कैनवास CSS `z-index` के माध्यम से मुख्य सामग्री के पीछे बैठता है।

## एकाधिक इंस्टेंस

आप एक ही पेज पर कई स्वतंत्र `Particles` कम्पोनेंट रेंडर कर सकते हैं, प्रत्येक अपने स्वयं के कॉन्फ़िगरेशन के साथ:

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";

function ParticlesGallery() {
  const loaded = useCallback((c?: Container) => {}, []);

  const redOptions: ISourceOptions = useMemo(
    () => ({
      fullScreen: false,
      height: 200,
      background: { color: "#1a0000" },
      particles: {
        color: { value: "#ff0000" },
        number: { value: 30 },
        move: { enable: true },
      },
    }),
    [],
  );

  const blueOptions: ISourceOptions = useMemo(
    () => ({
      fullScreen: false,
      height: 200,
      background: { color: "#00001a" },
      particles: {
        color: { value: "#0000ff" },
        number: { value: 30 },
        move: { enable: true },
      },
    }),
    [],
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Particles id="red-canvas" particlesLoaded={loaded} options={redOptions} />
      <Particles id="blue-canvas" particlesLoaded={loaded} options={blueOptions} />
    </div>
  );
}
```

प्रत्येक `Particles` कम्पोनेंट अपने स्वयं के एनीमेशन लूप के साथ एक स्वतंत्र कैनवास बनाता है। `fullScreen: false` सेट करें और प्रत्येक को एक निश्चित ऊँचाई दें ताकि वे दस्तावेज़ प्रवाह में सह-अस्तित्व में रह सकें।

## लीगेसी Pages Router

यदि आप Next.js के **Pages Router** (`pages/` निर्देशिका) का उपयोग कर रहे हैं, तो दृष्टिकोण समान है लेकिन `"use client"` निर्देश के बिना। इसके बजाय, आप पेज कम्पोनेंट में एक डायनामिक इम्पोर्ट का उपयोग कर सकते हैं:

```tsx
// pages/index.tsx
import dynamic from "next/dynamic";
import type { NextPage } from "next";

const ParticlesComponent = dynamic(() => import("../components/particles-component"), { ssr: false });

const Home: NextPage = () => {
  return (
    <div>
      <ParticlesComponent />
      <h1>स्वागत है</h1>
    </div>
  );
};

export default Home;
```

कम्पोनेंट स्वयं (`components/particles-component.tsx`) एक सादा React कम्पोनेंट है:

```tsx
import Particles from "@tsparticles/react";
import { useCallback, useMemo } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default function ParticlesComponent() {
  const particlesLoaded = useCallback((container?: Container) => {}, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { zIndex: -1 },
      particles: {
        number: { value: 80 },
        links: { enable: true },
        move: { enable: true },
      },
    }),
    [],
  );

  return <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />;
}
```

ध्यान दें कि Pages Router को `"use client"` की **आवश्यकता नहीं** है क्योंकि पेज कम्पोनेंट डिफ़ॉल्ट रूप से पहले से ही क्लाइंट-रेंडर होते हैं।

## समस्या निवारण

| लक्षण                      | कारण                                    | समाधान                                                            |
| --------------------------- | --------------------------------------- | ----------------------------------------------------------------- |
| खाली सफेद पेज              | SSR एक कैनवास-निर्भर मॉड्यूल रेंडर कर रहा है | `dynamic(..., { ssr: false })` का उपयोग करें या क्लाइंट कम्पोनेंट में लपेटें |
| कैनवास नहीं दिख रहा        | कंटेनर की ऊँचाई शून्य है                | `fullScreen: { zIndex: -1 }` सेट करें या स्पष्ट आयाम दें         |
| विकल्प परिवर्तन परिलक्षित नहीं | नया ऑब्जेकट संदर्भ नहीं बनाया गया    | उचित डिपेंडेंसी एरे के साथ `useMemo` का उपयोग करें               |
| प्रीसेट काम नहीं कर रहा     | कंटेनर आरंभ से पहले प्रीसेट लोड नहीं हुआ | `init` कॉलबैक के अंदर `loadXPreset(engine)` कॉल करें              |

## अगले कदम

- तैयार कॉन्फ़िगरेशन के लिए [इंटरैक्टिव डेमो](/demos/) ब्राउज़ करें।
- हर उपलब्ध पैरामीटर के लिए पूर्ण [विकल्प संदर्भ](/options/) पढ़ें।
- बर्फ, तारे और जुगनू जैसे और अधिक पूर्व-निर्मित प्रीसेट के लिए [प्रीसेट](/demos/presets) पेज देखें।
