import type { ICoordinates } from "tsparticles-engine";

export interface IPathSegment {
    values: ICoordinates[];
}

export interface IPath {
    segments: IPathSegment[];
}

export interface ICardsPath {
    readonly club: IPath;
    readonly diamond: IPath;
    readonly heart: IPath;
    readonly spade: IPath;
}
