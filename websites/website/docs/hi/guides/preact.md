---
title: प्रीएक्ट
description: आधिकारिक @tsparticles/preact रैपर के साथ tsParticles को प्रीएक्ट में एकीकृत करें।
---

# प्रीएक्ट इंटीग्रेशन

`@tsparticles/preact` पैकेज एक `<Particles>` कम्पोनेंट प्रदान करता है जो प्रीएक्ट के साथ सहजता से काम करता है, जिसमें क्लास और फंक्शनल कम्पोनेंट पैटर्न दोनों शामिल हैं।

## इंस्टॉलेशन

```bash
npm install @tsparticles/preact tsparticles
```

`@tsparticles/preact` पैकेज टाइपस्क्रिप्ट घोषणाओं के साथ आता है। किसी अतिरिक्त टाइप पैकेज की आवश्यकता नहीं है।

## इंजन आरंभीकरण

पार्टिकल्स रेंडर करने से पहले, आपको आवश्यक प्लगइन के साथ इंजन आरंभ करना होगा। अपने ऐप के रेंडर होने से पहले, एक बार `initParticlesEngine` कॉल करें।

```typescript
import { initParticlesEngine } from "@tsparticles/preact";
import { loadFull } from "tsparticles";

void initParticlesEngine(async (engine) => {
  await loadFull(engine);
});
```

छोटे बंडल के लिए, केवल आवश्यक सुविधाएँ लोड करें:

```typescript
import { initParticlesEngine } from "@tsparticles/preact";
import { loadBasic } from "@tsparticles/basic";
import { loadPolygonMaskPlugin } from "@tsparticles/plugin-polygon-mask";

void initParticlesEngine(async (engine) => {
  await loadBasic(engine);
  await loadPolygonMaskPlugin(engine);
});
```

`initParticlesEngine` एक प्रॉमिस लौटाता है जो सभी प्लगइन पंजीकृत होने पर हल होता है। `<Particles>` कम्पोनेंट आरंभीकरण पूरा होने तक रेंडर नहीं होगा।

## मूल उपयोग

एक बार इंजन आरंभ हो जाने पर, अपने ऐप में कहीं भी `<Particles>` कम्पोनेंट का उपयोग करें:

```jsx
import Particles from "@tsparticles/preact";
import configs from "@tsparticles/configs";

function App() {
  return <Particles id="tsparticles" options={configs.basic} />;
}
```

`id` विशेषता DOM एलिमेंट आईडी और tsParticles द्वारा आंतरिक रूप से उपयोग किए जाने वाले कंटेनर पहचानकर्ता दोनों सेट करती है। `options` प्रॉप किसी भी मान्य tsParticles कॉन्फ़िगरेशन ऑब्जेकट को स्वीकार करता है।

## प्रीसेट स्विचिंग

`options` प्रॉप को बदलकर प्रीसेट के बीच डायनामिक रूप से स्विच करें:

```jsx
import { useState } from "preact/hooks";
import Particles from "@tsparticles/preact";
import configs from "@tsparticles/configs";

function App() {
  const [preset, setPreset] = useState("basic");

  const presets = {
    basic: configs.basic,
    snow: configs.snow,
    stars: configs.stars,
    fireworks: configs.fireworks,
  };

  return (
    <div>
      <select onChange={(e) => setPreset(e.currentTarget.value)}>
        <option value="basic">बेसिक</option>
        <option value="snow">बर्फ</option>
        <option value="stars">तारे</option>
        <option value="fireworks">आतिशबाज़ी</option>
      </select>
      <Particles id="tsparticles" key={preset} options={presets[preset]} />
    </div>
  );
}
```

`key` प्रॉप का उपयोग करने से प्रीएक्ट कम्पोनेंट को रीमाउंट करने के लिए मजबूर करता है, प्रत्येक प्रीसेट के लिए पार्टिकल्स को पूरी तरह से पुनरारंभ करता है।

## क्लास कम्पोनेंट

क्लास-आधारित कम्पोनेंट के लिए, `componentDidMount` में इंजन आरंभ करें और `componentDidUpdate` में स्थिति प्रबंधित करें:

