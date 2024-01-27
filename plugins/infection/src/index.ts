import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadInfectionPlugin(engine: Engine, refresh = true): Promise<void> {
    const { InfectionPlugin } = await import("./InfectionPlugin.js"),
        plugin = new InfectionPlugin();

    await engine.addPlugin(plugin, refresh);
    await engine.addInteractor(
        "particlesInfection",
        async (container) => {
            const { ParticlesInfecter } = await import("./ParticlesInfecter.js");

            return new ParticlesInfecter(container);
        },
        refresh,
    );
}

export * from "./Options/Interfaces/IInfection.js";
export * from "./Options/Interfaces/IInfectionStage.js";
