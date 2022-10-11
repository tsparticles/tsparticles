[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# preact-particles

[![npm](https://img.shields.io/npm/v/preact-particles)](https://www.npmjs.com/package/preact-particles) [![npm](https://img.shields.io/npm/dm/preact-particles)](https://www.npmjs.com/package/preact-particles) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

Virallinen [tsParticles](https://github.com/matteobruni/tsparticles) Preact komponentti

[![Slack](https://particles.js.org/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI) [![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Asennus

```shell
npm install preact-particles
```

tai

```shell
yarn add preact-particles
```

## Käyttöohjeet

### Koodi

Esimerkit:

_Remote url_

```javascript
import Particles from "preact-particles";
import { loadFull } from "tsparticles";

class App extends Component {
  constructor(props) {
    super(props);

    this.particlesInit = this.particlesInit.bind(this);
    this.particlesLoaded = this.particlesLoaded.bind(this);
  }

  particlesInit(main) {
    console.log(main);

    // Täällä voit alustaa tsParticles esiintymän (main), lisäämällä mukautettuja muotoja tai esiasetuksia
    // tämä lataa tsparticles-paketin, joka on helpoin tapa saada kaikki käyttövalmiiksi
    // alaken versiosta 2 voit lisätä vain tarvitsemasi ominaisuudet ja pienentää paketin kokoa
    loadFull(main);
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

_Options objekti_

```javascript
import Particles from "preact-particles";
import { loadFull } from "tsparticles";

class App extends Component {
  constructor(props) {
    super(props);

    this.particlesInit = this.particlesInit.bind(this);
    this.particlesLoaded = this.particlesLoaded.bind(this);
  }

  particlesInit(main) {
    console.log(main);

    // Täällä voit alustaa tsParticles esiintymän (main), lisäämällä mukautettuja muotoja tai esiasetuksia
    // tämä lataa tsparticles-paketin, joka on helpoin tapa saada kaikki käyttövalmiiksi
    // alaken versiosta 2 voit lisätä vain tarvitsemasi ominaisuudet ja pienentää paketin kokoa
    loadFull(main);
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
              outModes: {
                default: "bounce",
              },
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
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
    );
  }
}
```

### Parametrit

| Parametri       | Tyyppi   | Määritelmä                                                                                                                                            |
|-----------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| id              | string   | Elementin id.                                                                                                                                         |
| width           | string   | Kanvaksen leveys.                                                                                                                                     |
| height          | string   | Kanvaksen korkeus.                                                                                                                                    |
| options         | object   | Partikkeli esiintymän asetukset.                                                                                                                      |
| url             | string   | Etäasetusten url, kutsutaan käyttäen AJAX requestia.                                                                                                  |
| style           | object   | Kanvas elementin tyyli.                                                                                                                               |
| className       | string   | Kanvas wrapper luokan nimi.                                                                                                                           |
| canvasClassName | string   | Kanvaksen luokan nimi.                                                                                                                                |
| container       | object   | [Partikkeli säiliön](https://particles.js.org/docs/modules/Core_Container.html) esiintymä.                                                            |
| init            | function | Tämä funktio kutsutaan tsParticles esiintymän määrittelyn jälkeen, esiintymä on parametri, ja voit ladata mukautettuja esiasetuksia tai muotoja tästä |
| loaded          | function | Tämä funktio kutsutaan kun partikkelit on ladattu kanvakselle onnistuneesti, nykyinen säiliö tulee parametrinä ja sitä voidaan mukauttaa täällä.      |

Parametrien konfiguraatiot löytyvät [täältä](https://particles.js.org).

## Demot

Demo verkkosivu löytyy [täältä](https://particles.js.org)

<https://particles.js.org>

Aktiivisesti ylläpidetty ja päivitetty CodePen kokoelma löytyy [täältä](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
