import type { ClickMode } from "../../../../Enums";
import type { SingleOrMultiple } from "../../../../Types";

/**
 * The canvas click event
 * [[include:Options/Interactivity/Click.md]]
 * @category Options
 */
export interface IClickEvent {
    /**
     * This property enables or disables the click event
     */
    enable: boolean;

    /**
     * This property contains a [[ClickMode]] value or an array of those values.
     * If this value is an array, every mode will be used on click.
     */
    mode: SingleOrMultiple<ClickMode | keyof typeof ClickMode | string>;
}
