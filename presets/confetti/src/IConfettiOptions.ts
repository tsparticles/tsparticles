import type { ICoordinates } from "tsparticles-engine/Core/Interfaces/ICoordinates";
import { SingleOrMultiple } from "tsparticles-engine";

export interface IConfettiOptions {
    /**
     * @deprecated use count instead
     */
    particleCount: number;

    /**
     * @deprecated use position instead
     */
    origin: ICoordinates;

    angle: number;
    count: number;
    position: ICoordinates;
    spread: number;
    startVelocity: number;
    decay: number;
    gravity: number;
    drift: number;
    ticks: number;
    colors: SingleOrMultiple<string>;
    shapes: SingleOrMultiple<string>;
    scalar: number;
    zIndex: number;
    disableForReducedMotion: boolean;
}
