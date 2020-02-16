"use strict";

import { Constants } from "../utils/constants";
import { Container } from "./container";
import { IOptions } from "../utils/interfaces";

let tsParticlesDom: Container[] = [];

export class Loader {
  public static dom(): Container[] {
    if (!tsParticlesDom) {
      Loader.domSet([]);
    }

    return tsParticlesDom;
  }

  public static domSet(value: Container[]): void {
    tsParticlesDom = value;
  }

  public static load(tagId: string, params: IOptions): Container | undefined {
    /* elements */
    const tag = document.getElementById(tagId);

    if (!tag) {
      return;
    }

    const existCanvas = tag.getElementsByClassName(Constants.canvasClass);

    /* remove canvas if exists into the container target tag */
    if (existCanvas.length) {
      while (existCanvas.length > 0) {
        tag.removeChild(existCanvas[0]);
      }
    }

    /* create canvas element */
    const canvasEl = document.createElement("canvas");

    canvasEl.className = Constants.canvasClass;

    /* set size canvas */
    canvasEl.style.width = "100%";
    canvasEl.style.height = "100%";

    /* append canvas */
    const canvas = document.getElementById(tagId)?.appendChild(canvasEl);

    /* launch tsparticle */
    if (!canvas) {
      return;
    }

    const newItem = new Container(tagId, params);
    const dom = Loader.dom();
    const idx = dom.findIndex((v) => v.canvas.tagId === tagId);

    if (idx >= 0) {
      dom.splice(idx, 1, newItem);
    } else {
      dom.push(newItem);
    }

    return newItem;
  }

  public static async loadJSON(tagId: string, jsonUrl: string): Promise<void> {
    /* load json config */
    const response = await fetch(jsonUrl);

    if (response.ok) {
      const params = await response.json();

      Loader.load(tagId, params);
    } else {
      console.error(`Error tsParticles - fetch status: ${response.status}`);
      console.error("Error tsParticles - File config not found");
    }
  };

  public static setOnClickHandler(callback: EventListenerOrEventListenerObject): void {
    const dom = Loader.dom();

    if (dom.length === 0) {
      throw new Error("Can only set click handlers after calling tsParticles.load() or tsParticles.loadJSON()");
    }

    for (const domItem of dom) {
      const el = domItem.interactivity.el;

      if (el) {
        el.addEventListener("click", callback);
      }
    }
  }
}
