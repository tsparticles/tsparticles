/* eslint-disable @typescript-eslint/no-magic-numbers */

import { EasingType, type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadEasingSinePlugin(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addEasing(EasingType.easeInSine, value => 1 - Math.cos((value * Math.PI) / 2), false);
    await engine.addEasing(EasingType.easeOutSine, value => Math.sin((value * Math.PI) / 2), false);
    await engine.addEasing(EasingType.easeInOutSine, value => -(Math.cos(Math.PI * value) - 1) / 2, false);

    await engine.refresh(refresh);
}
