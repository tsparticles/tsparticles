import "./style.css";
import { type Engine, tsParticles } from "@tsparticles/engine";
import configs from "@tsparticles/configs";
import { loadAll } from "@tsparticles/all";

(async (engine: Engine) => {
    await loadAll(engine);

    await engine.load({
        id: "tsparticles",
        options: configs.basic
    });
})(tsParticles);
