import type { IBackground } from "../../../Interfaces/Options/Background/IBackground";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import { Color } from "../Particles/Color";
import type { IColor } from "../../../Interfaces/Options/Particles/IColor";

export class Background implements IBackground {
    public color?: IColor | string;
    public image?: string;
    public position?: string;
    public repeat?: string;
    public size?: string;
    public opacity?: number;

    public load(data?: RecursivePartial<IBackground>): void {
        if (data !== undefined) {
            if (data.color !== undefined) {
                if (typeof data.color === "string") {
                    this.color = data.color;
                } else {
                    this.color = new Color();
                    this.color.load(data.color);
                }
            }

            if (data.image !== undefined) {
                this.image = data.image;
            }

            if (data.position !== undefined) {
                this.position = data.position;
            }

            if (data.repeat !== undefined) {
                this.repeat = data.repeat;
            }

            if (data.size !== undefined) {
                this.size = data.size;
            }

            if (data.opacity !== undefined) {
                this.opacity = data.opacity;
            }
        }
    }
}
