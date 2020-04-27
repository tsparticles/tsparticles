import type { ICoordinates } from "./ICoordinates";
import type { Particle } from "../Classes/Particle";

export interface IPlugin {
    draw?: () => void;
    init?: () => void;
    initAsync?: () => Promise<void>;
    reset?: () => void;
    resize?: () => void;
    particlePosition?: (position?: ICoordinates) => ICoordinates | undefined;
    particlesInitialization?: () => boolean;
    clickPositionValid?: (position: ICoordinates) => boolean;
    particleBounce?: (particle: Particle) => boolean;
}
