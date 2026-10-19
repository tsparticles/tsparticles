import { Component } from "@angular/core";
import { ribbons } from "@tsparticles/ribbons";

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
