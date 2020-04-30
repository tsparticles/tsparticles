import type { IBackground } from "../../Interfaces/Background/IBackground";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import { OptionsColor } from "../Particles/OptionsColor";

export class Background implements IBackground {
    public color?: OptionsColor;
    public image?: string;
    public position?: string;
    public repeat?: string;
    public size?: string;
    public opacity?: number;

    public load(data?: RecursivePartial<IBackground>): void {
        if (data !== undefined) {
            if (data.color !== undefined) {
                this.color = OptionsColor.create(this.color,  data.color);
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
