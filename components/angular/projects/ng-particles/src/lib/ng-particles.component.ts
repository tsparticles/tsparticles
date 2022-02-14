import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { tsParticles } from 'tsparticles-engine';
import type { Container, Engine } from 'tsparticles-engine';
import { IParticlesProps } from './ng-particles.module';

@Component({
  selector: 'ng-particles',
  template: `
    <div [id]="id"></div> `,
  styles: [],
})
export class NgParticlesComponent implements AfterViewInit {
  @Input() options?: IParticlesProps;
  @Input() url?: string;
  @Input() id?: string;
  @Input() particlesInit?: (engine: Engine) => Promise<void>;
  @Output() particlesLoaded: EventEmitter<Container> = new EventEmitter<Container>();

  public ngAfterViewInit(): void {
    const cb = (container?: Container) => {
      this.particlesLoaded.emit(container);
    };

    (async () => {
      if (this.particlesInit) {
        await this.particlesInit(tsParticles);
      }

      if (this.url) {
        if (this.id) {
          tsParticles.loadJSON(this.id, this.url).then(cb);
        } else {
          tsParticles.loadJSON(this.url).then(cb);
        }
      } else if (this.options) {
        if (this.id) {
          tsParticles.load(this.id, this.options).then(cb);
        } else {
          tsParticles.load(this.options).then(cb);
        }
      } else {
        console.error('You must specify options or url to load tsParticles');
      }
    })();
  }
}

@Component({
  selector: 'Particles',
  template: `
    <div [id]="id"></div> `,
  styles: []
})
export class ParticlesComponent extends NgParticlesComponent {
  @Input() override options?: IParticlesProps;
  @Input() override url?: string;
  @Input() override id?: string;
  @Input() override particlesInit?: (engine: Engine) => Promise<void>;
  @Output() override particlesLoaded: EventEmitter<Container> = new EventEmitter<Container>();
}
