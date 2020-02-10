'use strict';

export interface pJSContainerInteractivity {
    el?: HTMLElement | Window,
        status?: string,
        mouse: pJSMouseData
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
            value: string | pJSColor | string[]
        },
        shape: {
            type: pJSShapeType | pJSShapeType[],
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
            direction: pJSMoveDirection,
            random: boolean,
            straight: boolean,
            out_mode: pJSOutMode,
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
        detect_on: pJSInteractivityDetect,
        events: {
            onhover: {
                enable: boolean,
                mode: pJSHoverMode | pJSHoverMode[],
                parallax: {
                    enable: boolean,
                    force: number,
                    smooth: number
                }
            },
            onclick: {
                enable: boolean,
                mode: pJSClickMode | pJSClickMode[]
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

export interface pJSColor {
    rgb?: pJSRgb | null,
    hsl?: pJSHsl | null
}

export interface pJSRgb {
    r: number,
    g: number,
    b: number
}

export interface pJSHsl {
    h: number,
    s: number,
    l: number
}

export interface pJSParticleImage {
    src: string,
    ratio: number
    obj?: HTMLImageElement,
    loaded?: boolean
}

export interface pJSCoordinates {
    x: number,
    y: number
}

export interface pJSMouseData {
    click_pos_x?: number | null,
    click_pos_y?: number | null,
    pos_x?: number | null,
    pos_y?: number | null,
    click_time?: number
}

export interface pJSSvg {
    source?: string,
    count: number
}

export interface pJSImg {
    type?: string;
    obj?: HTMLImageElement;
    error?: boolean;
}