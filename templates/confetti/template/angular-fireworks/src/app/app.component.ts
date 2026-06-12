import { Component } from "@angular/core";
import { confetti } from "@tsparticles/confetti";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  mode = "cannon";

  randomInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  fireConfetti(): void {
    switch (this.mode) {
      case "cannon":
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        break;
      case "waterfall": {
        const duration = 3000;
        const end = Date.now() + duration;
        const interval = setInterval(() => {
          if (Date.now() > end) {
            clearInterval(interval);
            return;
          }
          confetti({ particleCount: 10, angle: 60, spread: 55, origin: { x: 0, y: 0.6 } });
          confetti({ particleCount: 10, angle: 120, spread: 55, origin: { x: 1, y: 0.6 } });
        }, 100);
        break;
      }
      case "random":
        confetti({
          angle: this.randomInRange(55, 125),
          spread: this.randomInRange(50, 70),
          particleCount: this.randomInRange(50, 100),
          origin: { y: 0.6 },
        });
        break;
    }
  }
}
