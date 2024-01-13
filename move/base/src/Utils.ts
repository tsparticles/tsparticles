import {
    type IDelta,
    type Move,
    type Particle,
    RotateDirection,
    clamp,
    getDistance,
    getDistances,
    getRandom,
    getRangeValue,
} from "@tsparticles/engine";
import type { MoveParticle } from "./Types.js";

const half = 0.5,
    minVelocity = 0,
    identity = 1,
    moveSpeedFactor = 60,
    minSpinRadius = 0,
    spinFactor = 0.01;

/**
 * @param particle -
 */
export function applyDistance(particle: MoveParticle): void {
    const initialPosition = particle.initialPosition,
        { dx, dy } = getDistances(initialPosition, particle.position),
        dxFixed = Math.abs(dx),
        dyFixed = Math.abs(dy),
        { maxDistance } = particle.retina,
        hDistance = maxDistance.horizontal,
        vDistance = maxDistance.vertical;

    if (!hDistance && !vDistance) {
        return;
    }

    const hasHDistance = (hDistance && dxFixed >= hDistance) ?? false,
        hasVDistance = (vDistance && dyFixed >= vDistance) ?? false;

    if ((hasHDistance || hasVDistance) && !particle.misplaced) {
        particle.misplaced = (!!hDistance && dxFixed > hDistance) || (!!vDistance && dyFixed > vDistance);

        if (hDistance) {
            particle.velocity.x = particle.velocity.y * half - particle.velocity.x;
        }

        if (vDistance) {
            particle.velocity.y = particle.velocity.x * half - particle.velocity.y;
        }
    } else if ((!hDistance || dxFixed < hDistance) && (!vDistance || dyFixed < vDistance) && particle.misplaced) {
        particle.misplaced = false;
    } else if (particle.misplaced) {
        const pos = particle.position,
            vel = particle.velocity;

        if (
            hDistance &&
            ((pos.x < initialPosition.x && vel.x < minVelocity) || (pos.x > initialPosition.x && vel.x > minVelocity))
        ) {
            vel.x *= -getRandom();
        }

        if (
            vDistance &&
            ((pos.y < initialPosition.y && vel.y < minVelocity) || (pos.y > initialPosition.y && vel.y > minVelocity))
        ) {
            vel.y *= -getRandom();
        }
    }
}

/**
 *
 * @param particle -
 * @param moveOptions -
 * @param moveSpeed -
 * @param maxSpeed -
 * @param moveDrift -
 * @param delta -
 */
export function move(
    particle: MoveParticle,
    moveOptions: Move,
    moveSpeed: number,
    maxSpeed: number,
    moveDrift: number,
    delta: IDelta,
): void {
    applyPath(particle, delta);

    const gravityOptions = particle.gravity,
        gravityFactor = gravityOptions?.enable && gravityOptions.inverse ? -identity : identity;

    if (moveDrift && moveSpeed) {
        particle.velocity.x += (moveDrift * delta.factor) / (moveSpeedFactor * moveSpeed);
    }

    if (gravityOptions?.enable && moveSpeed) {
        particle.velocity.y +=
            (gravityFactor * (gravityOptions.acceleration * delta.factor)) / (moveSpeedFactor * moveSpeed);
    }

    const decay = particle.moveDecay;

    particle.velocity.multTo(decay);

    const velocity = particle.velocity.mult(moveSpeed);

    if (
        gravityOptions?.enable &&
        maxSpeed > minVelocity &&
        ((!gravityOptions.inverse && velocity.y >= minVelocity && velocity.y >= maxSpeed) ||
            (gravityOptions.inverse && velocity.y <= minVelocity && velocity.y <= -maxSpeed))
    ) {
        velocity.y = gravityFactor * maxSpeed;

        if (moveSpeed) {
            particle.velocity.y = velocity.y / moveSpeed;
        }
    }

    const zIndexOptions = particle.options.zIndex,
        zVelocityFactor = (identity - particle.zIndexFactor) ** zIndexOptions.velocityRate;

    velocity.multTo(zVelocityFactor);

    const { position } = particle;

    position.addTo(velocity);

    if (moveOptions.vibrate) {
        position.x += Math.sin(position.x * Math.cos(position.y));
        position.y += Math.cos(position.y * Math.sin(position.x));
    }
}

/**
 * @param particle -
 * @param moveSpeed -
 */
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

    const maxCanvasSize = Math.max(container.canvas.size.width, container.canvas.size.height),
        halfMaxSize = maxCanvasSize * half;

    if (particle.spin.radius > halfMaxSize) {
        particle.spin.radius = halfMaxSize;
        particle.spin.acceleration *= -identity;
    } else if (particle.spin.radius < minSpinRadius) {
        particle.spin.radius = minSpinRadius;
        particle.spin.acceleration *= -identity;
    }

    particle.spin.angle += moveSpeed * spinFactor * (identity - particle.spin.radius / maxCanvasSize);
}

/**
 * @param particle -
 * @param delta -
 */
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

    const path = particle.pathGenerator?.generate(particle, delta);

    if (path) {
        particle.velocity.addTo(path);
    }

    if (pathOptions.clamp) {
        particle.velocity.x = clamp(particle.velocity.x, -identity, identity);
        particle.velocity.y = clamp(particle.velocity.y, -identity, identity);
    }

    particle.lastPathTime -= particle.pathDelay;
}

/**
 * @param particle -
 * @returns proximity speed factor
 */
export function getProximitySpeedFactor(particle: Particle): number {
    return particle.slow.inRange ? particle.slow.factor : identity;
}

/**
 *
 * @param particle
 */
export function initSpin(particle: MoveParticle): void {
    const container = particle.container,
        options = particle.options,
        spinOptions = options.move.spin,
        spinPos = spinOptions.position ?? { x: 50, y: 50 },
        spinFactor = 0.01,
        spinCenter = {
            x: spinPos.x * spinFactor * container.canvas.size.width,
            y: spinPos.y * spinFactor * container.canvas.size.height,
        },
        pos = particle.getPosition(),
        distance = getDistance(pos, spinCenter),
        spinAcceleration = getRangeValue(spinOptions.acceleration),
        minVelocity = 0;

    particle.retina.spinAcceleration = spinAcceleration * container.retina.pixelRatio;

    particle.spin = {
        center: spinCenter,
        direction: particle.velocity.x >= minVelocity ? RotateDirection.clockwise : RotateDirection.counterClockwise,
        angle: particle.velocity.angle,
        radius: distance,
        acceleration: particle.retina.spinAcceleration,
    };
}
