import type { IParticle } from "../Core/Interfaces/IParticle";
import type { Container } from "../Core/Container";
import type { Particle } from "../Core/Particle";

/**
 * @category Types
 */
export type ShapeDrawerDrawFunction = (
    context: CanvasRenderingContext2D,
    particle: IParticle,
    radius: number,
    opacity: number,
    delta: number,
    pixelRatio: number
) => void;

/**
 * @category Types
 */
export type ShapeDrawerInitFunction = (container: Container) => Promise<void>;

/**
 * @category Types
 */
export type ShapeDrawerAfterEffectFunction = (
    context: CanvasRenderingContext2D,
    particle: IParticle,
    radius: number,
    opacity: number,
    delta: number,
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
