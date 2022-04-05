import type { IMotion } from "../../Interfaces/Motion/IMotion";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";
import { MotionReduce } from "./MotionReduce";
import type { RecursivePartial } from "../../../Types/RecursivePartial";

/**
 * [[include:Options/Motion.md]]
 * @category Options
 */
export class Motion implements IMotion, IOptionLoader<IMotion> {
    /**
     * Disables motions for users with `prefer-reduced-motion` enabled
     */
    disable;

    /**
     * Reduce motion settings for users with `prefer-reduced-motion` enabled
     * If [[disable]] is `true` these values will be ignored
     */
    reduce;

    constructor() {
        this.disable = false;
        this.reduce = new MotionReduce();
    }

    load(data?: RecursivePartial<IMotion>): void {
        if (!data) {
            return;
        }

        if (data.disable !== undefined) {
            this.disable = data.disable;
        }

        this.reduce.load(data.reduce);
    }
}
