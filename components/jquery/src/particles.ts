import { tsParticles, getRandom } from "tsparticles-engine";
import type { ISourceOptions, Container } from "tsparticles-engine";

/**
 * Extend the jQuery result declaration with the example plugin.
 */
type ParticlesResult = {
    init: (options: ISourceOptions, callback: (container: Container | undefined) => Promise<void>) => void;
    ajax: (jsonUrl: string, callback: (container: Container | undefined) => Promise<void>) => void;
};

export type IParticlesProps = ISourceOptions;

declare global {
    interface JQuery {
        /**
         * Extension of the example plugin.
         */
        particles: () => ParticlesResult;
    }
}

$.fn.particles = function (): ParticlesResult {
    const baseId = "tsparticles";

    const init = (options: IParticlesProps, callback: (container: Container | undefined) => Promise<void>): void => {
        this.each((index, element) => {
            if (element.id === undefined) {
                element.id = baseId + Math.floor(getRandom() * 1000);
            }

            tsParticles.load(element.id, options).then(callback);
        });
    };

    const ajax = (jsonUrl: string, callback: (container: Container | undefined) => Promise<void>): void => {
        this.each((index, element) => {
            if (element.id === undefined) {
                element.id = baseId + Math.floor(getRandom() * 1000);
            }

            tsParticles.loadJSON(element.id, jsonUrl).then(callback);
        });
    };

    return { init, ajax };
};
