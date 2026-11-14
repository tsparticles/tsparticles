import { createRibbons } from "@tsparticles/ribbons";
import { engine } from "../particlesEngine";
const ribbons = createRibbons(engine);

export default function App() {
  return (
    <div id="app">
      <h1>Ribbons</h1>
      <div class="controls">
        <button onClick={() => ribbons()}>Fire Ribbons</button>
      </div>
    </div>
  );
}
