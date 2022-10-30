import { EasingType, addEasing } from "tsparticles-engine";

export function loadEasingQuintPlugin(): void {
    addEasing(EasingType.easeInQuint, (value) => value ** 5);
    addEasing(EasingType.easeOutQuint, (value) => 1 - (1 - value) ** 5);
    addEasing(EasingType.easeInOutQuint, (value) => (value < 0.5 ? 16 * value ** 5 : 1 - (-2 * value + 2) ** 5 / 2));
}
