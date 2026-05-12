import type { Container, IOptions, Options } from "@tsparticles/engine";
import type { IZoom } from "./Options/Interfaces/IZoom.js";
import type { Zoom } from "./Options/Classes/Zoom.js";

/** Zoom plugin options interface */
export type IZoomOptions = IOptions & {
  zoom?: IZoom;
};

/** Zoom plugin options class */
export type ZoomOptions = Options & {
  zoom?: Zoom;
};

/** Container with zoom capabilities */
export type ZoomContainer = Container & {
  actualOptions: ZoomOptions;
};
