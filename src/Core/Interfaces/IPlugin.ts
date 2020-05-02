import type { ICoordinates } from "./ICoordinates";
import type { Particle } from "../Particle";
import { ClickMode } from "../../Enums/Modes/ClickMode";

export interface IPlugin {
    draw?: (context: CanvasRenderingContext2D) => void;
    init?: () => void;
    reset?: () => void;
    resize?: () => void;
    start?: () => void;
    startAsync?: () => Promise<void>;
    stop?: () => void;
    play?: () => void;
    pause?: () => void;
    particlePosition?: (position?: ICoordinates) => ICoordinates | undefined;
    particlesInitialization?: () => boolean;
    clickPositionValid?: (position: ICoordinates) => boolean;
    handleClickMode?: (mode: ClickMode | string) => void;
    particleBounce?: (particle: Particle) => boolean;
    particleUpdate?: (particle: Particle) => void;
}
