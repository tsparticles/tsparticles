import { engine } from "../particlesEngine.js";

import { loadFull } from "tsparticles";
import configs from "@tsparticles/configs";

document.addEventListener("DOMContentLoaded", async () => {
  await loadFull(engine);

  await engine.load({ options: configs.basic });
});
