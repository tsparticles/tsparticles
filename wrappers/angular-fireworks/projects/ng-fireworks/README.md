[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# angular-fireworks

[![npm](https://img.shields.io/npm/v/angular-fireworks)](https://www.npmjs.com/package/angular-fireworks) [![npm](https://img.shields.io/npm/dm/angular-fireworks)](https://www.npmjs.com/package/angular-fireworks) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

Official Angular wrapper for [@tsparticles/fireworks](https://www.npmjs.com/package/@tsparticles/fireworks).

## Installation

```shell
npm install angular-fireworks @tsparticles/fireworks
```

or

```shell
yarn add angular-fireworks @tsparticles/fireworks
```

## How to use

### Module setup

```ts
import { NgModule } from "@angular/core";
import { NgxFireworksModule } from "angular-fireworks";

@NgModule({
  imports: [NgxFireworksModule],
})
export class AppModule {}
```

### Template usage

```html
<ngx-fireworks [id]="id" [options]="fireworksOptions"></ngx-fireworks>
```

### Component usage

```ts
import { Component } from "@angular/core";
import type { FireworkOptions } from "@tsparticles/fireworks";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  public id = "tsparticles";

  public fireworksOptions: FireworkOptions = {
    background: {
      color: {
        value: "#000000",
      },
    },
    sounds: {
      enable: false,
    },
  };
}
```
