import {
    type Container,
    type IDelta,
    type IParticleUpdater,
    type RecursivePartial,
    getRandom,
    getRangeValue,
} from "tsparticles-engine";
import type { IWobbleParticlesOptions, WobbleParticle, WobbleParticlesOptions } from "./Types";
import { Wobble } from "./Options/Classes/Wobble";
import { updateWobble } from "./Utils";

/**
 * The Wobble updater plugin
 */
export class WobbleUpdater implements IParticleUpdater {
    /**
     * The Wobble updater plugin constructor, assigns the container using the plugin
     * @param container - the container using the plugin
     */
    constructor(private readonly container: Container) {}

    /**
     * Initializing the particle for wobble animation
     * @param particle - the particle to init
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
     * @param particle -
     * @returns true if the particle needs the wobble animation, false otherwise
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
     * @param particle - the particle to update
     * @param delta - this variable contains the delta between the current frame and the previous frame
     */
    update(particle: WobbleParticle, delta: IDelta): void {
        if (!this.isEnabled(particle)) {
            return;
        }

        updateWobble(particle, delta);
    }
}
