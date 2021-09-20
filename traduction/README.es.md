[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles - Paticulas TypeScript

**Una ligera librería TypeScript para la creación de particulas. Libre de dependencias ([\*](#dependencies)) y listo
para el navegador!**

_[Particles.js](https://github.com/VincentGarreau/particles.js) convertido en TypeScript, libre de
dependencias ([\*](#dependencies)), mejorado con nuevas características geniales 😎 varios errores corregidos y **con
mantenimiento constante**!_

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles/badge?style=rounded)](https://www.jsdelivr.com/package/npm/tsparticles) [![Cdnjs](https://img.shields.io/cdnjs/v/tsparticles)](https://cdnjs.com/libraries/tsparticles) [![npmjs](https://badge.fury.io/js/tsparticles.svg)](https://www.npmjs.com/package/tsparticles) [![npm](https://img.shields.io/npm/dm/tsparticles)](https://www.npmjs.com/package/tsparticles) [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/) [![CodeFactor](https://www.codefactor.io/repository/github/matteobruni/tsparticles/badge)](https://www.codefactor.io/repository/github/matteobruni/tsparticles) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/b983aaf3461a4c48b1e2eecce1ff1d74)](https://www.codacy.com/manual/ar3s/tsparticles?utm_source=github.com&utm_medium=referral&utm_content=matteobruni/tsparticles&utm_campaign=Badge_Grade) [![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/matteobruni/tsparticles) [![Run on Repl.it](https://repl.it/badge/github/matteobruni/tsparticles)](https://repl.it/github/matteobruni/tsparticles)

## ¿Quieres usarlo en tu sitio web?

**Esta librería está disponible en los dos CDNs más populares. es fácil y está listo para usar, si haz utilizado
particles.js es incluso más fácil**.

Encontrarás las
instrucciones [abajo](https://github.com/matteobruni/tsparticles/blob/main/README.md#library-installation), con todos
los enlaces que necesites, y _no te asustes por **TypeScript**, es solo el lenguaje base_.

**Los archivos de salida son JavaScript puro**. 🤩

CDNs y `npm` contiene todas las fuentes que necesitas en **Javascript**, un paquete listo para el navegador (
tsparticles.min.js) y todos los archivos separados para la sintaxis `import`.

**Si aún estás interesado** algunas líneas de abajo contienen instrucciones para la migración desde la antigua librería
particles.js.

## **_Instalación de la librería_**

### **_Hosting / CDN_**

**_Por favor utiliza estos hosts o el tuyo propio para cargar tsParticles en tus proyectos_**

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

#### Import and require

Empezando desde la versión 1.12.11 `import` y `require` pueden ser usados para importar `tsParticles` .

Ahora puedes escribir algo como esto:

```javascript
const tsParticles = require("tsparticles");

// or

import {tsParticles} from "tsparticles-engine";
```

El `tsParticles` importado es la misma instancia que tienes cuando incluyes el script.

---

### **_NuGet_**

[![Nuget](https://img.shields.io/nuget/v/tsParticles)](https://www.nuget.org/packages/tsParticles/)

---

### **_Uso_**

Carga tsParticles y configura las particulas:

[![tsParticles demo](https://media.giphy.com/media/ftHwBpp3b0qNyCXRuu/giphy.gif)](https://particles.js.org)

**index.html**

```html

<div id="tsparticles"></div>

<script src="tsparticles.min.js"></script>
```

**app.js**

```javascript
// @path-json puede ser un objeto o un arreglo, el primero será cargado directamente, el objeto desde el arreglo será seleccionado aleatoriamente
/* tsParticles.loadJSON(@dom-id, @path-json, @callback (optional)); */

tsParticles
    .loadJSON("tsparticles", "presets/default.json")
    .then((container) => {
        console.log("callback - tsparticles config loaded");
    })
    .catch((error) => {
        console.error(error);
    });

//or

/* tsParticles.load(@dom-id, @options); */

tsParticles.load("tsparticles", {
    /* options here */
});

//or

/* tsParticles.loadFromArray(@dom-id, @options, @index (optional)); */

tsParticles.loadFromArray("tsparticles", [
    {
        /* options here */
    },
    {
        /* other options here */
    },
]);
//random object

tsParticles.loadFromArray(
    "tsparticles",
    [
        {
            /* options here */
        },
        {
            /* other options here */
        },
    ],
    1
); //El segundo
// Importante! Si el index no está en rango 0...<array.length, el index será ignorado.

// puede ser usado después de la inicialización.

/* tsParticles.setOnClickHandler(@callback); */

/* Esto será activado desde todas las particulas cargadas */

tsParticles.setOnClickHandler((event, particles) => {
    /* custom on click handler */
});

// ahora también puedes controlar las animaciones, es posible pausar y reproducir las animaciones
// estos métodos no cambian la configuración, todas tus configuraciones están a salvo
// domItem(0) retorna las primeras instancias tsParticles cargadas en el dom
const particles = tsParticles.domItem(0);

// play() reproducirá las animaciones,si el movimiento no está habilitado no se habilitará, solo actualiza el frame
particles.play();

// pause() detendrá las animaciones
particles.pause();
```

---

## Componentes oficiales para algunos de los frameworks más utilizados

### Angular

#### `ng-particles`

[![npm](https://img.shields.io/npm/v/ng-particles)](https://www.npmjs.com/package/ng-particles) [![npm](https://img.shields.io/npm/dm/ng-particles)](https://www.npmjs.com/package/ng-particles)

Puedes encontrar las
intrucciones [aqui](https://github.com/matteobruni/tsparticles/blob/main/components/angular/README.md)

### Inferno

#### `inferno-particles`

[![npm](https://img.shields.io/npm/v/inferno-particles)](https://www.npmjs.com/package/inferno-particles) [![npm](https://img.shields.io/npm/dm/inferno-particles)](https://www.npmjs.com/package/inferno-particles)

Puedes encontrar las
intrucciones [aqui](https://github.com/matteobruni/tsparticles/blob/main/components/inferno/README.md)

### jQuery

#### `jquery-particles`

[![npm](https://img.shields.io/npm/v/jquery-particles)](https://www.npmjs.com/package/jquery-particles) [![npm](https://img.shields.io/npm/dm/jquery-particles)](https://www.npmjs.com/package/jquery-particles)

Puedes encontrar las
intrucciones [aqui](https://github.com/matteobruni/tsparticles/blob/main/components/jquery/README.md)

### Preact

#### `preact-particles`

[![npm](https://img.shields.io/npm/v/preact-particles)](https://www.npmjs.com/package/preact-particles) [![npm](https://img.shields.io/npm/dm/preact-particles)](https://www.npmjs.com/package/preact-particles)

Puedes encontrar las
intrucciones [aqui](https://github.com/matteobruni/tsparticles/blob/main/components/preact/README.md)

### ReactJS

#### `react-tsparticles`

[![npm](https://img.shields.io/npm/v/react-tsparticles)](https://www.npmjs.com/package/react-tsparticles) [![npm](https://img.shields.io/npm/dm/react-tsparticles)](https://www.npmjs.com/package/react-tsparticles)

Puedes encontrar las
intrucciones [aqui](https://github.com/matteobruni/tsparticles/blob/main/components/react/README.md)

### Svelte

#### `svelte-particles`

[![npm](https://img.shields.io/npm/v/svelte-particles)](https://www.npmjs.com/package/svelte-particles) [![npm downloads](https://img.shields.io/npm/dm/svelte-particles)](https://www.npmjs.com/package/svelte-particles)

Puedes encontrar las
intrucciones [aqui](https://github.com/matteobruni/tsparticles/blob/main/components/svelte/README.md)

### VueJS 2.x

#### `particles.vue`

[![npm](https://img.shields.io/npm/v/particles.vue)](https://www.npmjs.com/package/particles.vue) [![npm](https://img.shields.io/npm/dm/particles.vue)](https://www.npmjs.com/package/particles.vue)

Puedes encontrar las intrucciones [aqui](https://github.com/matteobruni/tsparticles/blob/main/components/vue/README.md)

### VueJS 3.x

#### `particles.vue3`

[![npm](https://img.shields.io/npm/v/particles.vue3)](https://www.npmjs.com/package/particles.vue3) [![npm](https://img.shields.io/npm/dm/particles.vue3)](https://www.npmjs.com/package/particles.vue3)

Puedes encontrar las intrucciones [aqui](https://github.com/matteobruni/tsparticles/blob/main/components/vue3/README.md)

---

## Templates and Recursos

Puedes encontrar algunos templates relacionados con tsParticles [aqui](https://github.com/tsparticles/templates). Los
templates están creados para *Vanilla Javascript*, *ReactJS*, *VueJS*, *Angular*, *SvelteJS* y otros frameworks.

Los templates pueden variar, los nuevos pueden ser creados y los antiguos actualizados con las última características o
cambios para mejorar el estilo. Échales un vistazo de vez en cuando.

Si creas algun buen diseño con *tsParticles* eres libre de crear un pull request con tu diseño, te daremos crédito como
autor del template!

<https://github.com/tsparticles/templates>

---

## **_Demo / Generator_**

<https://particles.js.org/samples>

[![Particles demo](https://particles.js.org/images/demo.png?v=1.8.1)](https://particles.js.org/samples)

---

### Caracteres como particulas

[![Particles chars demo](https://media.giphy.com/media/JsssOXz72bM6jGEZ0s/giphy.gif)](https://particles.js.org/samples#chars)

---

### Mouse hover connections

[![Particles mouse connections demo](https://media.giphy.com/media/XzvZThpVbxHxMYz5xt/giphy.gif)](https://particles.js.org/samples#connect)

---

### Máscara Polígono

[![tsParticles Polygon Mask demo](https://media.giphy.com/media/lNRfiSgaMFbL4FMhW6/giphy.gif)](https://particles.js.org/samples#polygonMask)

---

### Estrellas animadas

[![Particles NASA demo](https://media.giphy.com/media/cLqGsnh7FKRVMgPIWE/giphy.gif)](https://particles.js.org/samples#nasa)

---

### Nyan cat volando sobre estrellas en movimiento

[![Particles Nyan Cat demo](https://media.giphy.com/media/LpX2oNc9ZMgIhIXQL9/giphy.gif)](https://particles.js.org/samples#nyancat2)

---

### Partículas de Nieve

[![tsParticles Snow demo](https://media.giphy.com/media/gihwUFbmiubbkdzEMX/giphy.gif)](https://particles.js.org/samples#snow)

---

### Partículas de máscara de Backgroun

[![tsParticles Background Mask demo](https://media.giphy.com/media/dWraWgqInWFGWiOyRu/giphy.gif)](https://particles.js.org/samples#background)

---

#### COVID-19 SARS-CoV-2 partículas

[![tsParticles COVID-19 demo](https://media.giphy.com/media/fsVN1ZHksgBIXNIbr1/giphy.gif)](https://particles.js.org/samples#virus)

_No hagas clic! NO HAGAS CLIC! OH NO SE ESTÁ PROPAGANDO!!!!_

**COVID-19 es una grave enfermedad. Por favor mantente en casa, utiliza mascarilla y mantente seguro!**

---

**particles.json**

Puede encontrar una configuración de
ejemplo [aqui](https://github.com/matteobruni/tsparticles/tree/main/website/presets) 📖

---

## **_Opciones_**

Puedes encontrar todas las opciones
disponibles [aqui](https://particles.js.org/docs/interfaces/_options_interfaces_ioptions_.ioptions.html) 📖

## ¿Quieres verlo en acción y probarlo?

He creado una colleción de tsParticles en [CodePen](https://codepen.io/collection/DPOage) 😮 or you can checkout
my [profile](https://codepen.io/matteobruni)

De lo contrario, está el enlace de la página de demostración a continuación. Sol haz clic/tap sobre el Coronavirus
abajo, no te asustes. **Es seguro** 😷.

[![tsParticles demo](https://media.giphy.com/media/fsVN1ZHksgBIXNIbr1/giphy.gif)](https://particles.js.org/#virus)

¿Quieres ver más demos? Clona el repositorio en tu ordenador y sigue estas instrucciones

```shell
yarn install && yarn start
```

**Boom! 💥** <http://localhost:3000> puedes revisar otros demos.

_Si eres valiente_ puedes cambiarte a la rama/branch `dev` para probar las características en desarrollo.

## Dependencias

Tal vez notaste el \* a lado de libre de dependencia. Bueno casi todas las características funcionan sin alguna
dependencia, pero... Bueno hay un pequeño pero. La característica **Máscara de Polígono**
requiere [`@tsparticles/pathseg`](https://npmjs.com/package/@tsparticles/pathseg) para funcionar en algunos navegadores,
y obviamente los Icon Fonts (como `FontAwesome` ) deben ser incluídos en tu página.

---

## Migrando desde Particles.js

La librería **tsParticles** es totalmente compatible con las configuraciones de _particles.js_.

En serio, solo necesitas cambiar la fuente del script y et-voilà, **estás listo** 🧙!

Puedes leer más **[aqui](https://dev.to/matteobruni/migrating-from-particles-js-to-tsparticles-2a6m)**

¿Quieres conocer 5 razones para
cambiarte? [Lee aqui](https://dev.to/matteobruni/5-reasons-to-use-tsparticles-and-not-particles-js-1gbe)

_Abajo puedes encontrar toda la información que necesitas para instalar tsParticles y su nueva sintaxis._

---

## Plugins/Personalizaciones

tsParticles ahora soporta algunas personalizaciones 🥳.

**Puedes crear tus propios plugins**

_Lee más [aqui](https://particles.js.org/docs/modules/_core_interfaces_iplugin_.html)..._

---

### API Docs

Documentación y Desarrollo referencias [aqui](https://particles.js.org/docs/) 📖

---

[![Slack](https://particles.js.org/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI) [![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles")

---

<p>  
    <a href="https://www.jetbrains.com/?from=tsParticles">  
        <img src="https://particles.js.org/images/jetbrains-logos/jetbrains-variant-4.png" height="150" alt="JetBrains" />  
    </a>  
    <a href="https://www.jetbrains.com/webstorm/?from=tsParticles">  
        <img src="https://particles.js.org/images/jetbrains-logos/webstorm_logos/logo.png" height="150" alt="JetBrains" />  
    </a>  
</p>

### ¡Muchas gracias a [JetBrains](https://www.jetbrains.com/?from=tsParticles) por la Licencia Open Source 2020!

[JetBrains WebStorm](https://www.jetbrains.com/webstorm/?from=tsParticles) es usado en el mantenimiento de este
proyecto.

### ¡Muchas gracias a [SauceLabs](https://saucelabs.com) por la Licencia Open Source!

<img alt="Testing Powered By SauceLabs" src="https://raw.githubusercontent.com/saucelabs/saucelabs.github.io/publish/images/opensauce/powered-by-saucelabs-badge-red.svg" width="250" />

