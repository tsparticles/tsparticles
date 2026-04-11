import { NgModule } from '@angular/core';
import { NgxParticlesComponent } from './ng-particles.component';
import type { ISourceOptions } from '@tsparticles/engine';
import { NgParticlesService } from './ng-particles.service';

@NgModule({
    declarations: [NgxParticlesComponent],
    exports: [NgxParticlesComponent],
    providers: [NgParticlesService],
})
export class NgxParticlesModule {}

export type IParticlesProps = ISourceOptions;
export { NgParticlesService };
