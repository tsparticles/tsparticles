import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { Main, tsParticles } from 'tsparticles';
import type { Container } from 'tsparticles';
import { IParticlesProps } from './ng-particles.module';

@Component({
    selector: 'Particles',
    template: `
      <div [id]="id"></div> `,
    styles: []
})
export class NgParticlesComponent implements AfterViewInit {
    @Input() options: IParticlesProps;
    @Input() id: string;
    @Output() particlesLoaded: EventEmitter<Container> = new EventEmitter<Container>();
    @Output() particlesInit: EventEmitter<Main> = new EventEmitter<Main>();

    public ngAfterViewInit(): void {
        tsParticles.init();

        this.particlesInit.emit(tsParticles);

        tsParticles.load(this.id, this.options).then(container => {
            this.particlesLoaded.emit(container);
        });
    }
}
