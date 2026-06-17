"use client";

import { ribbons } from "@tsparticles/ribbons";

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