```jsx
import { Component } from "preact";
import Particles, { initParticlesEngine } from "@tsparticles/preact";
import { loadFull } from "tsparticles";
import configs from "@tsparticles/configs";

export default class ParticlesApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      engineReady: false,
      options: configs.basic,
    };
  }

  componentDidMount() {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      this.setState({ engineReady: true });
    });
  }

  handlePresetChange = (e) => {
    const presets = {
      basic: configs.basic,
      snow: configs.snow,
      stars: configs.stars,
    };
    this.setState({ options: presets[e.currentTarget.value] || configs.basic });
  };

  render() {
    const { engineReady, options } = this.state;

    return (
      <div>
        <select onChange={this.handlePresetChange}>
          <option value="basic">बेसिक</option>
          <option value="snow">बर्फ</option>
          <option value="stars">तारे</option>
        </select>
        {engineReady && <Particles id="tsparticles" options={options} />}
      </div>
    );
  }
}
```

## फंक्शनल कम्पोनेंट

हुक के साथ, इंजन आरंभ करने और कॉन्फ़िगरेशन प्रबंधित करने के लिए `useState` और `useEffect` का उपयोग करें:

```jsx
import { useState, useEffect } from "preact/hooks";
import Particles, { initParticlesEngine } from "@tsparticles/preact";
import { loadFull } from "tsparticles";
import configs from "@tsparticles/configs";

export default function App() {
  const [engineReady, setEngineReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => setEngineReady(true));
  }, []);

  return <div>{engineReady && <Particles id="tsparticles" options={configs.snow} />}</div>;
}
```

## कस्टम कॉन्फ़िगरेशन

प्रीसेट का उपयोग करने के बजाय सीधे एक पूर्ण कॉन्फ़िगरेशन ऑब्जेकट परिभाषित करें:

```jsx
import { useState, useEffect } from "preact/hooks";
import Particles, { initParticlesEngine } from "@tsparticles/preact";
import { loadFull } from "tsparticles";

export default function App() {
  const [engineReady, setEngineReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => setEngineReady(true));
  }, []);

  const options = {
    background: {
      color: "#0d1117",
    },
    fpsLimit: 120,
    particles: {
      color: {
        value: "#58a6ff",
      },
      links: {
        color: "#58a6ff",
        enable: true,
        opacity: 0.4,
        distance: 150,
      },
      move: {
        enable: true,
        speed: 2,
      },
      number: {
        value: 80,
        density: {
          enable: true,
        },
      },
      opacity: {
        value: 0.5,
      },
      size: {
        value: { min: 1, max: 4 },
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
      modes: {
        repulse: {
          distance: 100,
        },
        push: {
          quantity: 4,
        },
      },
    },
  };

  return <>{engineReady && <Particles id="tsparticles" options={options} />}</>;
}
```


## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## इवेंट हैंडलिंग

पार्टिकल्स पूरी तरह से रेंडर होने के बाद tsParticles `Container` इंस्टेंस तक पहुँचने के लिए `particlesLoaded` कॉलबैक का उपयोग करें:

```jsx
import { useCallback, useState, useEffect } from "preact/hooks";
import Particles, { initParticlesEngine } from "@tsparticles/preact";
import { loadFull } from "tsparticles";
import configs from "@tsparticles/configs";

export default function App() {
  const [engineReady, setEngineReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => setEngineReady(true));
  }, []);

  const handleParticlesLoaded = useCallback(async (container) => {
    console.log("पार्टिकल्स कंटेनर तैयार:", container);
    container?.refresh();
  }, []);

  return (
    <div>
      {engineReady && <Particles id="tsparticles" options={configs.basic} particlesLoaded={handleParticlesLoaded} />}
    </div>
  );
}
```

`particlesLoaded` कॉलबैक `Container` इंस्टेंस प्राप्त करता है, जिसका उपयोग आप `refresh()`, `pause()`, `play()`, या `destroy()` जैसी विधियाँ कॉल करने के लिए कर सकते हैं।
