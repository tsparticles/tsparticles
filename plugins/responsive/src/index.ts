import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine - The engine instance
 */
export function loadResponsivePlugin(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { ResponsivePlugin } = await import("./ResponsivePlugin.js");

        e.addPlugin(new ResponsivePlugin());
    });
}
