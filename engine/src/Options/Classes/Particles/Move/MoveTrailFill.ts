import type { IMoveTrailFill } from "../../../Interfaces/Particles/Move/IMoveTrailFill.js";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import { OptionsColor } from "../../OptionsColor.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
import { isNull } from "../../../../Utils/TypeUtils.js";

export class MoveTrailFill implements IMoveTrailFill, IOptionLoader<IMoveTrailFill> {
    color?: OptionsColor;
    image?: string;

    load(data?: RecursivePartial<IMoveTrailFill>): void {
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
