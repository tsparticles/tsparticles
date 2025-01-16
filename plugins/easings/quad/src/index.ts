/* eslint-disable @typescript-eslint/no-magic-numbers */

import { EasingType, type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadEasingQuadPlugin(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addEasing(EasingType.easeInQuad, value => value ** 2, false);
    await engine.addEasing(EasingType.easeOutQuad, value => 1 - (1 - value) ** 2, false);
    await engine.addEasing(
        EasingType.easeInOutQuad,
        value => (value < 0.5 ? 2 * value ** 2 : 1 - (-2 * value + 2) ** 2 / 2),
        false,
    );

    await engine.refresh(refresh);
}
