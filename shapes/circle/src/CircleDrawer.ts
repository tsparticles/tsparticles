import { type Container, type IShapeDrawData, type IShapeDrawer, degToRad, isObject } from "@tsparticles/engine";
import type { CircleParticle } from "./CircleParticle.js";
import type { ICircleShapeData } from "./ICircleShapeData.js";
import { drawCircle } from "./Utils.js";

const sides = 12,
  maxAngle = 360,
  minAngle = 0;

/**
 */
export class CircleDrawer implements IShapeDrawer<CircleParticle> {
  draw(data: IShapeDrawData<CircleParticle>): void {
    drawCircle(data);
  }

  getSidesCount(): number {
    return sides;
  }

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
