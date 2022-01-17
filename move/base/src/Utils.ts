import { HoverMode, RotateDirection, clamp, getDistance, getDistances, isInArray } from "tsparticles-engine";
import type { IDelta, Particle } from "tsparticles-engine";
import type { SpinParticle } from "./Types";

export function applyDistance(particle: SpinParticle): void {
    const initialPosition = particle.initialPosition;
    const { dx, dy } = getDistances(initialPosition, particle.position);
    const dxFixed = Math.abs(dx),
        dyFixed = Math.abs(dy);

    const hDistance = particle.retina.maxDistance.horizontal;
    const vDistance = particle.retina.maxDistance.vertical;

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
            vel.x *= -Math.random();
        }

        if (vDistance && ((pos.y < initialPosition.y && vel.y < 0) || (pos.y > initialPosition.y && vel.y > 0))) {
            vel.y *= -Math.random();
        }
    }
}

export function spin(particle: SpinParticle, moveSpeed: number): void {
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
    const particlesOptions = particle.options;
    const pathOptions = particlesOptions.move.path;
    const pathEnabled = pathOptions.enable;

    if (!pathEnabled) {
        return;
    }

    const container = particle.container;

    if (particle.lastPathTime <= particle.pathDelay) {
        particle.lastPathTime += delta.value;

        return;
    }

    const path = container.pathGenerator.generate(particle);

    particle.velocity.addTo(path);

    if (pathOptions.clamp) {
        particle.velocity.x = clamp(particle.velocity.x, -1, 1);
        particle.velocity.y = clamp(particle.velocity.y, -1, 1);
    }

    particle.lastPathTime -= particle.pathDelay;
}

export function getProximitySpeedFactor(particle: Particle): number {
    const container = particle.container;
    const options = container.actualOptions;
    const active = isInArray(HoverMode.slow, options.interactivity.events.onHover.mode);

    if (!active) {
        return 1;
    }

    const mousePos = particle.container.interactivity.mouse.position;

    if (!mousePos) {
        return 1;
    }

    const particlePos = particle.getPosition();
    const dist = getDistance(mousePos, particlePos);
    const radius = container.retina.slowModeRadius;

    if (dist > radius) {
        return 1;
    }

    const proximityFactor = dist / radius || 0;
    const slowFactor = options.interactivity.modes.slow.factor;

    return proximityFactor / slowFactor;
}
