import {
  canvasFirstIndex,
  canvasTag,
  generatedAttribute,
  generatedFalse,
  generatedTrue,
} from "../Core/Utils/Constants.js";
import { safeDocument } from "../Utils/Utils.js";

const fullPercent = "100%";

/**
 * @param id -
 * @param source -
 * @returns the canvas element
 */
export function getCanvasFromDomContainer(id: string, source?: HTMLElement): HTMLCanvasElement {
  return getCanvasFromContainer(getDomContainer(id, source));
}

/**
 * @param domContainer -
 * @returns the canvas element
 */
export function getCanvasFromContainer(domContainer: HTMLElement): HTMLCanvasElement {
  const documentSafe = safeDocument();

  let canvasEl: HTMLCanvasElement;
  const isCanvas = domContainer instanceof HTMLCanvasElement || domContainer.tagName.toLowerCase() === canvasTag;

  if (isCanvas) {
    canvasEl = domContainer as HTMLCanvasElement;

    canvasEl.dataset[generatedAttribute] ??= generatedFalse;

    if (canvasEl.dataset[generatedAttribute] === generatedTrue) {
      canvasEl.style.width ||= fullPercent;
      canvasEl.style.height ||= fullPercent;
      canvasEl.style.pointerEvents = "none";
      canvasEl.style.setProperty("pointer-events", "none");
    }
  } else {
    const existingCanvases = domContainer.getElementsByTagName(canvasTag),
      foundCanvas = existingCanvases.item(canvasFirstIndex);

    // Reuse an existing canvas when available, otherwise create one.
    if (foundCanvas) {
      canvasEl = foundCanvas;

      canvasEl.dataset[generatedAttribute] = generatedFalse;
    } else {
      canvasEl = documentSafe.createElement(canvasTag);
      canvasEl.dataset[generatedAttribute] = generatedTrue;

      domContainer.appendChild(canvasEl);
    }

    canvasEl.style.width ||= fullPercent;
    canvasEl.style.height ||= fullPercent;
    canvasEl.style.pointerEvents = "none";
    canvasEl.style.setProperty("pointer-events", "none");
  }

  return canvasEl;
}

/**
 * @param id -
 * @param source -
 * @returns the dom container
 */
export function getDomContainer(id: string, source?: HTMLElement): HTMLElement {
  const documentSafe = safeDocument();

  let domContainer = source ?? documentSafe.getElementById(id);

  if (domContainer) {
    return domContainer;
  }

  domContainer = documentSafe.createElement("canvas");

  domContainer.id = id;
  domContainer.dataset[generatedAttribute] = generatedTrue;

  documentSafe.body.append(domContainer);

  return domContainer;
}
