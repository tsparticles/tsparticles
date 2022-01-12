import type { IAnimatableColor } from "../IAnimatableColor";
import type { IAnimatableGradient } from "../IAnimatableGradient";
import type { IBounce } from "./Bounce/IBounce";
import type { ICollisions } from "./Collisions/ICollisions";
import type { IDestroy } from "./Destroy/IDestroy";
import type { ILife } from "./Life/ILife";
import type { ILinks } from "./Links/ILinks";
import type { IMove } from "./Move/IMove";
import type { IOpacity } from "./Opacity/IOpacity";
import type { IOrbit } from "./Orbit/IOrbit";
import type { IParticlesNumber } from "./Number/IParticlesNumber";
import type { IRepulse } from "./Repulse/IRepulse";
import type { IRoll } from "./Roll/IRoll";
import type { IRotate } from "./Rotate/IRotate";
import type { IShadow } from "./IShadow";
import type { IShape } from "./Shape/IShape";
import type { ISize } from "./Size/ISize";
import type { IStroke } from "./IStroke";
import type { ITilt } from "./Tilt/ITilt";
import type { ITwinkle } from "./Twinkle/ITwinkle";
import type { IWobble } from "./Wobble/IWobble";
import type { IZIndex } from "./ZIndex/IZIndex";
import type { ParticlesGroups } from "../../../Types/ParticlesGroups";
import type { SingleOrMultiple } from "../../../Types";

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
    gradient: SingleOrMultiple<IAnimatableGradient>;
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
