import type { Engine } from "tsparticles-engine";
import { loadInteraction } from "./interaction";
import { loadPlugin } from "./plugin";

export async function loadParticlesLinksInteraction(engine: Engine): Promise<void> {
    await loadInteraction(engine);
    await loadPlugin(engine);
}

export * from "./Options/Classes/Links";
export * from "./Options/Classes/LinksShadow";
export * from "./Options/Classes/LinksTriangle";
export * from "./Options/Interfaces/ILinks";
export * from "./Options/Interfaces/ILinksShadow";
export * from "./Options/Interfaces/ILinksTriangle";
