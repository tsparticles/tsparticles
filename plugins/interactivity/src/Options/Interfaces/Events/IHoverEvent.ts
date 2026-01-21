import type { SingleOrMultiple } from "@tsparticles/engine";

/**
 * [[include:Options/Interactivity/Hover.md]]
 */
export interface IHoverEvent {
    /**
     * This property is used to enable or disable the event.
     */
    enable: boolean;

    /**
     * This property contains a click mode value or an array of those values.
     * If this value is an array, every mode will be used on click.
     */
    mode: SingleOrMultiple<string>;
}
