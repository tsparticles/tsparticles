import type { CanvasContextType } from "../../Types/CanvasContextType.js";
import type { ExportResult } from "../../Types/ExportResult.js";
import type { ICoordinates } from "./ICoordinates.js";
import type { IDelta } from "./IDelta.js";
import type { IOptionsColor } from "../../Options/Interfaces/IOptionsColor.js";
import type { IShapeDrawData } from "./IShapeDrawData.js";
import type { OutModeDirection } from "../../Enums/Directions/OutModeDirection.js";
import type { Particle } from "../Particle.js";

/** Container plugin interface for extending container behavior */
export interface IContainerPlugin {
  /** Handles canvas clearing, returns true if handled */
  canvasClear?: () => boolean;
  /** Handles canvas painting, returns true if handled */
  canvasPaint?: () => boolean;
  /** Checks if a particle position is valid, with retry count */
  checkParticlePosition?: (particle: Particle, position: ICoordinates, tryCount: number) => boolean;
  /** Clears plugin-specific drawings from the canvas */
  clearDraw?: (context: CanvasContextType, delta: IDelta) => void;
  /** Validates a click position */
  clickPositionValid?: (position: ICoordinates) => boolean;
  /** Cleans up plugin resources */
  destroy?: () => void;
  /** Draws plugin content on the canvas */
  draw?: (context: CanvasContextType, delta: IDelta) => void;
  /** Draws a particle managed by the plugin */
  drawParticle?: (context: CanvasContextType, particle: Particle, delta: IDelta) => void;
  /** Cleanup after drawing a particle */
  drawParticleCleanup?: (context: CanvasContextType, particle: Particle, delta: IDelta) => void;
  /** Setup before drawing a particle */
  drawParticleSetup?: (context: CanvasContextType, particle: Particle, delta: IDelta) => void;
  /** Applies canvas transform before drawing a particle */
  drawParticleTransform?: (data: IShapeDrawData) => void;
  /** Cleanup after drawing settings */
  drawSettingsCleanup?: (context: CanvasContextType, delta: IDelta) => void;
  /** Setup before drawing settings */
  drawSettingsSetup?: (context: CanvasContextType, delta: IDelta) => void;
  /** Exports the container content */
  export?: (type: string, data: Record<string, unknown>) => Promise<ExportResult>;
  /** Initializes the plugin */
  init?: () => Promise<void>;
  /** Handles particle bounce with the given direction */
  particleBounce?: (particle: Particle, delta: IDelta, direction: OutModeDirection) => boolean;
  /** Called when a particle is created */
  particleCreated?: (particle: Particle) => void;
  /** Called when a particle is destroyed */
  particleDestroyed?: (particle: Particle, override?: boolean) => void;
  /** Returns the fill color for a particle */
  particleFillColor?: (particle: Particle) => string | IOptionsColor | undefined;
  /** Returns a custom position for a particle */
  particlePosition?: (position?: ICoordinates, particle?: Particle) => ICoordinates | undefined;
  /** Resets a particle state */
  particleReset?: (particle: Particle) => void;
  /** Returns the stroke color for a particle */
  particleStrokeColor?: (particle: Particle) => string | IOptionsColor | undefined;
  /** Updates a particle each frame */
  particleUpdate?: (particle: Particle, delta: IDelta) => void;
  /** Returns the particle density count */
  particlesDensityCount?: () => number;
  /** Handles particle initialization, returns true if handled */
  particlesInitialization?: () => boolean;
  /** Sets up particles for the container */
  particlesSetup?: () => void;
  /** Pauses the plugin */
  pause?: () => void;
  /** Resumes the plugin */
  play?: () => void;
  /** Called after each particle update */
  postParticleUpdate?: (particle: Particle, delta: IDelta) => void;
  /** Called after all updates */
  postUpdate?: (delta: IDelta) => void;
  /** Called before initialization */
  preInit?: () => Promise<void>;
  /** Reinitializes for redraw */
  redrawInit?: () => Promise<void>;
  /** Handles container resize */
  resize?: () => void;
  /** Starts the plugin */
  start?: () => Promise<void>;
  /** Stops the plugin */
  stop?: () => void;
  /** Updates the plugin each frame */
  update?: (delta: IDelta) => void;
  /** Updates actual options, returns true if options changed */
  updateActualOptions?: () => boolean;
}
