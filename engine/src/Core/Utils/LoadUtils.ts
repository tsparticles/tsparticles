import { canvasFirstIndex, canvasTag, generatedAttribute, generatedFalse, generatedTrue } from "./Constants.js";
import { itemFromSingleOrMultiple, safeDocument } from "../../Utils/Utils.js";
import type { ISourceOptions } from "../../Types/ISourceOptions.js";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple.js";
import { getLogger } from "../../Utils/LogUtils.js";

const fullPercent = "100%";

interface DataFromUrlParams {
  fallback?: SingleOrMultiple<ISourceOptions>;
  index?: number;
  url: SingleOrMultiple<string>;
}

/**
 * @param data -
 * @returns the options object from the jsonUrl
 */
export async function getDataFromUrl(
  data: DataFromUrlParams,
): Promise<SingleOrMultiple<Readonly<ISourceOptions>> | undefined> {
  const url = itemFromSingleOrMultiple(data.url, data.index);

  if (!url) {
    return data.fallback;
  }

  const response = await fetch(url);

  if (response.ok) {
    return (await response.json()) as SingleOrMultiple<ISourceOptions>;
  }

  getLogger().error(`${response.status.toString()} while retrieving config file`);

  return data.fallback;
}

export const getCanvasFromContainer = (domContainer: HTMLElement): HTMLCanvasElement => {
    const documentSafe = safeDocument();

    let canvasEl: HTMLCanvasElement;

    if (domContainer instanceof HTMLCanvasElement || domContainer.tagName.toLowerCase() === canvasTag) {
      canvasEl = domContainer as HTMLCanvasElement;

      canvasEl.dataset[generatedAttribute] ??= generatedFalse;
    } else {
      const existingCanvases = domContainer.getElementsByTagName(canvasTag),
        foundCanvas = existingCanvases[canvasFirstIndex];

      /* get existing canvas if present, otherwise a new one will be created */
      if (foundCanvas) {
        canvasEl = foundCanvas;

        canvasEl.dataset[generatedAttribute] = generatedFalse;
      } else {
        /* create canvas element */
        canvasEl = documentSafe.createElement(canvasTag);

        canvasEl.dataset[generatedAttribute] = generatedTrue;

        /* append canvas */
        domContainer.appendChild(canvasEl);
      }
    }

    canvasEl.style.width ||= fullPercent;
    canvasEl.style.height ||= fullPercent;

    return canvasEl;
  },
  getDomContainer = (id: string, source?: HTMLElement): HTMLElement => {
    const documentSafe = safeDocument();

    let domContainer = source ?? documentSafe.getElementById(id);

    if (domContainer) {
      return domContainer;
    }

    domContainer = documentSafe.createElement("div");

    domContainer.id = id;
    domContainer.dataset[generatedAttribute] = generatedTrue;

    documentSafe.body.append(domContainer);

    return domContainer;
  };
