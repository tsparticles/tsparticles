[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# tsParticles - TypeScript Particles

**Library TypeScript ringan untuk membuat partikel. Bebas dependensi ([\*](#dependencies)) dan tersedia untuk browser!**

_Konversi dari [Particles.js](https://github.com/VincentGarreau/particles.js) ke dalam TypeScript, bebas dependensi ([\*](#dependencies)), ditingkatkan dengan fitur baru yang keren 😎, berbagai perbaikan bug dan **masih aktif ter maintenance**!_

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/tsparticles/badge?style=rounded)](https://www.jsdelivr.com/package/npm/tsparticles) [![Cdnjs](https://img.shields.io/cdnjs/v/tsparticles)](https://cdnjs.com/libraries/tsparticles) [![npmjs](https://badge.fury.io/js/tsparticles.svg)](https://www.npmjs.com/package/tsparticles) [![npm](https://img.shields.io/npm/dm/tsparticles)](https://www.npmjs.com/package/tsparticles) [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/) [![CodeFactor](https://www.codefactor.io/repository/github/matteobruni/tsparticles/badge)](https://www.codefactor.io/repository/github/matteobruni/tsparticles) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/b983aaf3461a4c48b1e2eecce1ff1d74)](https://www.codacy.com/manual/ar3s/tsparticles?utm_source=github.com&utm_medium=referral&utm_content=matteobruni/tsparticles&utm_campaign=Badge_Grade) [![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/matteobruni/tsparticles)

## Ingin menggunakanya di website mu?

**Library ini tersedia pada dua layanan CDN populer yang mudah dan siap untuk digunakan, jika kamu pernah menggunakan particles.js ini akan lebih mudah**.

Temukan Instruksi penggunaan [dibawah](https://github.com/matteobruni/tsparticles/blob/main/README.md#library-installation), dengan semua tautan yang dibutuhkan, dan _jangan takut dengan **TypeScript**, itu hanya bahasa sumber_.

**Output file nya akan tetap JavaScript**. 🤩

Kedua CDN dan `npm` punya semua hal yang kamu butuhkan dalam **Javascript**, sebuah bundle browser yang siap digunakan (tsparticles.min.js) , dan semua file terpisah untuk sintaks `import` .

**Jika kamu tertarik** beberapa baris instruksi dibawah ini untuk berpindah dari library particles.js yang lama.

## **_Pemasangan Library_**

### **_Hosting / CDN_**

**_Tolong gunakan hosting dibawah ini atau hostingmu sendiri untuk memuat tsParticles di project mu_**

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

Mulai dari versi 1.12.11 `import` dan `require` bisa digunakan untuk memuat `tsParticles` .

Sekarang kamu bisa menulisnya seperti ini

```javascript
const tsParticles = require("tsparticles");

// atau

import { tsParticles } from "tsparticles";
```

`tsParticles` yang di muat berasal dari instance yang sama ketika kamu memanggil script nya.

---

### **_NuGet_**

[![Nuget](https://img.shields.io/nuget/v/tsParticles)](https://www.nuget.org/packages/tsParticles/)

---

### **_Penggunaan_**

Muat dan konfigurasi _particles_ nya:

[![tsParticles demo](https://media.giphy.com/media/ftHwBpp3b0qNyCXRuu/giphy.gif)](https://particles.js.org)

**index.html**

```html
<div id="tsparticles"></div>

<script src="tsparticles.min.js"></script>
```

**app.js**

```javascript
// @path-json dapat berupa objek atau array, jika objek adakn dimuat secara langsung, sedangkan untuk array akan dipilih objek secara acak
/* tsParticles.loadJSON(@dom-id, @path-json, @callback (opsional)); */

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
	/* pengaturan disini */
});

//atau

/* tsParticles.loadFromArray(@dom-id, @options, @index (opsional)); */

tsParticles.loadFromArray("tsparticles", [
	{
		/* pengaturan disini */
	},
	{
		/* pengaturan lain disini */
	},
]);
//random object

tsParticles.loadFromArray(
	"tsparticles",
	[
		{
			/* pengaturan disini */
		},
		{
			/* pengaturan lain disini */
		},
	],
	1
); //yang ke-dua
// Penting! Jika index tidak diantara 0...<array.length, maka index akan diabaikan.

// setelah di inisialisasi selanjutnya dapat digunakan.

/* tsParticles.setOnClickHandler(@callback); */

/* ini akan dilakukan oleh semua partikel yang dimuat*/

tsParticles.setOnClickHandler((event, particles) => {
	/* kustomisasi pada penangan klik */
});

// sekarang kamu dapat mengendalikan animasinya juga, sangat memungkinkan untuk menunda dan melanjutkan animasi.
// metode ini tidak mengubah konfigurasi sehingga semua konfigurasimu akan aman
// domItem(0) mengembalikan tsParticles pertama yang dimuat di dalam dom
const particles = tsParticles.domItem(0);

// play digunakan untuk memulai animasi, jika move tidak diaktifkan maka animasi tidak dijalankan, dan hanya akan mengupdate frame
particles.play();

// pause akan membuat animasi berhenti
particles.pause();
```

---

## _Component_ resmi untuk _framework_ yang paling banyak digunakan

### Angular

#### `ng-particles`

[![npm](https://img.shields.io/npm/v/ng-particles)](https://www.npmjs.com/package/ng-particles) [![npm](https://img.shields.io/npm/dm/ng-particles)](https://www.npmjs.com/package/ng-particles)

Kamu dapat menemukan instruksi lengkap [disini](https://github.com/matteobruni/tsparticles/blob/main/components/angular/README.md)

### Inferno

#### `inferno-particles`

[![npm](https://img.shields.io/npm/v/inferno-particles)](https://www.npmjs.com/package/inferno-particles) [![npm](https://img.shields.io/npm/dm/inferno-particles)](https://www.npmjs.com/package/inferno-particles)

Kamu dapat menemukan instruksi lengkap [disini](https://github.com/matteobruni/tsparticles/blob/main/components/inferno/README.md)

### jQuery

#### `jquery-particles`

[![npm](https://img.shields.io/npm/v/jquery-particles)](https://www.npmjs.com/package/jquery-particles) [![npm](https://img.shields.io/npm/dm/jquery-particles)](https://www.npmjs.com/package/jquery-particles)

Kamu dapat menemukan instruksi lengkap [disini](https://github.com/matteobruni/tsparticles/blob/main/components/jquery/README.md)

### Preact

#### `preact-particles`

[![npm](https://img.shields.io/npm/v/preact-particles)](https://www.npmjs.com/package/preact-particles) [![npm](https://img.shields.io/npm/dm/preact-particles)](https://www.npmjs.com/package/preact-particles)

Kamu dapat menemukan instruksi lengkap [disini](https://github.com/matteobruni/tsparticles/blob/main/components/preact/README.md)

### ReactJS

#### `react-tsparticles`

[![npm](https://img.shields.io/npm/v/react-tsparticles)](https://www.npmjs.com/package/react-tsparticles) [![npm](https://img.shields.io/npm/dm/react-tsparticles)](https://www.npmjs.com/package/react-tsparticles)

Kamu dapat menemukan instruksi lengkap [disini](https://github.com/matteobruni/tsparticles/blob/main/components/react/README.md)

### Svelte

#### `svelte-particles`

[![npm](https://img.shields.io/npm/v/svelte-particles)](https://www.npmjs.com/package/svelte-particles) [![npm downloads](https://img.shields.io/npm/dm/svelte-particles)](https://www.npmjs.com/package/svelte-particles)

Kamu dapat menemukan instruksi lengkap [disini](https://github.com/matteobruni/tsparticles/blob/main/components/svelte/README.md)

### VueJS

#### `particles.vue`

[![npm](https://img.shields.io/npm/v/particles.vue)](https://www.npmjs.com/package/particles.vue) [![npm](https://img.shields.io/npm/dm/particles.vue)](https://www.npmjs.com/package/particles.vue)

Kamu dapat menemukan instruksi lengkap [disini](https://github.com/matteobruni/tsparticles/blob/main/components/vue/README.md)

---

## Template dan Resource

Kamu dapat menemukan beberapa template terkait tsParticles [disini](https://github.com/tsparticles/templates). template yang dibuat untuk _Vanilla Javascript_, _ReactJS_, _VueJS_, _Angular_, _SvelteJS_ dan banyak _framework_ lainya.

Template akan bervariasi, akan ada template baru atau template lama yang diperbarui dengan fitur terbaru atau diubah ke gaya yang lebih baik. Coba periksa sesekali.

Jika Kamu membuat beberapa desain template bagus dengan _ tsParticles _ jangan ragu untuk mengirimkan _pull request_ dengan template keren mu, Kamu akan dikreditkan sebagai pembuat template!

<https://github.com/tsparticles/templates>

---

## **_Demo / Generator_**

<https://particles.js.org/samples>

[![Particles demo](https://particles.js.org/images/demo.png?v=1.8.1)](https://particles.js.org/samples)

---

### Characters as particles

[![Particles chars demo](https://media.giphy.com/media/JsssOXz72bM6jGEZ0s/giphy.gif)](https://particles.js.org/samples#chars)

---

### Mouse hover connections

[![Particles mouse connections demo](https://media.giphy.com/media/XzvZThpVbxHxMYz5xt/giphy.gif)](https://particles.js.org/samples#connect)

---

### Polygon mask

[![tsParticles Polygon Mask demo](https://media.giphy.com/media/lNRfiSgaMFbL4FMhW6/giphy.gif)](https://particles.js.org/samples#polygonMask)

---

### Animated stars

[![Particles NASA demo](https://media.giphy.com/media/cLqGsnh7FKRVMgPIWE/giphy.gif)](https://particles.js.org/samples#nasa)

---

### Nyan cat flying on scrolling stars

[![Particles Nyan Cat demo](https://media.giphy.com/media/LpX2oNc9ZMgIhIXQL9/giphy.gif)](https://particles.js.org/samples#nyancat2)

---

### Snow particles

[![tsParticles Snow demo](https://media.giphy.com/media/gihwUFbmiubbkdzEMX/giphy.gif)](https://particles.js.org/samples#snow)

---

### Background Mask particles

[![tsParticles Background Mask demo](https://media.giphy.com/media/dWraWgqInWFGWiOyRu/giphy.gif)](https://particles.js.org/samples#background)

---

#### COVID-19 SARS-CoV-2 particles

[![tsParticles COVID-19 demo](https://media.giphy.com/media/fsVN1ZHksgBIXNIbr1/giphy.gif)](https://particles.js.org/samples#virus)

_JANGAN DISENTUH! JANGAN! OH TIDAK VIRUS NYA MENYEBAR!!!!_

**COVID-19 adalah penyakit yang serius. Tolong tetap dirumah, Pakai masker dan tetap aman!**

---

**particles.json**

Temukan contoh kode di [disini](https://github.com/matteobruni/tsparticles/tree/main/website/presets) 📖

---

## **Pengaturan/Konfigurasi**

Kamu dapat menemukan semua konfigurasi [disini](https://particles.js.org/docs/interfaces/_options_interfaces_ioptions_.ioptions.html) 📖

## Ingin melihat dan mencobanya langsung?

Saya sedah membuat sebuah koleksi di [CodePen](https://codepen.io/collection/DPOage) 😮 untuk tsParticles atau kamu bisa cek ke [profil ku](https://codepen.io/matteobruni).

Jika tidak, ada tautan halaman demo di bawah ini. Cukup klik / tap Coronavirus di bawah ini, jangan takut. **Ini aman** 😷.

[![tsParticles demo](https://media.giphy.com/media/fsVN1ZHksgBIXNIbr1/giphy.gif)](https://particles.js.org/#virus)

Ingin melihat lebih banyak demo? _Clone repository_ ini ke komputermu dan ikuti instruksi dibawah ini.

```shell
yarn install && yarn start
```

**Boom! 💥** <http://localhost:3000> dan sekarang kamu bisa melihat demo lainnya.

_Jika kamu cukup pemberani_ kamu bisa berpindah ke _branch_ `dev` untuk mencoba fitur yang sedang dalam pengembangan.

## Dependencies

Kamu mungkin menyadari \* hampir bebas _dependency_. Ya, hampir semua fitur dapat berfungsi tanpa _dependency_, tapi... ya, ada sedikit pengecualian. misal fitur **Polygon Mask** memerlukan [`pathseg`](https://github.com/progers/pathseg) agar bekerja dengan baik di beberapa browser, dan Jelas Ikon Font (seperti `FontAwesome` ) pasti ditambahkan di halamanmu.

---

## Berpindah dari Particles.js

_Konfigurasi dari library_ **tsParticles** sepenuhnya cocok dengan konfigurasi _particles.js_.

Seriusan, Kamu cuma perlu mengganti sumber kode et-voilà, **siap digunakan** 🧙!

Kamu bisa membaca lebih lanjut **[disini](https://dev.to/matteobruni/migrating-from-particles-js-to-tsparticles-2a6m)**

Ingin tau 5 alasan kenapa haru pindah? [baca disini](https://dev.to/matteobruni/5-reasons-to-use-tsparticles-and-not-particles-js-1gbe)

_Dibawah ini kamu bisa menemukan semua informasi yang kamu butuhkan untuk menginstal tsParticles dan sintak baru nya._

---

## Plugins/kustomisasi

tsParticles sekarang mendukung beberapa kustomisasi 🥳.

**Kamu bisa membuat plugin mu sendiri**

_Baca selengkapnya [disini](https://particles.js.org/docs/modules/_core_interfaces_iplugin_.html)...\_

---

### API Docs

Dokumentasi dan Referensi Pengembangan [here](https://particles.js.org/docs/) 📖

---

[![Slack](https://particles.js.org/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI) [![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles")

---

<p>
<a  href="https://www.jetbrains.com/?from=tsParticles">
<img  src="https://particles.js.org/images/jetbrains-logos/jetbrains-variant-4.png"  height="150"  alt="JetBrains" />

</a>

<a  href="https://www.jetbrains.com/webstorm/?from=tsParticles">

<img  src="https://particles.js.org/images/jetbrains-logos/webstorm_logos/logo.png"  height="150"  alt="JetBrains" />

</a>

</p>

### Terimakasih banyak kepada [JetBrains](https://www.jetbrains.com/?from=tsParticles) untuk Lisensi Open Source 2020!

[JetBrains WebStorm](https://www.jetbrains.com/webstorm/?from=tsParticles) digunakan untuk me-_maintain_ project ini.

### Terimakasih banyak kepada [SauceLabs](https://saucelabs.com) untuk Lisensi Open Source!

<img  alt="Testing Powered By SauceLabs"  src="https://raw.githubusercontent.com/saucelabs/saucelabs.github.io/publish/images/opensauce/powered-by-saucelabs-badge-red.svg"  width="250" />
