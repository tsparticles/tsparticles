import "./style.css";
import { type Engine, getRandom, tsParticles } from "@tsparticles/engine";
import { loadAll } from "@tsparticles/all";
import configs from "@tsparticles/configs";
import { loadConfettiPalette } from "@tsparticles/palette-confetti";
import { loadBigCirclesPreset } from "@tsparticles/preset-big-circles";

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
})(tsParticles);
