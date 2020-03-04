import {ICharacterShape} from "../../../../Interfaces/Options/Shape/ICharacterShape";

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
}