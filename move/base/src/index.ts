import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadBaseMover(engine: Engine): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.register(e => {
        e.addMover("base", async () => {
            const { BaseMover } = await import("./BaseMover.js");

            return new BaseMover();
        });
    });
}
