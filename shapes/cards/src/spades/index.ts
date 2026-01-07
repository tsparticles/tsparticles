import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadSpadesCardsShape(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { SpadeDrawer } = await import("./SpadeDrawer.js");

        e.addShape(new SpadeDrawer());
    });
}
