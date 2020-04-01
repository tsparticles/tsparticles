import type { IColor } from "../Particles/IColor";
import type { IOptionLoader } from "../IOptionLoader";

export interface IBackground extends IOptionLoader<IBackground> {
    color?: IColor | string;
    opacity?: number;
    image?: string;
    position?: string;
    repeat?: string;
    size?: string;
}
