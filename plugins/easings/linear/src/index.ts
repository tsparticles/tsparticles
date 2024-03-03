import { EasingType, addEasing } from "@tsparticles/engine";

/**
 */
export async function loadEasingLinearPlugin(): Promise<void> {
    addEasing(EasingType.easeInLinear, value => {
        return value;
    });
    addEasing(EasingType.easeOutLinear, value => {
        return value;
    });
    addEasing(EasingType.easeInOutLinear, value => {
        return value;
    });

    await Promise.resolve();
}
