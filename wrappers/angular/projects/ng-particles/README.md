[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# @tsparticles/angular

[![npm](https://img.shields.io/npm/v/@tsparticles/angular)](https://www.npmjs.com/package/@tsparticles/angular) [![npm](https://img.shields.io/npm/dm/@tsparticles/angular)](https://www.npmjs.com/package/@tsparticles/angular) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

Official [tsParticles](https://github.com/tsparticles/tsparticles) Angular component.

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

Call `NgParticlesService.init(...)` once before rendering `<ngx-particles />`.

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
  public id = "tsparticles";

  public particlesOptions: ISourceOptions = {
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
      },
    },
    particles: {
      links: {
        enable: true,
      },
      move: {
        enable: true,
      },
      number: {
        value: 80,
      },
    },
  };

  public particlesUrl = "https://foo.bar/particles.json";

  public constructor(private readonly ngParticlesService: NgParticlesService) {}

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
