import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine - The engine instance
 */
export async function loadResponsivePlugin(engine: Engine): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.register(async e => {
        const { ResponsivePlugin } = await import("./ResponsivePlugin.js");

        e.addPlugin(new ResponsivePlugin());
    });
}
