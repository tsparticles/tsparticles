[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles - TypeScript Particles

**Una biblioteca ligera hecha en TypeScript para crear partículas. ¡Libre de dependencias ([\*](#dependencias)) y lista
para usarse en el navegador!**

_[Particles.js](https://github.com/VincentGarreau/particles.js) portado a TypeScript, sin
dependencias ([\*](#dependencias)), mejorado con nuevas e increíbles 😎 características. ¡Varios errores han sido
resueltos y **en constante mantenimiento**!_

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles/badge?style=rounded)](https://www.jsdelivr.com/package/npm/tsparticles) [![Cdnjs](https://img.shields.io/cdnjs/v/tsparticles)](https://cdnjs.com/libraries/tsparticles) [![npmjs](https://badge.fury.io/js/tsparticles.svg)](https://www.npmjs.com/package/tsparticles) [![npm](https://img.shields.io/npm/dm/tsparticles)](https://www.npmjs.com/package/tsparticles) [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/) [![CodeFactor](https://www.codefactor.io/repository/github/matteobruni/tsparticles/badge)](https://www.codefactor.io/repository/github/matteobruni/tsparticles) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/b983aaf3461a4c48b1e2eecce1ff1d74)](https://www.codacy.com/manual/ar3s/tsparticles?utm_source=github.com&utm_medium=referral&utm_content=matteobruni/tsparticles&utm_campaign=Badge_Grade) [![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/matteobruni/tsparticles)

[![Slack](https://particles.js.org/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI) [![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## ¿Quieres usarlo en tu sitio web?

**Esta biblioteca está disponible a través de dos de los CDNs más populares, haciendo sencillo su uso. Si usaras
particles.js sería incluso aún más fácil.**

Podrás encontrar las instrucciones [más abajo](#instalación), con todos los enlaces que necesitas. Recuerda, _no dejes
que **TypeScript** te intimide, es solo el lenguaje del código fuente_.

**Los archivos de salida son simplemente JavaScript**. 🤩

Los CNDs y `npm` tienen todos los archivos que necesitas en **JavaScript**, así como un archivo con todo incluido listo
para usarse en el navegador (tsparticles.min.js) y todos los archivos separados por la sintáxis `import`.

**Si aún estás interesado**, unas líneas más abajo encontrarás instrucciones para migrar desde la anterior biblioteca
particles.js.

## **_Instalación_**

### **_Hosting / CDN_**

**_Por favor, utiliza las siguientes fuentes, o tu propio servidor para cargar tsParticles en tus proyectos._**

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

#### Import y require

A partir de la versión 1.12.11, puedes utilizar `import` y `require` para importar `tsParticles`.

Ahora, puedes escribir algo como esto

```javascript
const tsParticles = require("tsparticles");

// o

import {tsParticles} from "tsparticles-engine";
```

Al importar `tsParticles `, esa es la misma instancia que tienes al incluir el script.

---

### **_NuGet_**

[![Nuget](https://img.shields.io/nuget/v/tsParticles)](https://www.nuget.org/packages/tsParticles/)

---

### **_Uso_**

Carga tsParticles y configura las partículas:

[![tsParticles demo](https://media.giphy.com/media/ftHwBpp3b0qNyCXRuu/giphy.gif)](https://particles.js.org)

**index.html**

```html

<div id="tsparticles"></div>

<script src="tsparticles.min.js"></script>
```

**app.js**

```javascript
// @path-json puede ser un objeto o un arreglo, el primero va a cargarse directamente, el objeto en el arreglo va a ser elegido al azar.
/* tsParticles.loadJSON(@dom-id, @path-json, @callback (optional)); */

tsParticles
    .loadJSON("tsparticles", "presets/default.json")
    .then((container) => {
        console.log("callback - configuración de tsparticles cargada");
    })
    .catch((error) => {
        console.error(error);
    });

//or

/* tsParticles.load(@dom-id, @options); */

tsParticles.load("tsparticles", {
    /* aquí escribe las opciones */
});

//or

/* tsParticles.loadFromArray(@dom-id, @options, @index (optional)); */

tsParticles.loadFromArray("tsparticles", [
    {
        /* aquí escribe las opciones */
    },
    {
        /* otras opciones aquí */
    },
]);
//objeto al azar

tsParticles.loadFromArray(
    "tsparticles",
    [
        {
            /* aquí escribe las opciones */
        },
        {
            /* otras opciones aquí */
        },
    ],
    1
); //el segundo
// ¡Importante! Si el índice no se encuentra en el rango 0...<array.length, el índice va a ser ignorado.

// Esto se puede utilizar tras la inicialización.

/* tsParticles.setOnClickHandler(@callback); */

/* esto va a ejecutarse desde todas las partículas cargadas */

tsParticles.setOnClickHandler((event, particles) => {
    /* manejador para el evento al hacer click */
});

// ahora también es posible controlar las animaciones. Podemos pausar y continuar las
// animaciones. Estos métodos no cambian la configuración, por lo que tus configuraciones
// están seguras.
// domItem(0) regresa la primera instancia de tsParticles que ha sido cargada en el dom.
const particles = tsParticles.domItem(0);

// play va a comenzar las animaciones. Si el movimiento no está permitido, no lo va a permitir, solo actualiza el fotograma.
particles.play();

// pause va a detener las animaciones.
particles.pause();
```

---

## Componentes oficiales para los frameworks más populares

### Angular

#### `ng-particles`

[![npm](https://img.shields.io/npm/v/ng-particles)](https://www.npmjs.com/package/ng-particles) [![npm](https://img.shields.io/npm/dm/ng-particles)](https://www.npmjs.com/package/ng-particles)

Puedes encontrar las
instrucciones [aquí](https://github.com/matteobruni/tsparticles/blob/main/components/angular/README.md)

### Inferno

#### `inferno-particles`

[![npm](https://img.shields.io/npm/v/inferno-particles)](https://www.npmjs.com/package/inferno-particles) [![npm](https://img.shields.io/npm/dm/inferno-particles)](https://www.npmjs.com/package/inferno-particles)

Puedes encontrar las
instrucciones [aquí](https://github.com/matteobruni/tsparticles/blob/main/components/inferno/README.md)

### jQuery

#### `jquery-particles`

[![npm](https://img.shields.io/npm/v/jquery-particles)](https://www.npmjs.com/package/jquery-particles) [![npm](https://img.shields.io/npm/dm/jquery-particles)](https://www.npmjs.com/package/jquery-particles)

Puedes encontrar las
instrucciones [aquí](https://github.com/matteobruni/tsparticles/blob/main/components/jquery/README.md)

### Preact

#### `preact-particles`

[![npm](https://img.shields.io/npm/v/preact-particles)](https://www.npmjs.com/package/preact-particles) [![npm](https://img.shields.io/npm/dm/preact-particles)](https://www.npmjs.com/package/preact-particles)

Puedes encontrar las
instrucciones [aquí](https://github.com/matteobruni/tsparticles/blob/main/components/preact/README.md)

### ReactJS

#### `react-tsparticles`

[![npm](https://img.shields.io/npm/v/react-tsparticles)](https://www.npmjs.com/package/react-tsparticles) [![npm](https://img.shields.io/npm/dm/react-tsparticles)](https://www.npmjs.com/package/react-tsparticles)

Puedes encontrar las
instrucciones [aquí](https://github.com/matteobruni/tsparticles/blob/main/components/react/README.md)

### Svelte

#### `svelte-particles`

[![npm](https://img.shields.io/npm/v/svelte-particles)](https://www.npmjs.com/package/svelte-particles) [![npm downloads](https://img.shields.io/npm/dm/svelte-particles)](https://www.npmjs.com/package/svelte-particles)

Puedes encontrar las
instrucciones [aquí](https://github.com/matteobruni/tsparticles/blob/main/components/svelte/README.md)

### VueJS

#### `particles.vue`

[![npm](https://img.shields.io/npm/v/particles.vue)](https://www.npmjs.com/package/particles.vue) [![npm](https://img.shields.io/npm/dm/particles.vue)](https://www.npmjs.com/package/particles.vue)

Puedes encontrar las instrucciones [aquí](https://github.com/matteobruni/tsparticles/blob/main/components/vue/README.md)

---

## Plantillas y Recursos

Puedes encontrar algunas plantillas que incorporan tsParticles [aquí](https://github.com/tsparticles/templates). Las
plantillas están creadas en *Vanilla JavaScript*, *ReactJS*, *VueJS*, *Angular*, *SvelteJS* y otros frameworks.

Las plantillas pueden variar, pueden crearse nuevas o haber actualizaciones para antiguas, incorporando nuevas
características o mejores estilos. Revísalas de vez en cuando.

Si creaste un buen diseño que utiliza *tsParticles*, siéntete libre de enviar un pull request con tu increíble
plantilla, ¡se te dará reconocimiento por tu autoría!

<https://github.com/tsparticles/templates>

---

## **_Demo / Generador_**

<https://particles.js.org/samples>

[![Demo de partículas](https://particles.js.org/images/demo2.png?v=1.39.1)](https://particles.js.org/samples)

---

### Caracteres como partículas

[![Demo de letras como partículas](https://media.giphy.com/media/JsssOXz72bM6jGEZ0s/giphy.gif)](https://particles.js.org/samples#chars)

---

### Conecciones al pasar el mouse

[![Demo de conecciones con el mouse](https://media.giphy.com/media/XzvZThpVbxHxMYz5xt/giphy.gif)](https://particles.js.org/samples#connect)

---

### Máscara poligonal

[![Demo de máscara poligonal](https://media.giphy.com/media/lNRfiSgaMFbL4FMhW6/giphy.gif)](https://particles.js.org/samples#polygonMask)

---

### Estrellas animadas

[![Demo de partículas NASA](https://media.giphy.com/media/cLqGsnh7FKRVMgPIWE/giphy.gif)](https://particles.js.org/samples#nasa)

---

### Nyan cat volando a través de estrellas desplazándose

[![Demo de partículas con Nyan cat](https://media.giphy.com/media/LpX2oNc9ZMgIhIXQL9/giphy.gif)](https://particles.js.org/samples#nyancat2)

---

### Partículas de nieve

[![Demo de partículas de nieve](https://media.giphy.com/media/gihwUFbmiubbkdzEMX/giphy.gif)](https://particles.js.org/samples#snow)

---

### Partículas como máscara para el fondo

[![Demo de máscara del fondo](https://media.giphy.com/media/dWraWgqInWFGWiOyRu/giphy.gif)](https://particles.js.org/samples#background)

---

#### Partículas de COVID-19 SARS-CoV-2

[![Demo de partículas COVID-19](https://media.giphy.com/media/fsVN1ZHksgBIXNIbr1/giphy.gif)](https://particles.js.org/samples#virus)

_¡No hagas click! ¡NO HAGAS CLICK! OH NO ¡¡¡SE ESPARCE!!!_

**COVID-19 es una enfermedad de seriedad. Por favor, ¡quédate en casa, utiliza mascarilla y mantente seguro!**

---

**particles.json**

Puedes encontrar un ejemplo de
configuración [aquí](https://github.com/matteobruni/tsparticles/tree/main/website/presets) 📖

---

## **_Opciones_**

Puedes encontrar todas las opciones
disponibles [aquí](https://particles.js.org/docs/interfaces/_options_interfaces_ioptions_.ioptions.html) 📖

## ¿Quieres verlo en acción y probarlo?

He creado una colección de tsParticles en [CodePen](https://codepen.io/collection/DPOage) 😮 o puedes revisar
mi [perfil](https://codepen.io/matteobruni)

Si no, hay una página de demostración en el enlace debajo. Solo da click/toca el Coronavirus debajo, sin miedo. **Es
seguro** 😷.

[![Demo tsParticles](https://media.giphy.com/media/fsVN1ZHksgBIXNIbr1/giphy.gif)](https://particles.js.org/#virus)

¿Quieres ver aún más demostraciones? Clona el repositorio en tu computadora y sigue estas instrucciones

```shell
yarn install && yarn start
```

**¡Boom! 💥** <http://localhost:3000> para ver más demostraciones.

_Si eres lo suficientemente valiente_ puedes moverte a la rama `dev` para probar nuevas características que aún están en
desarrollo.

## Dependencias

Puedes haber notado el \* al lado de "libre de dependencias". Pues casi todas las características funcionan si alguna
dependencia, pero... Hay una pequeña excepción. La **Máscara Poligonal**
requiere [`@tsparticles/pathseg`](https://npmjs.com/package/@tsparticles/pathseg) para funcionar apropiadamente en
algunos navegadores, y obviamente la fuente para íconos (como `FontAwesome`) debe estar incluida en tu página.

---

## Migración desde Particles.js

La biblioteca **tsParticles** es completamente compatible con la configuración de _particles.js_.

En serio, sólo necesitas cambiar el archivo fuente y voilà, **está listo** 🧙!

Puedes leer más al respecto **[aquí](https://dev.to/matteobruni/migrating-from-particles-js-to-tsparticles-2a6m)**

¿Quieres saber 5 razones para hacer el
cambio? [Leé aquí](https://dev.to/matteobruni/5-reasons-to-use-tsparticles-and-not-particles-js-1gbe)

_Debajo puedes encontrar toda la información que necesitas para instalar tsParticles y su nueva sintáxis._

---

## Plugins/Personalización

tsParticles ahora soporta personalizaciones 🥳.

**Puedes crear tus propios plugins**

_Leé más [aquí](https://particles.js.org/docs/modules/_core_interfaces_iplugin_.html)..._

---

### Documentación de la API

Documentación y referencias del Desarrollo [aquí](https://particles.js.org/docs/) 📖
