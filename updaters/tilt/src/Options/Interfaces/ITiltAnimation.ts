import type { RangeValue } from "tsparticles-engine";

/**
 * @category Options
 */

export interface ITiltAnimation {
    enable: boolean;
    speed: RangeValue;
    decay: RangeValue;
    sync: boolean;
}
