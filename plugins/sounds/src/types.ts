import type { Container, CustomEventArgs, IOptions, Options } from "@tsparticles/engine";
import type { ISounds } from "./Options/Interfaces/ISounds.js";
import type { ImageDisplay } from "./enums.js";
import type { Sounds } from "./Options/Classes/Sounds.js";
import type { SoundsIcon } from "./Options/Classes/SoundsIcon.js";

export type FilterFunction = (args: CustomEventArgs) => boolean;

export type ISoundsOptions = IOptions & {
    sounds?: ISounds;
};

export type SoundsOptions = Options & {
    sounds?: Sounds;
};

export type SoundsContainer = Container & {
    actualOptions: SoundsOptions;
    audioContext?: AudioContext;
    muted?: boolean;
};

export interface ImageMargins {
    right: number;
    top: number;
}

export interface InitImageData {
    clickCb: () => Promise<void>;
    container: SoundsContainer;
    display: ImageDisplay;
    iconOptions: SoundsIcon;
    margin: number;
    options: Options;
    pos: ImageMargins;
    rightOffsets: number[];
}
