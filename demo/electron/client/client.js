import { tsParticles } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import { basic } from "tsparticles-demo-configs";

document.addEventListener("DOMContentLoaded", async () => {
    await loadFull(tsParticles);

    await tsParticles.load(basic);
});
