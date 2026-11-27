import { ParticlesProvider } from "@tsparticles/react";
import { createRibbons } from "@tsparticles/ribbons";
import { engine } from "../particlesEngine";
import "./App.css";

const ribbons = createRibbons(engine);

async function init(): Promise<void> {
  await ribbons.init();
}

export default function App() {
  function fireRibbons() {
    ribbons();
  }

  return (
    <ParticlesProvider engine={engine} init={init}>
      <div id="app">
        <h1>Ribbons</h1>
        <div className="controls">
          <button onClick={fireRibbons}>Fire Ribbons</button>
        </div>
      </div>
    </ParticlesProvider>
  );
}
