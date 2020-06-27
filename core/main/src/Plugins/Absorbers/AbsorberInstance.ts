import type { ICoordinates } from "../../Core/Interfaces/ICoordinates";
import type { Container } from "../../Core/Container";
import type { Particle } from "../../Core/Particle";
import type { IRgb } from "../../Core/Interfaces/IRgb";
import type { IAbsorber } from "./Options/Interfaces/IAbsorber";
import { ColorUtils, Utils } from "../../Utils";
import type { Absorbers } from "./Absorbers";

type OrbitingParticle = Particle & {
    orbitRadius?: number;
    orbitAngle?: number;
    needsNewPosition?: boolean;
};

export class AbsorberInstance {
    public color: IRgb;
    public limit?: number;
    public mass: number;
    public opacity: number;
    public position: ICoordinates;
    public size: number;

    private readonly initialPosition?: ICoordinates;
    private readonly options: IAbsorber;
    private dragging: boolean;

    constructor(
        private readonly absorbers: Absorbers,
        private readonly container: Container,
        options: IAbsorber,
        position?: ICoordinates
    ) {
        this.initialPosition = position;
        this.options = options;
        this.dragging = false;

        let size = options.size.value * container.retina.pixelRatio;
        const random = typeof options.size.random === "boolean" ? options.size.random : options.size.random.enable;
        const minSize = typeof options.size.random === "boolean" ? 1 : options.size.random.minimumValue;

        if (random) {
            size = Utils.randomInRange(minSize, size);
        }

        this.opacity = this.options.opacity;
        this.size = size * container.retina.pixelRatio;
        this.mass = this.size * options.size.density;

        const limit = options.size.limit;

        this.limit = limit !== undefined ? limit * container.retina.pixelRatio : limit;

        const color = typeof options.color === "string" ? { value: options.color } : options.color;

        this.color = ColorUtils.colorToRgb(color) ?? {
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
                const mouseDist = Utils.getDistance(this.position, mouse.downPosition);

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
        const { dx, dy, distance } = Utils.getDistances(this.position, pos);
        const angle = Math.atan2(dx, dy);
        const acceleration = this.mass / Math.pow(distance, 2);

        if (distance < this.size + particle.size.value) {
            const sizeFactor = particle.size.value * 0.033 * this.container.retina.pixelRatio;

            if (this.size > particle.size.value && distance < this.size - particle.size.value) {
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

            this.mass += sizeFactor * this.options.size.density;
        } else {
            this.updateParticlePosition(particle, angle, acceleration);
        }
    }

    public resize(): void {
        const initialPosition = this.initialPosition;

        this.position =
            initialPosition && Utils.isPointInside(initialPosition, this.container.canvas.size)
                ? initialPosition
                : this.calcPosition();
    }

    public draw(context: CanvasRenderingContext2D): void {
        context.translate(this.position.x, this.position.y);
        context.beginPath();
        context.arc(0, 0, this.size, 0, Math.PI * 2, false);
        context.closePath();
        context.fillStyle = ColorUtils.getStyleFromRgb(this.color, this.opacity);
        context.fill();
    }

    private calcPosition(): ICoordinates {
        const container = this.container;

        const percentPosition = this.options.position ?? {
            x: Math.random() * 100,
            y: Math.random() * 100,
        };

        return {
            x: (percentPosition.x / 100) * container.canvas.size.width,
            y: (percentPosition.y / 100) * container.canvas.size.height,
        };
    }

    private updateParticlePosition(particle: OrbitingParticle, angle: number, acceleration: number): void {
        if (particle.destroyed) {
            return;
        }

        const canvasSize = this.container.canvas.size;

        if (particle.needsNewPosition) {
            const pSize = particle.size.value;
            particle.position.x = Math.random() * (canvasSize.width - pSize * 2) + pSize;
            particle.position.y = Math.random() * (canvasSize.height - pSize * 2) + pSize;
            particle.needsNewPosition = false;
        }

        if (this.options.orbits) {
            if (particle.orbitRadius === undefined) {
                particle.orbitRadius = Utils.getDistance(particle.getPosition(), this.position);
            }

            if (particle.orbitRadius <= this.size && !this.options.destroy) {
                particle.orbitRadius = Math.random() * Math.max(canvasSize.width, canvasSize.height);
            }

            if (particle.orbitAngle === undefined) {
                particle.orbitAngle = Math.random() * Math.PI * 2;
            }

            const orbitRadius = particle.orbitRadius;
            const orbitAngle = particle.orbitAngle;

            particle.velocity.horizontal = 0;
            particle.velocity.vertical = 0;

            particle.position.x = this.position.x + orbitRadius * Math.cos(orbitAngle);
            particle.position.y = this.position.y + orbitRadius * Math.sin(orbitAngle);

            particle.orbitRadius -= acceleration;
            particle.orbitAngle += (particle.moveSpeed ?? this.container.retina.moveSpeed) / 100;
        } else {
            particle.velocity.horizontal += Math.sin(angle) * acceleration;
            particle.velocity.vertical += Math.cos(angle) * acceleration;
        }
    }
}
