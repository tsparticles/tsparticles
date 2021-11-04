[![banner](https://particles.js.org/images/banner2.png)](https://particles.js.org)

# ng-particles

[![npm](https://img.shields.io/npm/v/ng-particles)](https://www.npmjs.com/package/ng-particles) [![npm](https://img.shields.io/npm/dm/ng-particles)](https://www.npmjs.com/package/ng-particles)

Componente Oficial [tsParticles](https://github.com/matteobruni/tsparticles) para Angular 

## Como usar

### Instalação

```shell script
npm install ng-particles
```

ou

```shell script
yarn add ng-particles
```

### Utilização

_template.html_

```html
<Particles [id]="id" [options]="particlesOptions" (particlesLoaded)="particlesLoaded($event)"></Particles>
```

_app.ts_

```typescript
export class AppComponent {
    id="tsparticles";

  particlesOptions = {
    background: {
      color: {
        value: "#0d47a1"
      }
    },
    fpsLimit: 60,
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
        outMode: "bounce",
        random: false,
        speed: 6,
        straight: false
      },
      number: {
        density: {
          enable: true,
          value_area: 800
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
    /* outros imports */ NgParticlesModule /* NgParticlesModule é obrigatório*/
  ],
  providers: [],
  bootstrap: [
    /* AppComponent */
  ]
})
export class AppModule {}
```

## Demos

O website com a demo está [aqui](https://particles.js.org)

<https://particles.js.org>

Também existe uma coleção no CodePen ativamente mantida e atualizada [aqui](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
