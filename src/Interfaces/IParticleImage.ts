"use strict";

export interface IParticleImage {
    src: string;
    ratio: number;
    obj?: HTMLImageElement;
    loaded?: boolean;
    replace_color: boolean;
}
