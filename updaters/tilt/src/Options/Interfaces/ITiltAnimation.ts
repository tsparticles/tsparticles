import type { RangeValue } from "tsparticles-engine";

/**
 * @category Options
 */

export interface ITiltAnimation {
    decay: RangeValue;
    enable: boolean;
    speed: RangeValue;
    sync: boolean;
}
