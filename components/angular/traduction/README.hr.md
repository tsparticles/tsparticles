[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# ng-particles

[![npm](https://img.shields.io/npm/v/ng-particles)](https://www.npmjs.com/package/ng-particles) [![npm](https://img.shields.io/npm/dm/ng-particles)](https://www.npmjs.com/package/ng-particles)

Službena [tsParticles](https://github.com/matteobruni/tsparticles) Angular komponenta

## Kako koristiti

### Instalacija

```shell script
npm install ng-particles tsparticles
```

ili

```shell script
yarn add ng-particles tsparticles
```

### Upotreba

_template.html_

```html
<ng-particles [id]="id" [options]="particlesOptions" (particlesLoaded)="particlesLoaded($event)" (particlesInit)="particlesInit($event)"></ng-particles>

<!-- ili -->

<ng-particles [id]="id" [url]="particlesUrl" (particlesLoaded)="particlesLoaded($event)" (particlesInit)="particlesInit($event)"></ng-particles>
```

_app.ts_

```typescript
export class AppComponent {
    id = "tsparticles";
    
    /* Počevši od 1.19.0 možete koristiti remote url (AJAX request) sa JSON konfiguracijom  */
    particlesUrl = "http://foo.bar/particles.json";
    
    /* ili standardni JavaScript objekt */
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
    
    particlesInit(main: Main): void {
        console.log(main);
        
        // Počevši od 1.19.0 možete dodati custom postavke ili oblike, koristeći trenutnu verziju tsParticles-a (main)
    }
}
```

_app.module.ts_

```typescript
import {NgParticlesModule} from "ng-particles";
import {NgModule} from "@angular/core";

@NgModule({
    declarations: [
        /* AppComponent */
    ],
    imports: [
        /* ostali importi */ NgParticlesModule /* NgParticlesModule je obvezan*/
    ],
    providers: [],
    bootstrap: [
        /* AppComponent */
    ]
})
export class AppModule {
}
```

## Demo

Demo website [ovdje](https://particles.js.org)

<https://particles.js.org>

Tu je i kolekcija CodePen-a koja se aktivno održava i ažurira [ovdje](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
