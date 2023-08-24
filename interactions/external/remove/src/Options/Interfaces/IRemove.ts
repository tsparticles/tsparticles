import type { RangeValue } from "@tsparticles/engine";

/**
 */
export interface IRemove {
    /**
     * @deprecated use the new quantity instead
     */
    particles_nb: RangeValue;

    quantity: RangeValue;
}
