import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { tsParticles } from 'tsparticles';
import { IParticlesParams } from './ng-particles.module';
import { Container } from 'tsparticles/dist/Core/Container';

@Component({
    selector: 'Particles',
    template: `
      <div [id]="id"></div> `,
    styles: []
})
export class NgParticlesComponent implements AfterViewInit {
    @Input() options: IParticlesParams;
    @Input() id: string;
    @Output() particlesLoaded: EventEmitter<Container> = new EventEmitter<Container>();

    public ngAfterViewInit(): void {
        tsParticles.load(this.id, this.options).then(container => {
            this.particlesLoaded.emit(container);
        });
    }
}
