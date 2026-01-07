import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadClubsCardsShape(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { ClubDrawer } = await import("./ClubDrawer.js");

        e.addShape(new ClubDrawer());
    });
}
