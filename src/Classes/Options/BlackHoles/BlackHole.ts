import type { IBlackHole } from "../../../Interfaces/Options/BlackHoles/IBlackHole";
import type { ICoordinates } from "../../../Interfaces/ICoordinates";
import type { IBlackHoleSize } from "../../../Interfaces/Options/BlackHoles/IBlackHoleSize";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import { BlackHoleSize } from "./BlackHoleSize";
import { OptionsColor } from "../Particles/OptionsColor";
import { IOptionsColor } from "../../../Interfaces/Options/Particles/IOptionsColor";

export class BlackHole implements IBlackHole {
    public color: IOptionsColor;
    public position?: ICoordinates;
    public size: IBlackHoleSize;

    constructor() {
        this.color = new OptionsColor();
        this.color.value = "#000000";

        this.size = new BlackHoleSize();
    }

    public load(data?: RecursivePartial<IBlackHole>): void {
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
