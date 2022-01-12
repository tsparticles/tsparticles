import type { IShape } from "./Shape";
import type { ILinks } from "./Links";
import type { IMove } from "./Move";
import type { IParticlesNumber } from "./Number";
import type { IOpacity } from "./Opacity";
import type { ISize } from "./Size";
import type { IRotate } from "./Rotate";
import type { IShadow } from "./IShadow";
import type { SingleOrMultiple } from "../../../Types";
import type { IStroke } from "./IStroke";
import type { ICollisions } from "./Collisions";
import type { ITwinkle } from "./Twinkle";
import type { IAnimatableColor } from "../IAnimatableColor";
import type { ILife } from "./Life";
import type { IParticlesBounce } from "./Bounce";
import type { IDestroy } from "./Destroy";
import type { IWobble } from "./Wobble";
import type { ITilt } from "./Tilt";
import type { IRoll } from "./Roll";
import type { IZIndex } from "./ZIndex";
import type { ParticlesGroups } from "../../../Types/ParticlesGroups";
import type { IOrbit } from "./Orbit";
import type { IRepulse } from "./Repulse";
import type { IAnimatableGradient } from "../IAnimatableGradient";

/**
 * [[include:Options/Particles.md]]
 * @category Options
 */
export interface IParticlesOptions {
    bounce: IParticlesBounce;
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
