import type { IColorAnimation } from "../Interfaces/IColorAnimation";
import type { RecursivePartial } from "../../Types";
import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import { OffsetValue } from "./OffsetValue";

/**
 * @category Options
 */
export class ColorAnimation implements IColorAnimation, IOptionLoader<IColorAnimation> {
    public enable;
    public offset;
    public speed;
    public sync;

    constructor() {
        this.enable = false;
        this.offset = new OffsetValue();
        this.speed = 1;
        this.sync = true;
    }

    public load(data?: RecursivePartial<IColorAnimation>): void {
        if (data === undefined) {
            return;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        this.offset.load(data.offset);

        if (data.speed !== undefined) {
            this.speed = data.speed;
        }

        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}
