import type { IAbsorber } from "../../../Interfaces/Options/Absorbers/IAbsorber";
import type { ICoordinates } from "../../../Interfaces/ICoordinates";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import { AbsorberSize } from "./AbsorberSize";
import { OptionsColor } from "../Particles/OptionsColor";

export class Absorber implements IAbsorber {
    public color: OptionsColor;
    public opacity: number;
    public position?: ICoordinates;
    public size: AbsorberSize;

    constructor() {
        this.color = new OptionsColor();
        this.color.value = "#000000";
        this.opacity = 1;
        this.size = new AbsorberSize();
    }

    public load(data?: RecursivePartial<IAbsorber>): void {
        if (data !== undefined) {
            if (data.color !== undefined) {
                this.color = OptionsColor.create(this.color,  data.color);
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
        }
    }
}
