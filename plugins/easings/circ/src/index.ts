/* eslint-disable @typescript-eslint/no-magic-numbers */
import { EasingType, type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadEasingCircPlugin(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(e => {
        e.addEasing(EasingType.easeInCirc, value => 1 - Math.sqrt(1 - value ** 2));
        e.addEasing(EasingType.easeOutCirc, value => Math.sqrt(1 - (value - 1) ** 2));
        e.addEasing(EasingType.easeInOutCirc, value =>
            value < 0.5 ? (1 - Math.sqrt(1 - (2 * value) ** 2)) / 2 : (Math.sqrt(1 - (-2 * value + 2) ** 2) + 1) / 2,
        );
    });
}
