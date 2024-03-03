import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadLightInteraction(engine: Engine, refresh = true): Promise<void> {
    await engine.addInteractor(
        "externalLight",
        async container => {
            const { ExternalLighter } = await import("./ExternalLighter.js");

            return new ExternalLighter(container);
        },
        refresh,
    );
    await engine.addInteractor(
        "particlesLight",
        async container => {
            const { ParticlesLighter } = await import("./ParticlesLighter.js");

            return new ParticlesLighter(container);
        },
        refresh,
    );
}

export * from "./Options/Classes/Light.js";
export * from "./Options/Classes/LightArea.js";
export * from "./Options/Classes/LightGradient.js";
export * from "./Options/Classes/LightShadow.js";
export * from "./Options/Interfaces/ILight.js";
export * from "./Options/Interfaces/ILightArea.js";
export * from "./Options/Interfaces/ILightGradient.js";
export * from "./Options/Interfaces/ILightShadow.js";
