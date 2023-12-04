import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple.js";

/**
 * The canvas click event
 * [[include:Options/Interactivity/Click.md]]
 */
export interface IClickEvent {
    /**
     * This property enables or disables the click event
     */
    enable: boolean;

    /**
     * This property contains a click mode value or an array of those values.
     * If this value is an array, every mode will be used on click.
     */
    mode: SingleOrMultiple<string>;
}
