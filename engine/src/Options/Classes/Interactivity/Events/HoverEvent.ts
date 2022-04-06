import { HoverMode } from "../../../../Enums/Modes/HoverMode";
import type { IHoverEvent } from "../../../Interfaces/Interactivity/Events/IHoverEvent";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { Parallax } from "./Parallax";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";

/**
 * [[include:Options/Interactivity/Hover.md]]
 * @category Options
 */
export class HoverEvent implements IHoverEvent, IOptionLoader<IHoverEvent> {
    enable;
    mode: SingleOrMultiple<HoverMode | keyof typeof HoverMode | string>;
    parallax;

    constructor() {
        this.enable = false;
        this.mode = [];
        this.parallax = new Parallax();
    }

    load(data?: RecursivePartial<IHoverEvent>): void {
        if (!data) {
            return;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        if (data.mode !== undefined) {
            this.mode = data.mode;
        }

        this.parallax.load(data.parallax);
    }
}
