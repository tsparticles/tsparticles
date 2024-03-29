import {
    type Container,
    type ICoordinates,
    type IEffectDrawer,
    type IShapeDrawData,
    type IShapeValues,
    type Particle,
    type RangeValue,
    getRangeValue,
} from "@tsparticles/engine";

const double = 2,
    minTrailLength = 2,
    trailLengthOffset = 1,
    noItems = 0,
    half = 0.5,
    minWidth = -1,
    defaultLength = 10,
    defaultAlpha = 1;

interface TrailStep {
    color: string | CanvasGradient | CanvasPattern;
    position: ICoordinates;
}

type TrailParticle = Particle & {
    trail?: TrailStep[];
    trailFade?: boolean;
    trailLength?: number;
    trailMaxWidth?: number;
    trailMinWidth?: number;
};

interface ITrailData extends IShapeValues {
    fade: boolean;
    length: RangeValue;
    maxWidth: RangeValue;
    minWidth: RangeValue;
}

export class TrailDrawer implements IEffectDrawer<TrailParticle> {
    draw(data: IShapeDrawData<TrailParticle>): void {
        const { context, radius, particle } = data,
            diameter = radius * double,
            pxRatio = particle.container.retina.pixelRatio,
            currentPos = particle.getPosition(),
            trail = particle.trail;

        if (!trail || !particle.trailLength) {
            return;
        }

        const pathLength = particle.trailLength + radius;

        trail.push({
            color: context.fillStyle ?? context.strokeStyle,
            position: {
                x: currentPos.x,
                y: currentPos.y,
            },
        });

        if (trail.length < minTrailLength) {
            return;
        }

        while (trail.length > pathLength) {
            trail.shift();
        }

        const trailLength = Math.min(trail.length, pathLength),
            offsetPos = {
                x: currentPos.x,
                y: currentPos.y,
            },
            canvasSize = {
                width: particle.container.canvas.size.width + diameter,
                height: particle.container.canvas.size.height + diameter,
            };

        let lastPos = trail[trailLength - trailLengthOffset].position;

        const defaultTransform = {
            a: 1,
            b: 0,
            c: 0,
            d: 1,
        };

        context.setTransform(
            defaultTransform.a,
            defaultTransform.b,
            defaultTransform.c,
            defaultTransform.d,
            currentPos.x,
            currentPos.y,
        );

        for (let i = trailLength; i > noItems; i--) {
            const step = trail[i - trailLengthOffset],
                position = step.position;

            context.beginPath();
            context.moveTo(lastPos.x - offsetPos.x, lastPos.y - offsetPos.y);

            const warp = {
                x: (lastPos.x + canvasSize.width) % canvasSize.width,
                y: (lastPos.y + canvasSize.height) % canvasSize.height,
            };

            if (
                Math.abs(lastPos.x - position.x) > canvasSize.width * half ||
                Math.abs(lastPos.y - position.y) > canvasSize.height * half
            ) {
                lastPos = position;

                continue;
            }

            context.lineTo(
                (Math.abs(lastPos.x - position.x) > canvasSize.width * half ? warp.x : position.x) - offsetPos.x,
                (Math.abs(lastPos.y - position.y) > canvasSize.height * half ? warp.y : position.y) - offsetPos.y,
            );

            const width = Math.max((i / trailLength) * diameter, pxRatio, particle.trailMinWidth ?? minWidth),
                oldAlpha = context.globalAlpha;

            context.globalAlpha = particle.trailFade ? i / trailLength : defaultAlpha;

            context.lineWidth = particle.trailMaxWidth ? Math.min(width, particle.trailMaxWidth) : width;
            context.strokeStyle = step.color;
            context.stroke();

            context.globalAlpha = oldAlpha;

            lastPos = position;
        }

        const { transformData } = data;

        context.setTransform(
            transformData.a,
            transformData.b,
            transformData.c,
            transformData.d,
            currentPos.x,
            currentPos.y,
        );
    }

    particleInit(container: Container, particle: TrailParticle): void {
        particle.trail = [];

        const effectData = particle.effectData as ITrailData | undefined;

        particle.trailFade = effectData?.fade ?? true;
        particle.trailLength = getRangeValue(effectData?.length ?? defaultLength) * container.retina.pixelRatio;
        particle.trailMaxWidth = effectData?.maxWidth
            ? getRangeValue(effectData.maxWidth) * container.retina.pixelRatio
            : undefined;
        particle.trailMinWidth = effectData?.minWidth
            ? getRangeValue(effectData.minWidth) * container.retina.pixelRatio
            : undefined;
    }
}
