import { Options } from "./interfaces";
import { ShapeType, MoveDirection, OutMode, InteractivityDetect, HoverMode, ClickMode } from "./enums";

export class Constants {
    static readonly canvasClass = 'tsparticles-canvas-el';
    static readonly defaultOptions: Options = {
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
                type: ShapeType.circle,
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
                    weight: '400'
                },
                image: {
                    src: '',
                    width: 100,
                    height: 100,
                    replace_color: true
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
                direction: MoveDirection.none,
                random: false,
                straight: false,
                out_mode: OutMode.out,
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 3000,
                    rotateY: 3000
                }
            }
        },
        interactivity: {
            detect_on: InteractivityDetect.canvas,
            events: {
                onhover: {
                    enable: true,
                    mode: HoverMode.grab,
                    parallax: {
                        enable: false,
                        force: 2,
                        smooth: 10
                    }
                },
                onclick: {
                    enable: true,
                    mode: ClickMode.push
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
        retina_detect: false,
        fps_limit: 60
    };
}