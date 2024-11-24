/* eslint-disable @typescript-eslint/no-magic-numbers */

import { EasingType, type Engine, assertValidVersion } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadEasingCubicPlugin(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addEasing(EasingType.easeInCubic, value => value ** 3, false);
    await engine.addEasing(EasingType.easeOutCubic, value => 1 - (1 - value) ** 3, false);
    await engine.addEasing(
        EasingType.easeInOutCubic,
        value => (value < 0.5 ? 4 * value ** 3 : 1 - (-2 * value + 2) ** 3 / 2),
        false,
    );

    await engine.refresh(refresh);
}
