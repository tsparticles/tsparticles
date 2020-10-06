import type { IMotion } from "../../Interfaces/Motion/IMotion";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../Types";
import { MotionReduce } from "./MotionReduce";

/**
 * [[include:Options/Motion.md]]
 * @category Options
 */
export class Motion implements IMotion, IOptionLoader<IMotion> {
    /**
     * Disables motions for users with `prefer-reduced-motion` enabled
     */
    public disable;

    /**
     * Reduce motion settings for users with `prefer-reduced-motion` enabled
     * If [[disable]] is `true` these values will be ignored
     */
    public reduce;

    constructor() {
        this.disable = false;
        this.reduce = new MotionReduce();
    }

    public load(data?: RecursivePartial<IMotion>): void {
        if (!data) {
            return;
        }

        if (data.disable !== undefined) {
            this.disable = data.disable;
        }

        this.reduce.load(data.reduce);
    }
}
