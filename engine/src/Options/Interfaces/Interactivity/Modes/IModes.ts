import type { ISlow } from "./ISlow";

/**
 * [[include:Options/Interactivity/Modes.md]]
 * @category Options
 */
export interface IModes {
    [name: string]: unknown;

    slow: ISlow;
}
