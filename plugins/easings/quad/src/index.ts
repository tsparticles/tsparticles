/* eslint-disable @typescript-eslint/no-magic-numbers */

import { EasingType, addEasing } from "@tsparticles/engine";

/**
 */
export async function loadEasingQuadPlugin(): Promise<void> {
    addEasing(EasingType.easeInQuad, value => value ** 2);
    addEasing(EasingType.easeOutQuad, value => 1 - (1 - value) ** 2);
    addEasing(EasingType.easeInOutQuad, value => (value < 0.5 ? 2 * value ** 2 : 1 - (-2 * value + 2) ** 2 / 2));

    await Promise.resolve();
}
