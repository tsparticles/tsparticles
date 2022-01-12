import type { PathOptions, RangeValue } from "../../../../../Types";

/**
 * @category Options
 */
export interface IPath {
    clamp: boolean;
    delay: RangeValue;
    enable: boolean;
    options: PathOptions;
    generator?: string;
}
