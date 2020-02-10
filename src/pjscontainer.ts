
import { pJSUtils } from './pjsutils';
import { pJSOptions, pJSContainerInteractivity, pJSSvg, pJSImg } from './pjsinterfaces';
import { pJSInteract } from './pjsinteract';
import { pJSModes } from './pjsmodes';
import { pJSVendors } from './pjsvendors';
import { pJSRetina } from './pjsretina';
import { pJSCanvas } from './pjscanvas';
import { pJSParticles } from './pjsparticles';

'use strict';

export class pJSContainer {
    interactivity: pJSContainerInteractivity;
    options: pJSOptions;

    interact: pJSInteract;
    modes: pJSModes;
    vendors: pJSVendors;
    retina: pJSRetina;
    canvas: pJSCanvas;
    particles: pJSParticles;
    checkAnimFrame?: number;
    drawAnimFrame?: number;
    pushing?: boolean;
    bubble_clicking?: boolean;
    bubble_duration_end?: boolean;
    repulse_finish?: boolean;
    repulse_count?: number;
    repulse_clicking?: boolean;
    svg: pJSSvg;
    img: pJSImg;

    constructor(tag_id: string, params: pJSOptions) {
        this.interact = new pJSInteract(this);
        this.modes = new pJSModes(this);
        this.vendors = new pJSVendors(this);
        this.retina = new pJSRetina(this);
        this.canvas = new pJSCanvas(this, tag_id);
        this.particles = new pJSParticles(this);

        this.interactivity = {
            mouse: {}
        };

        this.svg = {
            source: undefined,
            count: 0
        };

        this.img = {};

        this.options = {
            particles: {
                number: {
                    value: 400,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#fff'
                },
                shape: {
                    type: pJSShapeType.circle,
                    stroke: {
                        width: 0,
                        color: '#ff0000'
                    },
                    polygon: {
                        nb_sides: 5
                    },
                    character: {
                        value: '*',
                        font: 'Verdana',
                        weigth: '400'
                    },
                    image: {
                        src: '',
                        width: 100,
                        height: 100
                    }
                },
                opacity: {
                    value: 1,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 2,
                        opacity_min: 0,
                        sync: false
                    }
                },
                size: {
                    value: 20,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 20,
                        size_min: 0,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 100,
                    color: '#fff',
                    opacity: 1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: pJSMoveDirection.none,
                    random: false,
                    straight: false,
                    out_mode: pJSOutMode.out,
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 3000,
                        rotateY: 3000
                    }
                },
                array: []
            },
            interactivity: {
                detect_on: pJSInteractivityDetect.canvas,
                events: {
                    onhover: {
                        enable: true,
                        mode: pJSHoverMode.grab,
                        parallax: {
                            enable: true,
                            force: 2,
                            smooth: 10
                        }
                    },
                    onclick: {
                        enable: true,
                        mode: pJSClickMode.push
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 100,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 200,
                        size: 80,
                        duration: 0.4,
                        opacity: 1
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: false
        };

        /* particles.js variables with default values */

        /* params settings */
        if (params) {
            pJSUtils.deepExtend(this.options, params);
        }

        /* ---------- pJS - start ------------ */
        this.vendors.eventsListeners();

        //TODO: Start è async
        this.vendors.start();
    }
}