import { EasingType, addEasing } from "tsparticles-engine";

export function loadEasingExpoPlugin(): void {
    addEasing(EasingType.easeInExpo, (value) => (!value ? 0 : 2 ** (10 * value - 10)));
    addEasing(EasingType.easeOutExpo, (value) => (value === 1 ? 1 : 1 - Math.pow(2, -10 * value)));
    addEasing(EasingType.easeInOutExpo, (value) =>
        !value ? 0 : value === 1 ? 1 : value < 0.5 ? 2 ** (20 * value - 10) / 2 : (2 - 2 ** (-20 * value + 10)) / 2
    );
}
