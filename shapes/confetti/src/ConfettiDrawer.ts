import type { IShapeDrawer } from "tsparticles/dist/Core/Interfaces/IShapeDrawer";
import type { IParticle, SingleOrMultiple } from "tsparticles";
import { Container, Utils, Vector } from "tsparticles";
import type { IShapeValues } from "tsparticles/dist/Options/Interfaces/Particles/Shape/IShapeValues";
import type { IDelta } from "tsparticles/dist/Core/Interfaces/IDelta";

const enum ConfettiType {
    circle = "circle",
    square = "square",
}

const ovalScalar = 0.6;

interface IConfettiData extends IShapeValues {
    type: SingleOrMultiple<ConfettiType>;
}

interface IConfettiParticle extends IParticle {
    confettiType: string;
    wobble: Vector;
    wobbleInc: number;
    wobbleSpeed: number;
    tilt: Vector;
    tiltSpeed: number;
}

const types: ConfettiType[] = [ConfettiType.square, ConfettiType.circle];

export class ConfettiDrawer implements IShapeDrawer {
    getSidesCount(particle: IParticle): number {
        const confetti = particle as IConfettiParticle;

        return confetti.confettiType === ConfettiType.square ? 4 : 12;
    }

    particleInit(container: Container, particle: IParticle): void {
        const confetti = particle as IConfettiParticle;
        const shapeData = (confetti.shapeData ?? {}) as IConfettiData;

        if (shapeData.type === undefined) {
            shapeData.type = Utils.itemFromArray(types);
        } else if (shapeData.type instanceof Array) {
            shapeData.type = Utils.itemFromArray(shapeData.type);
        }

        confetti.confettiType = shapeData.type;
        confetti.wobble = Vector.create(0, 0);
        confetti.wobble.length = particle.size.value * 2;
        confetti.wobble.angle = Math.random() * 10;
        confetti.wobbleInc = confetti.wobble.angle;
        confetti.wobbleSpeed = Math.min(0.11, Math.random() * 0.1 + 0.05) * container.retina.pixelRatio;
        confetti.tilt = Vector.create(0, 0);
        confetti.tilt.length = 1;
        confetti.tilt.angle = (Math.random() * (0.75 - 0.25) + 0.25) * Math.PI;
        confetti.tiltSpeed = Math.min(0.11, Math.random() * 0.1 + 0.05) * container.retina.pixelRatio;
    }

    draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number, opacity: number, delta: IDelta): void {
        const confetti = particle as IConfettiParticle;

        confetti.wobble.angle += confetti.wobbleSpeed * delta.factor;
        confetti.wobbleInc += confetti.wobbleSpeed * delta.factor;
        confetti.tilt.angle += confetti.tiltSpeed * delta.factor;

        const random = Math.random() + 2;

        const x1 = random * confetti.tilt.x,
            y1 = random * confetti.tilt.y,
            x2 = confetti.wobble.x + random * confetti.tilt.x,
            y2 = confetti.wobble.y + random * confetti.tilt.y;

        if (confetti.confettiType === ConfettiType.circle) {
            context.ellipse(
                0,
                0,
                Math.abs(x2 - x1) * ovalScalar,
                Math.abs(y2 - y1) * ovalScalar,
                (Math.PI / 10) * confetti.wobbleInc,
                0,
                2 * Math.PI
            );
        } else {
            context.moveTo(0, 0);
            context.lineTo(confetti.wobble.x, y1);
            context.lineTo(x2, y2);
            context.lineTo(x1, confetti.wobble.y);
        }
    }
}
