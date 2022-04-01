import type { IDimension } from "../../../../Core/Interfaces/IDimension";
import type { IOptionLoader } from "../../../../Options/Interfaces/IOptionLoader";
import type { IPolygonMaskLocalSvg } from "../Interfaces/IPolygonMaskLocalSvg";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";

/**
 * @category Polygon Mask Plugin
 */
export class PolygonMaskLocalSvg implements IPolygonMaskLocalSvg, IOptionLoader<IPolygonMaskLocalSvg> {
    path: SingleOrMultiple<string>;
    size: IDimension;

    constructor() {
        this.path = [];
        this.size = {
            height: 0,
            width: 0,
        };
    }

    load(data?: RecursivePartial<IPolygonMaskLocalSvg>): void {
        if (!data) {
            return;
        }

        if (data.path !== undefined) {
            this.path = data.path;
        }

        if (data.size !== undefined) {
            if (data.size.width !== undefined) {
                this.size.width = data.size.width;
            }

            if (data.size.height !== undefined) {
                this.size.height = data.size.height;
            }
        }
    }
}
