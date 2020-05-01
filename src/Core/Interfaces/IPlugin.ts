import type { ICoordinates } from "./ICoordinates";
import type { Particle } from "../Particle";
import { ClickMode } from "../../Enums/Modes/ClickMode";

export interface IPlugin {
    draw?: () => void;
    init?: () => void;
    initAsync?: () => Promise<void>;
    reset?: () => void;
    resize?: () => void;
    particlePosition?: (position?: ICoordinates) => ICoordinates | undefined;
    particlesInitialization?: () => boolean;
    clickPositionValid?: (position: ICoordinates) => boolean;
    handleClickMode?: (mode: ClickMode | string) => void;
    particleBounce?: (particle: Particle) => boolean;
    particleUpdate?: (particle: Particle) => void;
}
