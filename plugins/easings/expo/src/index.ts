/* eslint-disable @typescript-eslint/no-magic-numbers */

import { EasingType, type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadEasingExpoPlugin(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addEasing(EasingType.easeInExpo, value => (!value ? 0 : 2 ** (10 * value - 10)), false);
    await engine.addEasing(EasingType.easeOutExpo, value => (value === 1 ? 1 : 1 - Math.pow(2, -10 * value)), false);
    await engine.addEasing(
        EasingType.easeInOutExpo,
        value => {
            if (value === 1) {
                return !value ? 0 : 1;
            } else if (!value) {
                return 0;
            } else {
                return value < 0.5 ? 2 ** (20 * value - 10) / 2 : (2 - 2 ** (-20 * value + 10)) / 2;
            }
        },
        false,
    );

    await engine.refresh(refresh);
}
