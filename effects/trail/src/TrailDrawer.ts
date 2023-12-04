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

type TrailStep = {
    color: string | CanvasGradient | CanvasPattern;
    position: ICoordinates;
};

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
            diameter = radius * 2,
            pxRatio = particle.container.retina.pixelRatio,
            currentPos = particle.getPosition();

        if (!particle.trail || !particle.trailLength) {
            return;
        }

        const pathLength = particle.trailLength;

        particle.trail.push({
            color: context.fillStyle ?? context.strokeStyle,
            position: {
                x: currentPos.x,
                y: currentPos.y,
            },
        });

        if (particle.trail.length < 2) {
            return;
        }

        while (particle.trail.length > pathLength) {
            particle.trail.shift();
        }

        const trailLength = Math.min(particle.trail.length, pathLength),
            offsetPos = {
                x: currentPos.x,
                y: currentPos.y,
            },
            canvasSize = {
                width: particle.container.canvas.size.width + diameter,
                height: particle.container.canvas.size.height + diameter,
            };

        let lastPos = particle.trail[trailLength - 1].position;

        for (let i = trailLength; i > 0; i--) {
            const step = particle.trail[i - 1],
                position = step.position;

            context.beginPath();
            context.moveTo(lastPos.x - offsetPos.x, lastPos.y - offsetPos.y);

            // Calculate wrapping points
            const warp = {
                x: (lastPos.x + canvasSize.width) % canvasSize.width,
                y: (lastPos.y + canvasSize.height) % canvasSize.height,
            };

            if (
                Math.abs(lastPos.x - position.x) > canvasSize.width / 2 ||
                Math.abs(lastPos.y - position.y) > canvasSize.height / 2
            ) {
                lastPos = position;

                continue;
            }

            // Draw the line using wrapping points
            context.lineTo(
                (Math.abs(lastPos.x - position.x) > canvasSize.width / 2 ? warp.x : position.x) - offsetPos.x,
                (Math.abs(lastPos.y - position.y) > canvasSize.height / 2 ? warp.y : position.y) - offsetPos.y,
            );

            const width = Math.max((i / trailLength) * diameter, pxRatio, particle.trailMinWidth ?? -1);

            const oldAlpha = context.globalAlpha;

            context.globalAlpha = particle.trailFade ? i / trailLength : 1;

            context.lineWidth = particle.trailMaxWidth ? Math.min(width, particle.trailMaxWidth) : width;
            context.strokeStyle = step.color;
            context.stroke();

            context.globalAlpha = oldAlpha;

            lastPos = position;
        }
    }

    particleInit(container: Container, particle: TrailParticle): void {
        particle.trail = [];

        const effectData = particle.effectData as ITrailData | undefined;

        particle.trailFade = effectData?.fade ?? true;
        particle.trailLength = getRangeValue(effectData?.length ?? 10) * container.retina.pixelRatio;
        particle.trailMaxWidth = effectData?.maxWidth
            ? getRangeValue(effectData.maxWidth) * container.retina.pixelRatio
            : undefined;
        particle.trailMinWidth = effectData?.minWidth
            ? getRangeValue(effectData.minWidth) * container.retina.pixelRatio
            : undefined;
    }
}
