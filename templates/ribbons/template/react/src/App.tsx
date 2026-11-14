import { ParticlesProvider } from "@tsparticles/react";
import { createRibbons } from "@tsparticles/ribbons";
import { engine } from "../particlesEngine";
const ribbons = createRibbons(engine);
import "./App.css";

async function init(): Promise<void> {}

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
