/* -----------------------------------------------
/* Author : Matteo Bruni - www.matteobruni.it
/* MIT license: https://opensource.org/licenses/MIT
/* Demo / Generator : https://tsparticles.matteobruni.it/demo
/* GitHub : https://www.github.com/matteobruni/tsparticles
/* How to use? : Check the GitHub README
/* v1.4.6
/* ----------------------------------------------- */
import { Loader } from './classes/loader';
import { Options } from './utils/interfaces';
import { Container } from './classes/container';

'use strict';

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

window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback: () => void) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

window.cancelRequestAnimFrame = (function () {
  return window.cancelAnimationFrame ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame ||
    window.oCancelRequestAnimationFrame ||
    window.msCancelRequestAnimationFrame ||
    clearTimeout
})();

/* ---------- tsParticles functions - start ------------ */

class Main {
  load(tag_id: string, params: Options) {
    Loader.load(tag_id, params);
  }

  async loadJSON(tag_id: string, path_config_json: string) {
    await Loader.loadJSON(tag_id, path_config_json);
  }

  setOnClickHandler(callback: EventListenerOrEventListenerObject) {
    Loader.setOnClickHandler(callback);
  }

  dom() {
    return Loader.dom();
  }
}

window.tsParticles = new Main();

Object.freeze(window.tsParticles);

/* particles.js compatibility */
window.particlesJS = (tag_id: string, params: Options) => {
  if (console) {
    console.info('this method is obsolete, please use the new tsParticles.load');
  }

  window.tsParticles.load(tag_id, params);
};

window.particlesJS.load = async (tag_id: string, path_config_json: string, callback: () => void) => {
  if (console) {
    console.info('this method is obsolete, please use the new tsParticles.loadJSON');
  }

  window.tsParticles.loadJSON(tag_id, path_config_json).then(callback);
};

window.particlesJS.setOnClickHandler = function (callback: EventListenerOrEventListenerObject) {
  if (console) {
    console.info('this method is obsolete, please use the new tsParticles.setOnClickHandler');
  }

  window.tsParticles.setOnClickHandler(callback);
};

window.pJSDom = function () {
  if (console) {
    console.info('this method is obsolete, please use the new tsParticles.dom');
  }

  return window.tsParticles.dom();
};