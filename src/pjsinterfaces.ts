import { pJSFunctions } from './pjsfunctions';
import { pJSParticle } from './pjsparticle';

'use strict';

export interface pJS {
    canvas: {
        el: HTMLCanvasElement,
        ctx?: CanvasRenderingContext2D | null,
        w: number,
        h: number,
        tag_id: string,
        pxratio?: number
    },
    particles: {
        array: pJSParticle[]
    },
    interactivity: {
        el?: HTMLElement | Window,
        status?: string,
        mouse: {
            click_pos_x?: number | null,
            click_pos_y?: number | null,
            pos_x?: number | null,
            pos_y?: number | null,
            click_time?: number
        }
    },
    options: pJSOptions,
    fn?: pJSFunctions,
    retina?: boolean,
    pushing?: boolean,
    bubble_clicking?: boolean,
    bubble_duration_end?: boolean,
    repulse_finish?: boolean,
    repulse_count?: number,
    repulse_clicking?: boolean,
    img_type?: string,
    source_svg?: string,
    img_obj?: any,
    count_svg?: number;
    img_error?: boolean
}

export interface pJSOptions {
    particles: {
        number: {
            value: number,
            density: {
                enable: boolean,
                value_area: number
            }
        },
        color: {
            value: string
        },
        shape: {
            type: string | string[],
            stroke: {
                width: number,
                color: string
            },
            polygon: {
                nb_sides: number
            },
            character: {
                value: string,
                font: string,
                style?: string,
                weigth: string
            }
            image: {
                src: string,
                width: number,
                height: number
            }
        },
        opacity: {
            value: number,
            random: boolean,
            anim: {
                enable: boolean,
                speed: number,
                opacity_min: number,
                sync: boolean
            }
        },
        size: {
            value: number,
            random: boolean,
            anim: {
                enable: boolean,
                speed: number,
                size_min: number,
                sync: boolean
            }
        },
        line_linked: {
            enable: boolean,
            distance: number,
            color: string,
            opacity: number,
            width: number,
            color_rgb?: pJSRgb | null
        },
        move: {
            enable: boolean,
            speed: number,
            direction: string,
            random: boolean,
            straight: boolean,
            out_mode: string,
            bounce: boolean,
            attract: {
                enable: boolean,
                rotateX: number,
                rotateY: number
            }
        },
        array: []
    },
    interactivity: {
        detect_on: string,
        events: {
            onhover: {
                enable: boolean,
                mode: string,
                parallax: {
                    enable: boolean,
                    force: number,
                    smooth: number
                }
            },
            onclick: {
                enable: boolean,
                mode: string
            },
            resize: boolean
        },
        modes: {
            grab: {
                distance: number,
                line_linked: {
                    opacity: number
                }
            },
            bubble: {
                distance: number,
                size: number,
                duration: number,
                opacity: number
            },
            repulse: {
                distance: number,
                duration: number
            },
            push: {
                particles_nb: number
            },
            remove: {
                particles_nb: number
            }
        }
    },
    retina_detect: boolean
}

export interface pJSRgb {
    r: number,
    g: number,
    b: number
}