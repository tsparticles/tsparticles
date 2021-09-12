import type { Container, IDelta, IParticleUpdater, Particle, IHsl, IParticleRetinaProps } from "tsparticles";
import { CanvasUtils, ColorUtils, NumberUtils, OrbitType } from "tsparticles";

type OrbitParticle = Particle & {
    orbitColor?: IHsl;
    orbitRotation?: number;
    retina: IParticleRetinaProps & {
        orbitRadius?: number;
    };
};

export class OrbitUpdater implements IParticleUpdater {
    constructor(private readonly container: Container) {}

    init(particle: OrbitParticle): void {
        /* orbit */
        const particlesOptions = particle.options;
        const orbitOptions = particlesOptions.orbit;

        if (orbitOptions.enable) {
            particle.orbitRotation = NumberUtils.getRangeValue(orbitOptions.rotation.value);

            particle.orbitColor = ColorUtils.colorToHsl(orbitOptions.color);

            particle.retina.orbitRadius =
                orbitOptions?.radius !== undefined ? orbitOptions.radius * this.container.retina.pixelRatio : undefined;
        }
    }

    isEnabled(particle: OrbitParticle): boolean {
        const orbitAnimations = particle.options.orbit.animation;

        return !particle.destroyed && !particle.spawning && orbitAnimations.enable;
    }

    update(particle: OrbitParticle, delta: IDelta): void {
        const orbitAnimations = particle.options.orbit.animation;

        if (!this.isEnabled(particle)) {
            return;
        }

        if (particle.orbitRotation === undefined) {
            particle.orbitRotation = 0;
        }

        particle.orbitRotation += (orbitAnimations.speed / (Math.PI * 2)) * delta.factor;
    }

    beforeDraw(particle: OrbitParticle): void {
        const orbitOptions = particle.options.orbit;

        if (orbitOptions.enable) {
            this.drawOrbit(particle, OrbitType.back);
        }
    }

    afterDraw(particle: OrbitParticle): void {
        const orbitOptions = particle.options.orbit;

        if (orbitOptions.enable) {
            this.drawOrbit(particle, OrbitType.front);
        }
    }

    drawOrbit(particle: OrbitParticle, type: OrbitType): void {
        const container = this.container;
        const orbitOptions = particle.options.orbit;

        let start: number;
        let end: number;

        switch (type) {
            case OrbitType.back:
                start = Math.PI / 2;
                end = (Math.PI * 3) / 2;
                break;
            case OrbitType.front:
                start = (Math.PI * 3) / 2;
                end = Math.PI / 2;
                break;
            default:
                start = 0;
                end = 2 * Math.PI;
        }

        container.canvas.draw((ctx) => {
            CanvasUtils.drawEllipse(
                ctx,
                particle,
                particle.orbitColor ?? particle.getFillColor(),
                particle.retina.orbitRadius ?? container.retina.orbitRadius ?? particle.getRadius(),
                orbitOptions.opacity,
                orbitOptions.width,
                (particle.orbitRotation ?? 0) * container.retina.pixelRatio,
                start,
                end
            );
        });
    }
}
