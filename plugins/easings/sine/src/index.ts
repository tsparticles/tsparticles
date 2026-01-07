/* eslint-disable @typescript-eslint/no-magic-numbers */
import { EasingType, type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadEasingSinePlugin(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(e => {
        e.addEasing(EasingType.easeInSine, value => 1 - Math.cos((value * Math.PI) / 2));
        e.addEasing(EasingType.easeOutSine, value => Math.sin((value * Math.PI) / 2));
        e.addEasing(EasingType.easeInOutSine, value => -(Math.cos(Math.PI * value) - 1) / 2);
    });
}
