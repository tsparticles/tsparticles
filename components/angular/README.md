# Angular CLI  
  
![npm](https://img.shields.io/npm/v/ng-particles) ![npm](https://img.shields.io/npm/dm/ng-particles)  
  
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
<Particles id="tsparticles" [options]="particlesOptions"></Particles>  
```  
  
*app.ts*  
  
```typescript  
export class AppComponent {
    particlesOptions = {
        background: {

            color: {
                value: "#0d47a1"
            }

        },
        fpsLimit: 60,
        interactivity: {

            detectsOn: "canvas",
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
                    size: 40,
                    speed: 3
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
}
```  
  
*app.module.ts*  
  
```typescript  
import { NgParticlesModule } from 'ng-particles';
import { NgModule } from "@angular/core";

@NgModule({
    declarations: [ /* AppComponent */],
    imports: [ /* other imports */ NgParticlesModule /* NgParticlesModule is required*/],
    providers: [],
    bootstrap: [ /* AppComponent */]
})
export class AppModule { }  
```