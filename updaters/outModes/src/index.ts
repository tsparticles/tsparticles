import type { Engine } from "@tsparticles/engine";

/**
 * @param engine - The engine instance loading this plugin
 * @param refresh -
 */
export async function loadOutModesUpdater(engine: Engine, refresh = true): Promise<void> {
    const { OutOfCanvasUpdater } = await import("./OutOfCanvasUpdater.js");

    await engine.addParticleUpdater("outModes", (container) => new OutOfCanvasUpdater(container), refresh);
}
