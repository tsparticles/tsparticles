import type { Engine } from "tsparticles-engine";
import type { IImage } from "./Utils";

export type ImageEngine = Engine & {
    images?: IImage[];

    loadImage?: (url: string, replaceColor?: boolean) => Promise<void>;
};
