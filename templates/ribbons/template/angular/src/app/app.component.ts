import { Component } from "@angular/core";
import { createRibbons } from "@tsparticles/ribbons";
import { engine } from "../../particlesEngine";
const ribbons = createRibbons(engine);

@Component({
  standalone: false,
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  fireRibbons(): void {
    ribbons();
  }
}
