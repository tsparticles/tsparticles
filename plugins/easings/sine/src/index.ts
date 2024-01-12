/* eslint-disable @typescript-eslint/no-magic-numbers */

/**
 */
export async function loadEasingSinePlugin(): Promise<void> {
    const { EasingType, addEasing } = await import("@tsparticles/engine");

    addEasing(EasingType.easeInSine, (value) => 1 - Math.cos((value * Math.PI) / 2));
    addEasing(EasingType.easeOutSine, (value) => Math.sin((value * Math.PI) / 2));
    addEasing(EasingType.easeInOutSine, (value) => -(Math.cos(Math.PI * value) - 1) / 2);
}
