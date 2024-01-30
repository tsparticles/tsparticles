import type { Engine } from "@tsparticles/engine";

/**
 * @param engine - The engine instance loading this plugin
 * @param refresh -
 */
export async function loadOutModesUpdater(engine: Engine, refresh = true): Promise<void> {
    await engine.addParticleUpdater(
        "outModes",
        async (container) => {
            const { OutOfCanvasUpdater } = await import("./OutOfCanvasUpdater.js");

            return new OutOfCanvasUpdater(container);
        },
        refresh,
    );
}
