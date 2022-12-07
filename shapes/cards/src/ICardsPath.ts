import type { ICoordinates } from "tsparticles-engine";

export interface ICardsPath {
    readonly club: ICoordinates[][];
    readonly diamond: ICoordinates[][];
    readonly heart: ICoordinates[][];
    readonly spade: ICoordinates[][];
}
