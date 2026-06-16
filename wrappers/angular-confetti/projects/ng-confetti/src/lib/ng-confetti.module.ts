import { NgModule } from "@angular/core";
import { confetti } from "@tsparticles/confetti";
import { NgxConfettiComponent } from "./ng-confetti.component";

@NgModule({
  declarations: [NgxConfettiComponent],
  imports: [],
  exports: [NgxConfettiComponent],
})
export class NgxConfettiModule {
  constructor() {
    void confetti.init();
  }
}
