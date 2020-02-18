"use strict";

import { ClickMode } from "../Enums/ClickMode";
import { HoverMode } from "../Enums/HoverMode";
import { MoveDirection } from "../Enums/MoveDirection";
import { InteractivityDetect } from "../Enums/InteractivityDetect";
import { OutMode } from "../Enums/OutMode";
import { IColor } from "./IColor";
import { IShape } from "./IShape";
export interface IOptions {
    particles: {
        number: {
            value: number;
            density: {
                enable: boolean;
                value_area: number;
            };
        };
        color: {
            value: string | IColor | string[];
        };
        shape: IShape;
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
                };
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
    retina_detect: boolean;
    fps_limit: number;
}
