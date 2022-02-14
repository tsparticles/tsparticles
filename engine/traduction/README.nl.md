[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles - Deeltjes in TypeScript

**Een lichte TypeScript bibliotheek voor het maken van deeltjes. Zonder afhankelijkheden ([\*](#afhankelijkheden)) en
bruikbaar in de browser!**

_[Particles.js](https://github.com/VincentGarreau/particles.js) omgezet in TypeScript, vrij van
afhankelijkheden ([\*](#afhankelijkheden)), verbeterd met nieuwe, coole 😎 features en verschillende bugs gefixt en **
het wordt actief onderhouden**!_

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles/badge?style=rounded)](https://www.jsdelivr.com/package/npm/tsparticles) [![Cdnjs](https://img.shields.io/cdnjs/v/tsparticles)](https://cdnjs.com/libraries/tsparticles) [![npmjs](https://badge.fury.io/js/tsparticles.svg)](https://www.npmjs.com/package/tsparticles) [![npm](https://img.shields.io/npm/dm/tsparticles)](https://www.npmjs.com/package/tsparticles) [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/) [![CodeFactor](https://www.codefactor.io/repository/github/matteobruni/tsparticles/badge)](https://www.codefactor.io/repository/github/matteobruni/tsparticles) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/b983aaf3461a4c48b1e2eecce1ff1d74)](https://www.codacy.com/manual/ar3s/tsparticles?utm_source=github.com&utm_medium=referral&utm_content=matteobruni/tsparticles&utm_campaign=Badge_Grade) [![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/matteobruni/tsparticles)

[![Slack](https://particles.js.org/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI) [![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Wil je dit gebruiken op je website?

**Deze bibliotheek is beschikbaar op de twee meest populaire CDN's en het is makkelijk en klaar voor gebruik. Als je
particles.js gebruikte, is het nog makkelijker**.

Je vindt de
instructies [hier onder](https://github.com/matteobruni/tsparticles/blob/main/traduction/README.nl.md#biliotheek-installatie)
met alle links die je nodig hebt, en _wees niet bang voor **TypeScript**, het is alleen maar de bron taal_.

**De uitvoerbestanden zijn alleen maar JavaScript**. 🤩

CDN's en `npm` hebben alle bronnen die je nodig hebt in JavaScript **Javascript**, een bundel klaar voor de browser (
tsparticles.min.js) en alle bestanden gesplit voor de `import` syntaxis.

**Als je nog geïnteresseerd bent** staan er hier onder wat instructies voor het migreren van de oude particles.js
bibliotheek.

## **_Bibliotheek installatie_**

### **_Hosting / CDN_**

**_Gebruik deze hosts of je eigen om tsParticles te laden in je projecten_**

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

#### Import en require

Beginnend met versie 1.12.11 kunnen `import` en `require` gebruikt worden om `tsParticles` te importeren.

Nu kun je iets schrijven als volgt:

```javascript
const tsParticles = require("tsparticles");

// of

import {tsParticles} from "tsparticles-engine";
```

De geïmporteerde `tsParticles` is dezelfde instantie als wanneer je het script had gebruikt van een CDN.

---

### **_NuGet_**

[![Nuget](https://img.shields.io/nuget/v/tsParticles)](https://www.nuget.org/packages/tsParticles/)

---

### **_Usage_**

Laad tsParticles en configureer de deeltjes:

[![tsParticles demo](https://media.giphy.com/media/ftHwBpp3b0qNyCXRuu/giphy.gif)](https://particles.js.org)

**index.html**

```html

<div id="tsparticles"></div>

<script src="tsparticles.min.js"></script>
```

**app.js**

```javascript
// @path-json kan een object of een array zijn, de eerste wordt direct geladen, het object uit de array wordt willekeurig gekozen
/* tsParticles.loadJSON(@dom-id, @path-json, @callback (optional)); */

tsParticles
    .loadJSON("tsparticles", "presets/default.json")
    .then((container) => {
        console.log("callback - tsparticles config loaded");
    })
    .catch((error) => {
        console.error(error);
    });

// of

/* tsParticles.load(@dom-id, @options); */

tsParticles.load("tsparticles", {
    /* opties hier */
});

// of

/* tsParticles.loadFromArray(@dom-id, @options, @index (optioneel)); */

tsParticles.loadFromArray("tsparticles", [
    {
        /* opties hier */
    },
    {
        /* andere opties hier */
    },
]);
// willekeurig object

tsParticles.loadFromArray(
    "tsparticles",
    [
        {
            /* opties hier */
        },
        {
            /* andere opties hier */
        },
    ],
    1
); // de tweede
// Belangrijk! Als de index niet in de reeks 0...<array.length> zit, dan wordt de index genereerd.

// Na initializatie kan dit worden gebruikt.

/* tsParticles.setOnClickHandler(@callback); */

/* Dit wordt afgevuurd na alle deeltjes geladen zijn */

tsParticles.setOnClickHandler((event, particles) => {
    /* Eigen gemaakte klik handler */
});

// Nu kan je de animaties ook besturen, het is mogelijk om de animaties te pauzeren en weer door te laten gaan
// Deze methodes veranderen niet de configuratie niet dus hier zit je veilig mee
// domItem(0) geeft de eerste tsParticle instantie terug die geladen is in de DOM
const particles = tsParticles.domItem(0);

// play start de animaties, als de move niet aan staat wordt dit niet aangezet, alleen het frame wordt geüpdated
particles.play();

// pause stopt de animaties
particles.pause();
```

---

## Officiële componenten voor een paar van de meest gebruikte raamwerken

### Angular

#### `ng-particles`

[![npm](https://img.shields.io/npm/v/ng-particles)](https://www.npmjs.com/package/ng-particles) [![npm](https://img.shields.io/npm/dm/ng-particles)](https://www.npmjs.com/package/ng-particles)

Je kunt [hier](https://github.com/matteobruni/tsparticles/blob/main/components/angular/traduction/README.nl.md) de
instructies vinden

### Inferno

#### `inferno-particles`

[![npm](https://img.shields.io/npm/v/inferno-particles)](https://www.npmjs.com/package/inferno-particles) [![npm](https://img.shields.io/npm/dm/inferno-particles)](https://www.npmjs.com/package/inferno-particles)

Je kunt [hier](https://github.com/matteobruni/tsparticles/blob/main/components/inferno/traduction/README.nl.md) de
instructies vinden

### jQuery

#### `jquery-particles`

[![npm](https://img.shields.io/npm/v/jquery-particles)](https://www.npmjs.com/package/jquery-particles) [![npm](https://img.shields.io/npm/dm/jquery-particles)](https://www.npmjs.com/package/jquery-particles)

Je kunt [hier](https://github.com/matteobruni/tsparticles/blob/main/components/jquery/traduction/README.nl.md) de
instructies vinden

### Preact

#### `preact-particles`

[![npm](https://img.shields.io/npm/v/preact-particles)](https://www.npmjs.com/package/preact-particles) [![npm](https://img.shields.io/npm/dm/preact-particles)](https://www.npmjs.com/package/preact-particles)

Je kunt [hier](https://github.com/matteobruni/tsparticles/blob/main/components/preact/traduction/README.nl.md) de
instructies vinden

### ReactJS

#### `react-tsparticles`

[![npm](https://img.shields.io/npm/v/react-tsparticles)](https://www.npmjs.com/package/react-tsparticles) [![npm](https://img.shields.io/npm/dm/react-tsparticles)](https://www.npmjs.com/package/react-tsparticles)

Je kunt [hier](https://github.com/matteobruni/tsparticles/blob/main/components/react/traduction/README.nl.md) de
instructies vinden

### Svelte

#### `svelte-particles`

[![npm](https://img.shields.io/npm/v/svelte-particles)](https://www.npmjs.com/package/svelte-particles) [![npm downloads](https://img.shields.io/npm/dm/svelte-particles)](https://www.npmjs.com/package/svelte-particles)

Je kunt [hier](https://github.com/matteobruni/tsparticles/blob/main/components/svelte/traduction/README.nl.md) de
instructies vinden

### VueJS

#### `particles.vue`

[![npm](https://img.shields.io/npm/v/particles.vue)](https://www.npmjs.com/package/particles.vue) [![npm](https://img.shields.io/npm/dm/particles.vue)](https://www.npmjs.com/package/particles.vue)

Je kunt [hier](https://github.com/matteobruni/tsparticles/blob/main/components/vue/traduction/README.nl.md) de
instructies vinden

---

## Templates and Resources

Je kan wat tsParticles gerelateerde sjablonen [hier](https://github.com/tsparticles/templates) vinden. De sjablonen zijn
gemaakt voor *Vanilla Javascript*, *ReactJS*, *VueJS*, *Angular*, *SvelteJS* en andere raamwerken,

De sjablonen kunnen wat variëren, nieuwere kunnen worden gemaakt en ouderen geüpdated met de laatste features of
veranderd naar een betere stijl. Bekijk ze van tijd tot tijd.

Als je een goed design hebt gemaakt met *tsParticles*, maak gerust een pull request met je coole sjabloon. Je wordt
gecrediteerd als de auteur.

<https://github.com/tsparticles/templates>

---

## **_Demo / Generator_**

<https://particles.js.org/samples>

[![Particles demo](https://particles.js.org/images/demo2.png?v=1.39.1)](https://particles.js.org/samples)

---

### Characters als deeltjes

[![Particles chars demo](https://media.giphy.com/media/JsssOXz72bM6jGEZ0s/giphy.gif)](https://particles.js.org/samples#chars)

---

### Muis hover connecties

[![Particles mouse connections demo](https://media.giphy.com/media/XzvZThpVbxHxMYz5xt/giphy.gif)](https://particles.js.org/samples#connect)

---

### Polygon mask

[![tsParticles Polygon Mask demo](https://media.giphy.com/media/lNRfiSgaMFbL4FMhW6/giphy.gif)](https://particles.js.org/samples#polygonMask)

---

### Geanimeerde sterren

[![Particles NASA demo](https://media.giphy.com/media/cLqGsnh7FKRVMgPIWE/giphy.gif)](https://particles.js.org/samples#nasa)

---

### Nyan cat vliegt over

### Nyan cat flying on scrollende sterren

[![Particles Nyan Cat demo](https://media.giphy.com/media/LpX2oNc9ZMgIhIXQL9/giphy.gif)](https://particles.js.org/samples#nyancat2)

---

### Sneeuwvlokken

[![tsParticles Snow demo](https://media.giphy.com/media/gihwUFbmiubbkdzEMX/giphy.gif)](https://particles.js.org/samples#snow)

---

### Achtergrond masker deeltjes

[![tsParticles Background Mask demo](https://media.giphy.com/media/dWraWgqInWFGWiOyRu/giphy.gif)](https://particles.js.org/samples#background)

---

#### COVID-19 SARS-CoV-2 deeltjes

[![tsParticles COVID-19 demo](https://media.giphy.com/media/fsVN1ZHksgBIXNIbr1/giphy.gif)](https://particles.js.org/samples#virus)

_Klik niet! KLIK NIET! OH NEE HET VERSPREIDT!!!!_

**COVID-19 is een serieuze ziekte. Blijf alsjeblieft thuis, draag een masker en blijf gezond!**

---

**particles.json**

Je kan [hier](https://github.com/matteobruni/tsparticles/tree/main/website/presets) een voorbeeld configuratie vinden 📖

---

## **_Opties_**

You can find all options
available [here](https://particles.js.org/docs/interfaces/_options_interfaces_ioptions_.ioptions.html) vinden 📖

## Wil je dit in actie zien het uitproberen?

Ik heb een tsParticles collectie gemaakt op [CodePen](https://codepen.io/collection/DPOage) 😮 of je kan
mijn [profiel](https://codepen.io/matteobruni) bekijken.

Anders is er ook de demo pagina link hier onder. Klik/tap op de Coronavirus hier onder. Wees niet bang, **het is
veilig** 😷.

[![tsParticles demo](https://media.giphy.com/media/fsVN1ZHksgBIXNIbr1/giphy.gif)](https://particles.js.org/#virus)

Wil je ooit meer demo's zien? Kloon de repository op je computer en volg deze instructies

```shell
yarn install && yarn start
```

**Boem! 💥** <http://localhost:3000> en je kan de andere demo's bekijken.

_Als je moedig genoeg bent_ kan je wisselen naar de `dev` branch zodat je features kan proberen die in ontwikkeling
zijn.

## Afhankelijkheden

Je hebt waarschijnlijk de \* gezien naast vrij van afhankelijkheden. Bijna alle features werken zonder afhankelijkheden,
maar... er is een kleine maar. De **Polygon Mask** feature
vereist [`@tsparticles/pathseg`](https://npmjs.com/package/@tsparticles/pathseg) voor sommige browsers om goed te werken
en natuurlijk moeten de icon lettertypen (zoals `FontAwesome`) inbegrepen zijn op je pagina.

---

## Migrating from Particles.js

De **tsParticles** bibliotheek is volledig verenigbaar met de _particles.js_ configuratie.

Serieus, je hoeft alleen de script bron aan de passen et-voilà, **je bent klaar** 🧙!

Je kan **[hier](https://dev.to/matteobruni/migrating-from-particles-js-to-tsparticles-2a6m)** meer lezen.

Wil je 5 redenen hebben om over te
stappen? [Lees hier](https://dev.to/matteobruni/5-reasons-to-use-tsparticles-and-not-particles-js-1gbe)

_Hier onder kan je alle informatie vinden die je nodig hebt om tsParticles te installeren en gebruik te maken van de
nieuwe syntaxis._

---

## Plugins / Aanpassingen

tsParticles ondersteund nu wat aanpassingen 🥳.

**Je kan je eigen plugins maken**

_Lees meer [hier](https://particles.js.org/docs/modules/_core_interfaces_iplugin_.html)..._

---

### API Docs

Documentatie en ontwikkel verwijzingen [hier](https://particles.js.org/docs/) 📖
