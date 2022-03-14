import { NgModule } from '@angular/core';
import { NgParticlesComponent, ParticlesComponent } from './ng-particles.component';
import type { ISourceOptions } from 'tsparticles';

@NgModule({
  declarations: [ NgParticlesComponent, ParticlesComponent ],
  exports: [ NgParticlesComponent, ParticlesComponent ]
})
export class NgParticlesModule {
}

export type IParticlesProps = ISourceOptions;
export type IParticlesParams = IParticlesProps;
