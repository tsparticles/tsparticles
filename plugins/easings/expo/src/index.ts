/* eslint-disable @typescript-eslint/no-magic-numbers */

/**
 */
export async function loadEasingExpoPlugin(): Promise<void> {
    const { EasingType, addEasing } = await import("@tsparticles/engine");

    addEasing(EasingType.easeInExpo, (value) => (!value ? 0 : 2 ** (10 * value - 10)));
    addEasing(EasingType.easeOutExpo, (value) => (value === 1 ? 1 : 1 - Math.pow(2, -10 * value)));
    addEasing(EasingType.easeInOutExpo, (value) => {
        if (value === 1) {
            return !value ? 0 : 1;
        } else if (!value) {
            return 0;
        } else {
            return value < 0.5 ? 2 ** (20 * value - 10) / 2 : (2 - 2 ** (-20 * value + 10)) / 2;
        }
    });
}
