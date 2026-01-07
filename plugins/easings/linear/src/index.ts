import { EasingType, type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadEasingLinearPlugin(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(e => {
        e.addEasing(EasingType.easeInLinear, value => value);
        e.addEasing(EasingType.easeOutLinear, value => value);
        e.addEasing(EasingType.easeInOutLinear, value => value);
    });
}
