import type { ICoordinates } from "./ICoordinates";
import type { Particle } from "../Particle";
import type { ClickMode } from "../../Enums";
import type { RecursivePartial } from "../../Types";
import type { IOptions } from "../../Options/Interfaces/IOptions";
import type { IDelta } from "./IDelta";
import { OutModeDirection } from "../../Enums/Directions/OutModeDirection";

/**
 * @category Interfaces
 */
export interface IContainerPlugin {
    clickPositionValid?: (position: ICoordinates) => boolean;
    draw?: (context: CanvasRenderingContext2D, delta: IDelta) => void;
    handleClickMode?: (mode: ClickMode | string) => void;
    init?: (options?: RecursivePartial<IOptions>) => void;
    initAsync?: (options?: RecursivePartial<IOptions>) => Promise<void>;
    play?: () => void;
    pause?: () => void;
    particleBounce?: (particle: Particle, delta: IDelta, direction: OutModeDirection) => boolean;
    particlePosition?: (position?: ICoordinates, particle?: Particle) => ICoordinates | undefined;
    particleUpdate?: (particle: Particle, delta: IDelta) => void;
    particlesInitialization?: () => boolean;
    reset?: () => void;
    resize?: () => void;
    start?: () => void;
    startAsync?: () => Promise<void>;
    stop?: () => void;
    update?: (delta: IDelta) => void;
}
