import {ICharacterShape} from "../../../../Interfaces/Options/Shape/ICharacterShape";
import {Utils} from "../../../Utils/Utils";

export class CharacterShape implements ICharacterShape {
    public fill: boolean;
    public font: string;
    public style: string;
    public value: string | string[];
    public weight: string;

    constructor() {
        this.fill = false;
        this.font = "Verdana";
        this.style = "";
        this.value = "*";
        this.weight = "400";
    }

    public load(data: ICharacterShape): void {
        if (Utils.hasData(data)) {
            if (Utils.hasData(data.fill)) {
                this.fill = data.fill;
            }

            if (Utils.hasData(data.font)) {
                this.font = data.font;
            }

            if (Utils.hasData(data.style)) {
                this.style = data.style;
            }

            if (Utils.hasData(data.value)) {
                this.value = data.value;
            }

            if (Utils.hasData(data.weight)) {
                this.weight = data.weight;
            }
        }
    }
}
