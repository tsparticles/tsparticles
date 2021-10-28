[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles - Partículas TypeScript

**Uma biblioteca TypeScript leve para criação de partículas. Livre de dependências (\*), pronta para o navegador e compatível com
React.js, Vue.js (2.x e 3.x), Angular, Svelte, jQuery, Preact, Inferno, Riot.js, Solid.js, e Web Components**

[![Rate on Openbase](https://badges.openbase.com/js/rating/tsparticles.svg)](https://openbase.com/js/tsparticles?utm_source=embedded&utm_medium=badge&utm_campaign=rate-badge) [![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles/badge?style=rounded)](https://www.jsdelivr.com/package/npm/tsparticles) [![Cdnjs](https://img.shields.io/cdnjs/v/tsparticles)](https://cdnjs.com/libraries/tsparticles) [![npmjs](https://badge.fury.io/js/tsparticles.svg)](https://www.npmjs.com/package/tsparticles) [![npm](https://img.shields.io/npm/dm/tsparticles)](https://www.npmjs.com/package/tsparticles) [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/) [![CodeFactor](https://www.codefactor.io/repository/github/matteobruni/tsparticles/badge)](https://www.codefactor.io/repository/github/matteobruni/tsparticles) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/b983aaf3461a4c48b1e2eecce1ff1d74)](https://www.codacy.com/manual/ar3s/tsparticles?utm_source=github.com&utm_medium=referral&utm_content=matteobruni/tsparticles&utm_campaign=Badge_Grade) [![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/matteobruni/tsparticles) [![Run on Repl.it](https://repl.it/badge/github/matteobruni/tsparticles)](https://repl.it/github/matteobruni/tsparticles)

<a href = "https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI"> <img src = "https://particles.js.org/images/slack.png"> </a> <a href = "https://discord.gg/hACwv45Hme"> <img src = "https://particles.js.org/images/discord.png" height = "38px"> </a> <a href = "https://t.me/tsparticles"> <img src = "https://particles.js.org/images/telegram.png" width = "41px" height = "41px"> </a>

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles")

---

## Índice

- [Utilize no seu website](#Deseja-utilizá-la-no-seu-website)
  - [Instalação da biblioteca](#Instalação-da-biblioteca)
- [Componentes oficiais para algumas das frameworks mais utilizadas](#Componentes-oficiais-para-algumas-das-frameworks-mais-utilizadas)
  - [Angular](#Angular)
  - [Inferno](#Inferno)
  - [jQuery](#jQuery)
  - [Preact](#Preact)
  - [ReactJS](#ReactJS)
  - [Svelte](#Svelte)
  - [VueJS 2.x](#VueJS-2x)
  - [VueJS 3.x](#VueJS-3x)
  - [WordPress](#WordPress)
- [Modelos e Recursos](#Modelos-e-Recursos)
- [Demo / Gerador](#Demo--Gerador)

  - [Caracteres como partículas](#Caracteres-como-partículas)
  - [Ligações ao passar o rato](#Ligações-ao-passar-o-rato)
  - [Máscara de polígonos](#Máscara-de-polígonos)
  - [Estrelas animadas](#Estrelas-animadas)
  - [Gato Nyan a voar sobre estrelas passantes](#Gato-Nyan-a-voar-sobre-estrelas-passantes)
  - [Partículas de neve](#Partículas-de-neve)
  - [Partículas de máscara de fundo](#Partículas-de-máscara-de-fundo)
  - [Partículas COVID-19 SARS-CoV-2](#Partículas-COVID-19-SARS-CoV-2)

- [Migrar de Particles.js](#Migrar-de-Particles.js)

- [Plugins/Personalizações](#PluginsPersonalizações)

## Deseja utilizá-la no seu website?

_Referências de documentação e desenvolvimento [aqui](https://particles.js.org/docs/) 📖_

**Esta biblioteca encontra-se disponível nos dois CDNs mais populares e é fácil e pronta a utilizar, se estava a utilizar particles.js
ainda é mais fácil**.

Irá encontrar as
instruções [abaixo](https://github.com/matteobruni/tsparticles/blob/main/README.md#library-installation), com todas as
links que necessita, e _não se assuste com **TypeScript**, é apenas a linguagem fonte_.

**Os ficheiros finais são apenas JavaScript**. 🤩

CDNs e `npm` têm todos os recursos que necessita em **Javascript**, um pacote pronto para o navegador (tsparticles.min.js) e todos os
ficheiros separados para a sintaxe `import`.

**Se estiver interessado** existem umas _instruções simples_ já [abaixo](https://github.com/matteobruni/tsparticles/blob/main/README.md#library-installation) para guiá-lo na migração da velha biblioteca particles.js.

## **_Instalação da biblioteca_**

### **_Hosting / CDN_**

**_Por favor utilize estes hosts ou o seu próprio para carregar tsParticles nos seus projetos_**

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

#### Import e require

A partir da versão 1.12.11 `import` e `require` podem ser utilizados para importar `tsParticles` .

Agora pode escrever algo deste género

```javascript
const tsParticles = require('tsparticles')

// ou

import { tsParticles } from 'tsparticles-engine'
```

A `tsParticles` importada é a mesma instância que tem quando inclui o script.

---

### **_NuGet_**

[![Nuget](https://img.shields.io/nuget/v/tsParticles)](https://www.nuget.org/packages/tsParticles/)

---

### **_Utilização_**

Carregue `tsParticles` e configure as partículas:

[![tsParticles demo](https://media.giphy.com/media/ftHwBpp3b0qNyCXRuu/giphy.gif)](https://particles.js.org)

**index.html**

```html
<div id="tsparticles"></div>

<script src="tsparticles.min.js"></script>
```

**app.js**

```javascript
// @path-json pode ser um objeto ou uma array, o primeiro será carregado diretamente, o objeto da array será aleatoriamente selecionado
/* tsParticles.loadJSON(@dom-id, @path-json, @callback (opcional)); */

tsParticles
  .loadJSON('tsparticles', 'presets/default.json')
  .then(container => {
    console.log('callback - configuração tsparticles carregada')
  })
  .catch(error => {
    console.error(error)
  })

//ou

/* tsParticles.load(@dom-id, @options); */

tsParticles.load('tsparticles', {
  /* opções aqui */
})

//ou

/* tsParticles.loadFromArray(@dom-id, @options, @index (opcional)); */

tsParticles.loadFromArray('tsparticles', [
  {
    /* opções aqui */
  },
  {
    /* outras opções aqui */
  }
])
//objeto aleatório

tsParticles.loadFromArray(
  'tsparticles',
  [
    {
      /* opções aqui */
    },
    {
      /* outras opções aqui */
    }
  ],
  1
) //o segundo
// Importante! Se o index não estiver no range 0...<array.length, o index será ignorado.

// após a inicialização isto pode ser utilizado.

/* tsParticles.setOnClickHandler(@callback); */

/* isto será disparado por todas as partículas carregadas */

tsParticles.setOnClickHandler((event, particles) => {
  /* handler personalizado no clique */
})

// agora também poderá controlar as animações, é possível pausar e retomar as animações
// estes métodos não alteram a configuração por isso todas as suas configurações estarão salvaguardadas
// domItem(0) retorna a primeira instância tsParticles carregada no dom
const particles = tsParticles.domItem(0)

// play irá iniciar as animações, se o movimento não estiver ativo ele não será ativado, apenas irá atualizar a frame
particles.play()

// pause irá parar todas as animações
particles.pause()
```

---

## Componentes oficiais para algumas das frameworks mais utilizadas

### Angular

#### `ng-particles`

[![npm](https://img.shields.io/npm/v/ng-particles)](https://www.npmjs.com/package/ng-particles) [![npm](https://img.shields.io/npm/dm/ng-particles)](https://www.npmjs.com/package/ng-particles)

Poderá encontrar as instruções [aqui](https://github.com/matteobruni/tsparticles/blob/main/components/angular/README.md)

### Inferno

#### `inferno-particles`

[![npm](https://img.shields.io/npm/v/inferno-particles)](https://www.npmjs.com/package/inferno-particles) [![npm](https://img.shields.io/npm/dm/inferno-particles)](https://www.npmjs.com/package/inferno-particles)

Poderá encontrar as instruções [aqui](https://github.com/matteobruni/tsparticles/blob/main/components/inferno/README.md)

### jQuery

#### `jquery-particles`

[![npm](https://img.shields.io/npm/v/jquery-particles)](https://www.npmjs.com/package/jquery-particles) [![npm](https://img.shields.io/npm/dm/jquery-particles)](https://www.npmjs.com/package/jquery-particles)

Poderá encontrar as instruções [aqui](https://github.com/matteobruni/tsparticles/blob/main/components/jquery/README.md)

### Preact

#### `preact-particles`

[![npm](https://img.shields.io/npm/v/preact-particles)](https://www.npmjs.com/package/preact-particles) [![npm](https://img.shields.io/npm/dm/preact-particles)](https://www.npmjs.com/package/preact-particles)

Poderá encontrar as instruções [aqui](https://github.com/matteobruni/tsparticles/blob/main/components/preact/README.md)

### ReactJS

#### `react-tsparticles`

[![npm](https://img.shields.io/npm/v/react-tsparticles)](https://www.npmjs.com/package/react-tsparticles) [![npm](https://img.shields.io/npm/dm/react-tsparticles)](https://www.npmjs.com/package/react-tsparticles)

Poderá encontrar as instruções [aqui](https://github.com/matteobruni/tsparticles/blob/main/components/react/README.md)

### Svelte

#### `svelte-particles`

[![npm](https://img.shields.io/npm/v/svelte-particles)](https://www.npmjs.com/package/svelte-particles) [![npm downloads](https://img.shields.io/npm/dm/svelte-particles)](https://www.npmjs.com/package/svelte-particles)

Poderá encontrar as instruções [aqui](https://github.com/matteobruni/tsparticles/blob/main/components/svelte/README.md)

### VueJS 2.x

#### `particles.vue`

[![npm](https://img.shields.io/npm/v/particles.vue)](https://www.npmjs.com/package/particles.vue) [![npm](https://img.shields.io/npm/dm/particles.vue)](https://www.npmjs.com/package/particles.vue)

Poderá encontrar as instruções [aqui](https://github.com/matteobruni/tsparticles/blob/main/components/vue/README.md)

### VueJS 3.x

#### `particles.vue3`

[![npm](https://img.shields.io/npm/v/particles.vue3)](https://www.npmjs.com/package/particles.vue3) [![npm](https://img.shields.io/npm/dm/particles.vue3)](https://www.npmjs.com/package/particles.vue3)

Poderá encontrar as instruções [aqui](https://github.com/matteobruni/tsparticles/blob/main/components/vue3/README.md)

### WordPress

Na verdade não existe um plugin oficial `tsParticles`, mas tenho uma colaboração com
a coleção de plugins `Premium Addons for Elementor`.

<div style="float: left; margin-right: 10px;">
    <img width="64" alt="Premium Addons for Elementor" src="https://particles.js.org/images/premium-addons-wordpress-plugin.png" />
</div>
<div>
    Premium Addons for Elementor é um dos plugins mais comuns para Elementor que oferece mais de 55 Elementor Widgets e Section Add-ons altamente customizáveis. `tsParticles` está exclusivamente incluido no Premium Particles Section Add-on for Elementor Page Builder. <a href="https://premiumaddons.com/particles-section-addon-for-elementor-page-builder/" target="_blank">Ver Agora</a>.<br />
    Utilize o Premium Addons for Elementor Page Builder e tenha a oportunidade de incluir `tsParticles` no seu próximo website WordPress sem necessitar de escrever uma única linha de código. <a href="https://premiumaddons.com/particles-section-addon-for-elementor-page-builder/" target="_blank">Ver um Exemplo Live</a>.
</div>
<div style="clear: both;"></div>

---

## Modelos e Recursos

Pode encontrar alguns modelos relacionados com `tsParticles` [aqui](https://github.com/tsparticles/templates). Os modelos são
criados para _Vanilla Javascript_, _ReactJS_, _VueJS_, _Angular_, _SvelteJS_ e outras frameworks.

Os modelos irão variar, serão criados novos e antigos serão atualizados com as últimas funcionalidades ou alterados para um estilo melhor. Dê uma vista de olhos de vez em quando.

Caso tenha criado um bom design com `tsParticles` sinta-se à vontade para submeter um pull request com o seu modelo interessante, será
creditado como o autor do modelo!

<https://github.com/tsparticles/templates>

---

## **_Demo / Gerador_**

<https://particles.js.org/samples>

[![Particles demo](https://particles.js.org/images/demo.png?v=1.8.1)](https://particles.js.org/samples)

---

### Caracteres como partículas

[![Particles chars demo](https://media.giphy.com/media/JsssOXz72bM6jGEZ0s/giphy.gif)](https://particles.js.org/samples#chars)

---

### Ligações ao passar o rato

[![Particles mouse connections demo](https://media.giphy.com/media/XzvZThpVbxHxMYz5xt/giphy.gif)](https://particles.js.org/samples#connect)

---

### Máscara de polígonos

[![tsParticles Polygon Mask demo](https://media.giphy.com/media/lNRfiSgaMFbL4FMhW6/giphy.gif)](https://particles.js.org/samples#polygonMask)

---

### Estrelas animadas

[![Particles NASA demo](https://media.giphy.com/media/cLqGsnh7FKRVMgPIWE/giphy.gif)](https://particles.js.org/samples#nasa)

---

### Gato Nyan a voar sobre estrelas passantes

[![Particles Nyan Cat demo](https://media.giphy.com/media/LpX2oNc9ZMgIhIXQL9/giphy.gif)](https://particles.js.org/samples#nyancat2)

---

### Partículas de neve

[![tsParticles Snow demo](https://media.giphy.com/media/gihwUFbmiubbkdzEMX/giphy.gif)](https://particles.js.org/samples#snow)

---

### Partículas de máscara de fundo

[![tsParticles Background Mask demo](https://media.giphy.com/media/dWraWgqInWFGWiOyRu/giphy.gif)](https://particles.js.org/samples#background)

---

### Partículas COVID-19 SARS-CoV-2

[![tsParticles COVID-19 demo](https://media.giphy.com/media/fsVN1ZHksgBIXNIbr1/giphy.gif)](https://particles.js.org/samples#virus)

_Não clique! NÃO CLIQUE! OH NÃO ESTÁ-SE A ESPALHAR!!!!_

**COVID-19 é uma doença séria. Por favor fique em casa, utilize máscara e mantenha-se seguro!**

---

**particles.json**

Pode encontrar uns exemplos de configuração [aqui](https://github.com/matteobruni/tsparticles/tree/main/website/presets) 📖

---

## **_Opções_**

Pode encontrar todas as opções
disponíveis [aqui](https://particles.js.org/docs/interfaces/Options_Interfaces_IOptions.IOptions.html) 📖

## Gostaria de ver em ação e experimentar?

Criei uma coleção `tsParticles` no [CodePen](https://codepen.io/collection/DPOage) 😮 ou pode verificar o
meu [perfil](https://codepen.io/matteobruni)

Caso contrário há uma link para uma página de demonstração abaixo. Basta clicar/tocar no Coronavirus abaixo, não tenha medo. **É seguro** 😷.

[![tsParticles demo](https://media.giphy.com/media/fsVN1ZHksgBIXNIbr1/giphy.gif)](https://particles.js.org/#virus)

Deseja ver ainda mais demos? Clone o repositório para o seu computador e siga estas instruções

```shell
yarn install && yarn start
```

**Boom! 💥** <http://localhost:3000> e poderá ver outros demos.

_Se for corajoso o suficiente_ poderá mudar para o branch `dev` para experimentar as funcionalidades em desenvolvimento.

---

## Migrar de Particles.js

A biblioteca `tsParticles` é totalmente compatível com a configuração _particles.js_.

A sério, basta alterar a origem do script et-voilà, **está pronto** 🧙!

Pode ler mais **[aqui](https://dev.to/matteobruni/migrating-from-particles-js-to-tsparticles-2a6m)**

Gostaria de saber 5 razões para
mudar? [Leia aqui](https://dev.to/matteobruni/5-reasons-to-use-tsparticles-and-not-particles-js-1gbe)

_Abaixo poderá encontrar toda a informação que necessita para instalar `tsParticles` e a sua nova sintaxe._

---

## Plugins/Personalizações

tsParticles agora suporta algumas personalizações 🥳.

**Pode criar os seus próprios plugins**

_Leia mais [aqui](https://particles.js.org/docs/modules/Core_Interfaces_IPlugin.html)..._

---

<p>  
    <a href="https://www.jetbrains.com/?from=tsParticles">  
        <img src="https://raw.githubusercontent.com/matteobruni/tsparticles/gh-pages/images/jetbrains-logos/jetbrains-variant-4.png" height="150" alt="JetBrains" />  
    </a>  
    <a href="https://www.jetbrains.com/webstorm/?from=tsParticles">  
        <img src="https://raw.githubusercontent.com/matteobruni/tsparticles/gh-pages/images/jetbrains-logos/logo.png" height="150" alt="JetBrains" />  
    </a>  
</p>

### Enorme obrigado à [JetBrains](https://www.jetbrains.com/?from=tsParticles) pelas 2020-2021 Open Source Licenses!

[JetBrains WebStorm](https://www.jetbrains.com/webstorm/?from=tsParticles) é utilizado para manter este projeto.
