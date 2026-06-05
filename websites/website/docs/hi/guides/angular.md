---
title: एंगुलर इंटीग्रेशन
description: @tsparticles/angular का उपयोग करके एंगुलर एप्लिकेशन में tsParticles को एकीकृत करने के लिए चरण-दर-चरण मार्गदर्शिका।
---

# एंगुलर इंटीग्रेशन

`@tsparticles/angular` पैकेज tsParticles के लिए एंगुलर कम्पोनेंट, मॉड्यूल और सेवाएँ प्रदान करता है। यह मार्गदर्शिका पारंपरिक `NgModule` दृष्टिकोण के साथ-साथ एंगुलर 17+ स्टैंडअलोन कम्पोनेंट को भी कवर करती है।

---

## इंस्टॉलेशन

```bash
npm install @tsparticles/angular @tsparticles/engine
```

पूर्ण सुविधा सेट के लिए, पूरा बंडल इंस्टॉल करें:

```bash
npm install tsparticles
```

वैकल्पिक प्रीसेट पैकेज:

```bash
npm install @tsparticles/preset-confetti
npm install @tsparticles/preset-fireworks
npm install @tsparticles/preset-snow
npm install @tsparticles/preset-stars
```

---

## मूल उपयोग (NgModule)

### 1. मॉड्यूल आयात करें

```typescript
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgParticlesModule } from "@tsparticles/angular";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgParticlesModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### 2. इंजन को आरंभ करें

```typescript
import { Component, OnInit } from "@angular/core";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import { NgParticlesService } from "@tsparticles/angular";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    void this.ngParticlesService.init(async (engine: Engine) => {
      await loadFull(engine);
    });
  }

  particlesOptions: ISourceOptions = {
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

  particlesLoaded(container: Container): void {
    console.log("पार्टिकल्स कंटेनर लोड हुआ", container);
  }
}
```

### 3. टेम्पलेट

```html
<ngx-particles
  id="tsparticles"
  [options]="particlesOptions"
  (particlesLoaded)="particlesLoaded($event)"
></ngx-particles>
```

---

## इंजन आरंभीकरण विवरण

`NgParticlesService.init()` विधि को ठीक एक बार कॉल किया जाना चाहिए, आमतौर पर `AppComponent.ngOnInit()` में। यह एक कॉलबैक प्राप्त करता है जहाँ आप अपने एप्लिकेशन को आवश्यक प्लगइन/प्रीसेट लोड करते हैं।

```typescript
import { Component, OnInit } from "@angular/core";
import { NgParticlesService } from "@tsparticles/angular";
import type { Engine } from "@tsparticles/engine";

@Component({ ... })
export class AppComponent implements OnInit {
  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    void this.ngParticlesService.init(async (engine: Engine) => {
      // छोटे बंडलों के लिए केवल आवश्यक सुविधाएँ लोड करें
      await loadBasic(engine);       // मूल आकार + हलचल
      await loadEmittersPlugin(engine); // एमिटर आकार
    });
  }
}
```

`tsparticles` से उपलब्ध लोडर फ़ंक्शन:

| फ़ंक्शन            | विवरण                                         |
| ------------------- | ---------------------------------------------- |
| `loadFull(engine)`  | सभी सुविधाएँ (सबसे बड़ा बंडल)                  |
| `loadBasic(engine)` | मुख्य आकार (वृत्त, वर्ग, बहुभुज, आदि)         |
| `loadSlim(engine)`  | अधिकांश सुविधाएँ, शायद ही उपयोग किए जाने वाले प्लगइन को छोड़कर |
| `loadAll(engine)`   | `loadFull` के लिए अप्रचलित उपनाम               |

---

## कॉन्फ़ेटी प्रभाव

```bash
npm install @tsparticles/preset-confetti
```

```typescript
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

// NgParticlesService.init कॉलबैक में:
await loadConfettiPreset(engine);
```

```typescript
particlesOptions: ISourceOptions = {
  preset: "confetti",
  background: {
    color: "transparent",
  },
};
```

या सुविधाजनक `<ngx-confetti>` कम्पोनेंट का उपयोग करें:

```typescript
// app.module.ts
import { NgParticlesModule } from "@tsparticles/angular";

@NgModule({
  imports: [NgParticlesModule],
})
export class AppModule {}
```

```html
<ngx-confetti
  [options]="{
    particleCount: 200,
    colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00']
  }"
></ngx-confetti>
```

---

## आतिशबाज़ी प्रभाव

```bash
npm install @tsparticles/preset-fireworks
```

```typescript
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";

