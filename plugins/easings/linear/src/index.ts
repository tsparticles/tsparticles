/**
 */
export async function loadEasingLinearPlugin(): Promise<void> {
    const { EasingType, addEasing } = await import("@tsparticles/engine");

    addEasing(EasingType.easeInLinear, (value) => {
        return value;
    });
    addEasing(EasingType.easeOutLinear, (value) => {
        return value;
    });
    addEasing(EasingType.easeInOutLinear, (value) => {
        return value;
    });
}
