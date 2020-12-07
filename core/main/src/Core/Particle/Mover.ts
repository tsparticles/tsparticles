import { clamp, getDistance, getDistances, isInArray, isSsr, Plugins } from "../../Utils";
import type { Container } from "../Container";
import type { Particle } from "../Particle";
import { HoverMode, RotateDirection } from "../../Enums";
import type { IDelta } from "../Interfaces/IDelta";
import { Velocity } from "./Velocity";

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

    public moveXY(particle: Particle, x: number, y: number): void {
        particle.position.x += x;
        particle.position.y += y;
    }

    private moveParticle(particle: Particle, delta: IDelta): void {
        const particlesOptions = particle.options;

        if (!particlesOptions.move.enable) {
            return;
        }

        const container = this.container,
            slowFactor = this.getProximitySpeedFactor(particle),
            baseSpeed = (particle.moveSpeed ?? container.retina.moveSpeed) * container.retina.reduceFactor,
            maxSize = particle.sizeValue ?? container.retina.sizeValue,
            sizeFactor = particlesOptions.move.size ? particle.getRadius() / maxSize : 1,
            moveSpeed = (baseSpeed / 4) * sizeFactor * slowFactor * delta.factor;

        this.applyNoise(particle, delta);

        const gravityOptions = particlesOptions.move.gravity;

        if (gravityOptions.enable) {
            particle.velocity.vertical += (gravityOptions.acceleration * delta.factor) / (60 * moveSpeed);
        }

        const velocity = particle.velocity.mult(moveSpeed);

        if (gravityOptions.enable && velocity.vertical >= gravityOptions.maxSpeed && gravityOptions.maxSpeed > 0) {
            velocity.vertical = gravityOptions.maxSpeed;

            particle.velocity.vertical = velocity.vertical / moveSpeed;
        }

        const zIndexOptions = particle.options.zIndex,
            zVelocityFactor = 1 - zIndexOptions.velocityRate * particle.zIndexFactor;

        if (particlesOptions.move.spin.enable) {
            this.spin(particle, moveSpeed);
        } else {
            velocity.multTo(zVelocityFactor);

            this.moveXY(particle, velocity.horizontal, velocity.vertical);

            if (particlesOptions.move.vibrate) {
                this.moveXY(
                    particle,
                    Math.sin(particle.position.x * Math.cos(particle.position.y) * zVelocityFactor),
                    Math.cos(particle.position.y * Math.sin(particle.position.x) * zVelocityFactor)
                );
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
                particle.velocity.horizontal = particle.velocity.vertical / 2 - particle.velocity.horizontal;
            }

            if (vDistance !== undefined) {
                particle.velocity.vertical = particle.velocity.horizontal / 2 - particle.velocity.vertical;
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
                ((pos.x < initialPosition.x && vel.horizontal < 0) || (pos.x > initialPosition.x && vel.horizontal > 0))
            ) {
                vel.horizontal *= -Math.random();
            }

            if (
                vDistance !== undefined &&
                ((pos.y < initialPosition.y && vel.vertical < 0) || (pos.y > initialPosition.y && vel.vertical > 0))
            ) {
                vel.vertical *= -Math.random();
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
            noiseVel = new Velocity(0, 0);

        noiseVel.length = noise.length;
        noiseVel.angle = noise.angle;

        vel.addTo(noiseVel);

        if (noiseOptions.clamp) {
            vel.horizontal = clamp(vel.horizontal, -1, 1);
            vel.vertical = clamp(vel.vertical, -1, 1);
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
