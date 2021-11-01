[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles - TypeScript Parçacıkları

**Parçacıklar oluşturmak için hafif bir TypeScript kitaplığı. Bağımlılık içermeyen (\*), tarayıcıya hazır ve React.js, Vue.js (2.x ve 3.x), Angular, Svelte, jQuery, Preact, Inferno, Riot.js, Solid.js ve Web Components ile uyumlu.**

[![Rate on Openbase](https://badges.openbase.com/js/rating/tsparticles.svg)](https://openbase.com/js/tsparticles?utm_source=embedded&utm_medium=badge&utm_campaign=rate-badge) [![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles/badge?style=rounded)](https://www.jsdelivr.com/package/npm/tsparticles) [![Cdnjs](https://img.shields.io/cdnjs/v/tsparticles)](https://cdnjs.com/libraries/tsparticles) [![npmjs](https://badge.fury.io/js/tsparticles.svg)](https://www.npmjs.com/package/tsparticles) [![npm](https://img.shields.io/npm/dm/tsparticles)](https://www.npmjs.com/package/tsparticles) [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/) [![CodeFactor](https://www.codefactor.io/repository/github/matteobruni/tsparticles/badge)](https://www.codefactor.io/repository/github/matteobruni/tsparticles) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/b983aaf3461a4c48b1e2eecce1ff1d74)](https://www.codacy.com/manual/ar3s/tsparticles?utm_source=github.com&utm_medium=referral&utm_content=matteobruni/tsparticles&utm_campaign=Badge_Grade) [![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/matteobruni/tsparticles) [![Run on Repl.it](https://repl.it/badge/github/matteobruni/tsparticles)](https://repl.it/github/matteobruni/tsparticles)

[![Slack](https://particles.js.org/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI) [![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles) 

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles")

---
## İçindekiler

* [Siteniz için kullanın](#Bu-kütüphaneyi-sitenizde-kullanmak-ister-misiniz)
  * [Kütüphanenin kurulumu](#Kütüphanenin-kurulumu)
* [Popüler çerçevelerden bazıları için resmi bileşenler](#Popüler-çerçevelerden-bazıları-için-resmi-bileşenler)
  * [Angular](#Angular)
  * [Inferno](#Inferno)
  * [jQuery](#jQuery)
  * [Preact](#Preact)
  * [ReactJS](#ReactJS)
  * [Svelte](#Svelte)
  * [VueJS 2.x](#VueJS-2x)
  * [VueJS 3.x](#VueJS-3x)
  * [WordPress](#WordPress)
* [Şablonlar ve Kaynaklar](#Şablonlar-ve-Kaynaklar)
* [Demo / Üretici](#Demo--Üretici)
  * [Harf parçacıklar](#Harf-parçacıklar)
  * ["Mouse hover" bağlantıları](#Mouse-hover-bağlantıları)
  * [Çokgen maskesi](#Çokgen-maskesi)
  * [Hareketli yıldızlar](#Hareketli-yıldızlar)
  * [Kayan yıldızlar üzerinde uçan Nyan cat](#Kayan-yıldızlar-üzerinde-uçan-Nyan-cat)
  * [Arka fonu maskeleyen parçacıklar](#Arka-fonu-maskeleyen-parçacıklar)

* [Particles.js kütüphanesinden göç](#particlesjs-kütüphanesinden-göç)

* [Eklentiler ve Özelleştirlemeler](#Eklentiler-ve-Özelleştirlemeler)
## Bu kütüphaneyi sitenizde kullanmak ister misiniz?

*Dokümantasyon ve Geliştirme referansları burada [here](https://particles.js.org/docs/) 📖*

**Bu kitaplık en popüler CDN'lerden ikisinde mevcuttur; kolay ve kullanıma hazır bir durumdadır, hatta eğer Particles.js kütüphanesini kullanıyorsanız bu daha da kolaydır.**.

 [Aşağıdaki](https://github.com/matteobruni/tsparticles/blob/main/README.md#library-installation) talimatları, ihtiyacınız olan tüm bağlantılarla birlikte bulacaksınız ve... __**TypeScript**'ten korkmayın! Bu yalnızca kaynak dildir.__

**Çıktı dosyaları sadece JavaScript'tir.**. 🤩

CDN'ler ve `npm`, **Javascript**'te ihtiyacınız olan tüm kaynaklara; tarayıcıya hazır bir pakete (tsparticles.min.js) ve `import` sözdizimi için bölünmüş tüm dosyalara sahiptir.

**Eğer ilgiliyseniz**, eski Particles.js kitaplığından geçiş yapmanıza yardımcı olacak bazı __basit talimatlar__ hemen [aşağıdadır](https://github.com/matteobruni/tsparticles/blob/main/README.md#library-installation).

## **_Kütüphane kurulumu_**

### **_Hosting / CDN_**

**_Projelerinize tsParticles kütüphanesini yüklemek için lütfen bu ana bilgisayarları veya kendinizinkini kullanın._**

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

#### Import ve require

1.12.11 sürümünden itibaren `import` ve `require` fonksiyonları `tsParticles` kütüphanesini içe aktarmak için kullanılabilir.

Şimdi böyle bir şey yazabilirsin:

```javascript
const tsParticles = require("tsparticles");

// ya da

import {tsParticles} from "tsparticles";
```

İçe aktarılan `tsParticles` kütüphanesi, betiği eklerken sahip olduğunuz örnekle aynıdır.

---

### **_NuGet_**

[![Nuget](https://img.shields.io/nuget/v/tsParticles)](https://www.nuget.org/packages/tsParticles/)

---

### **_Kullanım_**

tsParticles kütüphanesini yükleyin ve parçacıkları yapılandırın:

[![tsParticles demo](https://media.giphy.com/media/ftHwBpp3b0qNyCXRuu/giphy.gif)](https://particles.js.org)

**index.html**

```html

<div id="tsparticles"></div>

<script src="tsparticles.min.js"></script>
```

**app.js**

```javascript
// @path-json bir nesne veya dizi olabilir, ilki doğrudan yüklenecek, dizideki nesne rastgele seçilecek
/* tsParticles.loadJSON(@dom-id, @path-json, @callback (optional)); */

tsParticles
    .loadJSON("tsparticles", "presets/default.json")
    .then((container) => {
        console.log("callback - tsparticles config loaded");
    })
    .catch((error) => {
        console.error(error);
    });

//ya da

/* tsParticles.load(@dom-id, @options); */

tsParticles.load("tsparticles", {
    /* seçenekler buraya */
});

//ya da

/* tsParticles.loadFromArray(@dom-id, @options, @index (optional)); */

tsParticles.loadFromArray("tsparticles", [
    {
        /* seçenekler buraya */
    },
    {
        /* diğer seçenekler buraya */
    },
]);
//rastgele nesne

tsParticles.loadFromArray(
    "tsparticles",
    [
        {
            /* seçenekler buraya */
        },
        {
            /* diğer seçenekler buraya */
        },
    ],
    1
); //ikincisi
// Önemli! İndeks 0...<array.length aralığında değilse, indesk yok sayılır.

// başlatmadan sonra bu kullanılabilir.

/* tsParticles.setOnClickHandler(@callback); */

/* bu, yüklenen tüm parçacıklardan ateşlenecek */

tsParticles.setOnClickHandler((event, particles) => {
    /* özel tıklama işleyicisi */
});

// artık animasyonları da kontrol edebilirsiniz, animasyonları duraklatmak ve devam ettirmek mümkündür.
// bu yöntemler yapılandırmayı değiştirmez, böylece tüm yapılandırmalarınız konusunda güvende olursunuz.
// domItem(0), DOM'a yüklenen ilk tsParticles örneğini döndürür.
const particles = tsParticles.domItem(0);

// play, animasyonları başlatacaktır, eğer hareket etkinleştirilmezse o da etkinleştirmeyecektir, sadece çerçeveyi günceller.
particles.play();

// pause, animasyonları durduracaktır.
particles.pause();
```

---

## Popüler çerçevelerden bazıları için resmi bileşenler

### Angular

#### `ng-particles`

[![npm](https://img.shields.io/npm/v/ng-particles)](https://www.npmjs.com/package/ng-particles) [![npm](https://img.shields.io/npm/dm/ng-particles)](https://www.npmjs.com/package/ng-particles)

Talimatları [burada](https://github.com/matteobruni/tsparticles/blob/main/components/angular/README.md) bulabilirsiniz.

### Inferno

#### `inferno-particles`

[![npm](https://img.shields.io/npm/v/inferno-particles)](https://www.npmjs.com/package/inferno-particles) [![npm](https://img.shields.io/npm/dm/inferno-particles)](https://www.npmjs.com/package/inferno-particles)

Talimatları [burada](https://github.com/matteobruni/tsparticles/blob/main/components/inferno/README.md) bulabilirsiniz.

### jQuery

#### `jquery-particles`

[![npm](https://img.shields.io/npm/v/jquery-particles)](https://www.npmjs.com/package/jquery-particles) [![npm](https://img.shields.io/npm/dm/jquery-particles)](https://www.npmjs.com/package/jquery-particles)

Talimatları [burada](https://github.com/matteobruni/tsparticles/blob/main/components/jquery/README.md) bulabilirsiniz.

### Preact

#### `preact-particles`

[![npm](https://img.shields.io/npm/v/preact-particles)](https://www.npmjs.com/package/preact-particles) [![npm](https://img.shields.io/npm/dm/preact-particles)](https://www.npmjs.com/package/preact-particles)

Talimatları [burada](https://github.com/matteobruni/tsparticles/blob/main/components/preact/README.md) bulabilirsiniz.

### ReactJS

#### `react-tsparticles`

[![npm](https://img.shields.io/npm/v/react-tsparticles)](https://www.npmjs.com/package/react-tsparticles) [![npm](https://img.shields.io/npm/dm/react-tsparticles)](https://www.npmjs.com/package/react-tsparticles)

Talimatları [burada](https://github.com/matteobruni/tsparticles/blob/main/components/react/README.md) bulabilirsiniz.

### Svelte

#### `svelte-particles`

[![npm](https://img.shields.io/npm/v/svelte-particles)](https://www.npmjs.com/package/svelte-particles) [![npm downloads](https://img.shields.io/npm/dm/svelte-particles)](https://www.npmjs.com/package/svelte-particles)

Talimatları [burada](https://github.com/matteobruni/tsparticles/blob/main/components/svelte/README.md) bulabilirsiniz.

### VueJS 2.x

#### `particles.vue`

[![npm](https://img.shields.io/npm/v/particles.vue)](https://www.npmjs.com/package/particles.vue) [![npm](https://img.shields.io/npm/dm/particles.vue)](https://www.npmjs.com/package/particles.vue)

Talimatları [burada](https://github.com/matteobruni/tsparticles/blob/main/components/vue/README.md) bulabilirsiniz.

### VueJS 3.x

#### `particles.vue3`

[![npm](https://img.shields.io/npm/v/particles.vue3)](https://www.npmjs.com/package/particles.vue3) [![npm](https://img.shields.io/npm/dm/particles.vue3)](https://www.npmjs.com/package/particles.vue3)

Talimatları [burada](https://github.com/matteobruni/tsparticles/blob/main/components/vue3/README.md) bulabilirsiniz.

### WordPress

Aslında resmi bir tsParticles eklentisi mevcut değil, ancak `Premium Addons for Elementor` eklenti koleksiyonu ile bir işbirliğim var.

<div style="float: left; margin-right: 10px;">
    <img width="64" alt="Premium Addons for Elementor" src="https://particles.js.org/images/premium-addons-wordpress-plugin.png" />
</div>
<div>
    Premium Addons for Elementor, 55'ten fazla özelleştirilebilir Elementor Widgets ve Section Add-ons sunan, Elementor için en yaygın eklentilerden biridir.
    tsParticles, yalnızca Elementor Page Builder için Premium Particles Section Add-on'a dahildir. <a href="https://premiumaddons.com/particles-section-addon-for-elementor-page-builder/" target="_blank">Şimdi kontrol et.</a>.<br />
    Elementor Page Builder için Premium Addons kullanın ve tek bir kod satırı yazmanıza gerek kalmadan bir sonraki WordPress sitenize tsParticles kütüphanesini ekleme şansını yakalayın. <a href="https://premiumaddons.com/particles-section-addon-for-elementor-page-builder/" target="_blank">Canlı örneğe bakın.</a>.
</div>
<div style="clear: both;"></div>

---

## Şablonlar ve Kaynaklar

tsParticles ile ilgili bazı şablonları [burada](https://github.com/tsparticles/templates) bulabilirsiniz. Şablonlar, *Vanilla Javascript*, *ReactJS*, *VueJS*, *Angular*, *SvelteJS* ve diğer frameworkler için oluşturulmuştur.

Şablonlar değişiklik gösterir, yenileri oluşturulabilir veya eskileri en son özelliklerle güncellenebilir veya daha iyi bir stile dönüştürülebilir. Arada bir onları kontrol edin.

*tsParticles* ile iyi bir tasarım yarattıysanız, havalı şablonunuzla bir PR isteği göndermekten çekinmeyin, şablon yazarı olarak kabul edileceksiniz!

<https://github.com/tsparticles/templates>

---

## **_Demo / Üretici_**

<https://particles.js.org/samples>

[![Particles demo](https://particles.js.org/images/demo.png?v=1.8.1)](https://particles.js.org/samples)

---

### Harf parçacıklar

[![Particles chars demo](https://media.giphy.com/media/JsssOXz72bM6jGEZ0s/giphy.gif)](https://particles.js.org/samples#chars)

---

### "Mouse hover" bağlantıları

[![Particles mouse connections demo](https://media.giphy.com/media/XzvZThpVbxHxMYz5xt/giphy.gif)](https://particles.js.org/samples#connect)

---

### Çokgen maskesi

[![tsParticles Polygon Mask demo](https://media.giphy.com/media/lNRfiSgaMFbL4FMhW6/giphy.gif)](https://particles.js.org/samples#polygonMask)

---

### Hareketli yıldızlar

[![Particles NASA demo](https://media.giphy.com/media/cLqGsnh7FKRVMgPIWE/giphy.gif)](https://particles.js.org/samples#nasa)

---

### Kayan yıldızlar üzerinde uçan Nyan cat

[![Particles Nyan Cat demo](https://media.giphy.com/media/LpX2oNc9ZMgIhIXQL9/giphy.gif)](https://particles.js.org/samples#nyancat2)

---

### Kar parçacıkları

[![tsParticles Snow demo](https://media.giphy.com/media/gihwUFbmiubbkdzEMX/giphy.gif)](https://particles.js.org/samples#snow)

---

### Arka fonu maskeleyen parçacıklar

[![tsParticles Background Mask demo](https://media.giphy.com/media/dWraWgqInWFGWiOyRu/giphy.gif)](https://particles.js.org/samples#background)

---

#### COVID-19 SARS-CoV-2 parçacıkları

[![tsParticles COVID-19 demo](https://media.giphy.com/media/fsVN1ZHksgBIXNIbr1/giphy.gif)](https://particles.js.org/samples#virus)

_Tıklamayın! TIKLAMAYIN! AH, HAYIR YAYILIYOR!!!!_

**COVID-19 ciddi bir hastalıktır. Lütfen evde bulunun, maske takın ve güvende kalın!**

---

**particles.json**

Bazı yapılandırma örneklerini [burada](https://github.com/matteobruni/tsparticles/tree/main/website/presets) bulabilirsiniz. 📖

---

## **_Seçenekler_**

Mevcut tüm seçenekleri [burada](https://particles.js.org/docs/interfaces/Options_Interfaces_IOptions.IOptions.html) bulabilirsiniz. 📖

## Bunu, gerçekte görmek ve denemek ister misiniz?

[CodePen](https://codepen.io/collection/DPOage)'de bir tsParticles koleksiyonu oluşturdum 😮 veya [profilime](https://codepen.io/matteobruni) göz atabilirsiniz

Aksi takdirde, aşağıda demo sayfası bağlantısı var. Aşağıdaki Coronavirüs'e tıklayın/dokunun, fakat korkmayın. **Güvenli.** 😷.

[![tsParticles demo](https://media.giphy.com/media/fsVN1ZHksgBIXNIbr1/giphy.gif)](https://particles.js.org/#virus)

Daha da fazla demo görmek ister misiniz? Depoyu bilgisayarınıza klonlayın ve bu talimatları izleyin.

```shell
yarn install && yarn start
```

**Boom! 💥**! http://localhost:3000 ve diğer demoları kontrol edebilirsiniz.

_Yeterince cesursanız__, geliştirilmekte olan özellikleri denemek için `dev` branch'ine geçebilirsiniz.


---

## Particles.js kütüphanesinden göç

**tsParticles** kütüphanesi, Particles.js yapılandırmasıyla tamamen uyumludur.

Cidden, sadece betik kaynağını değiştirmen gerekiyor et-voilà, **hazırsın** 🧙!

Daha fazlasını **[buradan](https://dev.to/matteobruni/migrating-from-particles-js-to-tsparticles-2a6m)** okuyabilirsiniz.

Geçiş yapmak için 5 neden bilmek ister misiniz? [Burayı](https://dev.to/matteobruni/5-reasons-to-use-tsparticles-and-not-particles-js-1gbe) oku.

_Aşağıda tsParticles'ı ve onun yeni sözdizimini kurmak için ihtiyacınız olan tüm bilgileri bulabilirsiniz._

---

## Eklentiler ve Özelleştirlemeler

tsParticles artık bazı özelleştirmeleri destekliyor 🥳.

**Kendi eklentilerinizi oluşturabilirsiniz**

_Devamını [buradan](https://particles.js.org/docs/modules/Core_Interfaces_IPlugin.html) okuyun..._

---

<p>  
    <a href="https://www.jetbrains.com/?from=tsParticles">  
        <img src="https://raw.githubusercontent.com/matteobruni/tsparticles/gh-pages/images/jetbrains-logos/jetbrains-variant-4.png" height="150" alt="JetBrains" />  
    </a>  
    <a href="https://www.jetbrains.com/webstorm/?from=tsParticles">  
        <img src="https://raw.githubusercontent.com/matteobruni/tsparticles/gh-pages/images/jetbrains-logos/logo.png" height="150" alt="JetBrains" />  
    </a>  
</p>

### 2020-2021 Açık Kaynak Lisansları için [JetBrains](https://www.jetbrains.com/?from=tsParticles)'e çok teşekkürler!

Bu projeyi sürdürmek için [JetBrains WebStorm](https://www.jetbrains.com/webstorm/?from=tsParticles) kullanılmıştır.
