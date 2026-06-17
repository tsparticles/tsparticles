import { ribbons } from "@tsparticles/ribbons";

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
