"use strict";

/* -----------------------------------------------
/* Author : Matteo Bruni - www.matteobruni.it
/* MIT license: https://opensource.org/licenses/MIT
/* Demo / Generator : https://tsparticles.matteobruni.it/demo
/* GitHub : https://www.github.com/matteobruni/tsparticles
/* How to use? : Check the GitHub README
/* v1.4.6
/* ----------------------------------------------- */
import { Container } from "./classes/container";
import { Loader } from "./classes/loader";
import { IOptions } from "./utils/interfaces";

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
    particlesJS: any;
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
    function (callback: () => void) {
      window.setTimeout(callback, 1000 / 60);
    };
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
  public load(tagId: string, params: IOptions) {
    Loader.load(tagId, params);
  }

  public async loadJSON(tagId: string, path_config_json: string) {
    await Loader.loadJSON(tagId, path_config_json);
  }

  public setOnClickHandler(callback: EventListenerOrEventListenerObject) {
    Loader.setOnClickHandler(callback);
  }

  public dom() {
    return Loader.dom();
  }

  public domItem(idx: number) {
    return this.dom()[idx];
  }
}

window.tsParticles = new Main();

Object.freeze(window.tsParticles);

/* particles.js compatibility */
window.particlesJS = (tagId: string, params: IOptions) => {
  if (console) {
    console.info("this method is obsolete, please use the new tsParticles.load");
  }

  window.tsParticles.load(tagId, params);
};

window.particlesJS.load = async (tagId: string, path_config_json: string, callback: () => void) => {
  if (console) {
    console.info("this method is obsolete, please use the new tsParticles.loadJSON");
  }

  window.tsParticles.loadJSON(tagId, path_config_json).then(callback).catch((error) => {
    console.error(error);
  });
};

window.particlesJS.setOnClickHandler = function (callback: EventListenerOrEventListenerObject) {
  if (console) {
    console.info("this method is obsolete, please use the new tsParticles.setOnClickHandler");
  }

  window.tsParticles.setOnClickHandler(callback);
};

window.pJSDom = function () {
  if (console) {
    console.info("this method is obsolete, please use the new tsParticles.dom");
  }

  return window.tsParticles.dom();
};
