import type { ICoordinates } from "../../Core/Interfaces/ICoordinates";
import type { Container } from "../../Core/Container";
import type { Particle } from "../../Core/Particle";
import type { IRgb } from "../../Core/Interfaces/Colors";
import type { IAbsorber } from "./Options/Interfaces/IAbsorber";
import { colorToRgb, getDistance, getDistances, getStyleFromRgb, getRangeValue, isPointInside } from "../../Utils";
import type { Absorbers } from "./Absorbers";
import { RotateDirection } from "../../Enums";
import { Velocity } from "../../Core/Particle/Velocity";

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
        const options = this.options;

        if (options.draggable) {
            const mouse = this.container.interactivity.mouse;

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
        const angle = Math.atan2(dx, dy);
        const acceleration = (this.mass / Math.pow(distance, 2)) * this.container.retina.reduceFactor;

        if (distance < this.size + particle.getRadius()) {
            const sizeFactor = particle.getRadius() * 0.033 * this.container.retina.pixelRatio;

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

            this.mass += sizeFactor * this.options.size.density * this.container.retina.reduceFactor;
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

        const canvasSize = this.container.canvas.size;

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
                    particle.velocity.horizontal >= 0 ? RotateDirection.clockwise : RotateDirection.counterClockwise;
            }

            const orbitRadius = particle.absorberOrbitRadius;
            const orbitAngle = particle.absorberOrbitAngle;
            const orbitDirection = particle.absorberOrbitDirection;

            particle.velocity.horizontal = 0;
            particle.velocity.vertical = 0;

            const updateFunc = {
                x: orbitDirection === RotateDirection.clockwise ? Math.cos : Math.sin,
                y: orbitDirection === RotateDirection.clockwise ? Math.sin : Math.cos,
            };

            particle.position.x = this.position.x + orbitRadius * updateFunc.x(orbitAngle);
            particle.position.y = this.position.y + orbitRadius * updateFunc.y(orbitAngle);

            particle.absorberOrbitRadius -= acceleration;
            particle.absorberOrbitAngle +=
                ((particle.moveSpeed ?? this.container.retina.moveSpeed) / 100) * this.container.retina.reduceFactor;
        } else {
            const addV = new Velocity(0, 0);

            addV.angle = angle;
            addV.length = acceleration;

            particle.velocity.addTo(addV);
        }
    }
}
