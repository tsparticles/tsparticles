import type { Container, ICoordinates, IRgb } from "tsparticles-engine";
import type { IAbsorber } from "./Options/Interfaces/IAbsorber";
import {
    colorToRgb,
    getDistance,
    getDistances,
    getStyleFromRgb,
    getRangeValue,
    isPointInside,
    RotateDirection,
    Particle,
    Vector,
} from "tsparticles-engine";
import type { Absorbers } from "./Absorbers";

type OrbitingParticle = Particle & {
    absorberOrbitRadius?: number;
    absorberOrbitAngle?: number;
    absorberOrbitDirection?: RotateDirection;
    needsNewPosition?: boolean;
};

/**
 * @category Absorbers Plugin
 */
export class AbsorberInstance {
    public mass;
    public opacity;
    public size;

    public color: IRgb;
    public limit?: number;
    public readonly name?: string;
    public position: ICoordinates;

    private dragging;

    private readonly initialPosition?: ICoordinates;
    private readonly options: IAbsorber;

    constructor(
        private readonly absorbers: Absorbers,
        private readonly container: Container,
        options: IAbsorber,
        position?: ICoordinates
    ) {
        this.initialPosition = position;
        this.options = options;
        this.dragging = false;

        this.name = this.options.name;
        this.opacity = this.options.opacity;
        this.size = getRangeValue(options.size.value) * container.retina.pixelRatio;
        this.mass = this.size * options.size.density * container.retina.reduceFactor;

        const limit = options.size.limit;

        this.limit = limit !== undefined ? limit * container.retina.pixelRatio * container.retina.reduceFactor : limit;

        const color = typeof options.color === "string" ? { value: options.color } : options.color;

        this.color = colorToRgb(color) ?? {
            b: 0,
            g: 0,
            r: 0,
        };

        this.position = this.initialPosition ?? this.calcPosition();
    }

    public attract(particle: OrbitingParticle): void {
        const container = this.container;
        const options = this.options;

        if (options.draggable) {
            const mouse = container.interactivity.mouse;

            if (mouse.clicking && mouse.downPosition) {
                const mouseDist = getDistance(this.position, mouse.downPosition);

                if (mouseDist <= this.size) {
                    this.dragging = true;
                }
            } else {
                this.dragging = false;
            }

            if (this.dragging && mouse.position) {
                this.position.x = mouse.position.x;
                this.position.y = mouse.position.y;
            }
        }

        const pos = particle.getPosition();
        const { dx, dy, distance } = getDistances(this.position, pos);
        const angle = Math.atan2(dy, dx);
        const acceleration = (this.mass / Math.pow(distance, 2)) * container.retina.reduceFactor;

        if (distance < this.size + particle.getRadius()) {
            const sizeFactor = particle.getRadius() * 0.033 * container.retina.pixelRatio;

            if (
                (this.size > particle.getRadius() && distance < this.size - particle.getRadius()) ||
                (particle.absorberOrbitRadius !== undefined && particle.absorberOrbitRadius < 0)
            ) {
                if (options.destroy) {
                    particle.destroy();
                } else {
                    particle.needsNewPosition = true;

                    this.updateParticlePosition(particle, angle, acceleration);
                }
            } else {
                if (options.destroy) {
                    particle.size.value -= sizeFactor;
                }

                this.updateParticlePosition(particle, angle, acceleration);
            }

            if (this.limit === undefined || this.size < this.limit) {
                this.size += sizeFactor;
            }

            this.mass += sizeFactor * this.options.size.density * container.retina.reduceFactor;
        } else {
            this.updateParticlePosition(particle, angle, acceleration);
        }
    }

    public resize(): void {
        const initialPosition = this.initialPosition;

        this.position =
            initialPosition && isPointInside(initialPosition, this.container.canvas.size)
                ? initialPosition
                : this.calcPosition();
    }

    public draw(context: CanvasRenderingContext2D): void {
        context.translate(this.position.x, this.position.y);
        context.beginPath();
        context.arc(0, 0, this.size, 0, Math.PI * 2, false);
        context.closePath();
        context.fillStyle = getStyleFromRgb(this.color, this.opacity);
        context.fill();
    }

    private calcPosition(): ICoordinates {
        const container = this.container;

        const percentPosition = this.options.position;

        return {
            x: ((percentPosition?.x ?? Math.random() * 100) / 100) * container.canvas.size.width,
            y: ((percentPosition?.y ?? Math.random() * 100) / 100) * container.canvas.size.height,
        };
    }

    private updateParticlePosition(particle: OrbitingParticle, angle: number, acceleration: number): void {
        if (particle.destroyed) {
            return;
        }

        const container = this.container;
        const canvasSize = container.canvas.size;

        if (particle.needsNewPosition) {
            const pSize = particle.getRadius();
            particle.position.x = (canvasSize.width - pSize * 2) * (1 + (Math.random() * 0.2 - 0.1)) + pSize;
            particle.position.y = (canvasSize.height - pSize * 2) * (1 + (Math.random() * 0.2 - 0.1)) + pSize;
            particle.needsNewPosition = false;
        }

        if (this.options.orbits) {
            if (particle.absorberOrbitRadius === undefined) {
                particle.absorberOrbitRadius = getDistance(particle.getPosition(), this.position);
            }

            if (particle.absorberOrbitRadius <= this.size && !this.options.destroy) {
                const minSize = Math.min(canvasSize.width, canvasSize.height);

                particle.absorberOrbitRadius = minSize * (1 + (Math.random() * 0.2 - 0.1));
            }

            if (particle.absorberOrbitAngle === undefined) {
                particle.absorberOrbitAngle = Math.random() * Math.PI * 2;
            }

            if (particle.absorberOrbitDirection === undefined) {
                particle.absorberOrbitDirection =
                    particle.velocity.x >= 0 ? RotateDirection.clockwise : RotateDirection.counterClockwise;
            }

            const orbitRadius = particle.absorberOrbitRadius;
            const orbitAngle = particle.absorberOrbitAngle;
            const orbitDirection = particle.absorberOrbitDirection;

            particle.velocity.x = 0;
            particle.velocity.y = 0;

            const updateFunc = {
                x: orbitDirection === RotateDirection.clockwise ? Math.cos : Math.sin,
                y: orbitDirection === RotateDirection.clockwise ? Math.sin : Math.cos,
            };

            particle.position.x = this.position.x + orbitRadius * updateFunc.x(orbitAngle);
            particle.position.y = this.position.y + orbitRadius * updateFunc.y(orbitAngle);

            particle.absorberOrbitRadius -= acceleration;
            particle.absorberOrbitAngle +=
                ((particle.moveSpeed * container.retina.pixelRatio) / 100) * container.retina.reduceFactor;
        } else {
            const addV = Vector.origin;

            addV.length = acceleration;
            addV.angle = angle;

            particle.velocity.addTo(addV);
        }
    }
}
