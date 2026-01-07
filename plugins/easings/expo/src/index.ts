/* eslint-disable @typescript-eslint/no-magic-numbers */
import { EasingType, type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadEasingExpoPlugin(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(e => {
        e.addEasing(EasingType.easeInExpo, value => (value ? 2 ** (10 * value - 10) : 0));
        e.addEasing(EasingType.easeOutExpo, value => (value === 1 ? 1 : 1 - Math.pow(2, -10 * value)));
        e.addEasing(EasingType.easeInOutExpo, value => {
            if (value === 1) {
                return 1;
            } else if (value) {
                return value < 0.5 ? 2 ** (20 * value - 10) / 2 : (2 - 2 ** (-20 * value + 10)) / 2;
            } else {
                return 0;
            }
        });
    });
}
