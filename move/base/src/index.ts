import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadBaseMover(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(e => {
        e.addMover("base", async () => {
            const { BaseMover } = await import("./BaseMover.js");

            return new BaseMover();
        });
    });
}
