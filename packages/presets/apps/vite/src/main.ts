import './style.css'
import { tsParticles } from "@tsparticles/engine";
import { loadBigCirclesPreset } from "@tsparticles/preset-big-circles";

(async () => {
    await loadBigCirclesPreset(tsParticles);

    await tsParticles.load({
        id: "tsparticles", options: {
            preset: "big-circles",
        }
    });
})();
