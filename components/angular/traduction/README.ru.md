[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# ng-particles

[![npm](https://img.shields.io/npm/v/ng-particles)](https://www.npmjs.com/package/ng-particles) [![npm](https://img.shields.io/npm/dm/ng-particles)](https://www.npmjs.com/package/ng-particles)

Официальный компонтент [tsParticles](https://github.com/matteobruni/tsparticles) для Angular

## Как использовать компонент

### Установка

```shell script
npm install ng-particles
```

или

```shell script
yarn add ng-particles
```

### Применение

_template.html_

```html
<Particles
  [id]="id"
  [options]="particlesOptions"
  (particlesLoaded)="particlesLoaded($event)"
></Particles>
```

_app.ts_

```typescript
export class AppComponent {
  id = "tsparticles";

  particlesOptions = {
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
        outModes: "bounce",
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
        random: true,
        value: 5,
      },
    },
    detectRetina: true,
  };

  particlesLoaded(container: Container): void {
    console.log(container);
  }
}
```

_app.module.ts_

```typescript
import { NgParticlesModule } from "ng-particles";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [
    /* AppComponent */
  ],
  imports: [
    /* другие импорты, среди которых указываем */ NgParticlesModule /*, так как NgParticlesModule обязателен*/,
  ],
  providers: [],
  bootstrap: [
    /* AppComponent */
  ],
})
export class AppModule {}
```

## Демо

[Здесь](https://particles.js.org) размещены примеры использования библиотеки

<https://particles.js.org>

Также активно поддерживается и обновляется коллекция CodePen, которую можно посмотреть [здесь](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
