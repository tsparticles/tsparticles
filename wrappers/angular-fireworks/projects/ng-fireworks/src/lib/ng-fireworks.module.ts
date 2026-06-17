import { NgModule } from "@angular/core";
import { fireworks } from "@tsparticles/fireworks";
import { NgxFireworksComponent } from "./ng-fireworks.component";

@NgModule({
  declarations: [NgxFireworksComponent],
  imports: [],
  exports: [NgxFireworksComponent],
})
export class NgxFireworksModule {
  constructor() {
    /* Register fireworks plugins before tsParticles.init() is called */
    void (fireworks as unknown as { init: () => Promise<void> }).init();
  }
}
