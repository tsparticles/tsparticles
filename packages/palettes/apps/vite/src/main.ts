import './style.css'
import { tsParticles } from "@tsparticles/engine";
import { loadConfettiPalette } from "@tsparticles/palette-confetti";

(async () => {
    await loadConfettiPalette(tsParticles);

    await tsParticles.load({
        id: "tsparticles", options: {
            particles: {
                number: { value: 120 },
                move: { enable: true, speed: 2 },
                size: { value: { min: 3, max: 7 } },
            },
            palette: "confetti",
        }
    });
})();
