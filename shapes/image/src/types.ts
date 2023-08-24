import type { Container, Engine, IOptions, Options } from "@tsparticles/engine";
import type { IImage } from "./Utils";
import type { IPreload } from "./Options/Interfaces/IPreload";
import type { Preload } from "./Options/Classes/Preload";

export type ImageEngine = Engine & {
    images?: IImage[];

    loadImage?: (data: IPreload) => Promise<void>;
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
