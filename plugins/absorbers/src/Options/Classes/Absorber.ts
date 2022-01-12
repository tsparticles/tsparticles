import type { IAbsorber } from "../Interfaces/IAbsorber";
import type { ICoordinates, IOptionLoader, RecursivePartial } from "tsparticles-engine";
import { AbsorberSize } from "./AbsorberSize";
import { OptionsColor } from "tsparticles-engine";

/**
 * [[include:Options/Plugins/Absorbers.md]]
 * @category Absorbers Plugin
 */
export class Absorber implements IAbsorber, IOptionLoader<IAbsorber> {
    color;
    draggable;
    name?: string;
    opacity;
    position?: RecursivePartial<ICoordinates>;
    size;
    destroy;
    orbits;

    constructor() {
        this.color = new OptionsColor();
        this.color.value = "#000000";
        this.draggable = false;
        this.opacity = 1;
        this.destroy = true;
        this.orbits = false;
        this.size = new AbsorberSize();
    }

    load(data?: RecursivePartial<IAbsorber>): void {
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

        if (data.destroy !== undefined) {
            this.destroy = data.destroy;
        }

        if (data.orbits !== undefined) {
            this.orbits = data.orbits;
        }
    }
}
