[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# tsParticles - TypeScript Particles

**कण बनाने के लिए एक हल्का टाइपस्क्रिप्ट पुस्तकालय। निर्भरता से मुक्त ([\*](#dependencies))और ब्राउज़र तैयार!**

_[Particles.js](https://github.com/VincentGarreau/particles.js) टाइपस्क्रिप्ट, निर्भरता मुक्त में
परिवर्तित ([\*](#dependencies)), नई शांत and सुविधाओं और विभिन्न बग के साथ सुधार और **यह सक्रिय रूप से बनाए रखा है**!_

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles/badge?style=rounded)](https://www.jsdelivr.com/package/npm/tsparticles) [![Cdnjs](https://img.shields.io/cdnjs/v/tsparticles)](https://cdnjs.com/libraries/tsparticles) [![npmjs](https://badge.fury.io/js/tsparticles.svg)](https://www.npmjs.com/package/tsparticles) [![npm](https://img.shields.io/npm/dm/tsparticles)](https://www.npmjs.com/package/tsparticles) [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/) [![CodeFactor](https://www.codefactor.io/repository/github/matteobruni/tsparticles/badge)](https://www.codefactor.io/repository/github/matteobruni/tsparticles) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/b983aaf3461a4c48b1e2eecce1ff1d74)](https://www.codacy.com/manual/ar3s/tsparticles?utm_source=github.com&utm_medium=referral&utm_content=matteobruni/tsparticles&utm_campaign=Badge_Grade) [![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/matteobruni/tsparticles)

## क्या आप इसे अपनी वेबसाइट पर उपयोग करना चाहते हैं?

**यह पुस्तकालय दो सबसे लोकप्रिय सीडीएन पर उपलब्ध है और यदि आप कणों का उपयोग कर रहे हैं तो यह आसान और उपयोग करने के लिए
तैयार है।**.

आपको निर्देश मिलेंगे [below](https://github.com/matteobruni/tsparticles/blob/main/README.md#library-installation), आपकी
ज़रूरत के सभी लिंक के साथ, और _ टाइपस्क्रिप्ट ** द्वारा डराया नहीं जाना चाहिए, यह सिर्फ स्रोत भाषा_ है।

**आउटपुट फाइलें सिर्फ जावास्क्रिप्ट**हैं। 🤩

CDNs and `npm` वे सभी स्रोत हैं जिनकी आपको आवश्यकता है**Javascript**, एक बंडल ब्राउज़र तैयार है (tsparticles.min.js) और
सभी फ़ाइलों के लिए अलग कर दिया `import`वाक्य - विन्यास.

**यदि आप अभी भी रुचि रखते हैं ** नीचे कुछ लाइनें पुराने कणों से पलायन के लिए कुछ निर्देश हैं। जेएस पुस्तकालय
particles.js।

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

import {tsParticles} from "tsparticles-engine";
```

आयात किया हुआ `tsParticles` स्क्रिप्ट सहित जब आपके पास वही उदाहरण है।

---

### **_NuGet_**

[![Nuget](https://img.shields.io/nuget/v/tsParticles)](https://www.nuget.org/packages/tsParticles/)

---

### **_Usage_**

TsParticles लोड करें और कणों को कॉन्फ़िगर करें:

[![tsParticles demo](https://media.giphy.com/media/ftHwBpp3b0qNyCXRuu/giphy.gif)](https://particles.js.org)

**index.html**

```html

<div id="tsparticles"></div>

<script src="tsparticles.min.js"></script>
```

**app.js**

```javascript
// @path-json एक वस्तु या एक सरणी हो सकता है, पहले सीधे लोड किया जाएगा, सरणी से ऑब्जेक्ट को यादृच्छिक रूप से चुना जाएगा
/* tsParticles.loadJSON(@dom-id, @path-json, @callback (optional)); */

tsParticles
    .loadJSON("tsparticles", "presets/default.json")
    .then((container) => {
        console.log("callback - tsparticles config loaded");
    })
    .catch((error) => {
        console.error(error);
    });

// या

/* tsParticles.load(@dom-id, @options); */

tsParticles.load("tsparticles", {
    /* विकल्प यहाँ  */
});

// या
/* tsParticles.loadFromArray(@dom-id, @options, @index (optional)); */

tsParticles.loadFromArray("tsparticles", [
    {
        /* विकल्प यहाँ */
    },
    {
        /* अन्य विकल्प यहाँ */
    },
]);
//यादृच्छिक वस्तु

tsParticles.loadFromArray(
    "tsparticles",
    [
        {
            /* विकल्प यहाँ */
        },
        {
            /* अन्य विकल्प यहाँ*/
        },
    ],
    1
);//दूसरा एक
// जरूरी! यदि इंडेक्स 0 रेंज में नहीं है ... <array.length, इंडेक्स को नजरअंदाज कर दिया जाएगा।

// आरंभीकरण के बाद इसका उपयोग किया जा सकता है।

/* tsParticles.setOnClickHandler(@callback); */

/* यह लोड किए गए सभी कणों से निकाल दिया जाएगा */

tsParticles.setOnClickHandler((event, particles) => {
    /* क्लिक हैंडलर पर कस्टम */
});

// अब आप एनिमेशन को भी नियंत्रित कर सकते हैं, एनिमेशन को रोकना और फिर से शुरू करना संभव है
// ये विधियाँ विन्यास को परिवर्तित नहीं करती हैं इसलिए आप अपने सभी विन्यासों के साथ सुरक्षित हैं
// domItem(0) में लौटा पहला tsParticles उदाहरण देता है dom
const particles = tsParticles.domItem(0);

//खेल एनिमेशन शुरू कर देगा, अगर चाल सक्षम नहीं है तो यह इसे सक्षम नहीं करेगा, यह सिर्फ फ्रेम को अपडेट करता है
कणों.play();

// ठहराव एनिमेशन रोक देगा
particles.pause();
```

---

## कुछ सबसे अधिक उपयोग किए जाने वाले ढांचे के लिए आधिकारिक घटक

### Angular

#### `ng-particles`

[![npm](https://img.shields.io/npm/v/ng-particles)](https://www.npmjs.com/package/ng-particles) [![npm](https://img.shields.io/npm/dm/ng-particles)](https://www.npmjs.com/package/ng-particles)

आप निर्देश पा सकते हैं [here](https://github.com/matteobruni/tsparticles/blob/main/components/angular/README.md)

### Inferno

#### `inferno-particles`

[![npm](https://img.shields.io/npm/v/inferno-particles)](https://www.npmjs.com/package/inferno-particles) [![npm](https://img.shields.io/npm/dm/inferno-particles)](https://www.npmjs.com/package/inferno-particles)

आप निर्देश पा सकते हैं [here](https://github.com/matteobruni/tsparticles/blob/main/components/inferno/README.md)

### jQuery

#### `jquery-particles`

[![npm](https://img.shields.io/npm/v/jquery-particles)](https://www.npmjs.com/package/jquery-particles) [![npm](https://img.shields.io/npm/dm/jquery-particles)](https://www.npmjs.com/package/jquery-particles)

आप निर्देश पा सकते हैं[here](https://github.com/matteobruni/tsparticles/blob/main/components/jquery/README.md)

### Preact

#### `preact-particles`

[![npm](https://img.shields.io/npm/v/preact-particles)](https://www.npmjs.com/package/preact-particles) [![npm](https://img.shields.io/npm/dm/preact-particles)](https://www.npmjs.com/package/preact-particles)

आप निर्देश पा सकते हैं [here](https://github.com/matteobruni/tsparticles/blob/main/components/preact/README.md)

### ReactJS

#### `प्रतिक्रिया-क्षिप्रहृदयता '

[! [npm] (https://img.shields.io/npm/v/react-tsparticles)] (https://www.npmjs.com/package/react-tsparticles) [! npm] (https) //img.shields.io/npm/dm/react-tsparticles)](https://www.npmjs.com/package/react-tsparticles)

आप [यहाँ] (https://github.com/matteobruni/tsparticles/blob/main/compenders/react/README.md) निर्देश पा सकते हैं

### स्वेल्ट

#### `स्वेलेट-कण`

[! [npm] (https://img.shields.io/npm/v/svelte-particles)] (https://www.npmjs.com/package/svelte-particles) [! [npm डाउनलोड] (
https) : //img.shields.io/npm/dm/svelte-particles)] (https://www.npmjs.com/package/svelte-particles)

आप [here] (https://github.com/matteobruni/tsparticles/blob/main/compenders/svelte/README.md) निर्देश पा सकते हैं

### VueJS

#### `कण.व्यू`

[! [npm] (https://img.shields.io/npm/v/particles.vue)] (https://www.npmjs.com/package/particles.vue) [! [npm] (https:) //img.shields.io/npm/dm/particles.vue)](https://www.npmjs.com/package/particles.vue)

आप निर्देश [here] (https://github.com/matteobruni/tsparticles/blob/main/compenders/vue/README.md) पा सकते हैं

---

## टेम्प्लेट और संसाधन

आप कुछ tsParticles संबंधित टेम्प्लेट [यहाँ] (https://github.com/tsparticles/templates) पा सकते हैं। टेम्प्लेट्स * वेनिला
जावास्क्रिप्ट *, * रिएक्टजेएस *, * वुजेएस *, * एंगुलर *, * सेवेलजेएस * और अन्य फ्रेमवर्क के लिए बनाए गए हैं।

टेम्पलेट अलग-अलग हो सकते हैं, नए बनाए जा सकते हैं या पुराने लोगों को नवीनतम सुविधाओं के साथ अपडेट किया जा सकता है या
बेहतर शैली में बदल दिया जा सकता है। एक बार में उन्हें बाहर की जाँच करें।

यदि आपने * tsParticles * के साथ कुछ अच्छी डिज़ाइन बनाई है, तो अपने कूल टेम्प्लेट के साथ एक निवेदन प्रस्तुत करने के लिए
स्वतंत्र महसूस करें, आपको टेम्पलेट लेखक के रूप में श्रेय दिया जाएगा!

<Https://github.com/tsparticles/templates>

---

## ** _ डेमो / जनरेटर _ **

<Https://particles.js.org/samples>

[![Particles demo](https://particles.js.org/images/demo2.png?v=1.39.1)](https://particles.js.org/samples)


---

### कण के रूप में वर्ण

[![Particles chars demo](https://media.giphy.com/media/JsssOXz72bM6jGEZ0s/giphy.gif)](https://particles.js.org/samples#chars)


---

### माउस होवर कनेक्शन

[![Particles mouse connections demo](https://media.giphy.com/media/XzvZThpVbxHxMYz5xt/giphy.gif)](https://particles.js.org/samples#connect)

---

### बहुभुज मुखौटा

[![tsParticles Polygon Mask demo](https://media.giphy.com/media/lNRfiSgaMFbL4FMhW6/giphy.gif)](https://particles.js.org/samples#polygonMask)


---

### एनिमेटेड सितारे

[![Particles NASA demo](https://media.giphy.com/media/cLqGsnh7FKRVMgPIWE/giphy.gif)](https://particles.js.org/samples#nasa)


---

### स्क्रॉलिंग सितारों पर नयन बिल्ली उड़ती हुई

[![Particles Nyan Cat demo](https://media.giphy.com/media/LpX2oNc9ZMgIhIXQL9/giphy.gif)](https://particles.js.org/samples#nyancat2)


---

### बर्फ के कण

[![tsParticles Snow demo](https://media.giphy.com/media/gihwUFbmiubbkdzEMX/giphy.gif)](https://particles.js.org/samples#snow)

---

### पृष्ठभूमि मास्क कण

[![tsParticles Background Mask demo](https://media.giphy.com/media/dWraWgqInWFGWiOyRu/giphy.gif)](https://particles.js.org/samples#background)

---

#### COVID-19 SARS-CoV-2 कण

[![tsParticles COVID-19 demo](https://media.giphy.com/media/fsVN1ZHksgBIXNIbr1/giphy.gif)](https://particles.js.org/samples#virus)

_ क्लिक न करें! क्लिक न करें! ओह नहीं आईटी का कारोबार !!!!!!

** COVID-19 एक गंभीर बीमारी है। कृपया घर पर रहें, मास्क पहनें और सुरक्षित रहें!

---

** particles.json **
आप एक नमूना विन्यास [here](https://github.com/matteobruni/tsparticles/tree/main/website/presets) config पा सकते हैं

---

## **_विकल्प_**

आप यहां उपलब्ध सभी विकल्प पा सकते
हैं (https://particles.js.org/docs/interfaces/_options_interfaces_ioptions_.ioptions.html) available

## इसे कार्रवाई में देखना चाहते हैं और इसे आज़माना चाहते हैं?

मैंने [CodePen](https://codepen.io/collection/DPOage) en पर एक tsParticles संग्रह बनाया है या आप
मेरे [Profile](https://codepen.io/matteobruni) की जांच कर सकते हैं

अन्यथा नीचे डेमो पेज लिंक है। बस नीचे कोरोनोवायरस पर क्लिक / टैप करें, डरें नहीं। ** यह सुरक्षित है ** 😷।

[! [tsParticles demo](https://media.giphy.com/media/fsVN1ZHksgBIXNIbr1/giphy.gif)] (https://particles.js.org/#virus)

कभी और डेमो देखना चाहते हैं? अपने कंप्यूटर पर रिपॉजिटरी को क्लोन करें और इन निर्देशों का पालन करें

```shell
yarn install && yarn start
```

**Boom! 💥** <http://localhost:3000> और आप अन्य डेमो चेकआउट कर सकते हैं।

_यदि आप पर्याप्त बहादुर हैं तो आप विकास के तहत सुविधाओं की कोशिश करने के लिए `देव` शाखा में जा सकते हैं।

## Dependencies

आपके पास निर्भरता मुक्त के पास \ * नोटिस हो सकते हैं। अच्छी तरह से लगभग सभी विशेषताएं बिना किसी निर्भरता के काम करती
हैं, लेकिन ... वैसे तो थोड़ा है लेकिन।**Polygon Mask** सुविधा की आवश्यकता
है [`@tsparticles/pathseg`](https://npmjs.com/package/@tsparticles/pathseg)कुछ ब्राउज़रों के लिए ठीक काम करने के लिए, और
जाहिर है आइकन फ़ॉन्ट्स (जैसे `FontAwesome`) को आपके पृष्ठ में शामिल किया जाना चाहिए।

---

## Migrating from Particles.js

**tsParticles** पुस्तकालय पूरी तरह से संगत है _particles.js_ विन्यास.

Sइसके अलावा, आपको बस स्क्रिप्ट स्रोत et-voilà बदलने की आवश्यकता है, ** आप तैयार हैं ** need!

आप और पढ़ सकते हैं **[here](https://dev.to/matteobruni/migrating-from-particles-js-to-tsparticles-2a6m)**

स्विच करने के 5 कारण जानना चाहते
हैं? [Read here](https://dev.to/matteobruni/5-reasons-to-use-tsparticles-and-not-particles-js-1gbe)

_नीचे आप tsParticles और इसके नए सिंटैक्स को स्थापित करने के लिए आवश्यक सभी जानकारी पा सकते हैं।_

---

## Plugins/Customizations

tsParticles अब कुछ अनुकूलन का समर्थन करता है .

**आप अपने खुद के प्लगइन्स बना सकते हैं**

_Read more [here](https://particles.js.org/docs/modules/_core_interfaces_iplugin_.html)..._

---

### API Docs

प्रलेखन और विकास संदर्भ [here](https://particles.js.org/docs/) 📖

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

### बहुत धन्यवाद [JetBrains](https://www.jetbrains.com/?from=tsParticles) 2020 ओपन सोर्स लाइसेंस के लिए!

[JetBrains WebStorm](https://www.jetbrains.com/webstorm/?from=tsParticles) इस परियोजना को बनाए रखने के लिए उपयोग किया
जाता है।

### बहुत धन्यवाद [SauceLabs](https://saucelabs.com) ओपन सोर्स लाइसेंस के लिए!

<img alt="Testing Powered By SauceLabs" src="https://raw.githubusercontent.com/saucelabs/saucelabs.github.io/publish/images/opensauce/powered-by-saucelabs-badge-red.svg" width="250" />
