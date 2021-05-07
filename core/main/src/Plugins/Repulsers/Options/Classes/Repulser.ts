import type { IRepulser } from "../Interfaces/IRepulser";
import type { ICoordinates } from "../../../../Core/Interfaces/ICoordinates";
import type { RecursivePartial } from "../../../../Types";
import { RepulserSize } from "./RepulserSize";
import { OptionsColor } from "../../../../Options/Classes/OptionsColor";
import type { IOptionLoader } from "../../../../Options/Interfaces/IOptionLoader";

/**
 * [[include:Options/Plugins/Absorbers.md]]
 * @category Absorbers Plugin
 */
export class Repulser implements IRepulser, IOptionLoader<IRepulser> {
    color;
    draggable;
    name?: string;
    opacity;
    position?: RecursivePartial<ICoordinates>;
    size;

    constructor() {
        this.color = new OptionsColor();
        this.color.value = "#000000";
        this.draggable = false;
        this.opacity = 1;
        this.size = new RepulserSize();
    }

    load(data?: RecursivePartial<IRepulser>): void {
        if (data === undefined) {
            return;
        }

        if (data.color !== undefined) {
            this.color = OptionsColor.create(this.color, data.color);
        }

        if (data.draggable !== undefined) {
            this.draggable = data.draggable;
        }

        this.name = data.name;

        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }

        if (data.position !== undefined) {
            this.position = {
                x: data.position.x,
                y: data.position.y,
            };
        }

        if (data.size !== undefined) {
            this.size.load(data.size);
        }
    }
}
