import type { IClickEvent } from "../../../Interfaces/Interactivity/Events/IClickEvent.js";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple.js";

/**
 * Class representing a click event with its settings, allowing for different trigger modes.
 */
export class ClickEvent implements IClickEvent, IOptionLoader<IClickEvent> {
    /**
     * Flag to enable or disable the click event handler.
     */
    enable: boolean;

    /**
     * Modes in which the click event is triggered.
     */
    mode: SingleOrMultiple<string>;

    /**
     * Constructs a new ClickEvent instance with default settings.
     */
    constructor() {
        this.enable = false; // Default value for enable is false
        this.mode = ['click']; // Default mode is 'click'
    }

    /**
     * Loads configuration data into the click event settings.
     * @param data - Optional configuration data for the click event.
     */
    load(data?: RecursivePartial<IClickEvent>): void {
        if (data === undefined) {
            return;
        }

        // Load enable flag if provide