import type { RangeValue } from "tsparticles-engine";

/**
 */
export interface IPush {
    default: boolean;
    groups: string[];

    /**
     * @deprecated use the new quantity instead
     */
    particles_nb: RangeValue;

    quantity: RangeValue;
}
