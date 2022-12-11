import { EasingType, addEasing } from "tsparticles-engine";

export function loadEasingCubicPlugin(): void {
    addEasing(EasingType.easeInCubic, (value) => value ** 3);
    addEasing(EasingType.easeOutCubic, (value) => 1 - (1 - value) ** 3);
    addEasing(EasingType.easeInOutCubic, (value) => (value < 0.5 ? 4 * value ** 3 : 1 - (-2 * value + 2) ** 3 / 2));
}
