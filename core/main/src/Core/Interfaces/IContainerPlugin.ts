import type { ICoordinates } from "./ICoordinates";
import type { Particle } from "../Particle";
import type { ClickMode, OutModeDirection } from "../../Enums";
import type { RecursivePartial } from "../../Types";
import type { IOptions } from "../../Options/Interfaces/IOptions";
import type { IDelta } from "./IDelta";
import type { IColor } from "./Colors";

/**
 * @category Interfaces
 */
export interface IContainerPlugin {
    clickPositionValid?: (position: ICoordinates) => boolean;
    draw?: (context: CanvasRenderingContext2D, delta: IDelta) => void;
    drawParticle?: (context: CanvasRenderingContext2D, particle: Particle, delta: IDelta) => void;
    handleClickMode?: (mode: ClickMode | string) => void;
    init?: (options?: RecursivePartial<IOptions>) => void;
    initAsync?: (options?: RecursivePartial<IOptions>) => Promise<void>;
    play?: () => void;
    pause?: () => void;
    particleBounce?: (particle: Particle, delta: IDelta, direction: OutModeDirection) => boolean;
    particleCreated?: (particle: Particle) => void;
    particleDestroyed?: (particle: Particle, override?: boolean) => void;
    particleFillColor?: (particle: Particle) => string | IColor | undefined;
    particleStrokeColor?: (particle: Particle) => string | IColor | undefined;
    particlePosition?: (position?: ICoordinates, particle?: Particle) => ICoordinates | undefined;
    particleUpdate?: (particle: Particle, delta: IDelta) => void;
    particlesInitialization?: () => boolean;
    particlesSetup?: () => void;
    reset?: () => void;
    resize?: () => void;
    start?: () => void;
    startAsync?: () => Promise<void>;
    stop?: () => void;
    update?: (delta: IDelta) => void;
}