// NgParticlesService.init कॉलबैक में:
await loadFireworksPreset(engine);
```

```typescript
particlesOptions: ISourceOptions = {
  preset: "fireworks",
  background: {
    color: "#000000",
  },
};
```

या `<ngx-fireworks>` कम्पोनेंट का उपयोग करें:

```html
<ngx-fireworks
  [options]="{
    explosion: 8,
    intensity: 30,
    flickering: 50,
    traceLength: 3
  }"
></ngx-fireworks>
```

> आतिशबाज़ी को स्वचालित रूप से शुरू करने से बचें; इसे किसी उपयोगकर्ता क्रिया (क्लिक, स्क्रॉल) से बाँधें ताकि अवांछित संसाधन उपयोग को रोका जा सके।

---

## कस्टम पार्टिकल्स कॉन्फ़िगरेशन

इंटरैक्टिविटी के साथ पूर्ण-सुविधायुक्त कस्टम पार्टिकल सेटअप:

```typescript
import { Component, OnInit } from "@angular/core";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import { NgParticlesService } from "@tsparticles/angular";

@Component({
  selector: "app-particles",
  templateUrl: "./particles.component.html",
})
export class ParticlesComponent implements OnInit {
  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    void this.ngParticlesService.init(async (engine: Engine) => {
      await loadFull(engine);
    });
  }

  particlesOptions: ISourceOptions = {
    background: {
      color: "#0d0d0d",
    },
    fpsLimit: 60,
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
        },
      },
      color: {
        value: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"],
      },
      shape: {
        type: ["circle", "square", "triangle"],
      },
      opacity: {
        value: 0.8,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          sync: false,
        },
      },
      size: {
        value: { min: 2, max: 8 },
        random: true,
        anim: {
          enable: true,
          speed: 4,
          size_min: 1,
          sync: false,
        },
      },
      links: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.3,
        width: 1,
        triangles: {
          enable: true,
          color: "#ffffff",
          opacity: 0.05,
        },
      },
      move: {
        enable: true,
        speed: 3,
        direction: "none",
        random: true,
        straight: false,
        outModes: "bounce",
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 600,
        },
      },
      life: {
        duration: {
          value: 5,
          random: true,
        },
        count: 0,
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
        resize: {
          enable: true,
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
    detectRetina: true,
  };

  particlesLoaded(container: Container): void {
    console.log("कंटेनर लोड हुआ", container);
  }
}
```

```html
<ngx-particles
  id="tsparticles"
  [options]="particlesOptions"
  (particlesLoaded)="particlesLoaded($event)"
></ngx-particles>
```

---

## इवेंट

`ngx-particles` कम्पोनेंट `particlesLoaded` इवेंट उत्सर्जित करता है:

```typescript
import type { Container } from "@tsparticles/engine";

// कम्पोनेंट विधि
onParticlesLoaded(container: Container): void {
  // कंटेनर API तक पहुँच
  container.pause();
  container.play();
  container.destroy();
  container.exportImage().then((blob) => { /* ... */ });
}
```

```html
<ngx-particles
  id="tsparticles"
  [options]="particlesOptions"
  (particlesLoaded)="onParticlesLoaded($event)"
></ngx-particles>
```

कंटेनर संदर्भ आपको पूर्ण प्रोग्रामेटिक नियंत्रण देता है: रोकें, पुनरारंभ करें, नष्ट करें, निर्यात करें, और बहुत कुछ।

---

## टेम्पलेट सिंटैक्स और सशर्त रेंडरिंग

कम्पोनेंट को टॉगल करने के लिए एंगुलर स्ट्रक्चरल डायरेक्टिव का उपयोग करें:

```html
<button (click)="showParticles = !showParticles">पार्टिकल्स टॉगल करें</button>

<ngx-particles
  *ngIf="showParticles"
  id="tsparticles"
  [options]="particlesOptions"
  (particlesLoaded)="particlesLoaded($event)"
></ngx-particles>
```

```typescript
export class AppComponent {
  showParticles = true;
  // ...
}
```

जब `*ngIf` `false` का मूल्यांकन करता है, तो कम्पोनेंट नष्ट हो जाता है (कैनवास और सभी पार्टिकल इंस्टेंस सहित)। इसे पुनः बनाने पर सब कुछ शुरू से आरंभ होता है।

---

## स्टैंडअलोन कम्पोनेंट (एंगुलर 17+)

एंगुलर 17+ में, आप `NgParticlesModule` को सीधे एक स्टैंडअलोन कम्पोनेंट में आयात कर सकते हैं:

```typescript
import { Component, OnInit } from "@angular/core";
import { NgParticlesModule, NgParticlesService } from "@tsparticles/angular";
import { loadFull } from "tsparticles";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

