import configs from "@tsparticles/configs";
import "./style.css";

import { engine } from "../particlesEngine";
import { loadSlim } from "@tsparticles/slim";

(async () => {
  await loadSlim(engine);

  const keys = Object.keys(configs);
  const randomKey = keys[Math.floor(Math.random() * keys.length)] as keyof typeof configs;
  const options = configs[randomKey];

  await engine.load({ id: "tsparticles", options });
})();
