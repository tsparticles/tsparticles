import { clamp, getDistance, getDistances, getRangeMax, getRangeValue, isInArray, isSsr } from "../../Utils";
import type { Container } from "../Container";
import type { Particle } from "../Particle";
import { HoverMode, RotateDirection } from "../../Enums";
import type { IDelta } from "../Interfaces";

function applyDistance(particle: Particle): void {
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

/**
 * @category Core
 */
export class Mover {
    constructor(private readonly container: Container) {}

    move(particle: Particle, delta: IDelta): void {
        if (particle.destroyed) {
            return;
        }

        this.moveParticle(particle, delta);

        /* parallax */
        this.moveParallax(particle);
    }

    private moveParticle(particle: Particle, delta: IDelta): void {
        const particleOptions = particle.options;
        const moveOptions = particleOptions.move;

        if (!moveOptions.enable) {
            return;
        }

        const container = this.container,
            slowFactor = this.getProximitySpeedFactor(particle),
            baseSpeed =
                (particle.retina.moveSpeed ??= getRangeValue(moveOptions.speed) * container.retina.pixelRatio) *
                container.retina.reduceFactor,
            moveDrift = (particle.retina.moveDrift ??=
                getRangeValue(particle.options.move.drift) * container.retina.pixelRatio),
            maxSize = getRangeMax(particleOptions.size.value) * container.retina.pixelRatio,
            sizeFactor = moveOptions.size ? particle.getRadius() / maxSize : 1,
            diffFactor = 2,
            speedFactor = (sizeFactor * slowFactor * (delta.factor || 1)) / diffFactor,
            moveSpeed = baseSpeed * speedFactor;

        this.applyPath(particle, delta);

        const gravityOptions = moveOptions.gravity;
        const gravityFactor = gravityOptions.enable && gravityOptions.inverse ? -1 : 1;

        if (gravityOptions.enable && moveSpeed) {
            particle.velocity.y += (gravityFactor * (gravityOptions.acceleration * delta.factor)) / (60 * moveSpeed);
        }

        if (moveDrift && moveSpeed) {
            particle.velocity.x += (moveDrift * delta.factor) / (60 * moveSpeed);
        }

        const decay = 1 - particle.options.move.decay;

        if (decay != 1) {
            particle.velocity.multTo(decay);
        }

        const velocity = particle.velocity.mult(moveSpeed);
        const maxSpeed = particle.retina.maxSpeed ?? container.retina.maxSpeed;

        if (
            gravityOptions.enable &&
            gravityOptions.maxSpeed > 0 &&
            ((!gravityOptions.inverse && velocity.y >= 0 && velocity.y >= maxSpeed) ||
                (gravityOptions.inverse && velocity.y <= 0 && velocity.y <= -maxSpeed))
        ) {
            velocity.y = gravityFactor * maxSpeed;

            if (moveSpeed) {
                particle.velocity.y = velocity.y / moveSpeed;
            }
        }

        const zIndexOptions = particle.options.zIndex,
            zVelocityFactor = (1 - particle.zIndexFactor) ** zIndexOptions.velocityRate;

        if (moveOptions.spin.enable) {
            this.spin(particle, moveSpeed);
        } else {
            if (zVelocityFactor != 1) {
                velocity.multTo(zVelocityFactor);
            }

            particle.position.addTo(velocity);

            if (moveOptions.vibrate) {
                particle.position.x += Math.sin(particle.position.x * Math.cos(particle.position.y));
                particle.position.y += Math.cos(particle.position.y * Math.sin(particle.position.x));
            }
        }

        applyDistance(particle);
    }

    private spin(particle: Particle, moveSpeed: number): void {
        const container = this.container;

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

    private applyPath(particle: Particle, delta: IDelta): void {
        const particlesOptions = particle.options;
        const pathOptions = particlesOptions.move.path;
        const pathEnabled = pathOptions.enable;

        if (!pathEnabled) {
            return;
        }

        const container = this.container;

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

    private moveParallax(particle: Particle): void {
        const container = this.container;
        const options = container.actualOptions;

        if (isSsr() || !options.interactivity.events.onHover.parallax.enable) {
            return;
        }

        const parallaxForce = options.interactivity.events.onHover.parallax.force;
        const mousePos = container.interactivity.mouse.position;

        if (!mousePos) {
            return;
        }

        const canvasCenter = {
            x: container.canvas.size.width / 2,
            y: container.canvas.size.height / 2,
        };
        const parallaxSmooth = options.interactivity.events.onHover.parallax.smooth;
        const factor = particle.getRadius() / parallaxForce;

        /* smaller is the particle, longer is the offset distance */
        const tmp = {
            x: (mousePos.x - canvasCenter.x) * factor,
            y: (mousePos.y - canvasCenter.y) * factor,
        };

        particle.offset.x += (tmp.x - particle.offset.x) / parallaxSmooth; // Easing equation
        particle.offset.y += (tmp.y - particle.offset.y) / parallaxSmooth; // Easing equation
    }

    private getProximitySpeedFactor(particle: Particle): number {
        const container = this.container;
        const options = container.actualOptions;
        const active = isInArray(HoverMode.slow, options.interactivity.events.onHover.mode);

        if (!active) {
            return 1;
        }

        const mousePos = this.container.interactivity.mouse.position;

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
}
