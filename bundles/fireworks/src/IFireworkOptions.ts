import type { RangeValue, SingleOrMultiple } from "tsparticles-engine";

export interface IFireworkOptions {
    brightness: RangeValue;
    colors: SingleOrMultiple<string>;
    gravity: RangeValue;
    minHeight: RangeValue;
    rate: RangeValue;
    saturation: RangeValue;
    sounds: boolean;
    speed: RangeValue;
    splitCount: RangeValue;
}
