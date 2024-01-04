import {
    type Container,
    type IDelta,
    type IParticleUpdater,
    type Particle,
    getHslAnimationFromHsl,
    getRangeValue,
    itemFromSingleOrMultiple,
    rangeColorToHsl,
    updateColor,
} from "@tsparticles/engine";
import type { StrokeParticle } from "./Types.js";

const defaultOpacity = 1;

export class StrokeColorUpdater implements IParticleUpdater {
    private readonly container;

    constructor(container: Container) {
        this.container = container;
    }

    init(particle: StrokeParticle): void {
        const container = this.container,
            options = particle.options;

        /* strokeColor */
        const stroke = itemFromSingleOrMultiple(options.stroke, particle.id, options.reduceDuplicates);

        particle.strokeWidth = getRangeValue(stroke.width) * container.retina.pixelRatio;
        particle.strokeOpacity = getRangeValue(stroke.opacity ?? defaultOpacity);
        particle.strokeAnimation = stroke.color?.animation;

        const strokeHslColor = rangeColorToHsl(stroke.color) ?? particle.getFillColor();

        if (strokeHslColor) {
            particle.strokeColor = getHslAnimationFromHsl(
                strokeHslColor,
                particle.strokeAnimation,
                container.retina.reduceFactor,
            );
        }
    }

    isEnabled(particle: StrokeParticle): boolean {
        const color = particle.strokeAnimation,
            { strokeColor } = particle;

        return (
            !particle.destroyed &&
            !particle.spawning &&
            !!color &&
            ((strokeColor?.h.value !== undefined && strokeColor.h.enable) ||
                (strokeColor?.s.value !== undefined && strokeColor.s.enable) ||
                (strokeColor?.l.value !== undefined && strokeColor.l.enable))
        );
    }

    update(particle: Particle, delta: IDelta): void {
        if (!this.isEnabled(particle)) {
            return;
        }

        updateColor(particle.strokeColor, delta);
    }
}
