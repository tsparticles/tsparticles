import type { RangeValue, SingleOrMultiple } from "tsparticles-engine";

export interface IFireworkOptions {
    brightness: RangeValue;
    colors: SingleOrMultiple<string>;
    saturation: RangeValue;
    splitCount: RangeValue;
}
