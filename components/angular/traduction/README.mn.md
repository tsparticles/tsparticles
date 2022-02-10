[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# ng-particles

[![npm](https://img.shields.io/npm/v/ng-particles)](https://www.npmjs.com/package/ng-particles) [![npm](https://img.shields.io/npm/dm/ng-particles)](https://www.npmjs.com/package/ng-particles)

Албан ёсны [tsParticles](https://github.com/matteobruni/tsparticles) Angular компонэнт

[![Slack](https://particles.js.org/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI) [![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Хэрхэн хэрэглэх вэ?

### Татах

```shell script
npm install ng-particles tsparticles
```

or

```shell script
yarn add ng-particles tsparticles
```

### Ашиглалт

_template.html_

```html

<ng-particles [id]="id" [options]="particlesOptions" (particlesLoaded)="particlesLoaded($event)"
              (particlesInit)="particlesInit($event)"></ng-particles>

<!-- эсвэл -->

<ng-particles [id]="id" [url]="particlesUrl" (particlesLoaded)="particlesLoaded($event)"
              (particlesInit)="particlesInit($event)"></ng-particles>
```

_app.ts_

```typescript
export class AppComponent {
  id = "tsparticles";
  /* 1.19.0 ээс эхлэн та remote url (AJAX хүсэлт) ээс JSON руу тохиргоо хийж болно*/
  particlesUrl = "http://foo.bar/particles.json";

  /* эсвэл сонгодог Javascript обьект*/
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
          mode: "push"
        },
        onHover: {
          enable: true,
          mode: "repulse"
        },
        resize: true
      },
      modes: {
        bubble: {
          distance: 400,
          duration: 2,
          opacity: 0.8,
          size: 40
        },
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
        direction: "none",
        enable: true,
        outModes: "bounce",
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
        random: true,
        value: 5
      }
    },
    detectRetina: true
  };

  particlesLoaded(container: Container): void {
    console.log(container);
  }

  async particlesInit(engine: Engine): Promise<void> {
    console.log(engine);

    // 1.19.0 ээс эхлэн та одоогийн tsParticles instance (main) ашиглан дурын дүрсээ нэмж болно
  }
}
```

_app.module.ts_

```typescript
import { NgParticlesModule } from "ng-particles";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [
    /* АппКомпонэнт */
  ],
  imports: [
    /* бусад импортууд */ NgParticlesModule /* NgParticlesModule зайлшгүй хэрэгтэй*/
  ],
  providers: [],
  bootstrap: [
    /* АппКомпонэнт */
  ]
})
export class AppModule {
}
```

## Demos

Үзүүлэн вэбсайт [энд](https://particles.js.org)

<https://particles.js.org>

CodePen -ий байнга шинэчлэгдэж байдаг цуглуулга [энд](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
