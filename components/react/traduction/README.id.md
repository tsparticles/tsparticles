[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# react-tsparticles

[![npm](https://img.shields.io/npm/v/react-tsparticles)](https://www.npmjs.com/package/react-tsparticles) [![npm](https://img.shields.io/npm/dm/react-tsparticles)](https://www.npmjs.com/package/react-tsparticles)

Komponen resmi [tsParticles](https://github.com/matteobruni/tsparticles) untuk ReactJS

[![Slack](https://particles.js.org/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI) [![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Instalasi

```shell
npm install react-tsparticles react
```

atau

```shell
yarn add react-tsparticles react
```

#### create-react-app

Mulai dari versi 1.17.0 ada dua template `create-react-app`:

- `cra-template-particles`: Template ReactJS sederhana dengan partikel layar penuh, menggunakan JavaScript
- `cra-template-particles-typescript`: Template ReactJS dengan partikel layar penuh, menggunakan TypeScript

Anda dapat menginstallnya dengan perintah `create-react-app` seperti ini:

```shell script
create-react-app your_app --template particles
```

atau

```shell script
create-react-app your_app --template particles-typescript
```

## Cara menggunakan

### Kode

Contoh:

_Remote url_

```javascript
import Particles from "react-tsparticles";

const App = () => {
  const particlesInit = (main) => {
    console.log(main);

    // Anda dapat menginisialisasi tsParticles instance (main) di sini, menambahkan bentuk kustom atau preset
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };

  return (
    <Particles id="tsparticles" url="http://foo.bar/particles.json" init={particlesInit} loaded={particlesLoaded} />
  );
};
```

_Options object_

```javascript
import Particles from "react-tsparticles";

const App = () => {
  const particlesInit = (main) => {
    console.log(main);

    // Anda dapat menginisialisasi tsParticles instance (main) di sini, menambahkan bentuk kustom atau preset
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };
  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "#0d47a1",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 40,
            },
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outMode: "bounce",
            random: false,
            speed: 6,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            random: true,
            value: 5,
          },
        },
        detectRetina: true,
      }}
    />
  );
};
```

### Props

| Prop            | Tipe     | Definisi                                                                                                                                          |
| --------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| width           | string   | Lebar kanvas.                                                                                                                            |
| height          | string   | Tinggi kanvas.                                                                                                                           |
| options         | object   | Opsi untuk partikel.                                                                                                              |
| url             | string   | Opsi remote url, dipanggil dengan AJAX request.                                                                                               |
| style           | object   | Style untuk elemen kanvas.                                                                                                                    |
| className       | string   | Nama kelas untuk wrapper kanvas.                                                                                                               |
| canvasClassName | string   | Nama kelas untuk kanvas.                                                                                                                       |
| container       | object   | Instance untuk [kontainer partikel](https://particles.js.org/docs/modules/_core_container_.html)                                              |
| init            | function | Fungsi ini dipanggil seletah inisialisasi instance tsParticles, parameternya adalah instance tersebut dan Anda dapat memuat preset kustom atau bentuk di sini. |
| loaded          | function | Fungsi ini dipangil ketika partikel sudah termuat dengan benar di kanvas, kontainer saat ini adalah parameternya dan Anda dapat melakukan kustomisasi di sini.         |

Temukan konfigurasi parameter di [sini](https://particles.js.org).

## Demo

Situs demo di [sini](https://particles.js.org)

<https://particles.js.org>

Ada juga koleksi Codepen yang secara aktif diperbarui di [sini](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
