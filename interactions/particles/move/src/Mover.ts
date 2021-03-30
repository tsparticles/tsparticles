import {
    clamp,
    getDistance,
    getDistances,
    getRangeMax,
    getRangeValue,
    HoverMode,
    isInArray,
    ParticlesInteractorBase,
    Plugins,
    RotateDirection,
    Vector,
} from "tsparticles-engine";
import type { Container, IDelta, Particle } from "tsparticles-engine";

function applyDistance(particle: Particle): void {
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

type PathParticle = Particle & {
    lastPathTime: number;
};

export class Mover extends ParticlesInteractorBase {
    constructor(container: Container) {
        super(container);
    }

    public interact(particle: PathParticle, delta: IDelta): void {
        const moveOptions = particle.options.move;

        if (!moveOptions.enable) {
            return;
        }

        if (!particle.lastPathTime) {
            particle.lastPathTime = 0;
        }

        const container = this.container,
            slowFactor = this.getProximitySpeedFactor(particle),
            baseSpeed = particle.moveSpeed * container.retina.pixelRatio * container.retina.reduceFactor,
            moveDrift = particle.moveDrift ?? getRangeValue(particle.options.move.drift) * container.retina.pixelRatio,
            sizeValue = particle.options.size.value,
            maxSize = getRangeMax(sizeValue) * container.retina.pixelRatio,
            sizeFactor = moveOptions.size ? particle.getRadius() / maxSize : 1,
            diffFactor = 2,
            speedFactor = (sizeFactor * slowFactor * delta.factor) / diffFactor,
            moveSpeed = baseSpeed * speedFactor;

        this.applyPath(particle, delta);

        const gravityOptions = moveOptions.gravity;

        particle.velocity.x += (moveDrift * delta.factor) / (60 * moveSpeed);

        particle.velocity.multTo(1 - particle.options.move.decay);

        if (gravityOptions.enable) {
            particle.velocity.y += (gravityOptions.acceleration * delta.factor) / (60 * moveSpeed);
        }

        const velocity = particle.velocity.mult(moveSpeed);

        if (gravityOptions.enable && velocity.y >= gravityOptions.maxSpeed && gravityOptions.maxSpeed > 0) {
            velocity.y = gravityOptions.maxSpeed;

            particle.velocity.y = velocity.y / moveSpeed;
        }

        const zIndexOptions = particle.options.zIndex,
            zVelocityFactor = 1 - zIndexOptions.velocityRate * particle.zIndexFactor;

        if (moveOptions.spin.enable) {
            this.spin(particle, moveSpeed);
        } else {
            velocity.multTo(zVelocityFactor);

            particle.position.addTo(velocity);

            if (moveOptions.vibrate) {
                const vibrateVelocity = Vector.create(
                    Math.cos(particle.position.y * Math.sin(particle.position.x) * zVelocityFactor),
                    Math.sin(particle.position.x * Math.cos(particle.position.y) * zVelocityFactor)
                );

                particle.position.addTo(vibrateVelocity);
            }
        }

        applyDistance(particle);
    }

    public isEnabled(particle: Particle): boolean {
        return particle.options.move.enable;
    }

    public reset(particle: Particle): void {
        particle.bubble.inRange = false;
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

    private applyPath(particle: PathParticle, delta: IDelta): void {
        const particlesOptions = particle.options,
            pathOptions = particlesOptions.move.path,
            pathEnabled = pathOptions.enable;

        if (!pathEnabled) {
            return;
        }

        const container = this.container;

        if (particle.lastPathTime <= particle.pathDelay) {
            particle.lastPathTime += delta.value;

            return;
        }

        let generator = container.pathGenerator;

        if (pathOptions.generator) {
            const customGenerator = Plugins.getPathGenerator(pathOptions.generator);

            if (customGenerator) {
                generator = customGenerator;
            }
        }

        const path = generator.generate(particle),
            vel = particle.velocity,
            pathVel = Vector.origin;

        pathVel.length = path.length;
        pathVel.angle = path.angle;

        vel.addTo(pathVel);

        if (pathOptions.clamp) {
            vel.x = clamp(vel.x, -1, 1);
            vel.y = clamp(vel.y, -1, 1);
        }

        particle.lastPathTime -= particle.pathDelay;
    }

    private getProximitySpeedFactor(particle: Particle): number {
        const container = this.container,
            options = container.actualOptions,
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
