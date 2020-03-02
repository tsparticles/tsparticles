"use strict";

/* -----------------------------------------------
/* Author : Matteo Bruni - www.matteobruni.it
/* MIT license: https://opensource.org/licenses/MIT
/* Demo / Generator : https://tsparticles.matteobruni.it/demo
/* GitHub : https://www.github.com/matteobruni/tsparticles
/* How to use? : Check the GitHub README
/* v1.7.0
/* ----------------------------------------------- */
import {Container} from "./Classes/Container";
import {Loader} from "./Classes/Loader";
import {IOptions} from "./Interfaces/IOptions";
import {IParticlesJs} from "./Interfaces/IParticlesJs";
import {ParticlesJS} from "./support";

declare global {
    interface Window {
        requestAnimFrame: (callback: FrameRequestCallback) => number;
        mozRequestAnimationFrame: (callback: FrameRequestCallback) => number;
        oRequestAnimationFrame: (callback: FrameRequestCallback) => number;
        msRequestAnimationFrame: (callback: FrameRequestCallback) => number;
        cancelRequestAnimFrame: (handle: number) => void;
        webkitCancelRequestAnimationFrame: (handle: number) => void;
        mozCancelRequestAnimationFrame: (handle: number) => void;
        oCancelRequestAnimationFrame: (handle: number) => void;
        msCancelRequestAnimationFrame: (handle: number) => void;
        particlesJS: IParticlesJs;
        tsParticles: Main;
        pJSDom: () => Container[];
    }
}

/* ---------- global functions - vendors ------------ */

window.requestAnimFrame = (() => {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        ((callback) => window.setTimeout(callback, 1000 / 60));
})();

window.cancelRequestAnimFrame = (() => {
    return window.cancelAnimationFrame ||
        window.webkitCancelRequestAnimationFrame ||
        window.mozCancelRequestAnimationFrame ||
        window.oCancelRequestAnimationFrame ||
        window.msCancelRequestAnimationFrame ||
        clearTimeout
})();

/* ---------- tsParticles functions - start ------------ */

class Main {
    public loadFromArray(tagId: string, params: Array<IOptions>, index?: number): Container | undefined {
        return Loader.loadFromArray(tagId, params, index);
    }

    public load(tagId: string, params: IOptions): Container | undefined {
        return Loader.load(tagId, params);
    }

    public loadJSON(tagId: string, pathConfigJson: string): Promise<Container | undefined> {
        return Loader.loadJSON(tagId, pathConfigJson);
    }

    public setOnClickHandler(callback: EventListenerOrEventListenerObject): void {
        Loader.setOnClickHandler(callback);
    }

    public dom(): Container[] {
        return Loader.dom();
    }

    public domItem(idx: number): Container {
        return Loader.domItem(idx);
    }
}

window.tsParticles = new Main();

Object.freeze(window.tsParticles);

/* particles.js compatibility */
/*
 * @deprecated this method is obsolete, please use the new tsParticles.load
 */
window.particlesJS = (tagId: string, params: IOptions) => ParticlesJS.load(tagId, params);

/*
 * @deprecated this method is obsolete, please use the new tsParticles.loadJSON
 */
window.particlesJS.load = (tagId: string, pathConfigJson: string, callback: (container: Container) => void) =>
    ParticlesJS.loadJson(tagId, pathConfigJson, callback);

/*
 * @deprecated this method is obsolete, please use the new tsParticles.setOnClickHandler
 */
window.particlesJS.setOnClickHandler = (callback: EventListenerOrEventListenerObject) =>
    ParticlesJS.setOnClickHandler(callback);

/*
 * @deprecated this method is obsolete, please use the new tsParticles.dom
 */
window.pJSDom = () => {
    if (console) {
        console.warn("this method is obsolete, please use the new tsParticles.dom");
    }

    return window.tsParticles.dom();
};
