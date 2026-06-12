import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgxParticlesModule } from "@tsparticles/angular";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxParticlesModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
