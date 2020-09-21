import type { IParticle } from "../Core/Interfaces/IParticle";
import { Container } from "../Core/Container";

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
