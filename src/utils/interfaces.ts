'use strict';

import { ShapeType, MoveDirection, OutMode, InteractivityDetect, HoverMode, ClickMode } from "./enums";

export interface ContainerInteractivity {
    el?: HTMLElement | Window | Node | null;
    status?: string;
    mouse: MouseData;
}

export interface Options {
    particles: {
        number: {
            value: number;
            density: {
                enable: boolean;
                value_area: number;
            };
        };
        color: {
            value: string | Color | string[];
        };
        shape: pJSShape;
        opacity: {
            value: number;
            random: boolean;
            anim: {
                enable: boolean;
                speed: number;
                opacity_min: number;
                sync: boolean;
            };
        };
        size: {
            value: number;
            random: boolean;
            anim: {
                enable: boolean;
                speed: number;
                size_min: number;
                sync: boolean;
            };
        };
        line_linked: {
            enable: boolean;
            distance: number;
            color: string;
            opacity: number;
            width: number;
        };
        move: {
            enable: boolean;
            speed: number;
            direction: MoveDirection;
            random: boolean;
            straight: boolean;
            out_mode: OutMode;
            bounce: boolean;
            attract: {
                enable: boolean;
                rotateX: number;
                rotateY: number;
            };
        };
    };
    interactivity: {
        detect_on: InteractivityDetect;
        events: {
            onhover: {
                enable: boolean;
                mode: HoverMode | HoverMode[];
                parallax: {
                    enable: boolean;
                    force: number;
                    smooth: number;
                };
            };
            onclick: {
                enable: boolean;
                mode: ClickMode | ClickMode[];
            };
            resize: boolean;
        };
        modes: {
            grab: {
                distance: number;
                line_linked: {
                    opacity: number;
                }
            };
            bubble: {
                distance: number;
                size: number;
                duration: number;
                opacity: number;
            };
            repulse: {
                distance: number;
                duration: number;
            };
            push: {
                particles_nb: number;
            };
            remove: {
                particles_nb: number;
            };
        };
    };
    retina_detect: boolean,
    fps_limit: number
}

export interface pJSShape {
    type: ShapeType | ShapeType[];
    stroke: {
        width: number;
        color: string;
    };
    polygon: {
        nb_sides: number;
    };
    character: {
        value: string | string[];
        font: string;
        style: string;
        weight: string;
    };
    image: {
        src: string;
        width: number;
        height: number;
        replace_color: boolean;
    };
}

export interface Color {
    rgb?: Rgb | null;
    hsl?: Hsl | null;
}

export interface Rgb {
    r: number;
    g: number;
    b: number;
}

export interface Hsl {
    h: number;
    s: number;
    l: number;
}

export interface ParticleImage {
    src: string;
    ratio: number;
    obj?: HTMLImageElement;
    loaded?: boolean;
    replace_color: boolean;
}

export interface Coordinates {
    x: number;
    y: number;
}

export interface MouseData {
    click_pos_x?: number | null;
    click_pos_y?: number | null;
    pos_x?: number | null;
    pos_y?: number | null;
    click_time?: number;
}

export interface Svg {
    source?: string;
    count: number;
}

export interface Image {
    type?: string;
    obj?: HTMLImageElement;
    error?: boolean;
}

export interface Bubble {
    clicking?: boolean;
    duration_end?: boolean;
}

export interface Repulse {
    finish?: boolean;
    count?: number;
    clicking?: boolean;
}