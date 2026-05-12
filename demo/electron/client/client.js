import { createBrowserEngine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import configs from "@tsparticles/configs";

const engine = createBrowserEngine();

document.addEventListener("DOMContentLoaded", async () => {
    await loadFull(engine);

    await engine.load({ options: configs.basic });
});
