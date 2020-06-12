# tsParticles - Angular Component ![Node.js CI](https://github.com/matteobruni/ng-particles/workflows/Node.js%20CI/badge.svg)

[tsParticles](https://github.com/matteobruni/tsparticles) Angular component

## How to use it

### Install

```shell script
npm install ng-particles
```

or

```shell script
yarn add ng-particles
```

### Usage

*template.html*

```html
<ng-particles id="tsparticles" [options]="particlesOptions"></ng-particles>
```

*app.ts*

```typescript
export class AppComponent {
  particlesOptions = {
    particles: {
      color: {
        value: [ '#ff0000', '#0000ff' ]
      },
      lineLinked: {
        enable: true,
        color: 'random'
      },
      move: {
        enable: true,
        speed: 5
      }
    }
  };
}
```

*app.module.ts*

```typescript
import { NgParticlesModule } from 'ng-particles';
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [
    /* AppComponent */
  ],
  imports: [
    /* other imports */ NgParticlesModule // NgParticlesModule is required
  ],
  providers: [],
  bootstrap: [ /* AppComponent */ ]
})
export class AppModule { }
```

## Need More Help?

[![Slack](https://cdn.matteobruni.it/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI)
