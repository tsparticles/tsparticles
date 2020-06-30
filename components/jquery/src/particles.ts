import $ from "jquery";
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
        particles: () => void;
    }
}

$.fn.particles = () => {
    const init = (params: IOptions, callback: (container: Container | undefined) => Promise<void>) => {
        $.fn.each((index, element) => {
            if (element.id === undefined) {
                element.id = "tsparticles" + Math.floor(Math.random() * 1000);
            }

            tsParticles.load(element.id, params).then(callback);
        });
    };

    const ajax = (jsonUrl: string, callback: (container: Container | undefined) => Promise<void>) => {
        $.fn.each((index, element) => {
            if (element.id === undefined) {
                element.id = "tsparticles" + Math.floor(Math.random() * 1000);
            }

            tsParticles.loadJSON(element.id, jsonUrl).then(callback);
        });
    };

    return { init, ajax };
};
