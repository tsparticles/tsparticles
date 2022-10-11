import {tsParticles} from "tsparticles-engine";
import {loadFull} from "tsparticles";

document.addEventListener("DOMContentLoaded", async () => {
    await loadFull(tsParticles);

    await tsParticles.load({
        particles: {
            color: {
                value: "#000000"
            },
            links: {
                enable: true,
                color: "#000000"
            },
            move: {
                enable: true
            }
        }
    });
});
