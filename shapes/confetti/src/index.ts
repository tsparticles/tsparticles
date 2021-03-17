import type { Main, IParticle, SingleOrMultiple } from "tsparticles-engine";
import { itemFromArray } from "tsparticles-engine";
import type { IShapeValues } from "tsparticles-engine/Options/Interfaces/Particles/Shape/IShapeValues";

type ConfettiType = "circle" | "square";

interface IConfettiData extends IShapeValues {
    type?: SingleOrMultiple<ConfettiType>;
}

interface IConfettiParticle extends IParticle {
    shapeData?: IConfettiData;
    wobble?: number;
    tiltAngle?: number;
    tiltSin?: number;
    tiltCos?: number;
    random?: number;
    wobbleX?: number;
    wobbleY?: number;
    ovalScalar?: number;
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
                shapeData.type = itemFromArray(shapeData.type);
            }

            if (particle.wobble === undefined) {
                particle.wobble = Math.random() * 10;
            }

            if (particle.tiltAngle === undefined) {
                particle.tiltAngle = Math.random() * Math.PI;
            }

            const scalar = radius * 2;

            particle.ovalScalar = 0.6;
            particle.wobble += 0.1;
            particle.tiltAngle += 0.1;
            particle.tiltSin = Math.sin(particle.tiltAngle);
            particle.tiltCos = Math.cos(particle.tiltAngle);
            particle.random = Math.random() + 5;
            particle.wobbleX = scalar * Math.cos(particle.wobble);
            particle.wobbleY = scalar * Math.sin(particle.wobble);

            const x1 = particle.random * particle.tiltCos,
                y1 = particle.random * particle.tiltSin,
                x2 = particle.wobbleX + particle.random * particle.tiltCos,
                y2 = particle.wobbleY + particle.random * particle.tiltSin;

            if (shapeData.type === "circle") {
                context.ellipse(
                    0,
                    0,
                    Math.abs(x2 - x1) * particle.ovalScalar,
                    Math.abs(y2 - y1) * particle.ovalScalar,
                    (Math.PI / 10) * particle.wobble,
                    0,
                    2 * Math.PI
                );
            } else {
                context.moveTo(0, 0);
                context.lineTo(particle.wobbleX, y1);
                context.lineTo(x2, y2);
                context.lineTo(x1, particle.wobbleY);
            }
        }
    );
}
