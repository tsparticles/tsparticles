import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine - The engine instance
 */
export function loadThemesPlugin(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { ThemesPlugin } = await import("./ThemesPlugin.js");

        e.addPlugin(new ThemesPlugin());
    });
}
