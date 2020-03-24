import type { IOptionLoader } from "../../IOptionLoader";

export interface ISlow extends IOptionLoader<ISlow> {
    /**
     * @deprecated this property will be removed soon, please use the HoverMode.slow in the HoverEvent
     */
    active: boolean;
    radius: number;
    factor: number;
}
