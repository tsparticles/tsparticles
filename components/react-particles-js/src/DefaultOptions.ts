import { ClickMode, HoverMode, InteractivityDetect, MoveDirection, OutMode, ShapeType, ISourceOptions, MoveType as PolygonMaskMoveType } from "tsparticles";
import { InlineArrangement as PolygonMaskInlineArrangement, Type as PolygonMaskType } from 'tsparticles/Plugins/PolygonMask/Enums';

export const defaultParams: ISourceOptions = {
    particles: {
        number: {
            value: 40,
            max: -1,
            density: {
                enable: false,
                area: 1200
            }
        },
        color: {
            value: "#FFF"
        },
        shape: {
            type: ShapeType.circle,
            polygon: {
                sides: 5
            },
            image: {
                src: "",
                width: 100,
                height: 100
            }
        },
        stroke: {
            width: 0,
            color: "#000000"
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: true,
                speed: 1,
                minimumValue: 0.1,
                sync: false
            }
        },
        size: {
            value: 1,
            random: false,
            anim: {
                enable: false,
                speed: 40,
                minimumValue: 0,
                sync: false
            }
        },
        links: {
            enable: true,
            distance: 150,
            color: "#FFF",
            opacity: 0.6,
            width: 1,
            shadow: {
                enable: false,
                blur: 5,
                color: "lime"
            }
        },
        move: {
            enable: true,
            speed: 3,
            direction: MoveDirection.none,
            random: false,
            straight: false,
            outMode: OutMode.bounce,
            bounce: true,
            attract: {
                enable: false,
                rotateX: 3000,
                rotateY: 3000
            }
        }
    },
    interactivity: {
        detectsOn: InteractivityDetect.canvas,
        events: {
            onHover: {
                enable: false,
                mode: HoverMode.grab
            },
            onClick: {
                enable: false,
                mode: ClickMode.repulse
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 180,
                links: {
                    opacity: 0.35
                }
            },
            bubble: {
                distance: 200,
                size: 80,
                duration: 0.4
            },
            repulse: {
                distance: 100,
                duration: 5
            },
            push: {
                quantity: 4
            },
            remove: {
                quantity: 2
            }
        }
    },
    detectRetina: true,
    fpsLimit: 999,
    polygon: {
        enable: false,
        scale: 1,
        type: PolygonMaskType.inline,
        inline: {
            arrangement: PolygonMaskInlineArrangement.onePerPoint
        },
        draw: {
            enable: false,
            stroke: {
                width: 0.5,
                color: "rgba(255, 255, 255, .1)"
            }
        },
        move: {
            radius: 10,
            type: PolygonMaskMoveType.path
        },
        url: ""
    }
};
