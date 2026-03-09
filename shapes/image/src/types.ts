import type { Container, Engine, IOptions, Options } from "@tsparticles/engine";
import type { IImage } from "./Utils.js";
import type { IPreload } from "./Options/Interfaces/IPreload.js";
import type { Preload } from "./Options/Classes/Preload.js";

export type ImageEngine = Engine & {
  getImages?: (container: ImageContainer) => IImage[];

  images?: Map<ImageContainer, IImage[]>;

  loadImage?: (container: ImageContainer, data: IPreload) => Promise<void>;
};

export type IPreloadOptions = IOptions & {
  preload: IPreload[];
};

export type PreloadOptions = Options & {
  preload?: Preload[];
};

export type ImageContainer = Container & {
  actualOptions: PreloadOptions;
};
