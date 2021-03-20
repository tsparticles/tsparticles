import type { Main, IParticle, SingleOrMultiple } from "tsparticles";
import type { IShapeValues } from "tsparticles/dist/Options/Interfaces/Particles/Shape/IShapeValues";
import { Utils, Vector } from "tsparticles";

type ConfettiType = "circle" | "square";

const ovalScalar = 0.6;

interface IConfettiData extends IShapeValues {
    type: SingleOrMultiple<ConfettiType>;
}

interface IConfettiParticle extends IParticle {
    wobble?: Vector;
    tilt?: Vector;
}

export function loadConfettiShape(tsParticles: Main): void {
    tsParticles.addShape(
        "confetti",
        function (
            context: CanvasRenderingContext2D,
            particle: IConfettiParticle,
            radius: number,
            opacity: number,
            delta: number,
            pixelRatio: number
        ): void {
            const shapeData = (particle.shapeData ?? {}) as IConfettiData;

            if (shapeData.type === undefined) {
                shapeData.type = "square";
            } else if (shapeData.type instanceof Array) {
                shapeData.type = Utils.itemFromArray(shapeData.type);
            }

            if (particle.wobble === undefined) {
                particle.wobble = Vector.create(0, 0);
                particle.wobble.length = radius * 2;
                particle.wobble.angle = Math.random() * 10;
            }

            if (particle.tilt === undefined) {
                particle.tilt = Vector.create(0, 0);
                particle.tilt.length = 1;
                particle.tilt.angle = Math.random() * Math.PI;
            }

            particle.wobble.angle += 0.1;
            particle.tilt.angle += 0.1;

            const random = Math.random() + 5;

            const x1 = random * particle.tilt.x,
                y1 = random * particle.tilt.y,
                x2 = particle.wobble.x + random * particle.tilt.x,
                y2 = particle.wobble.y + random * particle.tilt.y;

            if (shapeData.type === "circle") {
                context.ellipse(
                    0,
                    0,
                    Math.abs(x2 - x1) * ovalScalar,
                    Math.abs(y2 - y1) * ovalScalar,
                    (Math.PI / 10) * particle.wobble.angle,
                    0,
                    2 * Math.PI
                );
            } else {
                context.moveTo(0, 0);
                context.lineTo(particle.wobble.x, y1);
                context.lineTo(x2, y2);
                context.lineTo(x1, particle.wobble.y);
            }
        }
    );
}
