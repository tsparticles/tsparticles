import type { IParticle } from "./IParticle";

export interface IUpdatableParticle extends IParticle {
    increaseOpacity(value: number): void;
    decreaseOpacity(value: number): void;

    increaseSize(value: number): void;
    decreaseSize(value: number): void;
}
