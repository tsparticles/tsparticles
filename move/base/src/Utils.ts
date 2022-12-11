import type { IDelta, Particle } from "tsparticles-engine";
import { RotateDirection, clamp, getDistances, getRandom } from "tsparticles-engine";
import type { MoveParticle } from "./Types";

export function applyDistance(particle: MoveParticle): void {
    const initialPosition = particle.initialPosition,
        { dx, dy } = getDistances(initialPosition, particle.position),
        dxFixed = Math.abs(dx),
        dyFixed = Math.abs(dy),
        hDistance = particle.retina.maxDistance.horizontal,
        vDistance = particle.retina.maxDistance.vertical;

    if (!hDistance && !vDistance) {
        return;
    }

    if (((hDistance && dxFixed >= hDistance) || (vDistance && dyFixed >= vDistance)) && !particle.misplaced) {
        particle.misplaced = (!!hDistance && dxFixed > hDistance) || (!!vDistance && dyFixed > vDistance);

        if (hDistance) {
            particle.velocity.x = particle.velocity.y / 2 - particle.velocity.x;
        }

        if (vDistance) {
            particle.velocity.y = particle.velocity.x / 2 - particle.velocity.y;
        }
    } else if ((!hDistance || dxFixed < hDistance) && (!vDistance || dyFixed < vDistance) && particle.misplaced) {
        particle.misplaced = false;
    } else if (particle.misplaced) {
        const pos = particle.position,
            vel = particle.velocity;

        if (hDistance && ((pos.x < initialPosition.x && vel.x < 0) || (pos.x > initialPosition.x && vel.x > 0))) {
            vel.x *= -getRandom();
        }

        if (vDistance && ((pos.y < initialPosition.y && vel.y < 0) || (pos.y > initialPosition.y && vel.y > 0))) {
            vel.y *= -getRandom();
        }
    }
}

export function spin(particle: MoveParticle, moveSpeed: number): void {
    const container = particle.container;

    if (!particle.spin) {
        return;
    }

    const updateFunc = {
        x: particle.spin.direction === RotateDirection.clockwise ? Math.cos : Math.sin,
        y: particle.spin.direction === RotateDirection.clockwise ? Math.sin : Math.cos,
    };

    particle.position.x = particle.spin.center.x + particle.spin.radius * updateFunc.x(particle.spin.angle);
    particle.position.y = particle.spin.center.y + particle.spin.radius * updateFunc.y(particle.spin.angle);
    particle.spin.radius += particle.spin.acceleration;

    const maxCanvasSize = Math.max(container.canvas.size.width, container.canvas.size.height);

    if (particle.spin.radius > maxCanvasSize / 2) {
        particle.spin.radius = maxCanvasSize / 2;
        particle.spin.acceleration *= -1;
    } else if (particle.spin.radius < 0) {
        particle.spin.radius = 0;
        particle.spin.acceleration *= -1;
    }

    particle.spin.angle += (moveSpeed / 100) * (1 - particle.spin.radius / maxCanvasSize);
}

export function applyPath(particle: Particle, delta: IDelta): void {
    const particlesOptions = particle.options,
        pathOptions = particlesOptions.move.path,
        pathEnabled = pathOptions.enable;

    if (!pathEnabled) {
        return;
    }

    if (particle.lastPathTime <= particle.pathDelay) {
        particle.lastPathTime += delta.value;

        return;
    }

    const path = particle.pathGenerator?.generate(particle);

    if (path) {
        particle.velocity.addTo(path);
    }

    if (pathOptions.clamp) {
        particle.velocity.x = clamp(particle.velocity.x, -1, 1);
        particle.velocity.y = clamp(particle.velocity.y, -1, 1);
    }

    particle.lastPathTime -= particle.pathDelay;
}

export function getProximitySpeedFactor(particle: Particle): number {
    return particle.slow.inRange ? particle.slow.factor : 1;
}
