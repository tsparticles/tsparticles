import { type Container, type IShapeDrawData, type IShapeDrawer, degToRad, isObject } from "@tsparticles/engine";
import type { CircleParticle } from "./CircleParticle.js";
import type { ICircleShapeData } from "./ICircleShapeData.js";

const sides = 12,
    maxAngle = 360,
    minAngle = 0;

/**
 */
export class CircleDrawer implements IShapeDrawer<CircleParticle> {
    async draw(data: IShapeDrawData<CircleParticle>): Promise<void> {
        const { drawCircle } = await import("./Utils.js");

        drawCircle(data);
    }

    getSidesCount(): number {
        return sides;
    }

    async particleInit(container: Container, particle: CircleParticle): Promise<void> {
        const shapeData = particle.shapeData as ICircleShapeData | undefined,
            angle = shapeData?.angle ?? {
                max: maxAngle,
                min: minAngle,
            };

        particle.circleRange = !isObject(angle)
            ? {
                  min: minAngle,
                  max: degToRad(angle),
              }
            : { min: degToRad(angle.min), max: degToRad(angle.max) };

        await Promise.resolve();
    }
}
