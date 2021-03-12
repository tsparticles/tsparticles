import type { IBounce } from "../../../Interfaces/Particles/Bounce/IBounce";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../../Types";
import { BounceFactor } from "./BounceFactor";

export class Bounce implements IBounce, IOptionLoader<IBounce> {
    public horizontal;
    public vertical;

    constructor() {
        this.horizontal = new BounceFactor();
        this.vertical = new BounceFactor();
    }

    public load(data?: RecursivePartial<IBounce>): void {
        if (!data) {
            return;
        }

        this.horizontal.load(data.horizontal);
        this.vertical.load(data.vertical);
    }
}
