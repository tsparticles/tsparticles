import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadDiamondsCardsShape(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { DiamondDrawer } = await import("./DiamondDrawer.js");

        e.addShape(new DiamondDrawer());
    });
}
