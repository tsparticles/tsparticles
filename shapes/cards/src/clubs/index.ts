import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadClubsSuitShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addShape(["club", "clubs"], async () => {
      const { ClubDrawer } = await import("./ClubDrawer.js");

      return new ClubDrawer();
    });
  });
}
