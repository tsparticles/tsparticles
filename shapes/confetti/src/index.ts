import type { IDelta, Main, IParticle, SingleOrMultiple } from "tsparticles-engine";
import { itemFromArray, Vector } from "tsparticles-engine";
import type { IShapeValues } from "tsparticles-engine/Options/Interfaces/Particles/Shape/IShapeValues";

type ConfettiType = "circle" | "square";

const ovalScalar = 0.6;

interface IConfettiData extends IShapeValues {
    type: SingleOrMultiple<ConfettiType>;
}

interface IConfettiParticle extends IParticle {
    confettiType?: string;
    wobble?: Vector;
    wobbleInc?: number;
    wobbleSpeed?: number;
    tilt?: Vector;
    tiltSpeed?: number;
}

const types: ConfettiType[] = ["square", "circle"];

export function loadConfettiShape(tsParticles: Main): void {
    tsParticles.addShape(
        "confetti",
        function (
            context: CanvasRenderingContext2D,
            particle: IConfettiParticle,
            radius: number,
            opacity: number,
            delta: IDelta,
            pixelRatio: number
        ): void {
            if (!particle.confettiType) {
                const shapeData = (particle.shapeData ?? {}) as IConfettiData;

                if (shapeData.type === undefined) {
                    shapeData.type = itemFromArray(types);
                } else if (shapeData.type instanceof Array) {
                    shapeData.type = itemFromArray(shapeData.type);
                }

                particle.confettiType = shapeData.type;
            }

            if (particle.wobble === undefined) {
                particle.wobble = Vector.create(0, 0);
                particle.wobble.length = radius * 2;
                particle.wobble.angle = Math.random() * 10;
            }

            if (particle.wobbleInc === undefined) {
                particle.wobbleInc = particle.wobble.angle;
            }

            if (particle.wobbleSpeed === undefined) {
                particle.wobbleSpeed = Math.min(0.11, Math.random() * 0.1 + 0.05) * pixelRatio;
            }

            if (particle.tilt === undefined) {
                particle.tilt = Vector.create(0, 0);
                particle.tilt.length = 1;
                particle.tilt.angle = (Math.random() * (0.75 - 0.25) + 0.25) * Math.PI;
            }

            if (particle.tiltSpeed === undefined) {
                particle.tiltSpeed = Math.min(0.11, Math.random() * 0.1 + 0.05) * pixelRatio;
            }

            particle.wobble.angle += particle.wobbleSpeed * delta.factor;
            particle.wobbleInc += particle.wobbleSpeed * delta.factor;
            particle.tilt.angle += particle.tiltSpeed * delta.factor;

            const random = Math.random() + 2;

            const x1 = random * particle.tilt.x,
                y1 = random * particle.tilt.y,
                x2 = particle.wobble.x + random * particle.tilt.x,
                y2 = particle.wobble.y + random * particle.tilt.y;

            if (particle.confettiType === "circle") {
                context.ellipse(
                    0,
                    0,
                    Math.abs(x2 - x1) * ovalScalar,
                    Math.abs(y2 - y1) * ovalScalar,
                    (Math.PI / 10) * particle.wobbleInc,
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
