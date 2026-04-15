import { Component } from "@angular/core";
import type { Container } from "@tsparticles/engine";
import configs from "@tsparticles/configs";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page {
  particlesId = "tsparticles";
  particlesOptions = configs.basic;

  constructor() {
  }

  particlesLoaded(container: Container): void {
    // Credits to :  https://github.com/matteobruni
    setTimeout(async () => {
      container.refresh();
    }, 500);
  }
}
