/* eslint-disable @typescript-eslint/no-magic-numbers */

/**
 */
export async function loadEasingQuadPlugin(): Promise<void> {
    const { EasingType, addEasing } = await import("@tsparticles/engine");

    addEasing(EasingType.easeInQuad, (value) => value ** 2);
    addEasing(EasingType.easeOutQuad, (value) => 1 - (1 - value) ** 2);
    addEasing(EasingType.easeInOutQuad, (value) => (value < 0.5 ? 2 * value ** 2 : 1 - (-2 * value + 2) ** 2 / 2));
}
