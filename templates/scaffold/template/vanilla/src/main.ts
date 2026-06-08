import "./style.css";
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import configs from "@tsparticles/configs";

(async () => {
  await loadSlim(tsParticles);

  const keys = Object.keys(configs);
  const randomKey = keys[Math.floor(Math.random() * keys.length)] as keyof typeof configs;
  const options = configs[randomKey];

  await tsParticles.load({ id: "tsparticles", options });
})();
