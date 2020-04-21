import type { ICharacterShape } from "../../../../Interfaces/Options/Particles/Shape/ICharacterShape";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { ShapeBase } from "./ShapeBase";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";

export class CharacterShape extends ShapeBase implements ICharacterShape {
    public font: string;
    public style: string;
    public value: SingleOrMultiple<string>;
    public weight: string;

    constructor() {
        super();
        this.font = "Verdana";
        this.style = "";
        this.value = "*";
        this.weight = "400";
    }

    public load(data?: RecursivePartial<ICharacterShape>): void {
        super.load(data);

        if (data !== undefined) {
            if (data.font !== undefined) {
                this.font = data.font;
            }

            if (data.style !== undefined) {
                this.style = data.style;
            }

            if (data.value !== undefined) {
                this.value = data.value;
            }

            if (data.weight !== undefined) {
                this.weight = data.weight;
            }
        }
    }
}
