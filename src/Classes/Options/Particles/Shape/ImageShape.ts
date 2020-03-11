import {IImageShape} from "../../../../Interfaces/Options/Particles/Shape/IImageShape";
import {Messages} from "../../../Utils/Messages";
import {Utils} from "../../../Utils/Utils";

export class ImageShape implements IImageShape {
    /**
     *
     * @deprecated this property is obsolete, please use the new replaceColor
     */
    public get replace_color(): boolean {
        Messages.deprecated("particles.shape.image.replace_color", "particles.shape.image.replaceColor");

        return this.replaceColor;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new replaceColor
     * @param value
     */
    public set replace_color(value: boolean) {
        Messages.deprecated("particles.shape.image.replace_color", "particles.shape.image.replaceColor");

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

    public load(data: IImageShape): void {
        if (Utils.hasData(data)) {
            if (Utils.hasData(data.height)) {
                this.height = data.height;
            }

            if (Utils.hasData(data.replaceColor)) {
                this.replaceColor = data.replaceColor;
            }

            if (Utils.hasData(data.replace_color)) {
                this.replace_color = data.replace_color;
            }

            if (Utils.hasData(data.src)) {
                this.src = data.src;
            }

            if (Utils.hasData(data.width)) {
                this.width = data.width;
            }
        }
    }
}
