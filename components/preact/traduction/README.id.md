[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# preact-particles

[![npm](https://img.shields.io/npm/v/preact-particles)](https://www.npmjs.com/package/preact-particles) [![npm](https://img.shields.io/npm/dm/preact-particles)](https://www.npmjs.com/package/preact-particles)

Komponen resmi [tsParticles](https://github.com/matteobruni/tsparticles) untuk Preact

## Instalasi

```shell
npm install preact-particles preact
```

atau

```shell
yarn add preact-particles preact
```

## Cara menggunakan

### Kode

Contoh:

_Remote url_

```javascript
import Particles from "preact-particles";

class App extends Component {
  constructor(props) {
    super(props);

    this.particlesInit = this.particlesInit.bind(this);
    this.particlesLoaded = this.particlesLoaded.bind(this);
  }

  particlesInit(main) {
    console.log(main);

    // Anda dapat menginisialisasi tsParticles instance (main) di sini, menambahkan bentuk kustom atau preset
  }

  particlesLoaded(container) {
    console.log(container);
  }

  render() {
    return (
      <Particles
        id="tsparticles"
        url="http://foo.bar/particles.json"
        init={this.particlesInit}
        loaded={this.particlesLoaded}
      />
    );
  }
}
```

_Options object_

```javascript
import Particles from "preact-particles";

class App extends Component {
  constructor(props) {
    super(props);

    this.particlesInit = this.particlesInit.bind(this);
    this.particlesLoaded = this.particlesLoaded.bind(this);
  }

  particlesInit(main) {
    console.log(main);

    // Anda dapat menginisialisasi tsParticles instance (main) di sini, menambahkan bentuk kustom atau preset
  }

  particlesLoaded(container) {
    console.log(container);
  }

  render() {
    return (
      <Particles
        id="tsparticles"
        init={this.particlesInit}
        loaded={this.particlesLoaded}
        options={{
          background: {
            color: {
              value: "#0d47a1",
            },
          },
          fpsLimit: 60,
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
                value_area: 800,
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
  }
}
```

### Props

| Prop            | Tipe     | Definisi                                                                                                                                          |
| --------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| width           | string   | Lebar kanvas.                                                                                                                            |
| height          | string   | Tinggi kanvas.                                                                                                                           |
| options         | object   | Opsi untuk partikel.                                                                                                              |
| url             | string   | Opsi di remote url, dipanggil dengan AJAX request.                                                                                                |
| style           | object   | Style untuk elemen kanvas.                                                                                                                    |
| className       | string   | Nama kelas untuk wrapper kanvas.                                                                                                               |
| canvasClassName | string   | Nama kelas untuk kanvas.                                                                                                                       |
| container       | object   |  Instance untuk [kontainer partikel](https://particles.js.org/docs/modules/_core_container_.html)                                              |
| init            | function | Fungsi ini dipanggil seletah inisialisasi instance tsParticles, parameternya adalah instance tersebut dan Anda dapat memuat preset kustom atau bentuk di sini. |
| loaded          | function |  Fungsi ini dipangil ketika partikel sudah termuat dengan benar di kanvas, kontainer saat ini adalah parameternya dan Anda dapat melakukan kustomisasi di sini.         |

Temukan konfigurasi parameter di [sini](https://particles.js.org).

## Demo

Situs demo di [sini](https://particles.js.org)

<https://particles.js.org>

Ada juga koleksi Codepen yang secara aktif diperbarui di [sini](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
