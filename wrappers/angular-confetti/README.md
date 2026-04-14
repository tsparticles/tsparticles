[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# angular-confetti

[![npm](https://img.shields.io/npm/v/angular-confetti)](https://www.npmjs.com/package/angular-confetti) [![npm](https://img.shields.io/npm/dm/angular-confetti)](https://www.npmjs.com/package/angular-confetti) [![GitHub Sponsors](https://img.shields.io/github/sponsors/matteobruni)](https://github.com/sponsors/matteobruni)

Official Angular wrapper for [@tsparticles/confetti](https://www.npmjs.com/package/@tsparticles/confetti).

## Installation

```shell
npm install angular-confetti @tsparticles/confetti @tsparticles/engine
```

or

```shell
yarn add angular-confetti @tsparticles/confetti @tsparticles/engine
```

## How to use

### Module setup

```ts
import { NgModule } from "@angular/core";
import { NgxConfettiModule } from "angular-confetti";

@NgModule({
  imports: [NgxConfettiModule],
})
export class AppModule {}
```

### Template usage

```html
<ngx-confetti [id]="id" [options]="confettiOptions" [fire]="fire"></ngx-confetti>
```

### Component usage

```ts
import { Component } from "@angular/core";
import type { ConfettiOptions } from "@tsparticles/confetti";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  public id = "tsparticles";
  public fire = true;

  public confettiOptions: ConfettiOptions = {
    angle: 90,
    count: 50,
    spread: 45,
    startVelocity: 45,
  };
}
```

`fire` accepts `boolean | number`:

- `true`: fires once when mounted
- `false`: does not fire
- changing value (or incrementing a number): fires again
