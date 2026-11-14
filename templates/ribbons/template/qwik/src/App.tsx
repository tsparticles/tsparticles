import { component$ } from "@builder.io/qwik";
import { createRibbons } from "@tsparticles/ribbons";
import { engine } from "../particlesEngine";
const ribbons = createRibbons(engine);

export default component$(() => {
  const readyEngine = useSignal<typeof engine>();
  return (
    <div id="app">
      <h1>Ribbons</h1>
      <div class="controls">
        <button onClick$={() => ribbons()}>Fire Ribbons</button>
      </div>
    </div>
  );
});
