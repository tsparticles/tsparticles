import type { IDistance } from "./IDistance";

export interface IParticleRetinaProps {
    attractDistance?: number;
    maxDistance: Partial<IDistance>;
    maxSpeed?: number;
    moveDrift?: number;
    moveSpeed?: number;
    sizeAnimationSpeed?: number;
}
