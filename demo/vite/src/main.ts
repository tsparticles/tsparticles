import "./style.css";
import { type Engine, tsParticles } from "@tsparticles/engine";
import { loadAll } from "@tsparticles/all";
import configs from "@tsparticles/configs";

(async (engine: Engine) => {
    await loadAll(engine);

    const keys = Object.keys(configs),
        randomKey = keys[Math.floor(Math.random() * keys.length)] as keyof typeof configs;

    await engine.load({
        id: "tsparticles",
        options: configs[randomKey]
    });
})(tsParticles);
