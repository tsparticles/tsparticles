import type { ExportResult } from "../../Types/ExportResult.js";
import type { ICoordinates } from "./ICoordinates.js";
import type { IDelta } from "./IDelta.js";
import type { IOptionsColor } from "../../Options/Interfaces/IOptionsColor.js";
import type { OutModeDirection } from "../../Enums/Directions/OutModeDirection.js";
import type { Particle } from "../Particle.js";

/**
 */
export interface IContainerPlugin {
    clearDraw?: (context: CanvasRenderingContext2D, delta: IDelta) => void;
    clickPositionValid?: (position: ICoordinates) => boolean;
    draw?: (context: CanvasRenderingContext2D, delta: IDelta) => void;
    drawParticle?: (context: CanvasRenderingContext2D, particle: Particle, delta: IDelta) => void;
    export?: (type: string, data: Record<string, unknown>) => Promise<ExportResult>;
    handleClickMode?: (mode: string) => void;
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
