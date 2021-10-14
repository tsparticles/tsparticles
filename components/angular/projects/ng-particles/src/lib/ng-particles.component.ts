import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { tsParticles } from 'tsparticles-engine';
import type { Container, Main } from 'tsparticles-engine';
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
    @Input() id: string;
    @Output() particlesLoaded: EventEmitter<Container> = new EventEmitter<Container>();
    @Output() particlesInit: EventEmitter<Main> = new EventEmitter<Main>();

    public ngAfterViewInit(): void {
        this.particlesInit.emit(tsParticles);

        const cb = (container?: Container) => {
            this.particlesLoaded.emit(container);
        };

        if (this.url) {
            tsParticles.loadJSON(this.id, this.url).then(cb);
        } else if (this.options) {
            tsParticles.load(this.id, this.options).then(cb);
        } else {
            console.error('You must specify options or url to load tsParticles');
        }
    }
}

@Component({
    selector: 'Particles',
    template: `
        <div [id]="id"></div> `,
    styles: []
})
export class ParticlesComponent extends NgParticlesComponent {
    @Input() options?: IParticlesProps;
    @Input() url?: string;
    @Input() id: string;
    @Output() particlesLoaded: EventEmitter<Container> = new EventEmitter<Container>();
    @Output() particlesInit: EventEmitter<Main> = new EventEmitter<Main>();
}
