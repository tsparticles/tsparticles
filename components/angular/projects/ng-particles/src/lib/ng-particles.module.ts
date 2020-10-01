import { NgModule } from '@angular/core';
import { NgParticlesComponent } from './ng-particles.component';
import type { RecursivePartial, IOptions } from 'tsparticles';

@NgModule({
    declarations: [ NgParticlesComponent ],
    imports: [],
    exports: [ NgParticlesComponent ]
})
export class NgParticlesModule {
}

export * from 'tsparticles';

export type IParticlesProps = RecursivePartial<IOptions>;
export type IParticlesParams = IParticlesProps;
