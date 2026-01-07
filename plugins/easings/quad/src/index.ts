/* eslint-disable @typescript-eslint/no-magic-numbers */
import { EasingType, type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadEasingQuadPlugin(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(e => {
        e.addEasing(EasingType.easeInQuad, value => value ** 2);
        e.addEasing(EasingType.easeOutQuad, value => 1 - (1 - value) ** 2);
        e.addEasing(EasingType.easeInOutQuad, value => (value < 0.5 ? 2 * value ** 2 : 1 - (-2 * value + 2) ** 2 / 2));
    });
}
