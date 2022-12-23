import type { Container, CustomEventArgs, IOptions, Options } from "tsparticles-engine";
import type { ISounds } from "./Options/Interfaces/ISounds";
import type { Sounds } from "./Options/Classes/Sounds";

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
