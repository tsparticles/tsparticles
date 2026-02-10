import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

export type { IZoom } from "./Options/Interfaces/IZoom.js";
export type { IZoomOptions, ZoomContainer, ZoomOptions } from "./types.js";
export { Zoom } from "./Options/Classes/Zoom.js";
export {
  initialTouchDistance,
  maxZoom,
  minZoom,
  touchCenterDivisor,
  touchPointIndexFirst,
  touchPointIndexSecond,
  touchPointsCount,
  zoomGestureFactor,
  zoomInFactor,
  zoomOutFactor,
} from "./Utils/Constants.js";

/**
 * @param engine - The engine instance
 */
export async function loadZoomPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async e => {
    const { ZoomPlugin } = await import("./ZoomPlugin.js");

    e.addPlugin(new ZoomPlugin());
  });
}
