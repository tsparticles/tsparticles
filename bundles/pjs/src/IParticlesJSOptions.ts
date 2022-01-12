import type {
    IOptions,
    InteractivityDetect,
    IStroke,
    IShapeValues,
    ILinks,
    IParticlesOptions,
    IHoverEvent,
    IClickEvent,
    IGrabLinks,
    IOpacityAnimation,
    ISizeAnimation,
    OutMode,
    OutModeAlt,
} from "tsparticles-engine";

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
        };
    };
    particles: IParticlesOptions & {
        line_linked?: ILinks;
        move: {
            out_mode?: OutMode | keyof typeof OutMode | OutModeAlt;
            attract: {
                rotateX?: number;
                rotateY?: number;
            };
        };
        number: {
            density: {
                value_area?: number;
            };
        };
        opacity: {
            random?: boolean;
            anim?: IOpacityAnimation & {
                opacity_min?: number;
            };
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
            };
        };
    };
};
