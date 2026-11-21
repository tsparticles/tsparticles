"use client";

import { createRibbons } from "@tsparticles/ribbons";
import { engine } from "../../particlesEngine";
const ribbons = createRibbons(engine);

export default function Home() {
  return (
    <div id="app">
      <h1>Ribbons</h1>
      <div className="controls">
        <button onClick={() => ribbons()}>Fire Ribbons</button>
      </div>
    </div>
  );
}
