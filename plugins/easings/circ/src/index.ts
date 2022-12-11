import { EasingType, addEasing } from "tsparticles-engine";

export function loadEasingCircPlugin(): void {
    addEasing(EasingType.easeInCirc, (value) => 1 - Math.sqrt(1 - value ** 2));
    addEasing(EasingType.easeOutCirc, (value) => Math.sqrt(1 - (value - 1) ** 2));
    addEasing(EasingType.easeInOutCirc, (value) =>
        value < 0.5 ? (1 - Math.sqrt(1 - (2 * value) ** 2)) / 2 : (Math.sqrt(1 - (-2 * value + 2) ** 2) + 1) / 2
    );
}
