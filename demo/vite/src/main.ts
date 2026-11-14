import { type Engine, getRandom } from "@tsparticles/engine";
import "./style.css";
import configs from "@tsparticles/configs";
import { engine } from "../particlesEngine";
import { loadAll } from "@tsparticles/all";
import { loadBigCirclesPreset } from "@tsparticles/preset-big-circles";
import { loadConfettiPalette } from "@tsparticles/palette-confetti";

(async (engine: Engine) => {
  await loadAll(engine);
  await loadBigCirclesPreset(engine);
  await loadConfettiPalette(engine);

  const keys = Object.keys(configs),
    randomKey = keys[Math.floor(getRandom() * keys.length)] as keyof typeof configs,
    options = configs[randomKey];

  await engine.load({
    id: "tsparticles",
    options: {
      ...options,
      particles: {
        ...options.particles,
        palette: "confetti",
      },
      preset: "big-circles",
    },
  });
})(engine);
