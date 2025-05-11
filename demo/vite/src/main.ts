import "./style.css";
import { type Engine, getRandom, tsParticles } from "@tsparticles/engine";
import { loadAll } from "@tsparticles/all";
import configs from "@tsparticles/configs";

(async (engine: Engine) => {
    await loadAll(engine);

    const keys = Object.keys(configs),
        randomKey = keys[Math.floor(getRandom() * keys.length)] as keyof typeof configs,
        options = configs[randomKey];

    await engine.load({
        id: "tsparticles",
        options,
    });
})(tsParticles);
