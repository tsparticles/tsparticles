import { NgModule } from '@angular/core';
import { NgParticlesComponent, ParticlesComponent } from './ng-particles.component';
import type { ISourceOptions } from 'tsparticles-core';

@NgModule({
    declarations: [ NgParticlesComponent, ParticlesComponent ],
    imports: [],
    exports: [ NgParticlesComponent, ParticlesComponent ]
})
export class NgParticlesModule {
}

export * from 'tsparticles-core';

export type IParticlesProps = ISourceOptions;
export type IParticlesParams = IParticlesProps;
