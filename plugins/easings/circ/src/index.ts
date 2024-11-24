/* eslint-disable @typescript-eslint/no-magic-numbers */

import { EasingType, type Engine, assertValidVersion } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadEasingCircPlugin(engine: Engine, refresh: false): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addEasing(EasingType.easeInCirc, value => 1 - Math.sqrt(1 - value ** 2), false);
    await engine.addEasing(EasingType.easeOutCirc, value => Math.sqrt(1 - (value - 1) ** 2), false);
    await engine.addEasing(
        EasingType.easeInOutCirc,
        value =>
            value < 0.5 ? (1 - Math.sqrt(1 - (2 * value) ** 2)) / 2 : (Math.sqrt(1 - (-2 * value + 2) ** 2) + 1) / 2,
        false,
    );

    await engine.refresh(refresh);
}
