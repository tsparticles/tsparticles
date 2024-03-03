/* eslint-disable @typescript-eslint/no-magic-numbers */

import { EasingType, addEasing } from "@tsparticles/engine";

/**
 */
export async function loadEasingSinePlugin(): Promise<void> {
    addEasing(EasingType.easeInSine, value => 1 - Math.cos((value * Math.PI) / 2));
    addEasing(EasingType.easeOutSine, value => Math.sin((value * Math.PI) / 2));
    addEasing(EasingType.easeInOutSine, value => -(Math.cos(Math.PI * value) - 1) / 2);

    await Promise.resolve();
}
