/**
 * [[include:Options/Particles.md]]
 * @category Options
 */
import type { IAnimatableColor } from "../IAnimatableColor";
import type { ICollisions } from "./Collisions/ICollisions";
import type { IInteractivity } from "../Interactivity/IInteractivity";
import type { IMove } from "./Move/IMove";
import type { IOpacity } from "./Opacity/IOpacity";
import type { IParticlesBounce } from "./Bounce/IParticlesBounce";
import type { IParticlesNumber } from "./Number/IParticlesNumber";
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
    [name: string]: unknown;

    bounce: IParticlesBounce;
    collisions: ICollisions;
    color: IAnimatableColor;
    groups: ParticlesGroups;
    interactivity?: RecursivePartial<IInteractivity>;
    move: IMove;
    number: IParticlesNumber;
    opacity: IOpacity;
    reduceDuplicates: boolean;
    shadow: IShadow;
    shape: IShape;
    size: ISize;
    stroke: SingleOrMultiple<IStroke>;
    zIndex: IZIndex;
}
