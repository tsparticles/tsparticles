import "./style.css";
import { type Engine, tsParticles } from "@tsparticles/engine";
import { loadAll } from "@tsparticles/all";
import configs from "@tsparticles/configs";

(async (engine: Engine) => {
    await loadAll(engine);

    /*const keys = Object.keys(configs),
        randomKey = keys[Math.floor(Math.random() * keys.length)] as keyof typeof configs;*/

    await engine.load({
        id: "tsparticles",
        options: {
            ...configs.basic,
            fullScreen: {
                ...configs.basic.fullScreen,
                enable: false
            },
            interactivity: {
                ...configs.basic.interactivity,
                events: {
                    ...configs.basic.interactivity.events,
                    onClick: {
                        ...configs.basic.interactivity.events.onClick,
                        enable: false,
                    },
                    onHover: {
                        ...configs.basic.interactivity.events.onHover,
                        enable: false,
                    }
                }
            },
            particles: {
                ...configs.basic.particles,
                number: {
                    ...configs.basic.particles.number,
                    density: {
                        ...configs.basic.particles.number.density,
                        enable: false,
                    }
                },
                links: {
                    ...configs.basic.particles.links,
                    enable: false
                }
            }
        }
    });
})(tsParticles);
