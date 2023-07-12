import {
    type Container,
    type IDelta,
    type IParticleUpdater,
    type Particle,
    getHslAnimationFromHsl,
    rangeColorToHsl,
} from "tsparticles-engine";
import { updateColor } from "./Utils";

export class ColorUpdater implements IParticleUpdater {
    constructor(private readonly container: Container) {}

    init(particle: Particle): void {
        /* color */
        const hslColor = rangeColorToHsl(particle.options.color, particle.id, particle.options.reduceDuplicates);

        if (hslColor) {
            particle.color = getHslAnimationFromHsl(
                hslColor,
                particle.options.color.animation,
                this.container.retina.reduceFactor,
            );
        }
    }

    isEnabled(particle: Particle): boolean {
        const { h: hAnimation, s: sAnimation, l: lAnimation } = particle.options.color.animation,
            { color } = particle;

        return (
            !particle.destroyed &&
            !particle.spawning &&
            ((color?.h.value !== undefined && hAnimation.enable) ||
                (color?.s.value !== undefined && sAnimation.enable) ||
                (color?.l.value !== undefined && lAnimation.enable))
        );
    }

    update(particle: Particle, delta: IDelta): void {
        updateColor(particle, delta);
    }
}
