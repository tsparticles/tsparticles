import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { ExternalLighter } from "./ExternalLighter.js";
import { ParticlesLighter } from "./ParticlesLighter.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadLightInteraction(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addInteractor(
        "externalLight",
        container => {
            return Promise.resolve(new ExternalLighter(container, engine));
        },
        refresh,
    );
    await engine.addInteractor(
        "particlesLight",
        container => {
            return Promise.resolve(new ParticlesLighter(container, engine));
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
