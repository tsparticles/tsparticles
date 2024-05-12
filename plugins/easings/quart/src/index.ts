/* eslint-disable @typescript-eslint/no-magic-numbers */

import { EasingType, addEasing } from "@tsparticles/engine";

/**
 */
export async function loadEasingQuartPlugin(): Promise<void> {
    addEasing(EasingType.easeInQuart, value => value ** 4);
    addEasing(EasingType.easeOutQuart, value => 1 - (1 - value) ** 4);
    addEasing(EasingType.easeInOutQuart, value => (value < 0.5 ? 8 * value ** 4 : 1 - (-2 * value + 2) ** 4 / 2));

    await Promise.resolve();
}
