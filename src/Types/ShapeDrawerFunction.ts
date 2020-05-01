import type { IParticle } from "../Core/Interfaces/IParticle";

export type ShapeDrawerFunction =
    (context: CanvasRenderingContext2D, particle: IParticle, radius: number, opacity: number) => void;
