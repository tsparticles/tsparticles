import {
    type Container,
    type ICoordinates,
    type IEffectDrawer,
    type IShapeDrawData,
    type Particle,
    getDistance,
    getRangeValue,
} from "@tsparticles/engine";

const maxLength = { max: 30, min: 10 };

type TrailParticle = Particle & {
    path?: ICoordinates[];
    pathLength?: number;
};

export class TrailDrawer implements IEffectDrawer<TrailParticle> {
    draw(data: IShapeDrawData<TrailParticle>): void {
        const { context, radius, particle } = data,
            pxRatio = particle.container.retina.pixelRatio,
            currentPos = particle.getPosition();

        if (!particle.path || !particle.pathLength) {
            return;
        }

        const pathLength = particle.pathLength;

        // add the current position to the path, at the beginning
        particle.path.push({
            x: currentPos.x,
            y: currentPos.y,
        });

        if (particle.path.length < 2) {
            return;
        }

        // remove the oldest position from the path
        if (particle.path.length > pathLength) {
            particle.path.shift();
        }

        // draw the path of the particle
        const trailLength = Math.min(particle.path.length, pathLength),
            velAngle = particle.velocity.angle,
            offsetPos = {
                x: currentPos.x + radius * Math.cos(velAngle),
                y: currentPos.y + radius * Math.sin(velAngle),
            };

        let lastPos = particle.path[trailLength - 1];

        context.moveTo(lastPos.x - offsetPos.x, lastPos.y - offsetPos.y);

        for (let i = trailLength; i > 0; i--) {
            const position = particle.path[i - 1];

            if (getDistance(lastPos, position) > radius * 2) {
                continue;
            }

            context.lineTo(position.x - offsetPos.x, position.y - offsetPos.y);

            context.lineWidth = Math.max((i / trailLength) * radius * 2 * pxRatio, pxRatio);

            context.stroke();

            lastPos = position;
        }
    }

    particleInit(container: Container, particle: TrailParticle): void {
        particle.path = [
            {
                x: particle.getPosition().x,
                y: particle.getPosition().y,
            },
        ];

        particle.pathLength = getRangeValue(maxLength) * container.retina.pixelRatio;
    }
}
