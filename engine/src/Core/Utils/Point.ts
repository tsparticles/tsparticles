import type { ICoordinates } from "../Interfaces";

/**
 * @category Utils
 */
export class Point {
    constructor(readonly position: ICoordinates, readonly particleId: number, readonly radius: number) {}
}
