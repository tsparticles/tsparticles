import type { ICoordinates } from "./ICoordinates";
import type { Particle } from "../Particle";
import type { ClickMode } from "../../Enums/Modes/ClickMode";

export interface IContainerPlugin {
    draw?: (context: CanvasRenderingContext2D, delta: number) => void;
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
    particleBounce?: (particle: Particle, delta: number) => boolean;
    particleUpdate?: (particle: Particle, delta: number) => void;
}
