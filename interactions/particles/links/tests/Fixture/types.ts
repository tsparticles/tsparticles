import type { ICoordinates } from "tsparticles-engine";

export type SingleLinkTest = {
    coordinates: ICoordinates;
    fail: boolean;
    midPoints: ICoordinates[];
};

export type LinkTest = {
    begin: ICoordinates;
    tests: SingleLinkTest[];
    warp: boolean;
};
