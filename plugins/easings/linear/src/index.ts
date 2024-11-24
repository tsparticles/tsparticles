import { EasingType, type Engine, assertValidVersion } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadEasingLinearPlugin(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addEasing(
        EasingType.easeInLinear,
        value => {
            return value;
        },
        false,
    );

    await engine.addEasing(
        EasingType.easeOutLinear,
        value => {
            return value;
        },
        false,
    );

    await engine.addEasing(
        EasingType.easeInOutLinear,
        value => {
            return value;
        },
        false,
    );

    await engine.refresh(refresh);
}
