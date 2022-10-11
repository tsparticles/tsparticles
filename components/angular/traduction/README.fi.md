[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# ng-particles

[![npm](https://img.shields.io/npm/v/ng-particles)](https://www.npmjs.com/package/ng-particles) [![npm](https://img.shields.io/npm/dm/ng-particles)](https://www.npmjs.com/package/ng-particles) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

Virallinen [tsParticles](https://github.com/matteobruni/tsparticles) Angular komponentti

[![Slack](https://particles.js.org/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI) [![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Käyttöohjeet

### Asennus

```shell
$ npm install ng-particles tsparticles-engine
```

tai

```shell
$ yarn add ng-particles tsparticles-engine
```

### Käyttö

_template.html_

```html

<ng-particles [id]="id" [options]="particlesOptions" [particlesInit]="particlesInit"
              (particlesLoaded)="particlesLoaded($event)"></ng-particles>

<!-- or -->

<ng-particles [id]="id" [url]="particlesUrl" [particlesInit]="particlesInit"
              (particlesLoaded)="particlesLoaded($event)"></ng-particles>
```

_app.ts_

```typescript
import { MoveDirection, ClickMode, HoverMode, OutMode } from "tsparticles-engine";
import { loadFull } from "tsparticles";

export class AppComponent {
  id = "tsparticles";

  /* Alkaen versiosta 1.19.0 voit käyttää etä url osoitetta (AJAX-pyyntö) JSON-tiedostoon konfiguraation kanssa */
  particlesUrl = "http://foo.bar/particles.json";

  /* tai JavaScript olio */
  particlesOptions = {
    background: {
      color: {
        value: "#0d47a1"
      }
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: ClickMode.push
        },
        onHover: {
          enable: true,
          mode: HoverMode.repulse
        },
        resize: true
      },
      modes: {
        push: {
          quantity: 4
        },
        repulse: {
          distance: 200,
          duration: 0.4
        }
      }
    },
    particles: {
      color: {
        value: "#ffffff"
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1
      },
      collisions: {
        enable: true
      },
      move: {
        direction: MoveDirection.none,
        enable: true,
        outModes: {
          default: OutMode.bounce
        },
        random: false,
        speed: 6,
        straight: false
      },
      number: {
        density: {
          enable: true,
          area: 800
        },
        value: 80
      },
      opacity: {
        value: 0.5
      },
      shape: {
        type: "circle"
      },
      size: {
        value: {min: 1, max: 5 },
      }
    },
    detectRetina: true
  };

  particlesLoaded(container: Container): void {
    console.log(container);
  }

  async particlesInit(engine: Engine): Promise<void> {
    console.log(engine);

    // Alkaen versiosta 1.19.0 voit lisätä mukautettuja esiasetuksia tai muotoja tähän, käyttämällä valittua tsParticles esiintymää (main)
    // tämä lataa tsparticles-paketin, joka on helpoin tapa saada kaikki käyttövalmiiksi
    // alaken versiosta 2 voit lisätä vain tarvitsemasi ominaisuudet ja pienentää paketin kokoa
    await loadFull(engine);
  }
}
```

_app.module.ts_

```typescript
import { NgParticlesModule } from "ng-particles";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [
    /* Sovellus komponentti (AppComponent) */
  ],
  imports: [
    /* muut importit */ NgParticlesModule /* NgParticlesModule vaaditaan*/
  ],
  providers: [],
  bootstrap: [
    /* Sovellus komponentti (AppComponent) */
  ]
})
export class AppModule {
}
```

## Demot

Demo verkkosivu on [täällä](https://particles.js.org)

<https://particles.js.org>

Aktiivisesti ylläpidetty ja päivitetty CodePen kokoelma löytyy [täältä](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
