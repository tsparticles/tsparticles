import { Component, State, h, type JSX } from "@stencil/core";
import { confetti } from "@tsparticles/confetti";
import type { Engine } from "@tsparticles/engine";

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

@Component({
  tag: "app-home",
  styleUrl: "app-home.css",
  shadow: true,
})
export class AppHome {
  @State()
  private mode = "cannon";

  private async particlesInit(engine: Engine): Promise<void> {}

  private fireConfetti(): void {
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
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          particleCount: randomInRange(50, 100),
          origin: { y: 0.6 },
        });
        break;
    }
  }

  private handleModeChange(e: Event): void {
    this.mode = (e.target as HTMLSelectElement).value;
  }

  render(): JSX.Element {
    return (
      <div id="app">
        <h1>Confetti!</h1>
        <div class="controls">
          <button onClick={this.fireConfetti.bind(this)}>Fire Confetti</button>
          <select value={this.mode} onChange={this.handleModeChange.bind(this)}>
            <option value="cannon">Cannon</option>
            <option value="waterfall">Waterfall</option>
            <option value="random">Random</option>
          </select>
        </div>
        <stencil-particles
          container-id="tsparticles"
          init={this.particlesInit.bind(this)}
          options={{}}
        />
      </div>
    );
  }
}
