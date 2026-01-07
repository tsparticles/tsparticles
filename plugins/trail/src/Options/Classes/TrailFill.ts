import { type IOptionLoader, OptionsColor, type RecursivePartial, isNull } from "@tsparticles/engine";
import { type ITrailFill } from "../Interfaces/ITrailFill.js";

export class TrailFill implements ITrailFill, IOptionLoader<ITrailFill> {
    color?: OptionsColor;
    image?: string;

    load(data?: RecursivePartial<ITrailFill>): void {
        if (isNull(data)) {
            return;
        }

        if (data.color !== undefined) {
            this.color = OptionsColor.create(this.color, data.color);
        }

        if (data.image !== undefined) {
            this.image = data.image;
        }
    }
}
