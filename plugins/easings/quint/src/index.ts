/* eslint-disable @typescript-eslint/no-magic-numbers */
import { EasingType, type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadEasingQuintPlugin(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(e => {
        e.addEasing(EasingType.easeInQuint, value => value ** 5);
        e.addEasing(EasingType.easeOutQuint, value => 1 - (1 - value) ** 5);
        e.addEasing(EasingType.easeInOutQuint, value =>
            value < 0.5 ? 16 * value ** 5 : 1 - (-2 * value + 2) ** 5 / 2,
        );
    });
}
