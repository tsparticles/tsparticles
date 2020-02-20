"use strict";

import {ClickMode} from "../Enums/ClickMode";
import {HoverMode} from "../Enums/HoverMode";
import {MoveDirection} from "../Enums/MoveDirection";
import {InteractivityDetect} from "../Enums/InteractivityDetect";
import {OutMode} from "../Enums/OutMode";
import {PolygonMaskType} from "../Enums/PolygonMaskType";
import {IColor} from "./IColor";
import {IShape} from "./IShape";

export interface IOptions {
    fps_limit: number;
    interactivity: {
        detect_on: InteractivityDetect;
        events: {
            onclick: {
                enable: boolean;
                mode: ClickMode | ClickMode[];
            };
            onhover: {
                enable: boolean;
                mode: HoverMode | HoverMode[];
                parallax: {
                    enable: boolean;
                    force: number;
                    smooth: number;
                };
            };
            resize: boolean;
        };
        modes: {
            bubble: {
                distance: number;
                duration: number;
                opacity: number;
                size: number;
            };
            grab: {
                distance: number;
                line_linked: {
                    opacity: number;
                };
            };
            push: {
                particles_nb: number;
            };
            remove: {
                particles_nb: number;
            };
            repulse: {
                distance: number;
                duration: number;
            };
        };
    };
    particles: {
        color: {
            value: string | IColor | string[];
        };
        line_linked: {
            color: string;
            distance: number;
            enable: boolean;
            opacity: number;
            width: number;
        };
        move: {
            attract: {
                enable: boolean;
                rotateX: number;
                rotateY: number;
            };
            bounce: boolean;
            direction: MoveDirection;
            enable: boolean;
            out_mode: OutMode;
            random: boolean;
            speed: number;
            straight: boolean;
        };
        number: {
            density: {
                enable: boolean;
                value_area: number;
            };
            value: number;
        };
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
        shape: IShape;
        size: {
            anim: {
                enable: boolean;
                size_min: number;
                speed: number;
                sync: boolean;
            };
            random: boolean;
            value: number;
        };
    };
    polygon: {
        debug: {
            color: string;
            enable: boolean;
        };
        move: {
            radius: number;
        };
        type: PolygonMaskType;
        url: string;
    };
    retina_detect: boolean;
}
