/* eslint-disable @typescript-eslint/no-magic-numbers */

import { EasingType, addEasing } from "@tsparticles/engine";

/**
 */
export async function loadEasingQuintPlugin(): Promise<void> {
    addEasing(EasingType.easeInQuint, value => value ** 5);
    addEasing(EasingType.easeOutQuint, value => 1 - (1 - value) ** 5);
    addEasing(EasingType.easeInOutQuint, value => (value < 0.5 ? 16 * value ** 5 : 1 - (-2 * value + 2) ** 5 / 2));

    await Promise.resolve();
}
