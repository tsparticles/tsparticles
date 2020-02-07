/* -----------------------------------------------
/* Author : Vincent Garreau  - vincentgarreau.com
/* MIT license: http://opensource.org/licenses/MIT
/* Demo / Generator : vincentgarreau.com/particles.js
/* GitHub : github.com/VincentGarreau/particles.js
/* How to use? : Check the GitHub README
/* v2.0.1
/* ----------------------------------------------- */
import { pJSLoader } from './pjsloader';
import { pJSOptions } from './pjsinterfaces';
import { pJSContainer } from './pjscontainer';

'use strict';

declare global {
  interface Window {
    requestAnimFrame: (callback: FrameRequestCallback) => number,
    mozRequestAnimationFrame: (callback: FrameRequestCallback) => number,
    oRequestAnimationFrame: (callback: FrameRequestCallback) => number,
    msRequestAnimationFrame: (callback: FrameRequestCallback) => number,
    cancelRequestAnimFrame: (handle: number) => void,
    webkitCancelRequestAnimationFrame: (handle: number) => void,
    mozCancelRequestAnimationFrame: (handle: number) => void,
    oCancelRequestAnimationFrame: (handle: number) => void,
    msCancelRequestAnimationFrame: (handle: number) => void,
    particlesJS: any,
    pJSDom: () => pJSContainer[]
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

/* ---------- particles.js functions - start ------------ */

window.particlesJS = (tag_id: string = 'particles-js', params: pJSOptions) => {
  pJSLoader.load(tag_id, params);
};

window.particlesJS.load = async (tag_id: string, path_config_json: string, callback: () => void) => {
  await pJSLoader.loadJSON(tag_id, path_config_json, callback);
}

window.pJSDom = function () {
  return pJSLoader.pJSDom();
}