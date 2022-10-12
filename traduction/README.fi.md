[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles - TypeScript Partikkelit/Hiukkaset

**Kevyt TypeScript kirjasto partikkeleiden/hiukkasten luomiseen. Riippuvuus vapaa (\*), selain valmis ja yhteensopiva
React.js, Vue.js (2.x and 3.x), Angular, Svelte, jQuery, Preact, Inferno, Riot.js, Solid.js, sekä Web komponenttejen
kanssa**

[![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni?style=for-the-badge)](https://github.com/sponsors/matteobruni)
[![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hm/tsparticles?style=for-the-badge)](https://www.jsdelivr.com/package/npm/tsparticles)
[![Cdnjs](https://img.shields.io/cdnjs/v/tsparticles-engine?style=for-the-badge)](https://cdnjs.com/libraries/tsparticles)
[![npm](https://img.shields.io/npm/v/tsparticles-engine?style=for-the-badge)](https://www.npmjs.com/package/tsparticles)
[![npm](https://img.shields.io/npm/dm/tsparticles?style=for-the-badge)](https://www.npmjs.com/package/tsparticles)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff?style=for-the-badge)](https://lerna.js.org/)
[![CodeFactor](https://www.codefactor.io/repository/github/matteobruni/tsparticles/badge)](https://www.codefactor.io/repository/github/matteobruni/tsparticles)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b983aaf3461a4c48b1e2eecce1ff1d74)](https://www.codacy.com/manual/ar3s/tsparticles?utm_source=github.com&utm_medium=referral&utm_content=matteobruni/tsparticles&utm_campaign=Badge_Grade)
[![Rate this package](https://badges.openbase.com/js/rating/tsparticles.svg?style=openbase&token=A9jHQ1nkb6fnCndKM7O2w4hx3OD8PVCuqHtSpw8mMOg=)](https://openbase.com/js/tsparticles?utm_source=embedded&utm_medium=badge&utm_campaign=rating-badge&utm_term=js/tsparticles)
[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/matteobruni/tsparticles)
[![Run on Repl.it](https://repl.it/badge/github/matteobruni/tsparticles)](https://repl.it/github/matteobruni/tsparticles)

[![Discord](https://img.shields.io/discord/872061157379301416?label=discord&logo=discord&logoColor=white&style=for-the-badge)](https://discord.gg/hACwv45Hme)
[![Slack](https://particles.js.org/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI)
[![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)
[![Reddit](https://img.shields.io/reddit/subreddit-subscribers/tsParticles?style=for-the-badge)](https://www.reddit.com/r/tsParticles/)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles")
[![Buy Me A Coffee](https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00")](https://www.buymeacoffee.com/matteobruni)

---

## Sisällysluettelo

⚠️⚠️ _Tämä readme viittaa **v2** versioon, [täältä](https://github.com/matteobruni/tsparticles/tree/v1#readme)
löytyy version **v1** dokumentaatio_ ⚠️⚠️

- [Käyttö verkkosivullasi](#Haluatko-käyttää-tsPartikkeleita-verkkosivullasi?)
    - [Kirjaston asennus](#Kirjaston-asennus)
- [Viralliset komponentit käytetyimpiin kehyksiin (framework)](#Viralliset-komponentit-käyteyimpiin-kehyksiin-(frameworkkeihin))
    - [Angular](#Angular)
    - [Inferno](#Inferno)
    - [jQuery](#jQuery)
    - [Preact](#Preact)
    - [ReactJS](#ReactJS)
    - [RiotJS](#RiotJS)
    - [SolidJS](#SolidJS)
    - [Svelte](#Svelte)
    - [VueJS 2.x](#VueJS-2.x)
    - [VueJS 3.x](#VueJS-3.x)
    - [Web Komponentit](#Web-Komponentit)
    - [WordPress](#WordPress)
    - [Elementor](#Elementor)
- [Valmiit mallit](#Valmiit-mallit)
    - [Suuret ympyrät](#Suuret-ympyrät)
    - [Kuplat](#Kuplat)
    - [Konfetti](#Konfetti)
    - [Tuli](#Tuli)
    - [Tulikärpäset](#Tulikärpäset)
    - [Ilotulitukset](#Ilotulitukset)
    - [Suihkulähde](#Suihkulähde)
    - [Linkit](#Linkit)
    - [Merivuokko](#Merivuokko)
    - [Lumisade](#Lumisade)
    - [Tähdet](#Tähdet)
    - [Kolmiot](#Kolmiot)
- [Mallit ja Resurssit](#Mallit-ja-Resurssit)
- [Demo / Generaattori](#**_Demo-/-Generaattori_**)
    - [Hahmot partikkeleina](#Hahmot-partikkeleina)
    - [Kursorin seuraaminen](#Hiiren-hover-yhteydet)
    - [Monikulmio maski](#Monikulmio-maski)
    - [Animoidut tähdet](#Animoidut-tähdet)
    - [Nyan kissa lentää avaruudeessa](#Nyan-kissa-lentämässä-avaruudessa)
    - [Taustan maski partikkelit](#Taustan-maski-partikkelit)
- [Video Tutoriaalit](#**_Video-Tutoriaalit_**)
- [Siirtyminen Particles.js:stä](#Migrating-from-Particlesjs)
- [Lisäosat/Kustomointi](#PluginsCustomizations)
- [Riippuvuus kuvaaja](#Dependency-Graphs)
- [Sponsorit](#Sponsors)

---

## Haluatko käyttää tsPartikkeleita verkkosivullasi?

_Dokumentaatio ja kehitysviittaukset läytyvät [täältä](https://particles.js.org/docs/) 📖_

**Tämä kirjasto on saatavilla kahdessa suosituimmassa CDN:ssä, se on helppo ja käyttövalmis, jos käytit aikaisemmin
particles.js:ää käyttöönotto on vieläkin helpompaa**.

Ohjeet löytyvät [alta](https://github.com/matteobruni/tsparticles/blob/main/README.md#library-installation),
kaikkine linkkeineen, ja _elä pelkää **TypeScriptiä**, se on vain lähdekoodin kieli_.

**Buildatut lopputulokset ovat normaalia JavaScriptiä**. 🤩

CDN ja `npm` sisältävät kaikki tarvitavat **Javascript** sourcet, selain valmis paketti (tsparticles.engine.min.js)
ja kaikki tiedostot jaettu `import` syntaksissa.

**Jos olet kiinostunut** [alla](https://github.com/matteobruni/tsparticles/blob/main/README.md#library-installation)
on _yksinkertaisia ohjeita_, jotka auttavat sinua siirtymään tsPartikkeleihin vanhasta particles.js kirjastosta.

## **_Kirjaston asennus_**

### **_Hosting / CDN_**

**_Käytä näitä tai hostaa omat ladataksesi tsParticles projekteihisi_**

#### jsDelivr

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-engine/badge)](https://www.jsdelivr.com/package/npm/tsparticles-engine)
[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-slim/badge)](https://www.jsdelivr.com/package/npm/tsparticles-slim)
[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles/badge)](https://www.jsdelivr.com/package/npm/tsparticles)

#### cdnjs

[![Cdnjs](https://img.shields.io/cdnjs/v/tsparticles)](https://cdnjs.com/libraries/tsparticles)

#### unpkg

<https://unpkg.com/tsparticles-engine/> <https://unpkg.com/tsparticles-slim/> <https://unpkg.com/tsparticles/>

---

### **_npm_**

*tsParticles Engine*

[![npm](https://img.shields.io/npm/v/tsparticles-engine?style=for-the-badge)](https://www.npmjs.com/package/tsparticles-engine) [![npmjs](https://img.shields.io/npm/dt/tsparticles-engine?style=for-the-badge)](https://www.npmjs.com/package/tsparticles-engine)

*tsParticles Slim*

[![npm](https://img.shields.io/npm/v/tsparticles-slim?style=for-the-badge)](https://www.npmjs.com/package/tsparticles-slim) [![npmjs](https://img.shields.io/npm/dt/tsparticles-slim?style=for-the-badge)](https://www.npmjs.com/package/tsparticles-slim)

*tsParticles*

[![npm](https://img.shields.io/npm/v/tsparticles?style=for-the-badge)](https://www.npmjs.com/package/tsparticles) [![npmjs](https://img.shields.io/npm/dt/tsparticles?style=for-the-badge)](https://www.npmjs.com/package/tsparticles)

```shell
npm install tsparticles-engine
```

### **_yarn_**

```shell
yarn add tsparticles-engine
```

### **_pnpm_**

```shell
pnpm install tsparticles-engine
```

#### Import ja require

Alkaen versiosta 1.12.11 `import` ja `require` voidaan käyttää `tsParticlesin` lisäämiseksi.

Voit kirjoitta esimerkisi:

```javascript
const tsParticles = require("tsparticles-engine");

// tai

import { tsParticles } from "tsparticles-engine";
```

Tuotu/Importattu `tsParticles` on sama esiintymä/instance, joka sinulla on, kun sisällytät/include skriptin.

---

### **_NuGet_**

[![Nuget](https://img.shields.io/nuget/v/tsParticles?style=for-the-badge)](https://www.nuget.org/packages/tsParticles/)

---

### **_Käyttö_**

Lataa tsParticles kirjaston ja konfiguroi partikkelit:

[![tsParticles demo](https://media.giphy.com/media/ftHwBpp3b0qNyCXRuu/giphy.gif)](https://particles.js.org)

**index.html**

```html

<div id="tsparticles"></div>

<script src="tsparticles.engine.min.js"></script>
```

**app.js**

```javascript
// @path-json voi olla objekti tai taulukko, objekti ladataan suoraan, mutta taulukosta valitaan satunnainen objekti
/* tsParticles.loadJSON(@dom-id, @path-json, @callback (optional)); */

tsParticles
    .loadJSON("tsparticles", "presets/default.json")
    .then((container) => {
        console.log("callback - tsparticles config loaded");
    })
    .catch((error) => {
        console.error(error);
    });

//tai

/* tsParticles.load(@dom-id, @options); */

tsParticles.load("tsparticles", {
    /* asetukset tänne */
});

//tai

/* tsParticles.loadFromArray(@dom-id, @options, @index (optional)); */

tsParticles.loadFromArray("tsparticles", [
    {
        /* asetukset tänne */
    },
    {
        /* muut asetukset tänne */
    },
]);
//random objekti

tsParticles.loadFromArray(
    "tsparticles",
    [
        {
            /* asetukset tänne */
        },
        {
            /* muut asetukset tänne */
        },
    ],
    1
); //the second one
// Tärkeää! Jos indeksi ei ole välillä 0...<array.length, indeksiä ei huomioida.

// tätä voidaan käyttää alustuksen jälkee.

/* tsParticles.setOnClickHandler(@callback); */

/* tämä laukaistaan/fired  kaikista ladatuista partikkeleista */

tsParticles.setOnClickHandler((event, particles) => {
    /* kustom on click käsittelijä */
});

// Nyt voit myös hallita animaatioita kuten keskeyttää ja jatkaa niitä
// Nämä metodit eivät muuta konfiguraatiota
// domItem(0) palauttaa ensimmäisen ladatun tsParticles-instanssin dom:ista
const particles = tsParticles.domItem(0);

// aloittaa animaation suorituksen, jos liike ei ole käytössä, tämä metodi ei käynnistä liikettä, vaan vain päivittää ruudun
particles.play();

// pause lopettaa animaation suorituksen
particles.pause();
```

---

## Viralliset komponentit käyteyimpiin kehyksiin (frameworkkeihin)

### Angular

`ng-particles`

[![npm](https://img.shields.io/npm/v/ng-particles?style=for-the-badge)](https://www.npmjs.com/package/ng-particles) [![npm](https://img.shields.io/npm/dm/ng-particles?style=for-the-badge)](https://www.npmjs.com/package/ng-particles)

Ohjeita löytyy [täältä](https://github.com/matteobruni/tsparticles/blob/main/components/angular/README.md)

### Inferno

`inferno-particles`

[![npm](https://img.shields.io/npm/v/inferno-particles?style=for-the-badge)](https://www.npmjs.com/package/inferno-particles) [![npm](https://img.shields.io/npm/dm/inferno-particles?style=for-the-badge)](https://www.npmjs.com/package/inferno-particles)

Ohjeita löytyy [täältä](https://github.com/matteobruni/tsparticles/blob/main/components/inferno/README.md)

### jQuery

`jquery-particles`

[![npm](https://img.shields.io/npm/v/jquery-particles?style=for-the-badge)](https://www.npmjs.com/package/jquery-particles) [![npm](https://img.shields.io/npm/dm/jquery-particles?style=for-the-badge)](https://www.npmjs.com/package/jquery-particles)

Ohjeita löytyy [täältä](https://github.com/matteobruni/tsparticles/blob/main/components/jquery/README.md)

### Preact

`preact-particles`

[![npm](https://img.shields.io/npm/v/preact-particles?style=for-the-badge)](https://www.npmjs.com/package/preact-particles) [![npm](https://img.shields.io/npm/dm/preact-particles?style=for-the-badge)](https://www.npmjs.com/package/preact-particles)

Ohjeita löytyy [täältä](https://github.com/matteobruni/tsparticles/blob/main/components/preact/README.md)

### ReactJS

`react-particles`

[![npm](https://img.shields.io/npm/v/react-particles?style=for-the-badge)](https://www.npmjs.com/package/react-particles) [![npm](https://img.shields.io/npm/dm/react-particles?style=for-the-badge)](https://www.npmjs.com/package/react-particles)

Ohjeita löytyy [täältä](https://github.com/matteobruni/tsparticles/blob/main/components/react/README.md)

### RiotJS

#### `riot-particles`

[![npm](https://img.shields.io/npm/v/riot-particles?style=for-the-badge)](https://www.npmjs.com/package/riot-particles) [![npm](https://img.shields.io/npm/dm/riot-particles?style=for-the-badge)](https://www.npmjs.com/package/riot-particles)

Ohjeita löytyy [täältä](https://github.com/matteobruni/tsparticles/blob/main/components/riot/README.md)

### SolidJS

#### `solid-particles`

[![npm](https://img.shields.io/npm/v/solid-particles?style=for-the-badge)](https://www.npmjs.com/package/solid-particles) [![npm](https://img.shields.io/npm/dm/solid-particles?style=for-the-badge)](https://www.npmjs.com/package/solid-particles)

Ohjeita löytyy [täältä](https://github.com/matteobruni/tsparticles/blob/main/components/solid/README.md)

### Svelte

`svelte-particles`

[![npm](https://img.shields.io/npm/v/svelte-particles?style=for-the-badge)](https://www.npmjs.com/package/svelte-particles) [![npm downloads](https://img.shields.io/npm/dm/svelte-particles?style=for-the-badge)](https://www.npmjs.com/package/svelte-particles)

Ohjeita löytyy [täältä](https://github.com/matteobruni/tsparticles/blob/main/components/svelte/README.md)

### VueJS 2.x

`vue2-particles`

[![npm](https://img.shields.io/npm/v/vue2-particles?style=for-the-badge)](https://www.npmjs.com/package/vue2-particles) [![npm](https://img.shields.io/npm/dm/vue2-particles?style=for-the-badge)](https://www.npmjs.com/package/vue2-particles)

Ohjeita löytyy [täältä](https://github.com/matteobruni/tsparticles/blob/main/components/vue/README.md)

### VueJS 3.x

`vue3-particles`

[![npm](https://img.shields.io/npm/v/vue3-particles?style=for-the-badge)](https://www.npmjs.com/package/vue3-particles) [![npm](https://img.shields.io/npm/dm/vue3-particles?style=for-the-badge)](https://www.npmjs.com/package/vue3-particles)

Ohjeita löytyy [täältä](https://github.com/matteobruni/tsparticles/blob/main/components/vue3/README.md)

### Web Komponentit

#### `web-particles`

[![npm](https://img.shields.io/npm/v/web-particles?style=for-the-badge)](https://www.npmjs.com/package/web-particles) [![npm](https://img.shields.io/npm/dm/web-particles?style=for-the-badge)](https://www.npmjs.com/package/web-particles)

Löydät ojeet [täältä](https://github.com/matteobruni/tsparticles/blob/main/components/web/README.md)

### WordPress

#### `wordpress-particles`

[![npm](https://img.shields.io/npm/v/wordpress-particles?style=for-the-badge)](https://www.npmjs.com/package/wordpress-particles) [![npm](https://img.shields.io/npm/dm/wordpress-particles?style=for-the-badge)](https://www.npmjs.com/package/wordpress-particles) [![WordPress Plugin Downloads](https://img.shields.io/wordpress/plugin/dw/tsparticles-block?style=for-the-badge)](https://wordpress.org/plugins/tsparticles-block/) [![WordPress Plugin Active Installs](https://img.shields.io/wordpress/plugin/installs/tsparticles-block?style=for-the-badge)](https://wordpress.org/plugins/tsparticles-block/)

WordPress.org-laajennussivu löytyy [täältä](https://wordpress.org/plugins/tsparticles-block/#description)

### Elementor

Virallista tsParticles lisäosaa ei ole, mutta teen yhteistyötä `Premium Addons for Elementor` lisäosa kokoelman kanssa.

<div style="float: left; margin-right: 10px;">
    <img width="64" alt="Premium Addons for Elementor" src="https://particles.js.org/images/premium-addons-wordpress-plugin.png" />
</div>
<div>
    Premium Addons for Elementor is one of the most common plugins for Elementor that offers more than 55 highly customizable Elementor Widgets and Section Add-ons. tsParticles is exclusively included in Premium Particles Section Add-on for Elementor Page Builder. <a href="https://premiumaddons.com/particles-section-addon-for-elementor-page-builder/" target="_blank">Check It Now</a>.<br />
    Use Premium Addons for Elementor Page Builder and get the chance to include tsParticles in your next WordPress website without the need to write a single line of code. <a href="https://premiumaddons.com/particles-section-addon-for-elementor-page-builder/" target="_blank">See a Live Example</a>.
</div>
<div style="clear: both;"></div>

---

## Valmiit mallit

Alla joitain valmiita malleja. Niissä on myös mukana tiedostot, joissa kaikki tarvittava suoritusta varten

### Suuret ympyrät

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-preset-big-circles/badge)](https://www.jsdelivr.com/package/npm/tsparticles-preset-big-circles) [![npmjs](https://badge.fury.io/js/tsparticles-preset-big-circles.svg)](https://www.npmjs.com/package/tsparticles-preset-big-circles) [![npmjs](https://img.shields.io/npm/dt/tsparticles-preset-big-circles)](https://www.npmjs.com/package/tsparticles-preset-big-circles)

Tämä malli luo suuria värikkäitä ympyröitä, jotka liikkuvat ylöspäin valkoisella taustalla.

[![demo](https://raw.githubusercontent.com/matteobruni/tsparticles/main/presets/bigCircles/images/sample.png)](https://particles.js.org/samples/presets/bigCircles)

Ohjeet löytyvät [täältä](https://github.com/matteobruni/tsparticles/blob/main/presets/bigCircles/README.md)

### Kuplat

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-preset-bubbles/badge)](https://www.jsdelivr.com/package/npm/tsparticles) [![npmjs](https://badge.fury.io/js/tsparticles-preset-bubbles.svg)](https://www.npmjs.com/package/tsparticles-preset-bubbles) [![npmjs](https://img.shields.io/npm/dt/tsparticles-preset-bubbles)](https://www.npmjs.com/package/tsparticles-preset-bubbles)

Tämä malli luo värikkäitä kuplia, jotka nousevat alhaalta ylös valkealla taustalla.

[![demo](https://raw.githubusercontent.com/matteobruni/tsparticles/main/presets/bubbles/images/sample.png)](https://particles.js.org/samples/presets/bubbles)

Ohjeet löytyvät [täältä](https://github.com/matteobruni/tsparticles/blob/main/presets/bubbles/README.md)

### Konfetti

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-preset-confetti/badge)](https://www.jsdelivr.com/package/npm/tsparticles-preset-confetti) [![npmjs](https://badge.fury.io/js/tsparticles-preset-confetti.svg)](https://www.npmjs.com/package/tsparticles-preset-confetti) [![npmjs](https://img.shields.io/npm/dt/tsparticles-preset-confetti)](https://www.npmjs.com/package/tsparticles-preset-confetti)

Tämä malli luo valkoisia ja punaisia konfetteja, jotka laukaistaan keskeltä läpinäkyvää näyttöä
(muiden verkkosivun elementtejen päällä)

[![demo](https://raw.githubusercontent.com/matteobruni/tsparticles/main/presets/confetti/images/sample.png)](https://particles.js.org/samples/presets/confetti)

Ohjeet löytyvät [täältä](https://github.com/matteobruni/tsparticles/blob/main/presets/confetti/README.md)

### Tuli

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-preset-fire/badge)](https://www.jsdelivr.com/package/npm/tsparticles-preset-fire) [![npmjs](https://badge.fury.io/js/tsparticles-preset-fire.svg)](https://www.npmjs.com/package/tsparticles-preset-fire) [![npmjs](https://img.shields.io/npm/dt/tsparticles-preset-fire)](https://www.npmjs.com/package/tsparticles-preset-fire)

Tämä malli luo puna-mustan himmeän taustan sekä tulen ja tuhkan värisiä hiukkaisa.

[![demo](https://raw.githubusercontent.com/matteobruni/tsparticles/main/presets/fire/images/sample.png)](https://particles.js.org/samples/presets/fire)

Ohjeet löytyvät [täältä](https://github.com/matteobruni/tsparticles/blob/main/presets/fire/README.md)

### Tulikärpäset

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-preset-firefly/badge)](https://www.jsdelivr.com/package/npm/tsparticles-preset-firefly) [![npmjs](https://badge.fury.io/js/tsparticles-preset-firefly.svg)](https://www.npmjs.com/package/tsparticles-preset-firefly) [![npmjs](https://img.shields.io/npm/dt/tsparticles-preset-firefly)](https://www.npmjs.com/package/tsparticles-preset-firefly)

Tämä malli luo kursoria seuraavia pieniä himmeneviä tulikärpäsiltä näyttäviä hiukkasia.

[![demo](https://raw.githubusercontent.com/matteobruni/tsparticles/main/presets/firefly/images/sample.png)](https://particles.js.org/samples/presets/firefly)

Ohjeet löytyvät [täältä](https://github.com/matteobruni/tsparticles/blob/main/presets/firefly/README.md)

### Ilotulitukset

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-preset-fireworks/badge)](https://www.jsdelivr.com/package/npm/tsparticles-preset-fireworks) [![npmjs](https://badge.fury.io/js/tsparticles-preset-fireworks.svg)](https://www.npmjs.com/package/tsparticles-preset-fireworks) [![npmjs](https://img.shields.io/npm/dt/tsparticles-preset-fireworks)](https://www.npmjs.com/package/tsparticles-preset-fireworks)

Tämä malli lataa kauniin ilotulitusefektin.

[![demo](https://raw.githubusercontent.com/matteobruni/tsparticles/main/presets/fireworks/images/sample.png)](https://particles.js.org/samples/presets/fireworks)

Ohjeet löytyvät [täältä](https://github.com/matteobruni/tsparticles/blob/main/presets/fireworks/README.md)

### Suihkulähde

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-preset-fountain/badge)](https://www.jsdelivr.com/package/npm/tsparticles-preset-fountain) [![npmjs](https://badge.fury.io/js/tsparticles-preset-fountain.svg)](https://www.npmjs.com/package/tsparticles-preset-fountain) [![npmjs](https://img.shields.io/npm/dt/tsparticles-preset-fountain)](https://www.npmjs.com/package/tsparticles-preset-fountain)

[![demo](https://raw.githubusercontent.com/matteobruni/tsparticles/main/presets/fountain/images/sample.png)](https://particles.js.org/samples/presets/fountain)

Ohjeet löytyvät [täältä](https://github.com/matteobruni/tsparticles/blob/main/presets/fountain/README.md)

### Linkit

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-preset-links/badge)](https://www.jsdelivr.com/package/npm/tsparticles-preset-links) [![npmjs](https://badge.fury.io/js/tsparticles-preset-links.svg)](https://www.npmjs.com/package/tsparticles-preset-links) [![npmjs](https://img.shields.io/npm/dt/tsparticles-preset-links)](https://www.npmjs.com/package/tsparticles-preset-links)

[![demo](https://raw.githubusercontent.com/matteobruni/tsparticles/main/presets/links/images/sample.png)](https://particles.js.org/samples/presets/links)

Ohjeet löytyvät [täältä](https://github.com/matteobruni/tsparticles/blob/main/presets/links/README.md)

### Merivuokko

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-preset-sea-anemone/badge)](https://www.jsdelivr.com/package/npm/tsparticles-preset-sea-anemone) [![npmjs](https://badge.fury.io/js/tsparticles-preset-sea-anemone.svg)](https://www.npmjs.com/package/tsparticles-preset-sea-anemone) [![npmjs](https://img.shields.io/npm/dt/tsparticles-preset-sea-anemone)](https://www.npmjs.com/package/tsparticles-preset-sea-anemone)

[![demo](https://raw.githubusercontent.com/matteobruni/tsparticles/main/presets/seaAnemone/images/sample.png)](https://particles.js.org/samples/presets/seaAnemone)

Ohjeet löytyvät [täältä](https://github.com/matteobruni/tsparticles/blob/main/presets/seaAnemone/README.md)

### Lumi

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-preset-snow/badge)](https://www.jsdelivr.com/package/npm/tsparticles-preset-snow) [![npmjs](https://badge.fury.io/js/tsparticles-preset-snow.svg)](https://www.npmjs.com/package/tsparticles-preset-snow) [![npmjs](https://img.shields.io/npm/dt/tsparticles-preset-snow)](https://www.npmjs.com/package/tsparticles-preset-snow)

[![demo](https://raw.githubusercontent.com/matteobruni/tsparticles/main/presets/snow/images/sample.png)](https://particles.js.org/samples/presets/snow)

Ohjeet löytyvät [täältä](https://github.com/matteobruni/tsparticles/blob/main/presets/snow/README.md)

### Tähdet

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-preset-stars/badge)](https://www.jsdelivr.com/package/npm/tsparticles-preset-stars) [![npmjs](https://badge.fury.io/js/tsparticles-preset-stars.svg)](https://www.npmjs.com/package/tsparticles-preset-stars) [![npmjs](https://img.shields.io/npm/dt/tsparticles-preset-stars)](https://www.npmjs.com/package/tsparticles-preset-stars)

[![demo](https://raw.githubusercontent.com/matteobruni/tsparticles/main/presets/stars/images/sample.png)](https://particles.js.org/samples/presets/stars)

Ohjeet löytyvät [täältä](https://github.com/matteobruni/tsparticles/blob/main/presets/stars/README.md)

### Kolmiot

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-preset-triangles/badge?style=for-the-badge)](https://www.jsdelivr.com/package/npm/tsparticles-preset-triangles) [![npmjs](https://badge.fury.io/js/tsparticles-preset-triangles.svg)](https://www.npmjs.com/package/tsparticles-preset-triangles) [![npmjs](https://img.shields.io/npm/dt/tsparticles-preset-triangles)](https://www.npmjs.com/package/tsparticles-preset-triangles)

[![demo](https://raw.githubusercontent.com/matteobruni/tsparticles/main/presets/triangles/images/sample.png)](https://particles.js.org/samples/presets/triangles)

Ohjeet löytyvät [täältä](https://github.com/matteobruni/tsparticles/blob/main/presets/triangles/README.md)

---

## Mallit ja Resurssit

[Täältä](https://github.com/tsparticles/templates) löytyy tsPartikkeleihin liittyviä malleja. Malleja on luotu
_Vanilla Javascript_, _ReactJS_, _VueJS_, _Angular_, _SvelteJS_ ja muille suosituille kehyksille (frameworks).

Mallit vaihtelevat, uusia tulee ja vanhoja päivittää uusimmilla ominaisuuksilla tai niiden tyyliä päivitetään.
Tarkista ne silloin tällöin.

Jos teet hienoja _tsPartikkeli_ malleja, olisi mahtavaa jos osallistuisit ja loisit siitä pull requestin.
Sinut merkitään mallin tekijäksi.

<https://github.com/tsparticles/templates>

---

## **_Demo / Generaattori_**

<https://particles.js.org/samples>

[![Partikkeli demo](https://particles.js.org/images/demo2.png?v=1.39.1)](https://particles.js.org/samples)

---

## **_Video Tutoriaalit_**

Löydät kaikki video tutoriialit täältä: <https://particles.js.org/video.html>

*Lisää videoita tulossa pian! Tarkista päivittäin, onko uutta sisältöä tullut.*

---

### Hahmot partikkeleina

[![Particles chars demo](https://media.giphy.com/media/JsssOXz72bM6jGEZ0s/giphy.gif)](https://particles.js.org/samples/#chars)

---

### Hiiren hover yhteydet

[![Particles mouse connections demo](https://media.giphy.com/media/XzvZThpVbxHxMYz5xt/giphy.gif)](https://particles.js.org/samples#connect)

---

### Monikulmio maski

[![tsParticles Polygon Mask demo](https://media.giphy.com/media/lNRfiSgaMFbL4FMhW6/giphy.gif)](https://particles.js.org/samples/#polygonMask)

---

### Animoidut tähdet

[![Particles NASA demo](https://media.giphy.com/media/cLqGsnh7FKRVMgPIWE/giphy.gif)](https://particles.js.org/samples/#nasa)

---

### Nyan kissa lentämässä avaruudessa

[![Particles Nyan Cat demo](https://media.giphy.com/media/LpX2oNc9ZMgIhIXQL9/giphy.gif)](https://particles.js.org/samples/#nyancat2)

---

### Lumisade

[![tsParticles Snow demo](https://media.giphy.com/media/gihwUFbmiubbkdzEMX/giphy.gif)](https://particles.js.org/samples/#snow)

---

### Taustan maski partikkelit

[![tsParticles Background Mask demo](https://media.giphy.com/media/dWraWgqInWFGWiOyRu/giphy.gif)](https://particles.js.org/samples/#background)

---

**particles.json**

Löydät konfiguraatio
esimerkkejä [täältä](https://github.com/matteobruni/tsparticles/tree/main/websites/particles.js.org/presets) 📖

---

## **_Parametrit/Asetukset_**

Kaikki käytettävissä olevat parametrit ja niiden dokumentaatio
löytyy [täältä](https://particles.js.org/docs/interfaces/Options_Interfaces_IOptions.IOptions.html) 📖

## Haluatko kokeilla tsPartikkeleita livenä?

Olen luonnut [CodePen](https://codepen.io/collection/DPOage) kokoelman 😮
tai voit käydä katsomassa myös minun [profiilini](https://codepen.io/matteobruni)

Muussa tapauksessa klikkaa alla olevaa koronavirusta. Ei tarvitse pelätä, **se on turvallista** 😷.

[![tsParticles demo](https://media.giphy.com/media/fsVN1ZHksgBIXNIbr1/giphy.gif)](https://particles.js.org/samples/#virus)

Haluatko nähdä vielä lisää demoja? Kloonaa repo tietokoneellesi ja seuraa näitä ohjeita

```shell
$ pnpm i
$ npx lerna run build
$ cd demo/vanilla
$ pnpm run start
```

**Boom! 💥** surffaa osoitteeseen <http://localhost:3000> ja näe kaikki muut demot.

_Jos olet tarpeeksi rohkea_ voit vaihtaa `dev` branchiin ja kokeilla nyt kehitettäviä uusia demoja.

---

## Siirtyminen Particles.js:stä

**tsParticles** paketti tekee tästä kirjastosta 100% yhteensopivan _particles.js_ konfiguraation kanssa.

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles-particles.js/badge?style=rounded)](https://www.jsdelivr.com/package/npm/tsparticles-particles.js) [![npmjs](https://badge.fury.io/js/tsparticles-particles.js.svg)](https://www.npmjs.com/package/tsparticles-particles.js) [![npm](https://img.shields.io/npm/dm/tsparticles-particles.js)](https://www.npmjs.com/package/tsparticles-particles.js)

Oikeasti, sinun täytyy vain vaihtaa particles.js scripti mukana tulevaan yhteensopivuuspakettiin, et-voilà, **valmista
tuli** 🧙!

lisätietoa löytyy **[täältä](https://dev.to/matteobruni/migrating-from-particles-js-to-tsparticles-2a6m)**

Etkö ole vielä vakuuttunut?[Tässä](https://dev.to/matteobruni/5-reasons-to-use-tsparticles-and-not-particles-js-1gbe)
5 syytä tsParticlesiin siirtymiseen

_Alta löydät kaikki tiedot, joita tarvitset tsParticlesin ja uuden syntaksin asentamiseen._

---

## Lisäosat/Kustomointi

tsParticles tukee kustomointia 🥳.

**Voit luoda omia lisäosia**

_Lisätietoa [täältä](https://particles.js.org/docs/modules/Core_Interfaces_IPlugin.html)..._

---

## Riippuvuus kuvaaja

```mermaid
flowchart TD

subgraph c [Components]
ca[Angular]
ci[Inferno.js]
cj[JQuery]
cp[Preact]
cre[React.js]
cri[Riot.js]
cso[Solid.js]
csv[Svelte]
cv2[Vue.js 2.x]
cv3[Vue.js 3.x]
cw[Web Components]
end

e[tsParticles Engine] --> c
```

```mermaid
flowchart LR

subgraph b [Bundles]
bp[Particles.js compatibility bundle] --> bs[tsParticles Slim]
bs --> bf[tsParticles]
end

e[tsParticles Engine] --> b

iea & iebo & iebu & iec & ieg & iepa & iepu & ierem & ierep --> bs
ipa & ipc & ipl --> bs
mb & mp --> bs
sc & si & sl & sp & ssq & sst & st --> bs
ua & uc & ul & uop & uou & usi & ust --> bs

iet --> bf
pla & ple & plp --> bf
ur & uti & utw & uw --> bf

subgraph i [Interactions]

subgraph ie [Externals]
iea[Attract]
iebo[Bounce]
iebu[Bubble]
iec[Connect]
ieg[Grab]
iepa[Pause]
iepu[Push]
ierem[Remove]
ierep[Repulse]
iet[Trail]
end

il[Light]

subgraph ip [Particles]
ipa[Attract]
ipc[Collisions]
ipl[Links]
ipr[Repulse]
end

end

i --> ie
i --> ip

e --> i

subgraph m [Movers]
mb[Base]
mp[Parallax]
end

e --> m

subgraph pa [Paths]
pac[Curves]
pape[Perlin Noise]
papo[Polygon]
pas[Simplex Noise]
end

e --> pa

subgraph pl [Plugins]
pla[Absorbers]
ple[Emitters]
pli[Infection]
plp[Polygon Mask]
end

e --> pl

subgraph s [Shapes]
sb[Bubble]
sc[Circle]
sh[Heart]
si[Image]
sl[Line]
sm[Multiline Text]
sp[Polygon]
sr[Rounded Rectangle]
ssp[Spiral]
ssq[Square]
sst[Star]
st[Text]
end

e --> s

subgraph u [Updaters]
ua[Angle]
uc[Color]
ug[Gradient]
ul[Life]
uop[Opacity]
uor[Orbit]
uou[Out Modes]
ur[Roll]
usi[Size]
ust[Stroke Color]
uti[Tilt]
utw[Twinkle]
uw[Wobble]
end

e --> u

subgraph pr [Presets]
prbi[Big Circles]
prbu[Bubbles]
prc[Confetti]
prf[Fire]
prff[Firefly]
prfw[Fireworks]
prfo[Fountain]
prl[Links]
prsa[Sea Anemone]
prsn[Snow]
prst[Stars]
prt[Triangles]
end

e --> pr
```

---

<p>  
    <a href="https://www.jetbrains.com/?from=tsParticles">  
        <img src="https://raw.githubusercontent.com/matteobruni/tsparticles/gh-pages/images/jetbrains-logos/jetbrains-variant-4.png" height="150" alt="JetBrains" />  
    </a>  
    <a href="https://www.jetbrains.com/webstorm/?from=tsParticles">  
        <img src="https://raw.githubusercontent.com/matteobruni/tsparticles/gh-pages/images/jetbrains-logos/logo.png" height="150" alt="JetBrains" />  
    </a>  
</p>

### Suuret kiitokset [JetBrains](https://www.jetbrains.com/?from=tsParticles) vuosien 2020-2022 avoimen lähdekoodin lisensseistä!

[JetBrains WebStormia](https://www.jetbrains.com/webstorm/?from=tsParticles) käytetään tämän projektin ylläpitämiseen.

---

## Sponsorit

<p>
  <a href="https://www.codacy.com">
    <img src="https://particles.js.org/images/codacy-logos/codacy-white.jpeg" alt="Codacy" height="100" />
  </a>
</p>

[Codacy](https://www.codacy.com) on alusta, joka auttaa sinua havaitsemaan ja korjaamaan koodissa esiintyviä
laatuongelmia.

**Automatisoi koodintarkistukset commiteille ja pull requesteille**

Tarkista koodisi laatu ja pidä kirjaa yli 40 ohjelmointikielen teknisistä veloistasi. Saumaton
integraatio kehitystyöhösi.
