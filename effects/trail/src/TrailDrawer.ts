import {
    type Container,
    type ICoordinates,
    type IEffectDrawer,
    type IShapeDrawData,
    type IShapeValues,
    type Particle,
    type RangeValue,
    getDistance,
    getRangeValue,
} from "@tsparticles/engine";

type TrailStep = {
    color: string | CanvasGradient | CanvasPattern;
    position: ICoordinates;
};

type TrailParticle = Particle & {
    path?: TrailStep[];
    pathLength?: number;
    pathMaxWidth?: number;
};

interface ITrailData extends IShapeValues {
    length: RangeValue;
    maxWidth: RangeValue;
}

export class TrailDrawer implements IEffectDrawer<TrailParticle> {
    draw(data: IShapeDrawData<TrailParticle>): void {
        const { context, radius, particle } = data,
            pxRatio = particle.container.retina.pixelRatio,
            currentPos = particle.getPosition();

        if (!particle.path || !particle.pathLength) {
            return;
        }

        const pathLength = particle.pathLength;

        particle.path.push({
            color: context.fillStyle ?? context.strokeStyle,
            position: {
                x: currentPos.x,
                y: currentPos.y,
            },
        });

        if (particle.path.length < 2) {
            return;
        }

        if (particle.path.length > pathLength) {
            particle.path.shift();
        }

        const trailLength = Math.min(particle.path.length, pathLength),
            offsetPos = {
                x: currentPos.x,
                y: currentPos.y,
            };

        let lastPos = particle.path[trailLength - 1].position;

        for (let i = trailLength; i > 0; i--) {
            const step = particle.path[i - 1],
                position = step.position;

            if (getDistance(lastPos, position) > radius * 2) {
                continue;
            }

            context.beginPath();
            context.moveTo(lastPos.x - offsetPos.x, lastPos.y - offsetPos.y);
            context.lineTo(position.x - offsetPos.x, position.y - offsetPos.y);

            const width = Math.max((i / trailLength) * radius * 2, pxRatio);

            context.lineWidth = particle.pathMaxWidth ? Math.min(width, particle.pathMaxWidth) : width;

            context.strokeStyle = step.color;

            context.stroke();

            lastPos = position;
        }
    }

    particleInit(container: Container, particle: TrailParticle): void {
        particle.path = [];

        const effectData = particle.effectData as ITrailData | undefined;

        particle.pathLength = getRangeValue(effectData?.length ?? 10) * container.retina.pixelRatio;
        particle.pathMaxWidth = effectData?.maxWidth
            ? getRangeValue(effectData.maxWidth) * container.retina.pixelRatio
            : undefined;
    }
}
