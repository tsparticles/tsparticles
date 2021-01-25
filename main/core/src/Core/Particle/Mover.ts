import { clamp, getDistance, getDistances, getRangeMax, isInArray, isSsr, Plugins } from "../../Utils";
import type { Container } from "../Container";
import type { Particle } from "../Particle";
import { HoverMode, RotateDirection } from "../../Enums";
import type { IDelta } from "../Interfaces";
import { Vector } from "./Vector";

/**
 * @category Core
 */
export class Mover {
    constructor(private readonly container: Container) {}

    public move(particle: Particle, delta: IDelta): void {
        const resizeFactor = this.container.canvas.resizeFactor;

        if (resizeFactor) {
            particle.position.x *= resizeFactor.width;
            particle.position.y *= resizeFactor.height;
        }

        particle.bubble.inRange = false;
        particle.links = [];

        for (const [, plugin] of this.container.plugins) {
            if (particle.destroyed) {
                break;
            }

            if (plugin.particleUpdate) {
                plugin.particleUpdate(particle, delta);
            }
        }

        if (particle.destroyed) {
            return;
        }

        this.moveParticle(particle, delta);

        /* parallax */
        this.moveParallax(particle);
    }

    private moveParticle(particle: Particle, delta: IDelta): void {
        const particlesOptions = particle.options;

        if (!particlesOptions.move.enable) {
            return;
        }

        const container = this.container,
            slowFactor = this.getProximitySpeedFactor(particle),
            baseSpeed = particle.moveSpeed * container.retina.pixelRatio * container.retina.reduceFactor,
            sizeValue = particle.options.size.value,
            maxSize = getRangeMax(sizeValue) * container.retina.pixelRatio,
            sizeFactor = particlesOptions.move.size ? particle.getRadius() / maxSize : 1,
            diffFactor = 4,
            speedFactor = (sizeFactor * slowFactor * delta.factor) / diffFactor,
            moveSpeed = baseSpeed * speedFactor;

        this.applyNoise(particle, delta);

        const gravityOptions = particlesOptions.move.gravity;

        if (gravityOptions.enable) {
            particle.velocity.y += ((gravityOptions.acceleration / diffFactor) * delta.factor) / (60 * moveSpeed);
        }

        const velocity = particle.velocity.mult(moveSpeed);

        if (gravityOptions.enable && velocity.y >= gravityOptions.maxSpeed && gravityOptions.maxSpeed > 0) {
            velocity.y = gravityOptions.maxSpeed;

            particle.velocity.y = velocity.y / moveSpeed;
        }

        const zIndexOptions = particle.options.zIndex,
            zVelocityFactor = 1 - zIndexOptions.velocityRate * particle.zIndexFactor;

        if (particlesOptions.move.spin.enable) {
            this.spin(particle, moveSpeed);
        } else {
            velocity.multTo(zVelocityFactor);

            particle.position.addTo(velocity);

            if (particlesOptions.move.vibrate) {
                const vibrateVelocity = new Vector(
                    Math.sin(particle.position.x * Math.cos(particle.position.y) * zVelocityFactor),
                    Math.cos(particle.position.y * Math.sin(particle.position.x) * zVelocityFactor)
                );

                particle.position.addTo(vibrateVelocity);
            }
        }

        this.applyDistance(particle);
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

    private applyDistance(particle: Particle): void {
        const initialPosition = particle.initialPosition;
        const { dx, dy } = getDistances(initialPosition, particle.position);
        const dxFixed = Math.abs(dx),
            dyFixed = Math.abs(dy);

        const hDistance = particle.maxDistance.horizontal;
        const vDistance = particle.maxDistance.vertical;

        if (!(hDistance !== undefined || vDistance !== undefined)) {
            return;
        }

        if (
            ((hDistance !== undefined && dxFixed >= hDistance) || (vDistance !== undefined && dyFixed >= vDistance)) &&
            !particle.misplaced
        ) {
            particle.misplaced =
                (hDistance !== undefined && dxFixed > hDistance) || (vDistance !== undefined && dyFixed > vDistance);

            if (hDistance !== undefined) {
                particle.velocity.x = particle.velocity.y / 2 - particle.velocity.x;
            }

            if (vDistance !== undefined) {
                particle.velocity.y = particle.velocity.x / 2 - particle.velocity.y;
            }
        } else if (
            (hDistance === undefined || dxFixed < hDistance) &&
            (vDistance === undefined || dyFixed < vDistance) &&
            particle.misplaced
        ) {
            particle.misplaced = false;
        } else if (particle.misplaced) {
            const pos = particle.position,
                vel = particle.velocity;

            if (
                hDistance !== undefined &&
                ((pos.x < initialPosition.x && vel.x < 0) || (pos.x > initialPosition.x && vel.x > 0))
            ) {
                vel.x *= -Math.random();
            }

            if (
                vDistance !== undefined &&
                ((pos.y < initialPosition.y && vel.y < 0) || (pos.y > initialPosition.y && vel.y > 0))
            ) {
                vel.y *= -Math.random();
            }
        }
    }

    private applyNoise(particle: Particle, delta: IDelta): void {
        const particlesOptions = particle.options,
            noiseOptions = particlesOptions.move.noise,
            noiseEnabled = noiseOptions.enable;

        if (!noiseEnabled) {
            return;
        }

        const container = this.container;

        if (particle.lastNoiseTime <= particle.noiseDelay) {
            particle.lastNoiseTime += delta.value;

            return;
        }

        let generator = container.noise;

        if (noiseOptions.generator) {
            const customGenerator = Plugins.getNoiseGenerator(noiseOptions.generator);

            if (customGenerator) {
                generator = customGenerator;
            }
        }

        const noise = generator.generate(particle),
            vel = particle.velocity,
            noiseVel = new Vector(0, 0);

        noiseVel.length = noise.length;
        noiseVel.angle = noise.angle;

        vel.addTo(noiseVel);

        if (noiseOptions.clamp) {
            vel.x = clamp(vel.x, -1, 1);
            vel.y = clamp(vel.y, -1, 1);
        }

        particle.lastNoiseTime -= particle.noiseDelay;
    }

    private moveParallax(particle: Particle): void {
        const container = this.container,
            options = container.options;

        if (isSsr() || !options.interactivity.events.onHover.parallax.enable) {
            return;
        }

        const parallaxForce = options.interactivity.events.onHover.parallax.force,
            mousePos = container.interactivity.mouse.position;

        if (!mousePos) {
            return;
        }

        const canvasCenter = {
                x: container.canvas.size.width / 2,
                y: container.canvas.size.height / 2,
            },
            parallaxSmooth = options.interactivity.events.onHover.parallax.smooth,
            factor = particle.getRadius() / parallaxForce,
            tmp = {
                x: (mousePos.x - canvasCenter.x) * factor,
                y: (mousePos.y - canvasCenter.y) * factor,
            };

        particle.offset.x += (tmp.x - particle.offset.x) / parallaxSmooth; // Easing equation
        particle.offset.y += (tmp.y - particle.offset.y) / parallaxSmooth; // Easing equation
    }

    private getProximitySpeedFactor(particle: Particle): number {
        const container = this.container,
            options = container.options,
            active = isInArray(HoverMode.slow, options.interactivity.events.onHover.mode);

        if (!active) {
            return 1;
        }

        const mousePos = this.container.interactivity.mouse.position;

        if (!mousePos) {
            return 1;
        }

        const particlePos = particle.getPosition(),
            dist = getDistance(mousePos, particlePos),
            radius = container.retina.slowModeRadius;

        if (dist > radius) {
            return 1;
        }

        const proximityFactor = dist / radius || 0,
            slowFactor = options.interactivity.modes.slow.factor;

        return proximityFactor / slowFactor;
    }
}
