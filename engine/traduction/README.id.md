[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles - TypeScript Particles

**Sebuah library TypeScript yang ringan untuk membuat partikel. Tanpa dependency (\*), siap untuk browser dan kompatibel dengan
React.js, Vue.js (2.x dan 3.x), Angular, Svelte, jQuery, Preact, Inferno, Riot.js, Solid.js, dan Web Components**

[![Rate on Openbase](https://badges.openbase.com/js/rating/tsparticles.svg)](https://openbase.com/js/tsparticles?utm_source=embedded&utm_medium=badge&utm_campaign=rate-badge) [![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles/badge?style=rounded)](https://www.jsdelivr.com/package/npm/tsparticles) [![Cdnjs](https://img.shields.io/cdnjs/v/tsparticles)](https://cdnjs.com/libraries/tsparticles) [![npmjs](https://badge.fury.io/js/tsparticles.svg)](https://www.npmjs.com/package/tsparticles) [![npm](https://img.shields.io/npm/dm/tsparticles)](https://www.npmjs.com/package/tsparticles) [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/) [![CodeFactor](https://www.codefactor.io/repository/github/matteobruni/tsparticles/badge)](https://www.codefactor.io/repository/github/matteobruni/tsparticles) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/b983aaf3461a4c48b1e2eecce1ff1d74)](https://www.codacy.com/manual/ar3s/tsparticles?utm_source=github.com&utm_medium=referral&utm_content=matteobruni/tsparticles&utm_campaign=Badge_Grade)[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/matteobruni/tsparticles)

---

## Ingin menggunakannya di situs Anda?

_Dokumentasi dan referensi pengembang dapat dilihat di [sini](https://particles.js.org/docs/) 📖_

**Library ini tersedia di dua CDN paling populer sehingga mudah dan siap untuk digunakan. Jika Anda menggunakan particles.js, itu akan menjadi lebih mudah.**

Anda dapat menemukan instruksinya [di bawah ini](https://github.com/matteobruni/tsparticles/blob/main/README.md#library-installation) dengan semua tautan yang dibutuhkan, _tidak perlu takut dengan **TypeScript**, itu hanya bahasa sumber_.

**File keluaran akhir hanyalah JavaScript**. 🤩

CDN dan `npm` memiliki semua sumber yang Anda butuhkan di **Javascript**, sebuah bundel yang siap digunakan di browser (tsparticles.min.js) dan semua file yang sudah dipecah untuk sintaksis `import`.

**Jika Anda masih tertarik,** beberapa baris di bawah adalah instruksi untuk migrasi dari library particles.js lama.

## **_Instalasi library_**

### **_Hosting / CDN_**

**_Mohon gunakan host ini atau host Anda sendiri untuk memuat tsParticles di project Anda_**

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

#### Import dan require

Mulai dari versi 1.12.11 `import` dan `require` dapat digunakan untuk mengimpor `tsParticles` .

Sekarang Anda dapat menulisnya seperti berikut

```javascript
const tsParticles = require("tsparticles");

// atau

import { tsParticles } from "tsparticles";
```

Kedua cara akan mengimpor `tsParticles` yang sama.

---

### **_NuGet_**

[![Nuget](https://img.shields.io/nuget/v/tsParticles)](https://www.nuget.org/packages/tsParticles/)

---

### **_Usage_**

Muat tsParticles dan atur partikel:

[![tsParticles demo](https://media.giphy.com/media/ftHwBpp3b0qNyCXRuu/giphy.gif)](https://particles.js.org)

**index.html**

```html
<div id="tsparticles"></div>

<script src="tsparticles.min.js"></script>
```

**app.js**

```javascript
// @path-json dapat merupakan sebuah objek atau sebuah array, objek akan langsung dimuat sedangkan objek dalam array akan dipilih secara acak.
/* tsParticles.loadJSON(@dom-id, @path-json, @callback (optional)); */

tsParticles
  .loadJSON("tsparticles", "presets/default.json")
  .then((container) => {
    console.log("callback - tsparticles config loaded");
  })
  .catch((error) => {
    console.error(error);
  });

//atau

/* tsParticles.load(@dom-id, @options); */

tsParticles.load("tsparticles", {
  /* options di sini */
});

//atau

/* tsParticles.loadFromArray(@dom-id, @options, @index (optional)); */

tsParticles.loadFromArray("tsparticles", [
  {
    /* options di sini */
  },
  {
    /* options lain di sini */
  },
]);
//objek acak (tanpa indeks di akhir)

tsParticles.loadFromArray(
  "tsparticles",
  [
    {
      /* options di sini */
    },
    {
      /* options lain di sini */
    },
  ],
  1
); //yang kedua (dengan indeks 1 di akhir)
// Penting! Jika indeks tidak dalam rentang 0...<index.length, indeks akan diabaikan.

// setelah inisialisasi ini dapat dilakukan.

/* tsParticles.setOnClickHandler(@callback); */

/* ini akan dijalankan oleh seluruh partikel yang dimuat */

tsParticles.setOnClickHandler((event, particles) => {
  /* custom on click handler */
});

// sekarang Anda dapat mengatur animasi juga, termasuk untuk jeda dan melanjutkan animasi.
// metode ini tidak mengubah config sehingga konfigurasi Anda tetap aman.
// domItem(0) mengembalikan instance tsParticles pertama yang dimuat di dom
const particles = tsParticles.domItem(0);

// play akan menjalankan animasi, jika move tidak aktif ini tidak akan mengaktifkannya, hanya memperbarui frame
particles.play();

// pause akan menghentikan animasi
particles.pause();
```

---

## Komponen resmi untuk beberapa framework populer

### Angular

#### `ng-particles`

[![npm](https://img.shields.io/npm/v/ng-particles)](https://www.npmjs.com/package/ng-particles) [![npm](https://img.shields.io/npm/dm/ng-particles)](https://www.npmjs.com/package/ng-particles)

Anda dapat menemukan instruksinya di [sini](https://github.com/matteobruni/tsparticles/blob/main/components/angular/README.md)

### Inferno

#### `inferno-particles`

[![npm](https://img.shields.io/npm/v/inferno-particles)](https://www.npmjs.com/package/inferno-particles) [![npm](https://img.shields.io/npm/dm/inferno-particles)](https://www.npmjs.com/package/inferno-particles)

Anda dapat menemukan instruksinya di [sini](https://github.com/matteobruni/tsparticles/blob/main/components/inferno/README.md)

### jQuery

#### `jquery-particles`

[![npm](https://img.shields.io/npm/v/jquery-particles)](https://www.npmjs.com/package/jquery-particles) [![npm](https://img.shields.io/npm/dm/jquery-particles)](https://www.npmjs.com/package/jquery-particles)

Anda dapat menemukan instruksinya di [sini](https://github.com/matteobruni/tsparticles/blob/main/components/jquery/README.md)

### Preact

#### `preact-particles`

[![npm](https://img.shields.io/npm/v/preact-particles)](https://www.npmjs.com/package/preact-particles) [![npm](https://img.shields.io/npm/dm/preact-particles)](https://www.npmjs.com/package/preact-particles)

Anda dapat menemukan instruksinya di [sini](https://github.com/matteobruni/tsparticles/blob/main/components/preact/README.md)

### ReactJS

#### `react-tsparticles`

[![npm](https://img.shields.io/npm/v/react-tsparticles)](https://www.npmjs.com/package/react-tsparticles) [![npm](https://img.shields.io/npm/dm/react-tsparticles)](https://www.npmjs.com/package/react-tsparticles)

Anda dapat menemukan instruksinya di [sini](https://github.com/matteobruni/tsparticles/blob/main/components/react/README.md)

### Svelte

#### `svelte-particles`

[![npm](https://img.shields.io/npm/v/svelte-particles)](https://www.npmjs.com/package/svelte-particles) [![npm downloads](https://img.shields.io/npm/dm/svelte-particles)](https://www.npmjs.com/package/svelte-particles)

Anda dapat menemukan instruksinya di [sini](https://github.com/matteobruni/tsparticles/blob/main/components/svelte/README.md)

### VueJS 2.x

#### `particles.vue`

[![npm](https://img.shields.io/npm/v/particles.vue)](https://www.npmjs.com/package/particles.vue) [![npm](https://img.shields.io/npm/dm/particles.vue)](https://www.npmjs.com/package/particles.vue)

Anda dapat menemukan instruksinya di [sini](https://github.com/matteobruni/tsparticles/blob/main/components/vue/README.md)

### VueJS 3.x

#### `particles.vue3`

[![npm](https://img.shields.io/npm/v/particles.vue3)](https://www.npmjs.com/package/particles.vue3) [![npm](https://img.shields.io/npm/dm/particles.vue3)](https://www.npmjs.com/package/particles.vue3)

Anda dapat menemukan instruksinya di [sini](https://github.com/matteobruni/tsparticles/blob/main/components/vue3/README.md)

---

## **_Demo / Generator_**

<https://particles.js.org/>

[![Particles demo](https://particles.js.org/images/demo.png?v=1.8.1)](https://particles.js.org/)

---

### Huruf sebagai partikel

[![Particles chars demo](https://media.giphy.com/media/JsssOXz72bM6jGEZ0s/giphy.gif)](https://particles.js.org/#chars)

---

### Koneksi dengan mouse hover

[![Particles mouse connections demo](https://media.giphy.com/media/XzvZThpVbxHxMYz5xt/giphy.gif)](https://particles.js.org/#connect)

---

### Topeng polygon

[![tsParticles Polygon Mask demo](https://media.giphy.com/media/lNRfiSgaMFbL4FMhW6/giphy.gif)](https://particles.js.org/#polygonMask)

---

### Animasi bintang

[![Particles NASA demo](https://media.giphy.com/media/cLqGsnh7FKRVMgPIWE/giphy.gif)](https://particles.js.org/#nasa)

---

### Nyan cat terbang dengan bintang

[![Particles Nyan Cat demo](https://media.giphy.com/media/LpX2oNc9ZMgIhIXQL9/giphy.gif)](https://particles.js.org/#nyancat2)

---

### Partikel salju

[![tsParticles Snow demo](https://media.giphy.com/media/gihwUFbmiubbkdzEMX/giphy.gif)](https://particles.js.org/#snow)

---

### Partikel dengan latar belakang

[![tsParticles Background Mask demo](https://media.giphy.com/media/dWraWgqInWFGWiOyRu/giphy.gif)](https://particles.js.org/#background)

---

#### Partikel COVID-19 SARS-CoV-2

[![tsParticles COVID-19 demo](https://media.giphy.com/media/fsVN1ZHksgBIXNIbr1/giphy.gif)](https://particles.js.org/#virus)

_Jangan klik! JANGAN KLIK! TIDAKK DIA JADI MENYEBAR!!!!_

**COVID-19 adalah penyakit yang serius. Tolong tetap di rumah aja, pakai masker dan jaga jarak!**

---

**particles.json**

Anda dapat menemukan contoh config di [sini](https://particles.js.org/docs/modules/_core_container_.html) 📖

---

## **_Options_**

Adna dapat menemukan semua options yang tersedia di [sini](https://particles.js.org/docs/interfaces/_options_interfaces_ioptions_.ioptions.html) 📖

## Mau melihat secara langsung dan mencobanya?

Saya telah membuat koleksi tsParticles di [CodePen](https://codepen.io/collection/DPOage) 😮 atau Anda dapat mengeceknya di [profil saya](https://codepen.io/matteobruni)

Selain itu saya juga telah membuat situs demo di bawah ini. Klik saja Coronavirus di bawah, jangan takut. **Aman kok** 😷.

[![tsParticles demo](https://media.giphy.com/media/fsVN1ZHksgBIXNIbr1/giphy.gif)](https://particles.js.org/#virus)

Mau melihat lebih banyak demo? Klon repository ini di komputer Anda dan ikuti instruksi berikut

```shell
yarn install && yarn start
```

**Boom! 💥** <http://localhost:3000> dan Anda dapat melihat demo lainnya.

_Jika Anda cukup berani,_ checkout ke branch `dev` untuk mencoba fitur yang masih dalam pengembangan.

---

## Migrasi dari Particles.js

Library **tsParticles** sepenuhnya kompatibel dengan konfigurasi _particles.js_.

Serius, Anda cukup mengganti sumber script dan et-voilà, **siap digunakan** 🧙!

Anda dapat membaca lebih banyak di **[sini](https://dev.to/matteobruni/migrating-from-particles-js-to-tsparticles-2a6m)**

Ingin tahu 5 alasan untuk migrasi? [Baca di sini](https://dev.to/matteobruni/5-reasons-to-use-tsparticles-and-not-particles-js-1gbe)

_Di bawah ini Anda dapat menemukan semua informasi yang dibutuhkan untuk memasang tsParticles dan sintaksis barunya._

---

## Plugins/Customizations

tsParticles sekarang mendukung beberapa kustomisasi 🥳.

**Anda dapat membuat plugin sendiri**

_Baca di [sini](https://particles.js.org/docs/modules/_core_interfaces_iplugin_.html)..._

---

### API Docs

Dokumentasi API di [sini](https://particles.js.org/docs/) 📖

---

[![Slack](https://particles.js.org/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI) [![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles")