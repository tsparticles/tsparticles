import type { Engine } from "tsparticles-engine";
import { ExternalLighter } from "./ExternalLighter";
import { ParticlesLighter } from "./ParticlesLighter";

/**
 *
 * @param engine -
 */
export async function loadLightInteraction(engine: Engine): Promise<void> {
    await engine.addInteractor("externalLight", (container) => new ExternalLighter(container));
    await engine.addInteractor("particlesLight", (container) => new ParticlesLighter(container));
}

export * from "./Options/Classes/Light";
export * from "./Options/Classes/LightArea";
export * from "./Options/Classes/LightGradient";
export * from "./Options/Classes/LightShadow";
export * from "./Options/Interfaces/ILight";
export * from "./Options/Interfaces/ILightArea";
export * from "./Options/Interfaces/ILightGradient";
export * from "./Options/Interfaces/ILightShadow";
