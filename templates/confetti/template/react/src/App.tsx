import { useState } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { confetti } from "@tsparticles/confetti";
import type { Engine } from "@tsparticles/engine";
import "./App.css";

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

async function init(engine: Engine): Promise<void> {}

export default function App() {
  const [mode, setMode] = useState("cannon");

  function fireConfetti() {
    switch (mode) {
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

  return (
    <ParticlesProvider init={init}>
      <div id="app">
        <h1>Confetti!</h1>
        <div className="controls">
          <button onClick={fireConfetti}>Fire Confetti</button>
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="cannon">Cannon</option>
            <option value="waterfall">Waterfall</option>
            <option value="random">Random</option>
          </select>
        </div>
      </div>
    </ParticlesProvider>
  );
}
