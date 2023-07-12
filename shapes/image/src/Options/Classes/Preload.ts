import type { IOptionLoader, RecursivePartial } from "tsparticles-engine";
import type { IPreload } from "../Interfaces/IPreload";

export class Preload implements IPreload, IOptionLoader<IPreload> {
    gif: boolean;
    height?: number;
    name?: string | undefined;
    replaceColor?: boolean | undefined;
    src: string;
    width?: number;

    constructor() {
        this.src = "";
        this.gif = false;
    }

    load(data?: RecursivePartial<IPreload>): void {
        if (!data) {
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
