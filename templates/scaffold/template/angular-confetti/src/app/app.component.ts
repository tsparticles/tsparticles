import { Component } from "@angular/core";
import type { ConfettiOptions } from "@tsparticles/confetti";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  options: ConfettiOptions = {
    angle: 90,
    count: 50,
    spread: 45,
    startVelocity: 45,
    decay: 0.9,
    gravity: 1,
    drift: 0,
    ticks: 200,
    position: { x: 50, y: 50 },
    colors: ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"],
    shapes: ["square", "circle"],
    scalar: 1,
    zIndex: 100,
    disableForReducedMotion: true,
    flat: false,
  };
}
