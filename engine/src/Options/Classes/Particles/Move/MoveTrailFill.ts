import type { IMoveTrailFill } from "../../../Interfaces/Particles/Move/IMoveTrailFill";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { OptionsColor } from "../../OptionsColor";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

export class MoveTrailFill implements IMoveTrailFill, IOptionLoader<IMoveTrailFill> {
    color?: OptionsColor;
    image?: string;

    load(data?: RecursivePartial<IMoveTrailFill>): void {
        if (!data) {
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
