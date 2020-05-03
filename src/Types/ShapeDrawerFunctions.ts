import type { IParticle } from "../Core/Interfaces/IParticle";
import { Container } from "../Core/Container";

export type ShapeDrawerDrawFunction =
    (context: CanvasRenderingContext2D, particle: IParticle, radius: number, opacity: number, delta: number) => void;

export type ShapeDrawerInitFunction = (container: Container) => Promise<void>;

export type ShapeDrawerAfterEffectFunction =
    (context: CanvasRenderingContext2D, particle: IParticle, radius: number, opacity: number, delta: number) => void;

export type ShapeDrawerDestroyFunction = (container: Container) => void;