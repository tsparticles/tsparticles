[![banner](https://cdn.matteobruni.it/images/particles/banner2.png)](https://particles.matteobruni.it)

# tsParticles - TypeScript Particles

**कण बनाने के लिए एक हल्का टाइपस्क्रिप्ट पुस्तकालय। निर्भरता से मुक्त ([\*](#dependencies))और ब्राउज़र तैयार!**

_[Particles.js](https://github.com/VincentGarreau/particles.js) टाइपस्क्रिप्ट, निर्भरता मुक्त में परिवर्तित ([\*](#dependencies)), नई शांत and सुविधाओं और विभिन्न बग के साथ सुधार और **यह सक्रिय रूप से बनाए रखा है**!_

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles/badge?style=rounded)](https://www.jsdelivr.com/package/npm/tsparticles) [![Cdnjs](https://img.shields.io/cdnjs/v/tsparticles)](https://cdnjs.com/libraries/tsparticles) [![npmjs](https://badge.fury.io/js/tsparticles.svg)](https://www.npmjs.com/package/tsparticles) [![npm](https://img.shields.io/npm/dm/tsparticles)](https://www.npmjs.com/package/tsparticles) [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/) [![CodeFactor](https://www.codefactor.io/repository/github/matteobruni/tsparticles/badge)](https://www.codefactor.io/repository/github/matteobruni/tsparticles) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/b983aaf3461a4c48b1e2eecce1ff1d74)](https://www.codacy.com/manual/ar3s/tsparticles?utm_source=github.com&utm_medium=referral&utm_content=matteobruni/tsparticles&utm_campaign=Badge_Grade) [![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/matteobruni/tsparticles)

## क्या आप इसे अपनी वेबसाइट पर उपयोग करना चाहते हैं?

**यह पुस्तकालय दो सबसे लोकप्रिय सीडीएन पर उपलब्ध है और यदि आप कणों का उपयोग कर रहे हैं तो यह आसान और उपयोग करने के लिए तैयार है।**.

आपको निर्देश मिलेंगे [below](https://github.com/matteobruni/tsparticles/blob/master/README.md#library-installation), आपकी ज़रूरत के सभी लिंक के साथ, और _ टाइपस्क्रिप्ट ** द्वारा डराया नहीं जाना चाहिए, यह सिर्फ स्रोत भाषा_ है।

**आउटपुट फाइलें सिर्फ जावास्क्रिप्ट**हैं। 🤩

CDNs and `npm` वे सभी स्रोत हैं जिनकी आपको आवश्यकता है**Javascript**, एक बंडल ब्राउज़र तैयार है (tsparticles.min.js) और सभी फ़ाइलों के लिए अलग कर दिया `import`वाक्य - विन्यास.

**यदि आप अभी भी रुचि रखते हैं ** नीचे कुछ लाइनें पुराने कणों से पलायन के लिए कुछ निर्देश हैं। जेएस पुस्तकालय particles.js।

## **_Library installation_**

### **_Hosting / CDN_**

**_कृपया अपने प्रोजेक्ट्स पर tsParticles लोड करने के लिए इस होस्ट या अपने स्वयं के उपयोग करें_**

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

संस्करण 1.12.11 से शुरू `import` तथा`require` आयात करने के लिए इस्तेमाल किया जा सकता है`tsParticles` .

अब आप कुछ इस तरह से लिख सकते हैं

```javascript
const tsParticles = require("tsparticles");

// or

import { tsParticles } from "tsparticles";
```

आयात किया हुआ `tsParticles` स्क्रिप्ट सहित जब आपके पास वही उदाहरण है।

---

### **_NuGet_**

[![Nuget](https://img.shields.io/nuget/v/tsParticles)](https://www.nuget.org/packages/tsParticles/)

---

### **_Usage_**

Load tsParticles and configure the particles:

[![tsParticles demo](https://media.giphy.com/media/ftHwBpp3b0qNyCXRuu/giphy.gif)](https://particles.matteobruni.it)

**index.html**

```html
<div id="tsparticles"></div>

<script src="tsparticles.min.js"></script>
```

**app.js**

```javascript
// @path-json can be an object or an array, the first will be loaded directly, the object from the array will be random selected
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
); //the second one
// Important! If the index is not in range 0...<array.length, the index will be ignored.

// after initialization this can be used.

/* tsParticles.setOnClickHandler(@callback); */

/* this will be fired from all particles loaded */

tsParticles.setOnClickHandler((event, particles) => {
  /* custom on click handler */
});

// now you can control the animations too, it's possible to pause and resume the animations
// these methods don't change the config so you're safe with all your configurations
// domItem(0) returns the first tsParticles instance loaded in the dom
const particles = tsParticles.domItem(0);

// play will start the animations, if the move is not enabled it won't enable it, it just updates the frame
particles.play();

// pause will stop the animations
particles.pause();
```

---

## कुछ सबसे अधिक उपयोग किए जाने वाले ढांचे के लिए आधिकारिक घटक

### Angular

#### `ng-particles`

[![npm](https://img.shields.io/npm/v/ng-particles)](https://www.npmjs.com/package/ng-particles) [![npm](https://img.shields.io/npm/dm/ng-particles)](https://www.npmjs.com/package/ng-particles)

You can find the instructions [here](https://github.com/matteobruni/tsparticles/blob/master/components/angular/README.md)

### Inferno

#### `inferno-particles`

[![npm](https://img.shields.io/npm/v/inferno-particles)](https://www.npmjs.com/package/inferno-particles) [![npm](https://img.shields.io/npm/dm/inferno-particles)](https://www.npmjs.com/package/inferno-particles)

You can find the instructions [here](https://github.com/matteobruni/tsparticles/blob/master/components/inferno/README.md)

### jQuery

#### `jquery-particles`

[![npm](https://img.shields.io/npm/v/jquery-particles)](https://www.npmjs.com/package/jquery-particles) [![npm](https://img.shields.io/npm/dm/jquery-particles)](https://www.npmjs.com/package/jquery-particles)

You can find the instructions [here](https://github.com/matteobruni/tsparticles/blob/master/components/jquery/README.md)

### Preact

#### `preact-particles`

[![npm](https://img.shields.io/npm/v/preact-particles)](https://www.npmjs.com/package/preact-particles) [![npm](https://img.shields.io/npm/dm/preact-particles)](https://www.npmjs.com/package/preact-particles)

You can find the instructions [here](https://github.com/matteobruni/tsparticles/blob/master/components/preact/README.md)

### ReactJS

#### `प्रतिक्रिया-क्षिप्रहृदयता '

[! [npm] (https://img.shields.io/npm/v/react-tsparticles)] (https://www.npmjs.com/package/react-tsparticles) [! npm] (https) //img.shields.io/npm/dm/react-tsparticles)](https://www.npmjs.com/package/react-tsparticles)

आप [यहाँ] (https://github.com/matteobruni/tsparticles/blob/master/compenders/react/README.md) निर्देश पा सकते हैं

### स्वेल्ट

#### `स्वेलेट-कण`

[! [npm] (https://img.shields.io/npm/v/svelte-particles)] (https://www.npmjs.com/package/svelte-particles) [! [npm डाउनलोड] (https) : //img.shields.io/npm/dm/svelte-particles)] (https://www.npmjs.com/package/svelte-particles)

आप [यहाँ] (https://github.com/matteobruni/tsparticles/blob/master/compenders/svelte/README.md) निर्देश पा सकते हैं

### VueJS

#### `कण.व्यू`

[! [npm] (https://img.shields.io/npm/v/particles.vue)] (https://www.npmjs.com/package/particles.vue) [! [npm] (https:) //img.shields.io/npm/dm/particles.vue)](https://www.npmjs.com/package/particles.vue)

आप निर्देश [यहां] (https://github.com/matteobruni/tsparticles/blob/master/compenders/vue/README.md) पा सकते हैं

---

## टेम्प्लेट और संसाधन

आप कुछ tsParticles संबंधित टेम्प्लेट [यहाँ] (https://github.com/tsparticles/templates) पा सकते हैं। टेम्प्लेट्स * वेनिला जावास्क्रिप्ट *, * रिएक्टजेएस *, * वुजेएस *, * एंगुलर *, * सेवेलजेएस * और अन्य फ्रेमवर्क के लिए बनाए गए हैं।

टेम्पलेट अलग-अलग हो सकते हैं, नए बनाए जा सकते हैं या पुराने लोगों को नवीनतम सुविधाओं के साथ अपडेट किया जा सकता है या बेहतर शैली में बदल दिया जा सकता है। एक बार में उन्हें बाहर की जाँच करें।

यदि आपने * tsParticles * के साथ कुछ अच्छी डिज़ाइन बनाई है, तो अपने कूल टेम्प्लेट के साथ एक निवेदन प्रस्तुत करने के लिए स्वतंत्र महसूस करें, आपको टेम्पलेट लेखक के रूप में श्रेय दिया जाएगा!

<Https://github.com/tsparticles/templates>

---

## ** _ डेमो / जनरेटर _ **

<Https://particles.matteobruni.it/Samples>

[! [कण डेमो] (https://particles.matteobruni.it/images/demo.png?v=1.8.1)] (https://particles.matteobruni.it/Samples)

---

### कण के रूप में वर्ण

[[[पार्टिकल्स चार्ट्स डेमो] (https://media.giphy.com/media/JsssOXz72bM6jGEZ0s/giphy.gif)] (https://particles.matteobruni.it/Samples#chars)

---

### माउस होवर कनेक्शन

[[[कण माउस कनेक्शन डेमो] (https://media.giphy.com/media/XzvZThpVbxHxMYz5xt/giphy.gif)] (https://particles.matteobriuni.it/Samples#connect)

---

### बहुभुज मुखौटा

[!

---

### एनिमेटेड सितारे

[! [कण नासा डेमो] (https://media.giphy.com/media/cLqGsnh7FKRVMgPIWE/giphy.gif)] (https://particles.matteobruni.it/Samples#nasa)

---

### स्क्रॉलिंग सितारों पर नयन बिल्ली उड़ती हुई

[[[कण नयन कैट डेमो] (https://media.giphy.com/media/LpX2oNc9ZMgIhIXQL9/giphy.gif)] (https://particles.matteobriuni.it/Samples#nyancat2)

---

### बर्फ के कण

[! [tsParticles स्नो डेमो] (https://media.giphy.com/media/gihwUFbmiubbkdzEMX/giphy.gif)] (https://particles.matteobruni.it/Samples#snow)

---

### पृष्ठभूमि मास्क कण

[!

---

#### COVID-19 SARS-CoV-2 कण

[! [tsParticles COVID-19 डेमो] (https://media.giphy.com/media/fsVN1ZHksgBIXNIbr1/giphy.gif)] (https://particles.matterruni.it/Samples#virus)

_ क्लिक न करें! क्लिक न करें! ओह नहीं आईटी का कारोबार !!!!!!

** COVID-19 एक गंभीर बीमारी है। कृपया घर पर रहें, मास्क पहनें और सुरक्षित रहें!

---

** particles.json **

आप एक नमूना विन्यास [यहाँ] (https://github.com/matteobruni/tsparticles/wiki/tsParticles-Sample-Config) config पा सकते हैं

---

## ** _ विकल्प _ **

आप यहां उपलब्ध सभी विकल्प पा सकते हैं (https://particles.js.org/interfaces/_options_interfaces_ioptions_.ioptions.html) available

##इसे कार्रवाई में देखना चाहते हैं और इसे आज़माना चाहते हैं?

मैंने [CodePen] (https://codepen.io/collection/DPOage) en पर एक tsParticles संग्रह बनाया है या आप मेरे [प्रोफ़ाइल] (https://codepen.io/matteobruni) की जांच कर सकते हैं

अन्यथा नीचे डेमो पेज लिंक है। बस नीचे कोरोनोवायरस पर क्लिक / टैप करें, डरें नहीं। ** यह सुरक्षित है ** 😷।

[! [tsParticles डेमो] (https://media.giphy.com/media/fsVN1ZHksgBIXNIbr1/giphy.gif)] (https://particles.matteobruni.it/#virus)

कभी और डेमो देखना चाहते हैं? अपने कंप्यूटर पर रिपॉजिटरी को क्लोन करें और इन निर्देशों का पालन करें
```shell
yarn install && yarn start
```

**Boom! 💥** <http://localhost:3000> और आप अन्य डेमो चेकआउट कर सकते हैं।

_यदि आप पर्याप्त बहादुर हैं तो आप विकास के तहत सुविधाओं की कोशिश करने के लिए `देव` शाखा में जा सकते हैं।
## Dependencies

आपके पास निर्भरता मुक्त के पास \ * नोटिस हो सकते हैं। अच्छी तरह से लगभग सभी विशेषताएं बिना किसी निर्भरता के काम करती हैं, लेकिन ... वैसे तो थोड़ा है लेकिन।**Polygon Mask** सुविधा की आवश्यकता है [`pathseg`](https://github.com/progers/pathseg)कुछ ब्राउज़रों के लिए ठीक काम करने के लिए, और जाहिर है आइकन फ़ॉन्ट्स (जैसे `FontAwesome`) को आपके पृष्ठ में शामिल किया जाना चाहिए।

---

## Migrating from Particles.js

**tsParticles** पुस्तकालय पूरी तरह से संगत है _particles.js_ विन्यास.

Sइसके अलावा, आपको बस स्क्रिप्ट स्रोत et-voilà बदलने की आवश्यकता है, ** आप तैयार हैं ** need!

आप और पढ़ सकते हैं **[here](https://dev.to/matteobruni/migrating-from-particles-js-to-tsparticles-2a6m)**

स्विच करने के 5 कारण जानना चाहते हैं? [Read here](https://dev.to/matteobruni/5-reasons-to-use-tsparticles-and-not-particles-js-1gbe)

_नीचे आप tsParticles और इसके नए सिंटैक्स को स्थापित करने के लिए आवश्यक सभी जानकारी पा सकते हैं।_

---

## Plugins/Customizations

tsParticles अब कुछ अनुकूलन का समर्थन करता है .

**आप अपने खुद के प्लगइन्स बना सकते हैं**

_Read more [here](https://particles.js.org/modules/_core_interfaces_iplugin_.html)..._

---

### API Docs

प्रलेखन और विकास संदर्भ [here](https://particles.matteobruni.it/docs/) 📖

---

[![Slack](https://cdn.matteobruni.it/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI) [![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles")

---

<p>  
    <a href="https://www.jetbrains.com/?from=tsParticles">  
        <img src="https://cdn.matteobruni.it/images/jetbrains-logos/jetbrains-variant-4.png" height="150" alt="JetBrains" />  
    </a>  
    <a href="https://www.jetbrains.com/webstorm/?from=tsParticles">  
        <img src="https://cdn.matteobruni.it/images/jetbrains-logos/webstorm_logos/logo.png" height="150" alt="JetBrains" />  
    </a>  
</p>

### बहुत धन्यवाद [JetBrains](https://www.jetbrains.com/?from=tsParticles) 2020 ओपन सोर्स लाइसेंस के लिए!

[JetBrains WebStorm](https://www.jetbrains.com/webstorm/?from=tsParticles) इस परियोजना को बनाए रखने के लिए उपयोग किया जाता है।

###बहुत धन्यवाद [SauceLabs](https://saucelabs.com) ओपन सोर्स लाइसेंस के लिए!

<img alt="Testing Powered By SauceLabs" src="https://raw.githubusercontent.com/saucelabs/saucelabs.github.io/publish/images/opensauce/powered-by-saucelabs-badge-red.svg" width="250" />
