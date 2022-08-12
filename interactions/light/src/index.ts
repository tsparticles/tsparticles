import type { Engine } from "tsparticles-engine";
import { ExternalLighter } from "./ExternalLighter";
import { ParticlesLighter } from "./ParticlesLighter";

export function loadLightInteraction(engine: Engine): void {
    engine.addInteractor("externalLight", (container) => new ExternalLighter(container));
    engine.addInteractor("particlesLight", (container) => new ParticlesLighter(container));
}

export * from "./Options/Classes/Light";
export * from "./Options/Classes/LightArea";
export * from "./Options/Classes/LightGradient";
export * from "./Options/Classes/LightShadow";
export * from "./Options/Interfaces/ILight";
export * from "./Options/Interfaces/ILightArea";
export * from "./Options/Interfaces/ILightGradient";
export * from "./Options/Interfaces/ILightShadow";
