import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadLightInteraction(engine: Engine, refresh = true): Promise<void> {
    const { ExternalLighter } = await import("./ExternalLighter.js"),
        { ParticlesLighter } = await import("./ParticlesLighter.js");

    await engine.addInteractor("externalLight", (container) => new ExternalLighter(container), refresh);
    await engine.addInteractor("particlesLight", (container) => new ParticlesLighter(container), refresh);
}

export * from "./Options/Classes/Light.js";
export * from "./Options/Classes/LightArea.js";
export * from "./Options/Classes/LightGradient.js";
export * from "./Options/Classes/LightShadow.js";
export * from "./Options/Interfaces/ILight.js";
export * from "./Options/Interfaces/ILightArea.js";
export * from "./Options/Interfaces/ILightGradient.js";
export * from "./Options/Interfaces/ILightShadow.js";
