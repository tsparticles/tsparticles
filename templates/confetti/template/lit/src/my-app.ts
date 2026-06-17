import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { initParticlesEngine } from "@tsparticles/lit";
import { confetti } from "@tsparticles/confetti";

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

@customElement("my-app")
export class MyApp extends LitElement {
  @state()
  private mode = "cannon";

  constructor() {
    super();
    void initParticlesEngine(() => Promise.resolve());
  }

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

  render() {
    return html`
      <div id="app">
        <h1>Confetti!</h1>
        <div class="controls">
          <button @click=${this.fireConfetti}>Fire Confetti</button>
          <select @change=${this.handleModeChange}>
            <option value="cannon" ?selected=${this.mode === "cannon"}>Cannon</option>
            <option value="waterfall" ?selected=${this.mode === "waterfall"}>Waterfall</option>
            <option value="random" ?selected=${this.mode === "random"}>Random</option>
          </select>
        </div>
      </div>
    `;
  }
}
