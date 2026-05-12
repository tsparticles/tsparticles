import { type Container, type IShapeDrawData, type IShapeDrawer, degToRad, isObject } from "@tsparticles/engine";
import type { CircleParticle } from "./CircleParticle.js";
import type { ICircleShapeData } from "./ICircleShapeData.js";
import { drawCircle } from "./Utils.js";

const sides = 12,
  maxAngle = 360,
  minAngle = 0;

/** Circle shape drawer plugin */
export class CircleDrawer implements IShapeDrawer<CircleParticle> {
  /**
   * Draws the circle shape
   * @param data
   */
  draw(data: IShapeDrawData<CircleParticle>): void {
    drawCircle(data);
  }

  /** Gets the number of sides for this shape */
  getSidesCount(): number {
    return sides;
  }

  /**
   * Initializes circle-specific particle properties
   * @param _container
   * @param particle
   */
  particleInit(_container: Container, particle: CircleParticle): void {
    const shapeData = particle.shapeData as ICircleShapeData | undefined,
      angle = shapeData?.angle ?? {
        max: maxAngle,
        min: minAngle,
      };

    particle.circleRange = isObject(angle)
      ? { min: degToRad(angle.min), max: degToRad(angle.max) }
      : {
          min: minAngle,
          max: degToRad(angle),
        };
  }
}
