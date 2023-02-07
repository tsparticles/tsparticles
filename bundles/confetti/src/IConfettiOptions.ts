import type { ICoordinates, SingleOrMultiple } from "tsparticles-engine";

export interface IConfettiOptions {
    angle: number;
    colors: SingleOrMultiple<string>;
    count: number;
    decay: number;
    disableForReducedMotion: boolean;
    drift: number;
    gravity: number;

    /**
     * @deprecated use position instead
     */
    origin: ICoordinates;

    /**
     * @deprecated use count instead
     */
    particleCount: number;

    position: ICoordinates;
    scalar: number;
    shapes: SingleOrMultiple<string>;
    spread: number;
    startVelocity: number;
    ticks: number;
    zIndex: number;
}
