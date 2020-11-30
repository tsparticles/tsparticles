import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { Main, tsParticles } from 'tsparticles';
import type { Container } from 'tsparticles';
import { IParticlesProps } from './ng-particles.module';

class NgParticlesComponentBase implements AfterViewInit {
    @Input() options?: IParticlesProps;
    @Input() url?: string;
    @Input() id: string;
    @Output() particlesLoaded: EventEmitter<Container> = new EventEmitter<Container>();
    @Output() particlesInit: EventEmitter<Main> = new EventEmitter<Main>();

    public ngAfterViewInit(): void {
        tsParticles.init();

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
    selector: 'ng-particles',
    template: `
        <div [id]="id"></div> `,
    styles: []
})
export class NgParticlesComponent extends NgParticlesComponentBase {
}

@Component({
    selector: 'Particles',
    template: `
        <div [id]="id"></div> `,
    styles: []
})
export class ParticlesComponent extends NgParticlesComponentBase {
}
