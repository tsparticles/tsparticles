import { Container } from '../classes/container';
import { Options } from './interfaces';
import { Constants } from './constants';

'use strict';

let tsParticlesDom: Container[] = [];

export class Loader {
  static tsParticlesDom() {
    if (!tsParticlesDom) {
      Loader.tsParticlesDomSet([]);
    }

    return tsParticlesDom;
  }

  static tsParticlesDomSet(value: Container[]) {
    tsParticlesDom = value;
  }

  static load(tag_id: string, params: Options) {
    /* pJS elements */
    let pJS_tag = document.getElementById(tag_id);

    if (pJS_tag) {
      let exist_canvas = pJS_tag.getElementsByClassName(Constants.canvasClass);

      /* remove canvas if exists into the pJS target tag */
      if (exist_canvas.length) {
        while (exist_canvas.length > 0) {
          pJS_tag.removeChild(exist_canvas[0]);
        }
      }
    }

    /* create canvas element */
    let canvas_el = document.createElement('canvas');

    canvas_el.className = Constants.canvasClass;

    /* set size canvas */
    canvas_el.style.width = "100%";
    canvas_el.style.height = "100%";

    /* append canvas */
    let canvas = document.getElementById(tag_id)?.appendChild(canvas_el);

    /* launch particle.js */
    if (canvas != null) {
      let pjs = new Container(tag_id, params);
      let found = false;

      for (let idx = 0; idx < Loader.tsParticlesDom().length; idx++) {
        if (Loader.tsParticlesDom()[idx].canvas.tag_id == tag_id) {
          found = true;
          Loader.tsParticlesDom()[idx] = pjs;
        }
      }

      if (!found)
        Loader.tsParticlesDom().push(pjs);

      return pjs;
    }
  }

  static async loadJSON(tag_id: string, path_config_json: string, callback: () => void) {
    /* load json config */
    const response = await fetch(path_config_json);

    if (response.ok) {
      const params = await response.json();

      Loader.load(tag_id, params);

      if (callback)
        callback();
    } else {
      console.error(`Error pJS - fetch status: ${response.status}`);
      console.error('Error pJS - File config not found');
    }
  };

  static setOnClickHandler(callback: EventListenerOrEventListenerObject) {
    let tsParticlesDom = Loader.tsParticlesDom();
    if (tsParticlesDom.length == 0) {
      throw new Error("Can only set click handlers after calling tsParticles.load() or tsParticles.loadJSON()");
    }
    for (var i = 0; i < tsParticlesDom.length; i++) {
      let el = tsParticlesDom[i].interactivity.el;

      if (el) {
        el.addEventListener('click', callback);
      }
    }
  }
};