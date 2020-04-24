import type { IBackground } from "../../../Interfaces/Options/Background/IBackground";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import { OptionsColor } from "../Particles/OptionsColor";
import type { IOptionsColor } from "../../../Interfaces/Options/Particles/IOptionsColor";

export class Background implements IBackground {
    public color?: IOptionsColor;
    public image?: string;
    public position?: string;
    public repeat?: string;
    public size?: string;
    public opacity?: number;

    public load(data?: RecursivePartial<IBackground>): void {
        if (data !== undefined) {
            if (data.color !== undefined) {
                if (this.color === undefined) {
                    this.color = new OptionsColor();
                }

                this.color.load(typeof data.color === "string" ? { value: data.color } : data.color);
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
