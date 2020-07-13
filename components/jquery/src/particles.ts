import { tsParticles } from "tsparticles";
import { IOptions } from "tsparticles/dist/Options/Interfaces/IOptions";
import { Container } from "tsparticles/dist/Core/Container";

/**
 * Extend the jQuery result declaration with the example plugin.
 */
declare global {
    interface JQuery {
        /**
         * Extension of the example plugin.
         */
        particles: () => {
            init: (params: IOptions, callback: (container: Container | undefined) => Promise<void>) => void;
            ajax: (jsonUrl: string, callback: (container: Container | undefined) => Promise<void>) => void;
        };
    }
}

$.fn.particles = function () {
    const baseId = "tsparticles";

    const init = (params: IOptions, callback: (container: Container | undefined) => Promise<void>) => {
        this.each((index, element) => {
            if (element.id === undefined) {
                element.id = baseId + Math.floor(Math.random() * 1000);
            }

            tsParticles.load(element.id, params).then(callback);
        });
    };

    const ajax = (jsonUrl: string, callback: (container: Container | undefined) => Promise<void>) => {
        this.each((index, element) => {
            if (element.id === undefined) {
                element.id = baseId + Math.floor(Math.random() * 1000);
            }

            tsParticles.loadJSON(element.id, jsonUrl).then(callback);
        });
    };

    return { init, ajax };
};
