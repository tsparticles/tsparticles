import type { SingleOrMultiple } from "tsparticles-engine";

export interface ISoundsNote {
    duration: number;

    value: SingleOrMultiple<string>;
}
