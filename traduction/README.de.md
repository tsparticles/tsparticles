[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles - Partikel-Simulation in TypeScript

**Eine schlanke TypeScript-Bibliothek zum Erstellen von Partikeln. Frei von Abhängigkeiten ([\*](#dependencies)) und
sofort im Browser einsatzbereit!**

_[Particles.js](https://github.com/VincentGarreau/particles.js) ist in TypeScript geschrieben, frei von
Abhängigkeiten ([\*](#dependencies)), verbessert mit neuen coolen 😎 Funktionen und von Fehlern bereinigt und **wird
aktiv betreut und weiterentwickelt**!_

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles/badge?style=rounded)](https://www.jsdelivr.com/package/npm/tsparticles) [![Cdnjs](https://img.shields.io/cdnjs/v/tsparticles)](https://cdnjs.com/libraries/tsparticles) [![npmjs](https://badge.fury.io/js/tsparticles.svg)](https://www.npmjs.com/package/tsparticles) [![npm](https://img.shields.io/npm/dm/tsparticles)](https://www.npmjs.com/package/tsparticles) [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/) [![CodeFactor](https://www.codefactor.io/repository/github/matteobruni/tsparticles/badge)](https://www.codefactor.io/repository/github/matteobruni/tsparticles) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/b983aaf3461a4c48b1e2eecce1ff1d74)](https://www.codacy.com/manual/ar3s/tsparticles?utm_source=github.com&utm_medium=referral&utm_content=matteobruni/tsparticles&utm_campaign=Badge_Grade) [![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/matteobruni/tsparticles)

## Du möchtest es auf deiner Webseite benutzen?

**Diese Bibliothek ist auf den beiden populärsten CDNs verfügbar, einfach zu bedienen und fertig für den sofortigen
Einsatz. Wenn du particles.js verwendest, ist es sogar noch einfacher**.

Hier findest du die
Anleitung [unten](https://github.com/matteobruni/tsparticles/blob/main/README.md#library-installation), mit allen
notwendigen Links, und*lass dich nicht von **TypeScript** abschrecken, es ist nur die Ausgangssprache*.

**Die End-Datei ist in purem JavaScript**. 🤩

CDNs und `npm`beinhalten alle Quellen und Pakete, die du benötigst, in **JavaScript**, eine gebündelte minimierte
Browser Datei (tsparticles.min.js) und alle Dateien einzeln für die `import` Syntax.

**Wenn du noch mehr wissen möchtest** - weiter unten findest du eine Anleitung von der Migration der alten particle.js
Bibliothek.

## **_Installation der Bibliothek_**

### **_Hosting / CDN_**

**Bitte verwende diese Hosts oder deinen Eigenen, um tsParticles in dein Projekt zu integrieren.**

#### jsDelivr

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles/badge)](https://www.jsdelivr.com/package/npm/tsparticles)

#### cdnjs

[![Cdnjs](https://img.shields.io/cdnjs/v/tsparticles)](https://cdnjs.com/libraries/tsparticles)

#### unpkg

<https://unpkg.com/tsparticles/>

---

### **_npm_**

[![npmjs](https://badge.fury.io/js/tsparticles.svg)](https://www.npmjs.com/package/tsparticles) [![npmjs](https://img.shields.io/npm/dt/tsparticles)](https://www.npmjs.com/package/tsparticles)

```shell

npm install tsparticles

```

### **_yarn_**

```shell

yarn add tsparticles

```

#### "Import" und "require"

Ab Version 1.12.11 können `import` oder `require` verwendet werden, um `tsParticles` zu importieren.

Ab dann kannst du folgendes schreiben:

```javascript
const tsParticles = require('tsparticles');

// oder

import {tsParticles} from 'tsparticles';
```

Die importierte `tsParticles` ist die gleiche Instanz, die du bekommst, wenn du das Skript einbindest.

---

### **_NuGet_**

[![Nuget](https://img.shields.io/nuget/v/tsParticles)](https://www.nuget.org/packages/tsParticles/)

---

### **_Usage_**

Lade tsParticles und konfiguriere die Partikel:

[![tsParticles demo](https://media.giphy.com/media/ftHwBpp3b0qNyCXRuu/giphy.gif)](https://particles.js.org)

**index.html**

```html

<div id="tsparticles"></div>

<script src="tsparticles.min.js"></script>
```

**app.js**

```javascript
// @path-json kann ein Objekt oder ein Array sein, das erste wird direkt geladen, das Objekt aus dem Array wird zufällig ausgewählt

/* tsParticles.loadJSON(@dom-id, @path-json, @callback (optional)); */

tsParticles

    .loadJSON('tsparticles', 'presets/default.json')

    .then(container => {
        console.log('callback - tsparticles config loaded');
    })

    .catch(error => {
        console.error(error);
    });

//oder

/* tsParticles.load(@dom-id, @options); */

tsParticles.load('tsparticles', {
    /* Optionen hier */
});

//oder

/* tsParticles.loadFromArray(@dom-id, @options, @index (optional)); */

tsParticles.loadFromArray('tsparticles', [
    {
        /* Optionen hier */
    },

    {
        /* andere Optionen hier */
    },
]);

//zufälliges Objekt

tsParticles.loadFromArray(
    'tsparticles',

    [
        {
            /* Optionen hier */
        },

        {
            /* andere Optionen hier */
        },
    ],

    1
); //das Zweite

// Wichtig! Wenn der Index nicht zwischen 0...<array.length liegt, wird der Index ignoriert.

// Der nachfolgende Code kann nach der Initialisierung verwendet werden.

/* tsParticles.setOnClickHandler(@callback); */

/* dieses Event wird von allen geladenen Teilchen abgefeuert */

tsParticles.setOnClickHandler((event, particles) => {
    /* benutzerdefinierter Klick-Handler */
});

// jetzt können auch die Animationen kontrolliert werden, es ist möglich diese anzuhalten und wieder fortzusetzen

// diese Methoden verändern die vorherigen Konfigurationen nicht

// domItem(0) gibt die erste tsParticles Instanz, welche im dom geladen wurde, zurück

const particles = tsParticles.domItem(0);

// play startet die Animation, wenn die Bewegung nicht aktiviert ist, wird sie davon auch nicht aktiviert, sondern es wird nur das Bild aktualisiert

particles.play();

// pause stoppt die Animation

particles.pause();
```

---

## Offizielle Komponenten für einige der am häufigsten verwendeten Frameworks

### Angular

#### `ng-particles`

[![npm](https://img.shields.io/npm/v/ng-particles)](https://www.npmjs.com/package/ng-particles) [![npm](https://img.shields.io/npm/dm/ng-particles)](https://www.npmjs.com/package/ng-particles)

[Hier](https://github.com/matteobruni/tsparticles/blob/main/components/angular/README.md) findest du die Anleitung.

### Inferno

#### `inferno-particles`

[![npm](https://img.shields.io/npm/v/inferno-particles)](https://www.npmjs.com/package/inferno-particles) [![npm](https://img.shields.io/npm/dm/inferno-particles)](https://www.npmjs.com/package/inferno-particles)

[Hier](https://github.com/matteobruni/tsparticles/blob/main/components/inferno/README.md) findest du die Anleitung.

### jQuery

#### `jquery-particles`

[![npm](https://img.shields.io/npm/v/jquery-particles)](https://www.npmjs.com/package/jquery-particles) [![npm](https://img.shields.io/npm/dm/jquery-particles)](https://www.npmjs.com/package/jquery-particles)

[Hier](https://github.com/matteobruni/tsparticles/blob/main/components/jquery/README.md) findest du die Anleitung.

### Preact

#### `preact-particles`

[![npm](https://img.shields.io/npm/v/preact-particles)](https://www.npmjs.com/package/preact-particles) [![npm](https://img.shields.io/npm/dm/preact-particles)](https://www.npmjs.com/package/preact-particles)

[Hier](https://github.com/matteobruni/tsparticles/blob/main/components/preact/README.md) findest du die Anleitung.

### ReactJS

#### `react-tsparticles`

[![npm](https://img.shields.io/npm/v/react-tsparticles)](https://www.npmjs.com/package/react-tsparticles) [![npm](https://img.shields.io/npm/dm/react-tsparticles)](https://www.npmjs.com/package/react-tsparticles)

[Hier](https://github.com/matteobruni/tsparticles/blob/main/components/react/README.md) findest du die Anleitung.

### Svelte

#### `svelte-particles`

[![npm](https://img.shields.io/npm/v/svelte-particles)](https://www.npmjs.com/package/svelte-particles) [![npm downloads](https://img.shields.io/npm/dm/svelte-particles)](https://www.npmjs.com/package/svelte-particles)

[Hier](https://github.com/matteobruni/tsparticles/blob/main/components/svelte/README.md) findest du die Anleitung.

### VueJS

#### `particles.vue`

[![npm](https://img.shields.io/npm/v/particles.vue)](https://www.npmjs.com/package/particles.vue) [![npm](https://img.shields.io/npm/dm/particles.vue)](https://www.npmjs.com/package/particles.vue)

[Hier](https://github.com/matteobruni/tsparticles/blob/main/components/vue/README.md) findest du die Anleitung.

---

## Vorlagen und Ressourcen

[Hier](https://github.com/tsparticles/templates) findest du einige Vorlagen zu tsParticles. Die Vorlagen wurden für _
Vanilla Javascript_, _ReactJS_, _VueJS_, _Angular_, _SvelteJS_ und andere Frameworks erstellt.

Die Vorlagen können variieren, neue Templates werden erstellt und alte mit den neuesten Funktionen ausgestattet oder
durch ein neues Design verbessert. Deswegen schau von Zeit zu Zeit wieder vorbei.

Solltest du selbst ein gutes Design mit _tsParticles_ entwerfen, zögere nicht eine Pull-Anfrage mit deinem Template
einzureichen. Wir führen dich dann als Vorlagen-Autor an.

<https://github.com/tsparticles/templates>

---

## **_Demo / Generator_**

<https://particles.js.org/samples>

[![Particles demo](https://particles.js.org/images/demo.png?v=1.8.1)](https://particles.js.org/samples)

---

### Zeichen als Partikel

[![Particles chars demo](https://media.giphy.com/media/JsssOXz72bM6jGEZ0s/giphy.gif)](https://particles.js.org/samples#chars)

---

### Mouse-Hover Verbindungen

[![Particles mouse connections demo](https://media.giphy.com/media/XzvZThpVbxHxMYz5xt/giphy.gif)](https://particles.js.org/samples#connect)

---

### Polygon-Maske

[![tsParticles Polygon Mask demo](https://media.giphy.com/media/lNRfiSgaMFbL4FMhW6/giphy.gif)](https://particles.js.org/samples#polygonMask)

---

### Animierte Sterne

[![Particles NASA demo](https://media.giphy.com/media/cLqGsnh7FKRVMgPIWE/giphy.gif)](https://particles.js.org/samples#nasa)

---

### Nyan-Katze fliegt auf rollenden Sternen

[![Particles Nyan Cat demo](https://media.giphy.com/media/LpX2oNc9ZMgIhIXQL9/giphy.gif)](https://particles.js.org/samples#nyancat2)

---

### Schnee Partikel

[![tsParticles Snow demo](https://media.giphy.com/media/gihwUFbmiubbkdzEMX/giphy.gif)](https://particles.js.org/samples#snow)

---

### Partikel mit Hintergrundbild

[![tsParticles Background Mask demo](https://media.giphy.com/media/dWraWgqInWFGWiOyRu/giphy.gif)](https://particles.js.org/samples#background)

---

#### COVID-19 SARS-CoV-2 Partikel

[![tsParticles COVID-19 demo](https://media.giphy.com/media/fsVN1ZHksgBIXNIbr1/giphy.gif)](https://particles.js.org/samples#virus)

_Nicht klicken! NICHT KLICKEN! OH NEIN, ES BREITET SICH AUS!!!!_

**COVID-19 ist eine schwere Krankheit. Bitte bleib zu Hause, trage eine Maske und bleibe gesund!**

---

**particles.json**

[Hier](https://github.com/matteobruni/tsparticles/tree/main/website/presets) findest du eine Beispielkonfiguration. 📖

---

## **_Optionen_**

Alle verfügbaren Optionen findest
du [hier](https://particles.js.org/docs/interfaces/_options_interfaces_ioptions_.ioptions.html) 📖

## Möchtest du es in Aktion sehen und ausprobieren?

Ich habe eine tsParticles-Sammlung auf [CodePen](https://codepen.io/collection/DPOage) erstellt 😮 oder du gehst auf
mein [Profil](https://codepen.io/matteobruni)

Ansonsten gibt es unten den Link zur Demo-Seite. Klicke auf das Fenster mit dem Coronavirus unten. Hab keine Angst, **es
ist sicher** 😷.

[![tsParticles demo](https://media.giphy.com/media/fsVN1ZHksgBIXNIbr1/giphy.gif)](https://particles.js.org/#virus)

Möchtest du noch mehr Demos sehen? Klone das Repository lokal auf deinem Computer und folge den folgenden Anweisungen.

```shell

yarn install && yarn start

```

**Boom! 💥** <http://localhost:3000> und du kannst die anderen Demos austesten.

_Wenn du mutig genug bist,_ wechsle zum `dev` branch um die neuen Funktionen in der Entwicklungsphase auszuprobieren.

## Abhängigkeiten (Dependencies)

Möglicherweise hast du das \* neben "frei von Abhängigkeiten" bemerkt. Fast alle Features funktionieren ohne jegliche
Abhängigkeit, außer die **Polygon-Maske**. Diese
benötigt [`@tsparticles/pathseg`](https://npmjs.com/package/@tsparticles/pathseg) um in manchen Browsern einwandfrei zu
funktionieren und natürlich müssen die Icon-Fonts (wie `FontAwesome`) in deine Seite eingebunden werden.

---

## Migration von Particles.js

Die **tsParticles**-Bibliothek ist vollständig kompatibel mit der _particles.js_-Konfiguration.

Ernsthaft, du musst nur die Skriptquelle ändern und voilà, **du bist startbereit** 🧙!

Mehr dazu kannst du **[hier](https://dev.to/matteobruni/migrating-from-particles-js-to-tsparticles-2a6m)** lesen.

Du möchtest die 5 Gründe für einen Wechsel
wissen? [Lies hier](https://dev.to/matteobruni/5-reasons-to-use-tsparticles-and-not-particles-js-1gbe)

_Unten findest du alle Informationen, die du zur Installation von tsParticles und der neuen Syntax benötigst._

---

## Plugins/Anpassungen

tsParticles unterstützt jetzt einige individuelle Anpassungen 🥳.

**Du kannst deine eigenen Plugins erstellen**

_Lies mehr dazu [hier](https://particles.js.org/docs/modules/_core_interfaces_iplugin_.html)...\_

---

### API Docs

Referenzen zu Dokumentation und Entwicklung [hier](https://particles.js.org/docs/) 📖

---

[![Slack](https://particles.js.org/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI) [![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles")

---

<p>

<a  href="https://www.jetbrains.com/?from=tsParticles">

<img  src="https://particles.js.org/images/jetbrains-logos/jetbrains-variant-4.png"  height="150"  alt="JetBrains"  />

</a>

<a  href="https://www.jetbrains.com/webstorm/?from=tsParticles">

<img  src="https://particles.js.org/images/jetbrains-logos/webstorm_logos/logo.png"  height="150"  alt="JetBrains"  />

</a>

</p>

### Vielen Dank an [JetBrains](https://www.jetbrains.com/?from=tsParticles) für die 2020 Open Source License!

[JetBrains WebStorm](https://www.jetbrains.com/webstorm/?from=tsParticles) wird zur Aufrechterhaltung dieses Projekts
verwendet.

### Vielen Dank an [SauceLabs](https://saucelabs.com) für die Open Source License!

<img  alt="Testing Powered By SauceLabs"  src="https://raw.githubusercontent.com/saucelabs/saucelabs.github.io/publish/images/opensauce/powered-by-saucelabs-badge-red.svg"  width="250"  />
