import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { IPreload } from "../Interfaces/IPreload.js";

export class Preload implements IPreload, IOptionLoader<IPreload> {
    gif: boolean;
    height?: number;
    name?: string;
    replaceColor?: boolean;
    src: string;
    width?: number;

    constructor() {
        this.src = "";
        this.gif = false;
    }

    load(data?: RecursivePartial<IPreload>): void {
        if (isNull(data)) {
            return;
        }

        if (data.gif !== undefined) {
            this.gif = data.gif;
        }

        if (data.height !== undefined) {
            this.height = data.height;
        }

        if (data.name !== undefined) {
            this.name = data.name;
        }

        if (data.replaceColor !== undefined) {
            this.replaceColor = data.replaceColor;
        }

        if (data.src !== undefined) {
            this.src = data.src;
        }

        if (data.width !== undefined) {
            this.width = data.width;
        }
    }
}
