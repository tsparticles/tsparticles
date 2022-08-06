import type { Options } from "tsparticles-engine";
import type { TrailInteractivity } from "../../Types";

export type TrailOptions = Options & {
    interactivity?: TrailInteractivity;
};
