import { type Engine } from "@tsparticles/engine";
import { InfectionPlugin } from "./InfectionPlugin.js";
import { ParticlesInfecter } from "./ParticlesInfecter.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadInfectionPlugin(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    const plugin = new InfectionPlugin();

    await engine.addPlugin(plugin, refresh);
    await engine.addInteractor(
        "particlesInfection",
        container => {
            return Promise.resolve(new ParticlesInfecter(container));
        },
        refresh,
    );
}

export * from "./Options/Interfaces/IInfection.js";
export * from "./Options/Interfaces/IInfectionStage.js";
