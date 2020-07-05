import type { ICoordinates } from "./ICoordinates";
import type { Particle } from "../Particle";
import type { ClickMode } from "../../Enums";
import type { RecursivePartial } from "../../Types/RecursivePartial";
import type { IOptions } from "../../Options/Interfaces/IOptions";
import { IDelta } from "./IDelta";

export interface IContainerPlugin {
    draw?: (context: CanvasRenderingContext2D, delta: IDelta) => void;
    init?: (options?: RecursivePartial<IOptions>) => void;
    initAsync?: (options?: RecursivePartial<IOptions>) => Promise<void>;
    reset?: () => void;
    resize?: () => void;
    start?: () => void;
    startAsync?: () => Promise<void>;
    stop?: () => void;
    play?: () => void;
    pause?: () => void;
    particlePosition?: (position?: ICoordinates, particle?: Particle) => ICoordinates | undefined;
    particlesInitialization?: () => boolean;
    clickPositionValid?: (position: ICoordinates) => boolean;
    handleClickMode?: (mode: ClickMode | string) => void;
    particleBounce?: (particle: Particle, delta: IDelta) => boolean;
    particleUpdate?: (particle: Particle, delta: IDelta) => void;
}
