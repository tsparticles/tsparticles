import { clamp } from "tsparticles-engine";

/**
 * @param particleValue -
 * @param modeValue -
 * @param optionsValue -
 * @param ratio -
 * @returns the calculated value
 */
export function calculateBubbleValue(
    particleValue: number,
    modeValue: number,
    optionsValue: number,
    ratio: number,
): number | undefined {
    if (modeValue >= optionsValue) {
        const value = particleValue + (modeValue - optionsValue) * ratio;

        return clamp(value, particleValue, modeValue);
    } else if (modeValue < optionsValue) {
        const value = particleValue - (optionsValue - modeValue) * ratio;

        return clamp(value, modeValue, particleValue);
    }
}
