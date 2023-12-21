import {
    type IDelta,
    type IParticleMover,
    type Particle,
    RotateDirection,
    getDistance,
    getRangeMax,
    getRangeValue,
} from "@tsparticles/engine";
import { applyDistance, getProximitySpeedFactor, move, spin } from "./Utils.js";
import type { MoveParticle } from "./Types.js";

const diffFactor = 2;

/**
 */
export class BaseMover implements IParticleMover {
    /**
     * @param particle -
     */
    init(particle: MoveParticle): void {
        const options = particle.options,
            gravityOptions = options.move.gravity;

        particle.gravity = {
            enable: gravityOptions.enable,
            acceleration: getRangeValue(gravityOptions.acceleration),
            inverse: gravityOptions.inverse,
        };

        this._initSpin(particle);
    }

    /**
     * @param particle -
     * @returns check if mover is enabled
     */
    isEnabled(particle: Particle): boolean {
        return !particle.destroyed && particle.options.move.enable;
    }

    /**
     * @param particle -
     * @param delta -
     */
    move(particle: MoveParticle, delta: IDelta): void {
        const particleOptions = particle.options,
            moveOptions = particleOptions.move;

        if (!moveOptions.enable) {
            return;
        }

        const container = particle.container,
            pxRatio = container.retina.pixelRatio,
            slowFactor = getProximitySpeedFactor(particle),
            baseSpeed =
                (particle.retina.moveSpeed ??= getRangeValue(moveOptions.speed) * pxRatio) *
                container.retina.reduceFactor,
            moveDrift = (particle.retina.moveDrift ??= getRangeValue(particle.options.move.drift) * pxRatio),
            maxSize = getRangeMax(particleOptions.size.value) * pxRatio,
            defaultSizeFactor = 1,
            defaultDeltaFactor = 1,
            sizeFactor = moveOptions.size ? particle.getRadius() / maxSize : defaultSizeFactor,
            moveSpeed = (baseSpeed * sizeFactor * slowFactor * (delta.factor || defaultDeltaFactor)) / diffFactor,
            maxSpeed = particle.retina.maxSpeed ?? container.retina.maxSpeed;

        if (moveOptions.spin.enable) {
            spin(particle, moveSpeed);
        } else {
            move(particle, moveOptions, moveSpeed, maxSpeed, moveDrift, delta);
        }

        applyDistance(particle);
    }

    /**
     * @param particle -
     */
    private readonly _initSpin: (particle: MoveParticle) => void = (particle) => {
        const container = particle.container,
            options = particle.options,
            spinOptions = options.move.spin;

        if (!spinOptions.enable) {
            return;
        }

        const spinPos = spinOptions.position ?? { x: 50, y: 50 },
            spinFactor = 0.01,
            spinCenter = {
                x: spinPos.x * spinFactor * container.canvas.size.width,
                y: spinPos.y * spinFactor * container.canvas.size.height,
            },
            pos = particle.getPosition(),
            distance = getDistance(pos, spinCenter),
            spinAcceleration = getRangeValue(spinOptions.acceleration);

        particle.retina.spinAcceleration = spinAcceleration * container.retina.pixelRatio;

        const minVelocity = 0;

        particle.spin = {
            center: spinCenter,
            direction:
                particle.velocity.x >= minVelocity ? RotateDirection.clockwise : RotateDirection.counterClockwise,
            angle: particle.velocity.angle,
            radius: distance,
            acceleration: particle.retina.spinAcceleration,
        };
    };
}
