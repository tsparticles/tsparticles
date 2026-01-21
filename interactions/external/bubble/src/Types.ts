import type { Bubble } from "./Options/Classes/Bubble.js";
import type { BubbleOptions } from "./Options/Classes/BubbleOptions.js";
import type { IBubble } from "./Options/Interfaces/IBubble.js";
import type { InteractivityContainer } from "@tsparticles/plugin-interactivity";

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

export type BubbleContainer = InteractivityContainer & {
    actualOptions: BubbleOptions;
    bubble?: IContainerBubble;
    retina: {
        bubbleModeDistance?: number;
        bubbleModeSize?: number;
    };
};
