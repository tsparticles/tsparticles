import type { IShape } from "./Shape/IShape";
import type { ILinks } from "./Links/ILinks";
import type { IMove } from "./Move/IMove";
import type { IParticlesNumber } from "./IParticlesNumber";
import type { IOpacity } from "./Opacity/IOpacity";
import type { ISize } from "./Size/ISize";
import type { IRotate } from "./Rotate/IRotate";
import type { IShadow } from "./IShadow";
import type { SingleOrMultiple } from "../../../Types/SingleOrMultiple";
import type { IStroke } from "./IStroke";
import type { ICollisions } from "./ICollisions";
import type { ITwinkle } from "./Twinkle/ITwinkle";
import type { IAnimatableColor } from "./IAnimatableColor";

export interface IParticles {
    collisions: ICollisions;
    color: IAnimatableColor;

    /**
     * @deprecated use the new links instead
     */
    line_linked: ILinks;

    /**
     * @deprecated use the new links instead
     */
    lineLinked: ILinks;

    links: ILinks;
    move: IMove;
    number: IParticlesNumber;
    opacity: IOpacity;
    rotate: IRotate;
    shadow: IShadow;
    shape: IShape;
    size: ISize;
    stroke: SingleOrMultiple<IStroke>;
    twinkle: ITwinkle;
}
