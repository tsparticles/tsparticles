# ng-particles

[tsParticles](https://github.com/matteobruni/tsparticles) Angular component

## Usage

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
