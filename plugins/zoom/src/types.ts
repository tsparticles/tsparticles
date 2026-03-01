import type { Container, IOptions, Options } from "@tsparticles/engine";
import type { IZoom } from "./Options/Interfaces/IZoom.js";
import type { Zoom } from "./Options/Classes/Zoom.js";

export type IZoomOptions = IOptions & {
  zoom?: IZoom;
};

export type ZoomOptions = Options & {
  zoom?: Zoom;
};

export type ZoomContainer = Container & {
  actualOptions: ZoomOptions;
};
