import { type Container, type IDelta, type IParticleUpdater, type Particle, updateColor } from "@tsparticles/engine";

export class ColorUpdater implements IParticleUpdater {
    private readonly container;

    constructor(container: Container) {
        this.container = container;
    }

    async init(particle: Particle): Promise<void> {
        /* color */
        const { rangeColorToHsl } = await import("@tsparticles/engine"),
            hslColor = rangeColorToHsl(particle.options.color, particle.id, particle.options.reduceDuplicates);

        if (hslColor) {
            const { getHslAnimationFromHsl } = await import("@tsparticles/engine");

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
        updateColor(particle.color, delta);
    }
}
