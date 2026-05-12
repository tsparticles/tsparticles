import type { PlatformAdapter, PlatformContainerTarget, PlatformResolvedTarget } from "./PlatformAdapter.js";
import type { Container } from "../Core/Container.js";
import type { ILoadParams } from "../Core/Interfaces/ILoadParams.js";
import { getCanvasFromDomContainer } from "../Dom/EngineDom.js";
import { getRandom } from "../Utils/MathUtils.js";
import { loadRandomFactor } from "../Core/Utils/Constants.js";

/**
 *
 * @param params
 */
function getId(params: ILoadParams): string {
  const domSourceElement =
    typeof HTMLElement !== "undefined" && params.element instanceof HTMLElement ? params.element : undefined;

  return params.id ?? domSourceElement?.id ?? `tsparticles${Math.floor(getRandom() * loadRandomFactor).toString()}`;
}

export class BrowserPlatformAdapter implements PlatformAdapter {
  attachCanvas(_container: Container, _target: PlatformResolvedTarget): Promise<void> {
    return Promise.resolve();
  }

  createCanvas(target: PlatformResolvedTarget): Promise<HTMLCanvasElement | OffscreenCanvas> {
    const { canvas, domContainer } = target.source;

    if (typeof OffscreenCanvas !== "undefined" && canvas instanceof OffscreenCanvas) {
      return Promise.resolve(canvas);
    }

    if (typeof HTMLCanvasElement !== "undefined" && canvas instanceof HTMLCanvasElement) {
      return Promise.resolve(canvas);
    }

    return Promise.resolve(getCanvasFromDomContainer(target.id, domContainer));
  }

  resolveTarget(params: ILoadParams): Promise<PlatformResolvedTarget> {
    const id = getId(params),
      source: PlatformContainerTarget = {
        id,
      };

    if (typeof OffscreenCanvas !== "undefined" && params.element instanceof OffscreenCanvas) {
      source.canvas = params.element;
    } else if (typeof HTMLElement !== "undefined" && params.element instanceof HTMLElement) {
      source.domContainer = params.element;
      source.canvas =
        typeof HTMLCanvasElement !== "undefined" && params.element instanceof HTMLCanvasElement
          ? params.element
          : undefined;
    }

    return Promise.resolve({
      id,
      source,
    });
  }
}
