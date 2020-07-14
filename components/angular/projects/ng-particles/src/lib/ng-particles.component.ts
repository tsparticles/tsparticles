import { Component, Input, OnInit } from '@angular/core';
import { tsParticles } from 'tsparticles';
import { IParticlesParams } from './ng-particles.module';

@Component({
    selector: 'Particles',
    template: `
        <div [id]="id"></div> `,
    styles: []
})
export class NgParticlesComponent implements OnInit {
    constructor() {
    }

    @Input() options: IParticlesParams;
    @Input() id: string;

    ngOnInit(): void {
        tsParticles.load(this.id, this.options);
    }
}
