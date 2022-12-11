import type { Bubble } from "./Options/Classes/Bubble";
import type { BubbleOptions } from "./Options/Classes/BubbleOptions";
import type { Container } from "tsparticles-engine";
import type { IBubble } from "./Options/Interfaces/IBubble";

export type IBubbleMode = {
    bubble: IBubble;
};

export type BubbleMode = {
    bubble?: Bubble;
};

interface IContainerBubble {
    clicking?: boolean;
    durationEnd?: boolean;
}

export type BubbleContainer = Container & {
    actualOptions: BubbleOptions;
    bubble?: IContainerBubble;
    retina: {
        bubbleModeDistance?: number;
        bubbleModeSize?: number;
    };
};
