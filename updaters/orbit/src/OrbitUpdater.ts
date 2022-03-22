import type { Container, IDelta, IParticleUpdater, Particle, IHsl, IParticleRetinaProps } from "tsparticles";
import { colorToHsl, drawEllipse, getRangeValue, OrbitType } from "tsparticles";

type OrbitParticle = Particle & {
    orbitColor?: IHsl;
    orbitRotation?: number;
    retina: IParticleRetinaProps & {
        orbitRadius?: number;
    };
    orbitAnimationSpeed?: number;
    orbitOpacity?: number;
    orbitWidth?: number;
};

export class OrbitUpdater implements IParticleUpdater {
    constructor(private readonly container: Container) {}

    init(particle: OrbitParticle): void {
        /* orbit */
        const particlesOptions = particle.options;
        const orbitOptions = particlesOptions.orbit;

        if (orbitOptions.enable) {
            particle.orbitRotation = getRangeValue(orbitOptions.rotation.value);
            particle.orbitColor = colorToHsl(orbitOptions.color);
            particle.retina.orbitRadius =
                orbitOptions?.radius !== undefined
                    ? getRangeValue(orbitOptions.radius) * this.container.retina.pixelRatio
                    : undefined;
            particle.orbitAnimationSpeed = orbitOptions.animation.enable
                ? getRangeValue(orbitOptions.animation.speed)
                : 0;
            particle.orbitWidth = getRangeValue(orbitOptions.width);
            particle.orbitOpacity = getRangeValue(orbitOptions.opacity);
        }
    }

    isEnabled(particle: OrbitParticle): boolean {
        const orbitAnimations = particle.options.orbit.animation;

        return !particle.destroyed && !particle.spawning && orbitAnimations.enable;
    }

    update(particle: OrbitParticle, delta: IDelta): void {
        if (!this.isEnabled(particle)) {
            return;
        }

        if (particle.orbitRotation === undefined) {
            particle.orbitRotation = 0;
        }

        particle.orbitRotation += (particle.orbitAnimationSpeed ?? 0 / (Math.PI * 2)) * delta.factor;
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
            drawEllipse(
                ctx,
                particle,
                particle.orbitColor ?? particle.getFillColor(),
                particle.retina.orbitRadius ?? container.retina.orbitRadius ?? particle.getRadius(),
                particle.orbitOpacity ?? 1,
                particle.orbitWidth ?? 1,
                (particle.orbitRotation ?? 0) * container.retina.pixelRatio,
                start,
                end
            );
        });
    }
}
