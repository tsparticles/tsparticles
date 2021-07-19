import type { IShape } from "./Shape/IShape";
import type { ILinks } from "./Links/ILinks";
import type { IMove } from "./Move/IMove";
import type { IParticlesNumber } from "./Number/IParticlesNumber";
import type { IOpacity } from "./Opacity/IOpacity";
import type { ISize } from "./Size/ISize";
import type { IRotate } from "./Rotate/IRotate";
import type { IShadow } from "./IShadow";
import type { SingleOrMultiple } from "../../../Types";
import type { IStroke } from "./IStroke";
import type { ICollisions } from "./Collisions/ICollisions";
import type { ITwinkle } from "./Twinkle/ITwinkle";
import type { IAnimatableColor } from "./IAnimatableColor";
import type { ILife } from "./Life/ILife";
import type { IBounce } from "./Bounce/IBounce";
import type { IDestroy } from "./Destroy/IDestroy";
import type { IWobble } from "./Wobble/IWobble";
import type { ITilt } from "./Tilt/ITilt";
import type { IRoll } from "./Roll/IRoll";
import type { IZIndex } from "./ZIndex/IZIndex";
import type { ParticlesGroups } from "../../../Types/ParticlesGroups";
import type { IOrbit } from "./Orbit/IOrbit";
import type { IRepulse } from "./Repulse/IRepulse";

/**
 * [[include:Options/Particles.md]]
 * @category Options
 */
export interface IParticles {
    /**
     * @deprecated use the new links instead
     */
    line_linked: ILinks;

    /**
     * @deprecated use the new links instead
     */
    lineLinked: ILinks;

    bounce: IBounce;
    collisions: ICollisions;
    color: IAnimatableColor;
    destroy: IDestroy;
    groups: ParticlesGroups;
    life: ILife;
    links: ILinks;
    move: IMove;
    number: IParticlesNumber;
    opacity: IOpacity;
    orbit: IOrbit;
    reduceDuplicates: boolean;
    repulse: IRepulse;
    roll: IRoll;
    rotate: IRotate;
    shadow: IShadow;
    shape: IShape;
    size: ISize;
    stroke: SingleOrMultiple<IStroke>;
    tilt: ITilt;
    twinkle: ITwinkle;
    wobble: IWobble;
    zIndex: IZIndex;
}
