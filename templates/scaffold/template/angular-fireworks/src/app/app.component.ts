import { Component } from "@angular/core";
import type { FireworkOptions } from "@tsparticles/fireworks";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  options: FireworkOptions = {
    background: "none",
    brightness: { min: -30, max: 30 },
    colors: [
      "#FF0000", "#FF2A00", "#FF5500", "#FF8000", "#FFAA00", "#FFD400",
      "#FFFF00", "#D4FF00", "#AAFF00", "#80FF00", "#55FF00", "#2AFF00",
      "#00FF00", "#00FF2A", "#00FF55", "#00FF80", "#00FFAA", "#00FFD4",
      "#00FFFF", "#00D4FF", "#00AAFF", "#0080FF", "#0055FF", "#002AFF",
      "#0000FF", "#2A00FF", "#5500FF", "#8000FF", "#AA00FF", "#D400FF",
      "#FF00FF", "#FF00D4", "#FF00AA", "#FF0080", "#FF0055", "#FF002A",
    ],
    gravity: 30,
    minHeight: { min: 10, max: 30 },
    rate: 10,
    saturation: { min: -30, max: 30 },
    sounds: true,
    speed: { min: 20, max: 40 },
    splitCount: 100,
  };
}
