/* eslint-disable @typescript-eslint/no-magic-numbers */

import { EasingType, type Engine, assertValidVersion } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadEasingQuartPlugin(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);
    await engine.addEasing(EasingType.easeInQuart, value => value ** 4, false);
    await engine.addEasing(EasingType.easeOutQuart, value => 1 - (1 - value) ** 4, false);
    await engine.addEasing(
        EasingType.easeInOutQuart,
        value => (value < 0.5 ? 8 * value ** 4 : 1 - (-2 * value + 2) ** 4 / 2),
        false,
    );

    await engine.refresh(refresh);
}
