[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles - Частицы на TypeScript

** Легкая TypeScript библиотека для генерации частиц. Без внешних зависимостей ([\*](#dependencies)), готова к работе в
браузере!**

_[Библиотека Particles.js](https://github.com/VincentGarreau/particles.js) переведена на TypeScript, не содержит внешних
зависимостей ([\*](#dependencies)), дополнена новыми крутыми 😎 функциями и содержит исправления различных багов, и **
активно поддерживается**!_

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles/badge?style=rounded)](https://www.jsdelivr.com/package/npm/tsparticles) [![Cdnjs](https://img.shields.io/cdnjs/v/tsparticles)](https://cdnjs.com/libraries/tsparticles) [![npmjs](https://badge.fury.io/js/tsparticles.svg)](https://www.npmjs.com/package/tsparticles) [![npm](https://img.shields.io/npm/dm/tsparticles)](https://www.npmjs.com/package/tsparticles) [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/) [![CodeFactor](https://www.codefactor.io/repository/github/matteobruni/tsparticles/badge)](https://www.codefactor.io/repository/github/matteobruni/tsparticles) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/b983aaf3461a4c48b1e2eecce1ff1d74)](https://www.codacy.com/manual/ar3s/tsparticles?utm_source=github.com&utm_medium=referral&utm_content=matteobruni/tsparticles&utm_campaign=Badge_Grade) [![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/matteobruni/tsparticles)

## Хотите использовать эту библиотеку на своем сайте?

**Она доступна на двух самых главных CDNs, интутивно понята и готова к применению. Если вы ранее использовали
particles.js, то применять текущую версию еще проще.**.

Вы найдете инструкции [ниже](https://github.com/matteobruni/tsparticles/blob/main/README.md#library-installation),
включая все необходимые ссылки, и _не бойтесь **TypeScript**, он используется для исходного кода_.

**На выходе файлы переведены в JavaScript**. 🤩

CDNs и `npm` содержат все необходимые исходники в **JavaScript**, a бандл готов к работе в браузере (tsparticles.min.js)
и все файлы разделены для применения синтакса `import`.

**Если вам все еще интересно** ниже представлена инструкция по переходу со старой библиотеки particles.js.

## **_Установка библиотеки_**

### **_Хостинг / CDN_**

**_Пожалуйста, применяйте указанные хосты или свои собственные для загрузки tsParticles на своих проектах_**

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

#### Import и require

Начиная с версии 1.12.11 для загрузки `tsParticles` можно применять `import` и `require`.

Например, вы можете написать:

```JavaScript
const tsParticles = require("tsparticles");

// или

import {tsParticles} from "tsparticles-engine";
```

Загруженная сущность `tsParticles` является абсолютной копией кода, вызываемого при включении через скрипт.

---

### **_NuGet_**

[![Nuget](https://img.shields.io/nuget/v/tsParticles)](https://www.nuget.org/packages/tsParticles/)

---

### **_Применение_**

Загрузите tsParticles и настройте частицы:

[![Демо tsParticles](https://media.giphy.com/media/ftHwBpp3b0qNyCXRuu/giphy.gif)](https://particles.js.org)

**index.html**

```html

<div id="tsparticles"></div>

<script src="tsparticles.min.js"></script>
```

**app.js**

```JavaScript
// @path-json может быть объектом или массивом. В первом случае объект будет будет применен напрямую, а объект из массива будет выбран случайным образом
/* tsParticles.loadJSON(@dom-id, @path-json, @callback (необязателен)); */

tsParticles
    .loadJSON("tsparticles", "presets/default.json")
    .then((container) => {
        console.log("callback - tsparticles config loaded");
    })
    .catch((error) => {
        console.error(error);
    });

//или

/* tsParticles.load(@dom-id, @options); */

tsParticles.load("tsparticles", {
    /* Здесь указываем настройки */
});

//или

/* tsParticles.loadFromArray(@dom-id, @options, @index (необязателен)); */

tsParticles.loadFromArray("tsparticles", [
    {
        /* Здесь указываем настройки */
    },
    {
        /* а здесь указываем иные настройки */
    },
]);
//Выше будет использован случайно выбранный объект

tsParticles.loadFromArray(
    "tsparticles",
    [
        {
            /* Здесь указываем настройки */
        },
        {
            /* а здесь указываем иные настройки */
        },
    ],
    1
); //Выше будет использован второй набор настроек
// Важно! Если index не принадлежит диапозону 0 ... < длина массива, index будет проигнорирован.

// После инициализации мы можем использовать такой код.

/* tsParticles.setOnClickHandler(@callback); */

/* Этот код будет запущен для всех загруженных частиц */

tsParticles.setOnClickHandler((event, particles) => {
    /* настраиваемый обработчик событий по клику */
});

// Теперь вы также можете управлять анимацией, которую можно приостанавливать и возобновлять
// эти методы не переопределяют изначальные настройки, поэтому вы в безопасности с любыми настройками
// domItem(0) возвращает первый экземпляр tsParticles, загруженный в DOM
const particles = tsParticles.domItem(0);

// Метод play запустит анимации, если они не включенаф иначе он просто обновит кадр
particles.play();

// Метод pause остановит все анимации
particles.pause();
```

---

## Официально поддерживаемые компоненты для некоторых из наиболее часто используемых фреймворков

### Angular

#### `ng-particles`

[![npm](https://img.shields.io/npm/v/ng-particles)](https://www.npmjs.com/package/ng-particles) [![npm](https://img.shields.io/npm/dm/ng-particles)](https://www.npmjs.com/package/ng-particles)

[Здесь](https://github.com/matteobruni/tsparticles/blob/main/components/angular/README.md) вы можете ознакомиться с
инструкциями.

### Inferno

#### `inferno-particles`

[![npm](https://img.shields.io/npm/v/inferno-particles)](https://www.npmjs.com/package/inferno-particles) [![npm](https://img.shields.io/npm/dm/inferno-particles)](https://www.npmjs.com/package/inferno-particles)

[Здесь](https://github.com/matteobruni/tsparticles/blob/main/components/inferno/README.md) вы можете ознакомиться с
инструкциями.

### jQuery

#### `jquery-particles`

[![npm](https://img.shields.io/npm/v/jquery-particles)](https://www.npmjs.com/package/jquery-particles) [![npm](https://img.shields.io/npm/dm/jquery-particles)](https://www.npmjs.com/package/jquery-particles)

[Здесь](https://github.com/matteobruni/tsparticles/blob/main/components/jquery/README.md) вы можете ознакомиться с
инструкциями.

### Preact

#### `preact-particles`

[![npm](https://img.shields.io/npm/v/preact-particles)](https://www.npmjs.com/package/preact-particles) [![npm](https://img.shields.io/npm/dm/preact-particles)](https://www.npmjs.com/package/preact-particles)

[Здесь](https://github.com/matteobruni/tsparticles/blob/main/components/preact/README.md) вы можете ознакомиться с
инструкциями.

### ReactJS

#### `react-tsparticles`

[![npm](https://img.shields.io/npm/v/react-tsparticles)](https://www.npmjs.com/package/react-tsparticles) [![npm](https://img.shields.io/npm/dm/react-tsparticles)](https://www.npmjs.com/package/react-tsparticles)

[Здесь](https://github.com/matteobruni/tsparticles/blob/main/components/react/README.md) вы можете ознакомиться с
инструкциями.

### Svelte

#### `svelte-particles`

[![npm](https://img.shields.io/npm/v/svelte-particles)](https://www.npmjs.com/package/svelte-particles) [![npm downloads](https://img.shields.io/npm/dm/svelte-particles)](https://www.npmjs.com/package/svelte-particles)

[Здесь](https://github.com/matteobruni/tsparticles/blob/main/components/svelte/README.md) вы можете ознакомиться с
инструкциями.

### VueJS

#### `particles.vue`

[![npm](https://img.shields.io/npm/v/particles.vue)](https://www.npmjs.com/package/particles.vue) [![npm](https://img.shields.io/npm/dm/particles.vue)](https://www.npmjs.com/package/particles.vue)

[Здесь](https://github.com/matteobruni/tsparticles/blob/main/components/vue/README.md) вы можете ознакомиться с
инструкциями.

---

## Шаблоны и ресурсы

[Здесь](https://github.com/tsparticles/templates) вы сможете найти несколько шаблонов, связанных с tsParticles. Шаблоны
подготовлены для _чистого JavaScript_, _ReactJS_, _VueJS_, _Angular_, _SvelteJS_ и других фреймворков.

Шаблоны будут меняться: там могут быть добавлены новые, обновлены старые или переписаны в лучшем стиле. Проверяйте их
время от времени.

Если вы создали хороший дизайн с _tsParticles_, не стесняйтесь отправлять пул-реквест со своим классным шаблоном, вы
будете отмечены как автор шаблона!

<https://github.com/tsparticles/templates>

---

## **Демо / Генератор**

<https://particles.js.org/samples>

[![Демо частиц](https://particles.js.org/images/demo.png?v=1.8.1)](https://particles.js.org/samples)

---

### Символы в качестве частиц

[![Демо частиц в виде символов](https://media.giphy.com/media/JsssOXz72bM6jGEZ0s/giphy.gif)](https://particles.js.org/samples#chars)

---

### Соединения при наведении мыши

[![Демо соединения частиц при наведении мыши](https://media.giphy.com/media/XzvZThpVbxHxMYz5xt/giphy.gif)](https://particles.js.org/samples#connect)

---

### Многоугольная маска

[![Демо применения многоугольной маски tsParticles](https://media.giphy.com/media/lNRfiSgaMFbL4FMhW6/giphy.gif)](https://particles.js.org/samples#polygonMask)

---

### Анимация звезд

[![Демо частиц для NASA](https://media.giphy.com/media/cLqGsnh7FKRVMgPIWE/giphy.gif)](https://particles.js.org/samples#nasa)

---

### Летящая Nyan cat с анимацией звезд

[![Демо частиц и Nyan Cat](https://media.giphy.com/media/LpX2oNc9ZMgIhIXQL9/giphy.gif)](https://particles.js.org/samples#nyancat2)

---

### Снежинки

[![Демо снежинок на tsParticles](https://media.giphy.com/media/gihwUFbmiubbkdzEMX/giphy.gif)](https://particles.js.org/samples#snow)

---

### Частицы в виде фоновой маски

[![Демо фоновой маски в tsParticles](https://media.giphy.com/media/dWraWgqInWFGWiOyRu/giphy.gif)](https://particles.js.org/samples#background)

---

#### Частицы вида COVID-19 SARS-CoV-2

[![tsParticles COVID-19 demo](https://media.giphy.com/media/fsVN1ZHksgBIXNIbr1/giphy.gif)](https://particles.js.org/samples#virus)

_Не нажимайте! НЕ НАЖИМАЙТЕ! О НЕТ, ОНО РАСПРОСТРАНЯЕТСЯ!!!!_

**COVID-19 - это очень серьезное заболевание. Пожалуйста, оставайтесь дома, носите маску и будьте в безопасности!**

---

**particles.json**

[Здесь](https://github.com/matteobruni/tsparticles/tree/main/website/presets) вы сможете найти образец конфигурации 📖

---

## **_Параметры_**

[Здесь](https://particles.js.org/docs/interfaces/_options_interfaces_ioptions_.ioptions.html) вы сможете найти все
доступные варианты 📖

## Хотите увидеть библиотеку в действии и попробовать сами?

Я создал коллекцию tsParticles на [CodePen](https://codepen.io/collection/DPOage) 😮 или вы можете посмотреть
мой [профиль](https://codepen.io/matteobruni)

В ином случае есть ссылка на страницу с демо ниже. Просто нажмите / коснитесь на демо вируса ниже и не бойтесь. **Это
безопасно** 😷.

[![tsParticles демо](https://media.giphy.com/media/fsVN1ZHksgBIXNIbr1/giphy.gif)](https://particles.js.org/#virus)

Хотите посмотреть больше примеров? Склонируйте репозиторий к себе компьютер и следуйте этим инструкциям

```shell
yarn install && yarn start
```

**Бум! 💥** <http://localhost:3000> и вы сможете увидеть другие примеры.

_Если вы смелый_ переключитесь в ветку `dev`, чтобы опробовать функции в разработке.

## Зависимости

Вы могли заметить пометку, что библиотека \* практически не имеет зависимостей. Почти все функции работают без
каких-либо зависимостей, но ... но есть одно небольшое но. Функция **многоугольной маски**
требует [`@tsparticles/pathseg`](https://npmjs.com/package/@tsparticles/pathseg) для работы в некоторых браузерах, и
очевидно иконочные шрифты (например, `FontAwesome` ) должны присутствовать на вашей странице.

---

## Переход с Particles.js

Библиотека **tsParticles** полностью совместима с настройками _particles.js_.

На полном серьёзе, вам просто нужно изменить адрес скрипта и ВЖУХ, **готово** 🧙!

**[Здесь](https://dev.to/matteobruni/migrating-from-particles-js-to-tsparticles-2a6m)** вы можете прочитать подробнее

Хотите узнать 5 причин для
перехода? [Читать далее](https://dev.to/matteobruni/5-reasons-to-use-tsparticles-and-not-particles-js-1gbe)

_Ниже вы можете найти всю информацию, необходимую для установки tsParticles и его нового синтаксиса._

---

## Плагины / настройки

tsParticles поддерживает дополнительные настройки 🥳.

**Вы можете создавать свои собственные плагины**

_Подробности [здесь](https://particles.js.org/docs/modules/_core_interfaces_iplugin_.html)...\_

---

### API документация

[Здесь](https://particles.js.org/docs/) можно найти ссылки на документацию и разработки 📖

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

### Огромное спасибо [JetBrains](https://www.jetbrains.com/?from=tsParticles) за лицензию для открытого исходного кода!

[JetBrains WebStorm](https://www.jetbrains.com/webstorm/?from=tsParticles) применяется для поддержки этого проекта.

### Огромное спасибо [SauceLabs](https://saucelabs.com) за лицензию для открытого исходного кода!

<img alt="Тестирование проводится на основе SauceLabs" src="https://raw.githubusercontent.com/saucelabs/saucelabs.github.io/publish/images/opensauce/powered-by-saucelabs-badge-red.svg" width="250" />
