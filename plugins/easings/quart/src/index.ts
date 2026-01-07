/* eslint-disable @typescript-eslint/no-magic-numbers */
import { EasingType, type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadEasingQuartPlugin(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(e => {
        e.addEasing(EasingType.easeInQuart, value => value ** 4);
        e.addEasing(EasingType.easeOutQuart, value => 1 - (1 - value) ** 4);
        e.addEasing(EasingType.easeInOutQuart, value => (value < 0.5 ? 8 * value ** 4 : 1 - (-2 * value + 2) ** 4 / 2));
    });
}
