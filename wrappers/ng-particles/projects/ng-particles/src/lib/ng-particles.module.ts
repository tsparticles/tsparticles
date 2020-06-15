import { NgModule } from '@angular/core';
import { NgParticlesComponent } from './ng-particles.component';
import { RecursivePartial } from 'tsparticles/dist/Types/RecursivePartial';
import { IOptions } from 'tsparticles/dist/Options/Interfaces/IOptions';
import { IPolygonMaskOptions } from 'tsparticles/dist/Plugins/PolygonMask/PolygonMaskPlugin';
import { IAbsorberOptions } from 'tsparticles/dist/Plugins/Absorbers/AbsorbersPlugin';
import { IEmitterOptions } from 'tsparticles/dist/Plugins/Emitters/EmittersPlugin';

@NgModule({
  declarations: [ NgParticlesComponent ],
  imports: [],
  exports: [ NgParticlesComponent ]
})
export class NgParticlesModule {
}

export * from 'tsparticles/dist/Enums';

export type IParticlesParams = RecursivePartial<IOptions & IAbsorberOptions & IEmitterOptions & IPolygonMaskOptions>;
