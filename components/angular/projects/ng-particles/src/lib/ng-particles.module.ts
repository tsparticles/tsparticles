import { NgModule } from '@angular/core';
import { NgParticlesComponent } from './ng-particles.component';
import type { ISourceOptions } from 'tsparticles';

@NgModule({
    declarations: [ NgParticlesComponent ],
    imports: [],
    exports: [ NgParticlesComponent ]
})
export class NgParticlesModule {
}

export * from 'tsparticles';

export type IParticlesProps = ISourceOptions;
export type IParticlesParams = IParticlesProps;