@Component({
  selector: "app-particles",
  standalone: true,
  imports: [NgParticlesModule],
  template: `
    <ngx-particles
      id="tsparticles"
      [options]="particlesOptions"
      (particlesLoaded)="particlesLoaded($event)"
    ></ngx-particles>
  `,
})
export class ParticlesComponent implements OnInit {
  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    void this.ngParticlesService.init(async (engine: Engine) => {
      await loadFull(engine);
    });
  }

  particlesOptions: ISourceOptions = {
    background: { color: "#000" },
    particles: {
      number: { value: 50 },
      color: { value: "#fff" },
      shape: { type: "circle" },
      move: { enable: true, speed: 2 },
    },
  };

  particlesLoaded(container: Container): void {
    console.log("लोड हुआ", container);
  }
}
```

किसी `NgModule` रैपर की आवश्यकता नहीं — बस कम्पोनेंट के `imports` एरे में `NgParticlesModule` आयात करें।

---

## पूर्ण कम्पोनेंट उदाहरण

### app.component.ts

```typescript
import { Component, OnInit } from "@angular/core";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { NgParticlesService } from "@tsparticles/angular";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "tsParticles एंगुलर डेमो";

  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    void this.ngParticlesService.init(async (engine: Engine) => {
      await loadSlim(engine);
    });
  }

  particlesOptions: ISourceOptions = {
    autoPlay: true,
    background: {
      color: "#1e1e2e",
      image: "",
      position: "50% 50%",
      repeat: "no-repeat",
      size: "cover",
    },
    backgroundMask: {
      cover: {
        color: "#1e1e2e",
      },
      enable: false,
    },
    fullScreen: {
      enable: true,
      zIndex: -1,
    },
    detectRetina: true,
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
        speed: 1,
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
  };

  particlesLoaded(container: Container): void {
    console.log("पार्टिकल्स लोड हुए", container);
  }
}
```

### app.component.html

```html
<div style="position: relative; width: 100%; height: 100vh;">
  <ngx-particles
    id="tsparticles"
    [options]="particlesOptions"
    (particlesLoaded)="particlesLoaded($event)"
  ></ngx-particles>

  <div
    style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; text-align: center;"
  >
    <h1>{{ title }}</h1>
    <p>पार्टिकल्स पृष्ठभूमि में चल रहे हैं।</p>
  </div>
</div>
```

### app.component.css

```css
:host {
  display: block;
  width: 100%;
  height: 100%;
}
```

---

## API संदर्भ

| कम्पोनेंट | सिलेक्टर        | विवरण                            |
| --------- | --------------- | -------------------------------- |
| Particles | `ngx-particles` | पूर्ण पार्टिकल सिस्टम कम्पोनेंट |
| Confetti  | `ngx-confetti`  | पूर्व-कॉन्फ़िगर्ड कॉन्फ़ेटी प्रभाव |
| Fireworks | `ngx-fireworks` | पूर्व-कॉन्फ़िगर्ड आतिशबाज़ी प्रभाव |

### `ngx-particles` इनपुट

| इनपुट     | प्रकार           | डिफ़ॉल्ट          | विवरण                       |
| --------- | ---------------- | ------------------ | --------------------------- |
| `id`      | `string`         | `"tsparticles"`    | कैनवास एलिमेंट आईडी        |
| `options` | `ISourceOptions` | `{}`               | पार्टिकल कॉन्फ़िगरेशन      |
| `url`     | `string`         | —                  | दूरस्थ JSON कॉन्फ़िग URL    |

### `ngx-particles` आउटपुट

| आउटपुट           | पेलोड       | विवरण                                    |
| ----------------- | ----------- | ----------------------------------------- |
| `particlesLoaded` | `Container` | जब कंटेनर आरंभ हो जाता है तब उत्सर्जित होता है |

---

## समस्या निवारण

- **खाली / अदृश्य कैनवास** — सुनिश्चित करें कि पैरेंट एलिमेंट की एक निश्चित ऊँचाई हो (जैसे, `height: 100vh`)। कैनवास कंटेनर के आयाम लेता है।
- **`NgParticlesService.init()` कई बार कॉल हुआ** — इसे केवल एक बार कॉल करें, आमतौर पर `AppComponent.ngOnInit()` में। बाद के कॉल सुरक्षित लेकिन अनावश्यक हैं।
- **मॉड्यूल नहीं मिला** — सत्यापित करें कि `@tsparticles/angular` `package.json` निर्भरताओं में सूचीबद्ध है और आपने `NgParticlesModule` आयात किया है।
- **`NullInjectorError: No provider for NgParticlesService`** — आपको उस मॉड्यूल में `NgParticlesModule` आयात (या पुनः निर्यात) करना होगा जहाँ आप कम्पोनेंट प्रदान करते हैं।
