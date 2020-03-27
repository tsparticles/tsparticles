import type { IShape } from "./Shape/IShape";
import type { IColor } from "./IColor";
import type { ILineLinked } from "./ILineLinked";
import type { IMove } from "./IMove";
import type { IParticlesNumber } from "./IParticlesNumber";
import type { IOpacity } from "./IOpacity";
import type { ISize } from "./ISize";
import type { IOptionLoader } from "../IOptionLoader";
import type { IRotate } from "./IRotate";
import type { IShadow } from "./IShadow";

export interface IParticles extends IOptionLoader<IParticles> {
    color: IColor;

    /**
     * @deprecated use the new lineLinked instead
     */
    line_linked: ILineLinked;

    lineLinked: ILineLinked;
    move: IMove;
    number: IParticlesNumber;
    opacity: IOpacity;
    rotate: IRotate;
    shadow: IShadow;
    shape: IShape;
    size: ISize;
}
