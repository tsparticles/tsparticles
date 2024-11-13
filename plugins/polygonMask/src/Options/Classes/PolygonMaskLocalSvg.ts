import {
    type IDimension,
    type IOptionLoader,
    type RecursivePartial,
    type SingleOrMultiple,
    isNull,
} from "@tsparticles/engine";
import type { IPolygonMaskLocalSvg } from "../Interfaces/IPolygonMaskLocalSvg.js";

/**
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
        if (isNull(data)) {
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
