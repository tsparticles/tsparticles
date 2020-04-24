import type { IAbsorber } from "../../../Interfaces/Options/Absorbers/IAbsorber";
import type { ICoordinates } from "../../../Interfaces/ICoordinates";
import type { IAbsorberSize } from "../../../Interfaces/Options/Absorbers/IAbsorberSize";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import { AbsorberSize } from "./AbsorberSize";
import { OptionsColor } from "../Particles/OptionsColor";
import type { IOptionsColor } from "../../../Interfaces/Options/Particles/IOptionsColor";

export class Absorber implements IAbsorber {
    public color: IOptionsColor;
    public position?: ICoordinates;
    public size: IAbsorberSize;

    constructor() {
        this.color = new OptionsColor();
        this.color.value = "#000000";

        this.size = new AbsorberSize();
    }

    public load(data?: RecursivePartial<IAbsorber>): void {
        if (data !== undefined) {
            if (data.color !== undefined) {
                if (this.color === undefined) {
                    this.color = new OptionsColor();
                }

                this.color.load(typeof data.color === "string" ? { value: data.color } : data.color);
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
