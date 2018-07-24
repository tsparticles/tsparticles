// Type definitions for react-particles-js v1.5.0
// Project: https://github.com/wufe/react-particles-js
// Definitions by: Simone Bembi <https://github.com/wufe>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="react" />

import {ComponentClass} from 'react';

export type IParticlesParams = {
    particles?: {
        number?: {
            value?: number;
            density?: {
                enable?: boolean;
                value_area?: number;
            };
        };
        color?: {
            value: string;
        };
        shape?: {
            type?: string;
            stroke?: {
                width?: number;
                color?: string;
            };
            polygon?: {
                nb_sides: number;
            };
            image?: {
                src?: string;
                width?: number;
                height?: number;
            };
        };
        opacity?: {
            value?: number;
            random?: boolean;
            anim?: {
                enable?: boolean;
                speed?: number;
                opacity_min?: number;
                sync?: boolean;
            };
        };
        size?: {
            value?: number;
            random?: boolean;
            anim?: {
                enable?: boolean;
                speed?: number;
                size_min?: number;
                sync?: boolean;
            };
        };
        line_linked?: {
            enable?: boolean;
            distance?: number;
            color?: string;
            opacity?: number;
            width?: number;
            shadow?: {
                enable?: boolean;
                blur?: number;
                color?: string;
            };
        };
        move?: {
            enable?: boolean;
            speed?: number;
            direction?: string;
            random?: boolean;
            straight?: boolean;
            out_mode?: string;
            bounce?: boolean;
            attract?: {
                enable?: boolean;
                rotateX?: number;
                rotateY?: number;
            };
        };
    };
    interactivity?: {
        detect_on?: string;
        events?: {
            onhover?: {
                enable?: boolean;
                mode?: string;
            };
            onclick?: {
                enable?: boolean;
                mode?: string;
            };
            resize?: boolean;
        };
        modes?: {
            grab?: {
                distance?: number;
                line_linked?: {
                    opacity: number;
                };
            };
            bubble?: {
                distance?: number;
                size?: number;
                duration?: number;
            };
            repulse?: {
                distance?: number;
                duration?: number;
            };
            push?: {
                particles_nb?: number;
            };
            remove?: {
                particles_nb?: number;
            };
        };
    };
    retina_detected?: boolean;
    fps_limit?: number;
};

export interface ParticlesProps{
    width?: string;
    height?: string;
    params?: IParticlesParams;
    style?: any;
    className?: string;
	canvasClassName?: string;
}

type Particles = ComponentClass<ParticlesProps>;

declare const Particles: Particles;
export default Particles;
