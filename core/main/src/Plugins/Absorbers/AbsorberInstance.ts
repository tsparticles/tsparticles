import type { ICoordinates } from "../../Core/Interfaces/ICoordinates";
import type { Container } from "../../Core/Container";
import type { Particle } from "../../Core/Particle";
import type { IRgb } from "../../Core/Interfaces/Colors";
import type { IAbsorber } from "./Options/Interfaces/IAbsorber";
import { ColorUtils, NumberUtils, Utils } from "../../Utils";
import type { Absorbers } from "./Absorbers";
import { Vector } from "../../Core/Particle/Vector";

type OrbitingParticle = Particle & {
    orbit?: Vector;
    needsNewPosition?: boolean;
};

/**
 * @category Absorbers Plugin
 */
export class AbsorberInstance {
    mass;
    opacity;
    size;

    color: IRgb;
    limit?: number;
    readonly name?: string;
    position: Vector;

    private dragging;

    private readonly initialPosition?: Vector;
    private readonly options: IAbsorber;

    constructor(
        private readonly absorbers: Absorbers,
        private readonly container: Container,
        options: IAbsorber,
        position?: ICoordinates
    ) {
        this.initialPosition = position ? Vector.create(position.x, position.y) : undefined;
        this.options = options;
        this.dragging = false;

        this.name = this.options.name;
        this.opacity = this.options.opacity;
        this.size = NumberUtils.getValue(options.size) * container.retina.pixelRatio;
        this.mass = this.size * options.size.density * container.retina.reduceFactor;

        const limit = options.size.limit;

        this.limit = limit !== undefined ? limit * container.retina.pixelRatio * container.retina.reduceFactor : limit;

        const color = typeof options.color === "string" ? { value: options.color } : options.color;

        this.color = ColorUtils.colorToRgb(color) ?? {
            b: 0,
            g: 0,
            r: 0,
        };

        this.position = this.initialPosition?.copy() ?? this.calcPosition();
    }

    attract(particle: OrbitingParticle): void {
        const options = this.options;

        if (options.draggable) {
            const mouse = this.container.interactivity.mouse;

            if (mouse.clicking && mouse.downPosition) {
                const mouseDist = NumberUtils.getDistance(this.position, mouse.downPosition);

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
        const { dx, dy, distance } = NumberUtils.getDistances(this.position, pos);
        const v = Vector.create(dx, dy);

        v.length = (this.mass / Math.pow(distance, 2)) * this.container.retina.reduceFactor;

        if (distance < this.size + particle.getRadius()) {
            const sizeFactor = particle.getRadius() * 0.033 * this.container.retina.pixelRatio;

            if (this.size > particle.getRadius() && distance < this.size - particle.getRadius()) {
                if (options.destroy) {
                    particle.destroy();
                } else {
                    particle.needsNewPosition = true;

                    this.updateParticlePosition(particle, v);
                }
            } else {
                if (options.destroy) {
                    particle.size.value -= sizeFactor;
                }

                this.updateParticlePosition(particle, v);
            }

            if (this.limit === undefined || this.size < this.limit) {
                this.size += sizeFactor;
            }

            this.mass += sizeFactor * this.options.size.density * this.container.retina.reduceFactor;
        } else {
            this.updateParticlePosition(particle, v);
        }
    }

    resize(): void {
        const initialPosition = this.initialPosition;

        this.position =
            initialPosition && Utils.isPointInside(initialPosition, this.container.canvas.size)
                ? initialPosition
                : this.calcPosition();
    }

    draw(context: CanvasRenderingContext2D): void {
        context.translate(this.position.x, this.position.y);
        context.beginPath();
        context.arc(0, 0, this.size, 0, Math.PI * 2, false);
        context.closePath();
        context.fillStyle = ColorUtils.getStyleFromRgb(this.color, this.opacity);
        context.fill();
    }

    private calcPosition(): Vector {
        const container = this.container;
        const percentPosition = this.options.position;

        return Vector.create(
            ((percentPosition?.x ?? Math.random() * 100) / 100) * container.canvas.size.width,
            ((percentPosition?.y ?? Math.random() * 100) / 100) * container.canvas.size.height
        );
    }

    private updateParticlePosition(particle: OrbitingParticle, v: Vector): void {
        if (particle.destroyed) {
            return;
        }

        const canvasSize = this.container.canvas.size;

        if (particle.needsNewPosition) {
            const pSize = particle.getRadius();
            particle.position.x = Math.random() * (canvasSize.width - pSize * 2) + pSize;
            particle.position.y = Math.random() * (canvasSize.height - pSize * 2) + pSize;
            particle.needsNewPosition = false;
        }

        if (this.options.orbits) {
            if (particle.orbit === undefined) {
                particle.orbit = Vector.create(0, 0);

                particle.orbit.length = NumberUtils.getDistance(particle.getPosition(), this.position);
                particle.orbit.angle = Math.random() * Math.PI * 2;
            }

            if (particle.orbit.length <= this.size && !this.options.destroy) {
                particle.orbit.length = Math.random() * Math.max(canvasSize.width, canvasSize.height);
            }

            particle.velocity.x = 0;
            particle.velocity.y = 0;

            particle.position.setTo(particle.orbit.add(this.position));

            particle.orbit.length -= v.length;
            particle.orbit.angle +=
                ((particle.moveSpeed ??
                    NumberUtils.getRangeValue(particle.options.move.speed) * this.container.retina.pixelRatio) /
                    100) *
                this.container.retina.reduceFactor;
        } else {
            particle.velocity.addTo(v);
        }
    }
}
