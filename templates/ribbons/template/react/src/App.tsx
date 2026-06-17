import Particles, { ParticlesProvider } from "@tsparticles/react";
import { ribbons } from "@tsparticles/ribbons";
import type { Engine } from "@tsparticles/engine";
import "./App.css";

async function init(engine: Engine): Promise<void> {}

export default function App() {
  function fireRibbons() {
    ribbons();
  }

  return (
    <ParticlesProvider init={init}>
      <div id="app">
        <h1>Ribbons</h1>
        <div className="controls">
          <button onClick={fireRibbons}>Fire Ribbons</button>
        </div>
      </div>
    </ParticlesProvider>
  );
}
