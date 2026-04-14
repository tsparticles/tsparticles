[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# @tsparticles/angular

[![npm](https://img.shields.io/npm/v/@tsparticles/angular)](https://www.npmjs.com/package/ng-particles) [![npm](https://img.shields.io/npm/dm/@tsparticles/angular)](https://www.npmjs.com/package/@tsparticles/angular) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

Official [tsParticles](https://github.com/matteobruni/tsparticles) Angular component

[![Slack](https://particles.js.org/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI) [![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Installation

```shell
npm install @tsparticles/angular @tsparticles/engine
```

or

```shell
yarn add @tsparticles/angular @tsparticles/engine
```

## How to use

### Initialize once

Call `NgParticlesService.init(...)` once in your app lifecycle before rendering `<ngx-particles />`.

```ts
import { Component, OnInit } from "@angular/core";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import { ClickMode, HoverMode } from "@tsparticles/engine";
import { NgParticlesService } from "@tsparticles/angular";
import { loadSlim } from "@tsparticles/slim";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  id = "tsparticles";

  particlesOptions: ISourceOptions = {
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
          mode: ClickMode.push,
        },
        onHover: {
          enable: true,
          mode: HoverMode.repulse,
        },
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
      links: {
        enable: true,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "out",
        },
      },
      number: {
        value: 80,
      },
    },
  };

  particlesUrl = "https://foo.bar/particles.json";

  constructor(private readonly ngParticlesService: NgParticlesService) {}

  public ngOnInit(): void {
    void this.ngParticlesService.init(async engine => {
      await loadSlim(engine);
    });
  }

  public particlesLoaded(container: Container): void {
    console.log(container);
  }
}
```

### Template usage

```html
<ngx-particles [id]="id" [options]="particlesOptions" (particlesLoaded)="particlesLoaded($event)"></ngx-particles>

<!-- or -->

<ngx-particles [id]="id" [url]="particlesUrl" (particlesLoaded)="particlesLoaded($event)"></ngx-particles>
```

### Module setup

```ts
import { NgModule } from "@angular/core";
import { NgxParticlesModule } from "@tsparticles/angular";

@NgModule({
  imports: [NgxParticlesModule],
})
export class AppModule {}
```

## Demos

The demo website is [here](https://particles.js.org)

<https://particles.js.org>

There's also a CodePen collection actively maintained and updated [here](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
