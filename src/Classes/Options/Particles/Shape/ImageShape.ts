import {IImageShape} from "../../../../Interfaces/Options/Shape/IImageShape";

export class ImageShape implements IImageShape {
    /**
     *
     * @deprecated this property is obsolete, please use the new replaceColor
     */
    public get replace_color(): boolean {
        return this.replaceColor;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new replaceColor
     * @param value
     */
    public set replace_color(value) {
        this.replaceColor = value;
    }

    public height: number;
    public replaceColor: boolean;
    public src: string;
    public width: number;

    constructor() {
        this.height = 100;
        this.replaceColor = true;
        this.src = "";
        this.width = 100;
    }
}
