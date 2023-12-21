import type { Bubble } from "./Options/Classes/Bubble.js";
import type { BubbleOptions } from "./Options/Classes/BubbleOptions.js";
import type { Container } from "@tsparticles/engine";
import type { IBubble } from "./Options/Interfaces/IBubble.js";

export interface IBubbleMode {
    bubble: IBubble;
}

export interface BubbleMode {
    bubble?: Bubble;
}

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
