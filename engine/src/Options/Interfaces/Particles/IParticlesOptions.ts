/**
 * [[include:Options/Particles.md]]
 */
import type { IAnimatableColor } from "../IAnimatableColor.js";
import type { ICollisions } from "./Collisions/ICollisions.js";
import type { IEffect } from "./Effect/IEffect.js";
import type { IInteractivity } from "../Interactivity/IInteractivity.js";
import type { IMove } from "./Move/IMove.js";
import type { IOpacity } from "./Opacity/IOpacity.js";
import type { IParticlesBounce } from "./Bounce/IParticlesBounce.js";
import type { IParticlesNumber } from "./Number/IParticlesNumber.js";
import type { IShadow } from "./IShadow.js";
import type { IShape } from "./Shape/IShape.js";
import type { ISize } from "./Size/ISize.js";
import type { IStroke } from "./IStroke.js";
import type { IZIndex } from "./ZIndex/IZIndex.js";
import type { ParticlesGroups } from "../../../Types/ParticlesGroups.js";
import type { RecursivePartial } from "../../../Types/RecursivePartial.js";
import type { SingleOrMultiple } from "../../../Types/SingleOrMultiple.js";

/**
 * [[include:Options/Particles.md]]
 */
export interface IParticlesOptions {
    [name: string]: unknown;

    bounce: IParticlesBounce;
    collisions: ICollisions;
    color: IAnimatableColor;
    effect: IEffect;
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
