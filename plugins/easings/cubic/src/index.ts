/* eslint-disable @typescript-eslint/no-magic-numbers */

/**
 */
export async function loadEasingCubicPlugin(): Promise<void> {
    const { EasingType, addEasing } = await import("@tsparticles/engine");

    addEasing(EasingType.easeInCubic, (value) => value ** 3);
    addEasing(EasingType.easeOutCubic, (value) => 1 - (1 - value) ** 3);
    addEasing(EasingType.easeInOutCubic, (value) => (value < 0.5 ? 4 * value ** 3 : 1 - (-2 * value + 2) ** 3 / 2));
}
