import type { Container, CustomEventArgs, IOptions, Options } from "tsparticles-engine";
import type { ISounds } from "./Options/Interfaces/ISounds";
import type { ImageDisplay } from "./enums";
import type { Sounds } from "./Options/Classes/Sounds";
import type { SoundsIcon } from "./Options/Classes/SoundsIcon";

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

export type ImageMargins = {
    right: number;
    top: number;
};

export type InitImageData = {
    clickCb: () => void;
    container: SoundsContainer;
    display: ImageDisplay;
    iconOptions: SoundsIcon;
    margin: number;
    options: Options;
    pos: ImageMargins;
    rightOffsets: number[];
};
