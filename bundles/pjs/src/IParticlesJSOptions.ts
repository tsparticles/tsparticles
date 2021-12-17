import type {
    IOptions,
    InteractivityDetect
} from "tsparticles-engine";
import type { IStroke } from "tsparticles-engine/Options/Interfaces/Particles/IStroke";
import type { IShapeValues } from "tsparticles-engine/Options/Interfaces/Particles/Shape/IShapeValues";
import type { ILinks } from "tsparticles-engine/Options/Interfaces/Particles/Links/ILinks";
import type { IParticles } from "tsparticles-engine/Options/Interfaces/Particles/IParticles";
import type { IHoverEvent } from "tsparticles-engine/Options/Interfaces/Interactivity/Events/IHoverEvent";
import type { IClickEvent } from "tsparticles-engine/Options/Interfaces/Interactivity/Events/IClickEvent";
import type { IGrabLinks } from "tsparticles-engine/Options/Interfaces/Interactivity/Modes/IGrabLinks";
import type { IOpacityAnimation } from "tsparticles-engine/Options/Interfaces/Particles/Opacity/IOpacityAnimation";
import type { ISizeAnimation } from "tsparticles-engine/Options/Interfaces/Particles/Size/ISizeAnimation";
import type { OutMode, OutModeAlt } from "tsparticles-engine";

export type IParticlesJSOptions = IOptions & {
    retina_detect?: boolean;
    interactivity: {
        detect_on?: InteractivityDetect | keyof typeof InteractivityDetect;
        events: {
            onhover?: IHoverEvent;
            onclick?: IClickEvent;
        };
        modes: {
            bubble: {
                speed?: number;
            };
            grab: {
                line_linked?: IGrabLinks;
            };
            push: {
                particles_nb?: number;
            };
            remove: {
                particles_nb?: number;
            };
        }
    },
    particles: IParticles & {
        line_linked?: ILinks;
        move: {
            out_mode?: OutMode | keyof typeof OutMode | OutModeAlt;
            attract: {
                rotateX?: number;
                rotateY?: number;
            }
        };
        number: {
            density: {
                value_area?: number;
            }
        };
        opacity: {
            random?: boolean;
            anim?: IOpacityAnimation & {
                opacity_min?: number;
            }
        };
        shape: {
            stroke?: IStroke;
            polygon?: IShapeValues;
            image?: IShapeValues;
        };
        size: {
            random?: boolean;
            anim?: ISizeAnimation & {
                size_min?: number;
            }
        };
    }
}
