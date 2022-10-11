[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# react-particles

[![npm](https://img.shields.io/npm/v/react-particles)](https://www.npmjs.com/package/react-particles) [![npm](https://img.shields.io/npm/dm/react-particles)](https://www.npmjs.com/package/react-particles) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

Virallinen [tsParticles](https://github.com/matteobruni/tsparticles) ReactJS komponentti

[![Slack](https://particles.js.org/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI) [![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Asennus

```shell
npm install react-particles
```

tai

```shell
yarn add react-particles
```

### create-react-app

Alkaen versiosta 1.17.0 virallisia `create-react-app` malleja on kaksi:

- `cra-template-particles`: Yksinkertainen ReactJS fullscreen partikkeli malli JavaScriptillä
- `cra-template-particles-typescript`: Yksinkertainen ReactJS fullscreen partikkeli malli TypeScriptillä

Voit asentaa ne yksinkertaisesti `create-react-app` komennolla:

```shell
$ create-react-app your_app --template particles
```

tai

```shell
$ create-react-app your_app --template particles-typescript
```

## Käyttöohje

### Koodi

Esimerkit:

#### Remote url

##### JavaScript tuki - url

```jsx
import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

const App = () => {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    // Täällä voit alustaa tsParticles esiintymän (main), lisäämällä mukautettuja muotoja tai esiasetuksia
    // tämä lataa tsparticles-paketin, joka on helpoin tapa saada kaikki käyttövalmiiksi
    // alaken versiosta 2 voit lisätä vain tarvitsemasi ominaisuudet ja pienentää paketin kokoa
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  return (
    <Particles id="tsparticles" url="http://foo.bar/particles.json" init={particlesInit} loaded={particlesLoaded} />
  );
};
```

##### TypeScript tuki - url

```typescript jsx
import { useCallback } from "react";
import Particles from "react-particles";
import type { Container, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";

const App = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);

    // Täällä voit alustaa tsParticles esiintymän (main), lisäämällä mukautettuja muotoja tai esiasetuksia
    // tämä lataa tsparticles-paketin, joka on helpoin tapa saada kaikki käyttövalmiiksi
    // alaken versiosta 2 voit lisätä vain tarvitsemasi ominaisuudet ja pienentää paketin kokoa
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    await console.log(container);
  }, []);

  return (
    <Particles id="tsparticles" url="http://foo.bar/particles.json" init={particlesInit} loaded={particlesLoaded} />
  );
};
```

#### Asetukset objekti

##### JavaScript tuki - objekti

```jsx
import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

const App = () => {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    // Täällä voit alustaa tsParticles esiintymän (main), lisäämällä mukautettuja muotoja tai esiasetuksia
    // tämä lataa tsparticles-paketin, joka on helpoin tapa saada kaikki käyttövalmiiksi
    // alaken versiosta 2 voit lisätä vain tarvitsemasi ominaisuudet ja pienentää paketin kokoa
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

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
            directions: "none",
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
};
```

##### TypeScript tuki - objekti

```typescript jsx
import { useCallback } from "react";
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

const App = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);

    // Täällä voit alustaa tsParticles esiintymän (main), lisäämällä mukautettuja muotoja tai esiasetuksia
    // tämä lataa tsparticles-paketin, joka on helpoin tapa saada kaikki käyttövalmiiksi
    // alaken versiosta 2 voit lisätä vain tarvitsemasi ominaisuudet ja pienentää paketin kokoa
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    await console.log(container);
  }, []);
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
};
```

### Parametrit

| Parametri       | Tyyppi   | Määritelmä                                                                                                                                             |
|-----------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| id              | string   | Elementin id.                                                                                                                                          |
| width           | string   | Kanvaksen leveys.                                                                                                                                      |
| height          | string   | Kanvaksen korkeus.                                                                                                                                     |
| options         | object   | Partikkeli esiintymän asetukset.                                                                                                                       |
| url             | string   | Etäasetusten url, kutsutaan käyttäen AJAX requestia.                                                                                                   |
| style           | object   | Kanvas elementin tyyli.                                                                                                                                |
| className       | string   | Kanvas wrapper luokan nimi.                                                                                                                            |
| canvasClassName | string   | Kanvaksen luokan nimi.                                                                                                                                 |
| container       | object   | [Partikkeli säiliön](https://particles.js.org/docs/modules/Core_Container.html) esiintymä.                                                             |
| init            | function | Tämä funktio kutsutaan tsParticles esiintymän määrittelyn jälkeen, esiintymä on parametri, ja voit ladata mukautettuja esiasetuksia tai muotoja tästä. |
| loaded          | function | Tämä funktio kutsutaan kun partikkelit on ladattu kanvakselle onnistuneesti, nykyinen säiliö tulee parametrinä ja sitä voidaan mukauttaa täällä.       |

#### particles.json

Kaikki konfiguraatio asetukset löytyvät [täältä](https://particles.js.org/docs/interfaces/Options_Interfaces_IOptions.IOptions.html).

Yksinkertaisia json esimerkkejä löytyy [täältä](https://github.com/matteobruni/tsparticles/tree/main/website/presets) 📖

## Demot

Esiasetetut demot löytyvät [täältä](https://particles.js.org/samples/presets/index.html)

Aktiivisesti ylläpidetty ja päivitetty CodePen kokoelma löytyy [täältä](https://codepen.io/collection/DPOage)

Raportoi bugit ja virheet [tänne](https://github.com/matteobruni/tsparticles/issues)

[tsParticle Website](https://particles.js.org)
