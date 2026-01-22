import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine - The engine instance
 */
export async function loadThemesPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async e => {
    const { ThemesPlugin } = await import("./ThemesPlugin.js");

    e.addPlugin(new ThemesPlugin());
  });
}
