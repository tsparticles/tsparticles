import type { IAbsorber } from "../Interfaces/IAbsorber";
import type { ICoordinates } from "../../../../Core/Interfaces/ICoordinates";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { AbsorberSize } from "./AbsorberSize";
import { OptionsColor } from "../../../../Options/Classes/OptionsColor";
import type { IOptionLoader } from "../../../../Options/Interfaces/IOptionLoader";

export class Absorber implements IAbsorber, IOptionLoader<IAbsorber> {
    public color: OptionsColor;
    public draggable: boolean;
    public opacity: number;
    public position?: ICoordinates;
    public size: AbsorberSize;
    public destroy: boolean;
    public orbits: boolean;

    constructor() {
        this.color = new OptionsColor();
        this.color.value = "#000000";
        this.draggable = false;
        this.opacity = 1;
        this.destroy = true;
        this.orbits = false;
        this.size = new AbsorberSize();
    }

    public load(data?: RecursivePartial<IAbsorber>): void {
        if (data !== undefined) {
            if (data.color !== undefined) {
                this.color = OptionsColor.create(this.color, data.color);
            }

            if (data.draggable !== undefined) {
                this.draggable = data.draggable;
            }

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
}
