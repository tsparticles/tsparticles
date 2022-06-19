/**
 * [[include:Options/Particles.md]]
 * @category Options
 */
import type { IAnimatableColor } from "../IAnimatableColor";
import type { IAnimatableGradient } from "../IAnimatableGradient";
import type { ICollisions } from "./Collisions/ICollisions";
import type { IDestroy } from "./Destroy/IDestroy";
import type { IInteractivity } from "../Interactivity/IInteractivity";
import type { ILinks } from "./Links/ILinks";
import type { IMove } from "./Move/IMove";
import type { IOpacity } from "./Opacity/IOpacity";
import type { IParticlesBounce } from "./Bounce/IParticlesBounce";
import type { IParticlesNumber } from "./Number/IParticlesNumber";
import type { IParticlesRepulse } from "./Repulse/IParticlesRepulse";
import type { IRotate } from "./Rotate/IRotate";
import type { IShadow } from "./IShadow";
import type { IShape } from "./Shape/IShape";
import type { ISize } from "./Size/ISize";
import type { IStroke } from "./IStroke";
import type { IZIndex } from "./ZIndex/IZIndex";
import type { ParticlesGroups } from "../../../Types/ParticlesGroups";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import type { SingleOrMultiple } from "../../../Types/SingleOrMultiple";

/**
 * [[include:Options/Particles.md]]
 * @category Options
 */
export interface IParticlesOptions {
    /**
     * @deprecated use the new links instead
     */
    line_linked: ILinks;

    /**
     * @deprecated use the new links instead
     */
    lineLinked: ILinks;

    bounce: IParticlesBounce;
    collisions: ICollisions;
    color: IAnimatableColor;
    destroy: IDestroy;
    gradient: SingleOrMultiple<IAnimatableGradient>;
    groups: ParticlesGroups;
    interactivity?: RecursivePartial<IInteractivity>;
    links: ILinks;
    move: IMove;
    number: IParticlesNumber;
    opacity: IOpacity;
    reduceDuplicates: boolean;
    repulse: IParticlesRepulse;
    rotate: IRotate;
    shadow: IShadow;
    shape: IShape;
    size: ISize;
    stroke: SingleOrMultiple<IStroke>;
    zIndex: IZIndex;

    [name: string]: unknown;
}
