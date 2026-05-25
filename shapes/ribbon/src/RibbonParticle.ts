import type { Particle, Vector } from "@tsparticles/engine";
import type { IRibbonData } from "./IRibbonData.js";

export interface IRibbonPoint {
  force: Vector;
  position: Vector;
  velocity: Vector;
}

export type RibbonParticle = Particle & {
  ribbonBackColor?: string;
  ribbonBounds?: Vector;
  ribbonDrag?: number;
  ribbonHead?: Vector;
  ribbonMass?: number;
  ribbonOffsets?: Vector;
  ribbonOscillationDistance?: number;
  ribbonOscillationSpeed?: number;
  ribbonParticleDist?: number;
  ribbonPoints?: IRibbonPoint[];
  ribbonPreviousHead?: Vector;
  ribbonPreviousPosition?: Vector;
  ribbonTime?: number;
  ribbonVelocityInherit?: number;
  ribbonYSpeed?: number;
  shapeData?: IRibbonData;
};
