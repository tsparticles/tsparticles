import type { Container } from "../Core/Container";
import type { IDelta } from "../Core/Interfaces/IDelta";
import type { IParticle } from "../Core/Interfaces/IParticle";
import { Particle } from "../Core/Particle";

/**
 * @category Types
 */
export type ShapeDrawerDrawFunction = (
    context: CanvasRenderingContext2D,
    particle: IParticle,
    radius: number,
    opacity: number,
    delta: IDelta,
    pixelRatio: number
) => void;

/**
 * @category Types
 */
export type ShapeDrawerInitFunction = (container: Container) => Promise<void>;

/**
 * @category Types
 */
export type ShapeDrawerParticleInitFunction = (container: Container, particle: IParticle) => void;

/**
 * @category Types
 */
export type ShapeDrawerAfterEffectFunction = (
    context: CanvasRenderingContext2D,
    particle: IParticle,
    radius: number,
    opacity: number,
    delta: IDelta,
    pixelRatio: number
) => void;

/**
 * @category Types
 */
export type ShapeDrawerDestroyFunction = (container: Container) => void;

/**
 * @category Types
 */
export type ShapeDrawerSidesCountFunction = (particle: IParticle) => number;

/**
 * @category Types
 */
export type ShapeDrawerLoadFunction = (particle: Particle) => void;
