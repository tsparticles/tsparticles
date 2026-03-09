import type { ExportResult } from "../../Types/ExportResult.js";
import type { ICoordinates } from "./ICoordinates.js";
import type { IDelta } from "./IDelta.js";
import type { IOptionsColor } from "../../Options/Interfaces/IOptionsColor.js";
import type { IShapeDrawData } from "./IShapeDrawData.js";
import type { OutModeDirection } from "../../Enums/Directions/OutModeDirection.js";
import type { Particle } from "../Particle.js";

/**
 */
export interface IContainerPlugin {
  canvasClear?: () => boolean;
  canvasPaint?: () => boolean;
  checkParticlePosition?: (particle: Particle, position: ICoordinates, tryCount: number) => boolean;
  clearDraw?: (context: CanvasRenderingContext2D, delta: IDelta) => void;
  clickPositionValid?: (position: ICoordinates) => boolean;
  destroy?: () => void;
  draw?: (context: CanvasRenderingContext2D, delta: IDelta) => void;
  drawParticle?: (context: CanvasRenderingContext2D, particle: Particle, delta: IDelta) => void;
  drawParticleCleanup?: (context: CanvasRenderingContext2D, particle: Particle, delta: IDelta) => void;
  drawParticleSetup?: (context: CanvasRenderingContext2D, particle: Particle, delta: IDelta) => void;
  drawParticleTransform?: (data: IShapeDrawData) => void;
  drawSettingsCleanup?: (context: CanvasRenderingContext2D, delta: IDelta) => void;
  drawSettingsSetup?: (context: CanvasRenderingContext2D, delta: IDelta) => void;
  export?: (type: string, data: Record<string, unknown>) => Promise<ExportResult>;
  init?: () => Promise<void>;
  particleBounce?: (particle: Particle, delta: IDelta, direction: OutModeDirection) => boolean;
  particleCreated?: (particle: Particle) => void;
  particleDestroyed?: (particle: Particle, override?: boolean) => void;
  particleFillColor?: (particle: Particle) => string | IOptionsColor | undefined;
  particlePosition?: (position?: ICoordinates, particle?: Particle) => ICoordinates | undefined;
  particleReset?: (particle: Particle) => void;
  particleStrokeColor?: (particle: Particle) => string | IOptionsColor | undefined;
  particleUpdate?: (particle: Particle, delta: IDelta) => void;
  particlesDensityCount?: () => number;
  particlesInitialization?: () => boolean;
  particlesSetup?: () => void;
  pause?: () => void;
  play?: () => void;
  postParticleUpdate?: (particle: Particle, delta: IDelta) => void;
  postUpdate?: (delta: IDelta) => void;
  preInit?: () => Promise<void>;
  redrawInit?: () => Promise<void>;
  resize?: () => void;
  start?: () => Promise<void>;
  stop?: () => void;
  update?: (delta: IDelta) => void;
  updateActualOptions?: () => boolean;
}
