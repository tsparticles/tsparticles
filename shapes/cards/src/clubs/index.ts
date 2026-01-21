import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadClubsCardsShape(engine: Engine): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.register(async e => {
        const { ClubDrawer } = await import("./ClubDrawer.js");

        e.addShape(new ClubDrawer());
    });
}
