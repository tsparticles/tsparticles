import { Component } from "@angular/core";
import { IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/angular/standalone";
import type { Container } from "@tsparticles/engine";
import configs from "@tsparticles/configs";
import { NgxParticlesModule } from "@tsparticles/angular";
import { ExploreContainerComponent } from "../explore-container/explore-container.component";

@Component({
  selector: "app-tab1",
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, NgxParticlesModule, ExploreContainerComponent],
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  particlesId = "tsparticles";
  particlesOptions = configs.basic;

  constructor() {}

  particlesLoaded(container: Container): void {
    // Credits to :  https://github.com/matteobruni
    setTimeout(async () => {
      container.refresh();
    }, 500);
  }
}
