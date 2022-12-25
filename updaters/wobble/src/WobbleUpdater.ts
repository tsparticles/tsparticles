import type {
    Container,
    IDelta,
    IParticleUpdater,
    IParticlesOptions,
    Particle,
    ParticlesOptions,
    RecursivePartial,
} from "tsparticles-engine";
import { getRandom, getRangeValue } from "tsparticles-engine";
import type { IWobble } from "./Options/Interfaces/IWobble";
import { Wobble } from "./Options/Classes/Wobble";

interface IParticleWobble {
    angle: number;
    angleSpeed: number;
    moveSpeed: number;
}

/**
 * Wobble particle extension type
 */
type WobbleParticle = Particle & {
    options: WobbleParticlesOptions;

    /**
     * Particle retina cached options
     */
    retina: {
        /**
         * The particle maximum wobble distance
         */
        wobbleDistance?: number;
    };

    wobble?: IParticleWobble;
};

type IWobbleParticlesOptions = IParticlesOptions & {
    wobble?: IWobble;
};

type WobbleParticlesOptions = ParticlesOptions & {
    wobble?: Wobble;
};

/**
 * Updates particle wobbling values
 * @param particle the particle to update
 * @param delta this variable contains the delta between the current frame and the previous frame
 */
function updateWobble(particle: WobbleParticle, delta: IDelta): void {
    const wobble = particle.options.wobble;

    if (!wobble?.enable || !particle.wobble) {
        return;
    }

    const angleSpeed = particle.wobble.angleSpeed * delta.factor,
        moveSpeed = particle.wobble.moveSpeed * delta.factor,
        distance = (moveSpeed * ((particle.retina.wobbleDistance ?? 0) * delta.factor)) / (1000 / 60),
        max = 2 * Math.PI;

    particle.wobble.angle += angleSpeed;

    if (particle.wobble.angle > max) {
        particle.wobble.angle -= max;
    }

    particle.position.x += distance * Math.cos(particle.wobble.angle);
    particle.position.y += distance * Math.abs(Math.sin(particle.wobble.angle));
}

/**
 * The Wobble updater plugin
 */
export class WobbleUpdater implements IParticleUpdater {
    /**
     * The Wobble updater plugin constructor, assigns the container using the plugin
     * @param container the container using the plugin
     */
    constructor(private readonly container: Container) {}

    /**
     * Initializing the particle for wobble animation
     * @param particle the particle to init
     */
    init(particle: WobbleParticle): void {
        const wobbleOpt = particle.options.wobble;

        if (wobbleOpt?.enable) {
            particle.wobble = {
                angle: getRandom() * Math.PI * 2,
                angleSpeed: getRangeValue(wobbleOpt.speed.angle) / 360,
                moveSpeed: getRangeValue(wobbleOpt.speed.move) / 10,
            };
        } else {
            particle.wobble = {
                angle: 0,
                angleSpeed: 0,
                moveSpeed: 0,
            };
        }

        particle.retina.wobbleDistance = getRangeValue(wobbleOpt?.distance ?? 0) * this.container.retina.pixelRatio;
    }

    /**
     * Checks if the given particle needs the wobble animation
     * @param particle
     */
    isEnabled(particle: WobbleParticle): boolean {
        return !particle.destroyed && !particle.spawning && !!particle.options.wobble?.enable;
    }

    loadOptions(
        options: WobbleParticlesOptions,
        ...sources: (RecursivePartial<IWobbleParticlesOptions> | undefined)[]
    ): void {
        if (!options.wobble) {
            options.wobble = new Wobble();
        }

        for (const source of sources) {
            options.wobble.load(source?.wobble);
        }
    }

    /**
     * Updates the particle wobble animation
     * @param particle the particle to update
     * @param delta this variable contains the delta between the current frame and the previous frame
     */
    update(particle: WobbleParticle, delta: IDelta): void {
        if (!this.isEnabled(particle)) {
            return;
        }

        updateWobble(particle, delta);
    }
}
