import configs from "@tsparticles/configs";
import type { Container } from "@tsparticles/engine";
import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import { loadFull } from "tsparticles";
import Particles, { initParticlesEngine } from "@tsparticles/solid";

type ConfigKey = keyof typeof configs;
const configKeys = Object.keys(configs) as ConfigKey[];

initParticlesEngine(async engine => {
  await loadFull(engine);
}).catch(e => console.error("Failed to initialize particles engine:", e));

const App: Component = () => {
  const [options, setOptions] = createSignal(configs.basic);

  const switchConfig = (key: ConfigKey) => {
    setOptions(configs[key]);
  };

  const particlesLoaded = (container?: Container) => {
    console.log("Particles loaded", container);
  };

  return (
    <main>
      <div class="controls">
        {configKeys.map(key => (
          <span class="pill" onClick={() => switchConfig(key)}>
            {key}
          </span>
        ))}
      </div>
      <Particles id="tsparticles" options={options()} particlesLoaded={particlesLoaded} />
      <div class="footer">Click a config pill above to switch particle options at runtime.</div>
    </main>
  );
};

export default App;
