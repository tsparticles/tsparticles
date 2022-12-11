import type { ClickMode } from "../../Enums/Modes/ClickMode";
import type { ICoordinates } from "./ICoordinates";
import type { IDelta } from "./IDelta";
import type { IOptionsColor } from "../../Options/Interfaces/IOptionsColor";
import type { OutModeDirection } from "../../Enums/Directions/OutModeDirection";
import type { Particle } from "../Particle";

/**
 * @category Interfaces
 */
export interface IContainerPlugin {
    clickPositionValid?: (position: ICoordinates) => boolean;
    draw?: (context: CanvasRenderingContext2D, delta: IDelta) => void;
    drawParticle?: (context: CanvasRenderingContext2D, particle: Particle, delta: IDelta) => void;
    handleClickMode?: (mode: ClickMode | string) => void;
    init?: () => Promise<void>;
    particleBounce?: (particle: Particle, delta: IDelta, direction: OutModeDirection) => boolean;
    particleCreated?: (particle: Particle) => void;
    particleDestroyed?: (particle: Particle, override?: boolean) => void;
    particleFillColor?: (particle: Particle) => string | IOptionsColor | undefined;
    particlePosition?: (position?: ICoordinates, particle?: Particle) => ICoordinates | undefined;
    particleStrokeColor?: (particle: Particle) => string | IOptionsColor | undefined;
    particleUpdate?: (particle: Particle, delta: IDelta) => void;
    particlesInitialization?: () => boolean;
    particlesSetup?: () => void;
    pause?: () => void;
    play?: () => void;
    reset?: () => void;
    resize?: () => void;
    start?: () => Promise<void>;
    stop?: () => void;
    update?: (delta: IDelta) => void;
}
