import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadEasingExpoPlugin(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { easingsFunctions } = await import("./easingsFunctions.js");

        for (const [easing, easingFn] of easingsFunctions) {
            e.addEasing(easing, easingFn);
        }
    });
}
