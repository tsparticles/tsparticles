import Particles, { ParticlesProvider } from "@tsparticles/inferno";
import { confetti } from "@tsparticles/confetti";
import type { Engine } from "@tsparticles/engine";
import { Component } from "inferno";
import "./App.css";

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

interface AppState {
  mode: string;
}

export default class App extends Component<{}, AppState> {
  state = { mode: "cannon" };

  private fireConfetti = () => {
    switch (this.state.mode) {
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
  };

  private handleModeChange = (e: Event) => {
    this.setState({ mode: (e.target as HTMLSelectElement).value });
  };

  render() {
    return (
      <ParticlesProvider init={async (engine: Engine): Promise<void> => {}}>
        <div id="app">
          <h1>Confetti!</h1>
          <div class="controls">
            <button onClick={this.fireConfetti}>Fire Confetti</button>
            <select value={this.state.mode} onChange={this.handleModeChange}>
              <option value="cannon">Cannon</option>
              <option value="waterfall">Waterfall</option>
              <option value="random">Random</option>
            </select>
          </div>
        </div>
        <Particles id="tsparticles" options={{}} />
      </ParticlesProvider>
    );
  }
}
