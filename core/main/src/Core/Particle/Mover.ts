import { NumberUtils, Plugins, Utils } from "../../Utils";
import type { Container } from "../Container";
import type { Particle } from "../Particle";
import { HoverMode, RotateDirection } from "../../Enums";
import type { IDelta } from "../Interfaces/IDelta";

/**
 * @category Core
 */
export class Mover {
    constructor(private readonly container: Container, private readonly particle: Particle) {}

    public move(delta: IDelta): void {
        const particle = this.particle;

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

        this.moveParticle(delta);

        /* parallax */
        this.moveParallax();
    }

    public moveXY(x: number, y: number): void {
        const particle = this.particle;

        particle.position.x += x;
        particle.position.y += y;
    }

    private moveParticle(delta: IDelta): void {
        const particle = this.particle;
        const particlesOptions = particle.options;

        if (!particlesOptions.move.enable) {
            return;
        }

        const container = this.container;
        const slowFactor = this.getProximitySpeedFactor();
        const baseSpeed = (particle.moveSpeed ?? container.retina.moveSpeed) * container.retina.reduceFactor;
        const maxSize = particle.sizeValue ?? container.retina.sizeValue;
        const sizeFactor = particlesOptions.move.size ? particle.getRadius() / maxSize : 1;
        const moveSpeed = (baseSpeed / 2) * sizeFactor * slowFactor * delta.factor;

        this.applyNoise(delta);

        const gravityOptions = particlesOptions.move.gravity;

        if (gravityOptions.enable) {
            particle.velocity.vertical += (gravityOptions.acceleration * delta.factor) / (60 * moveSpeed);
        }

        const velocity = {
            horizontal: particle.velocity.horizontal * moveSpeed,
            vertical: particle.velocity.vertical * moveSpeed,
        };

        if (gravityOptions.enable && velocity.vertical >= gravityOptions.maxSpeed && gravityOptions.maxSpeed > 0) {
            velocity.vertical = gravityOptions.maxSpeed;

            particle.velocity.vertical = velocity.vertical / moveSpeed;
        }

        const zIndexOptions = particle.options.zIndex;
        const zVelocityFactor = 1 - zIndexOptions.velocityRate * particle.zIndexFactor;

        if (particlesOptions.move.spin.enable) {
            this.spin(moveSpeed);
        } else {
            this.moveXY(velocity.horizontal * zVelocityFactor, velocity.vertical * zVelocityFactor);

            if (particlesOptions.move.vibrate) {
                this.moveXY(
                    Math.sin(particle.position.x * Math.cos(particle.position.y) * zVelocityFactor),
                    Math.cos(particle.position.y * Math.sin(particle.position.x) * zVelocityFactor)
                );
            }
        }

        this.applyDistance();
    }

    private spin(moveSpeed: number): void {
        const particle = this.particle,
            container = this.container;

        if (
            particle.spinRadius === undefined ||
            particle.spinAngle === undefined ||
            particle.spinCenter === undefined ||
            particle.spinDirection === undefined ||
            particle.spinAcceleration === undefined
        ) {
            return;
        }

        const updateFunc = {
            x: particle.spinDirection === RotateDirection.clockwise ? Math.cos : Math.sin,
            y: particle.spinDirection === RotateDirection.clockwise ? Math.sin : Math.cos,
        };

        particle.position.x = particle.spinCenter.x + particle.spinRadius * updateFunc.x(particle.spinAngle);
        particle.position.y = particle.spinCenter.y + particle.spinRadius * updateFunc.y(particle.spinAngle);
        particle.spinRadius += particle.spinAcceleration;

        const maxCanvasSize = Math.max(container.canvas.size.width, container.canvas.size.height);

        if (particle.spinRadius > maxCanvasSize / 2) {
            particle.spinRadius = maxCanvasSize / 2;
            particle.spinAcceleration *= -1;
        } else if (particle.spinRadius < 0) {
            particle.spinRadius = 0;
            particle.spinAcceleration *= -1;
        }

        particle.spinAngle += (moveSpeed / 100) * (1 - particle.spinRadius / maxCanvasSize);
    }

    private applyDistance(): void {
        const particle = this.particle;

        const initialPosition = particle.initialPosition;
        const { dx, dy } = NumberUtils.getDistances(initialPosition, particle.position);
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

    private applyNoise(delta: IDelta): void {
        const particle = this.particle,
            particlesOptions = particle.options,
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
            vel = particle.velocity;

        vel.horizontal += Math.cos(noise.angle) * noise.length;
        vel.vertical += Math.sin(noise.angle) * noise.length;

        if (noiseOptions.clamp) {
            vel.horizontal = NumberUtils.clamp(vel.horizontal, -1, 1);
            vel.vertical = NumberUtils.clamp(vel.vertical, -1, 1);
        }

        particle.lastNoiseTime -= particle.noiseDelay;
    }

    private moveParallax(): void {
        const container = this.container,
            options = container.options;

        if (Utils.isSsr() || !options.interactivity.events.onHover.parallax.enable) {
            return;
        }

        const particle = this.particle,
            parallaxForce = options.interactivity.events.onHover.parallax.force,
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

    private getProximitySpeedFactor(): number {
        const container = this.container,
            options = container.options,
            active = Utils.isInArray(HoverMode.slow, options.interactivity.events.onHover.mode);

        if (!active) {
            return 1;
        }

        const mousePos = this.container.interactivity.mouse.position;

        if (!mousePos) {
            return 1;
        }

        const particlePos = this.particle.getPosition(),
            dist = NumberUtils.getDistance(mousePos, particlePos),
            radius = container.retina.slowModeRadius;

        if (dist > radius) {
            return 1;
        }

        const proximityFactor = dist / radius || 0,
            slowFactor = options.interactivity.modes.slow.factor;

        return proximityFactor / slowFactor;
    }
}
