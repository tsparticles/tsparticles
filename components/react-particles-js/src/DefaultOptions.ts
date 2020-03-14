import {IOptions} from "tsparticles/dist/Interfaces/Options/IOptions";
import {ShapeType} from "tsparticles/dist/Enums/ShapeType";
import {RecursivePartial} from "tsparticles/dist/Types/RecursivePartial";
import {PolygonMaskType} from "tsparticles/dist/Enums/PolygonMaskType";
import {PolygonMaskInlineArrangement} from "tsparticles/dist/Enums/PolygonMaskInlineArrangement";
import {PolygonMaskMoveType} from "tsparticles/dist/Enums/PolygonMaskMoveType";
import {HoverMode} from "tsparticles/dist/Enums/Modes/HoverMode";
import {ClickMode} from "tsparticles/dist/Enums/Modes/ClickMode";
import {InteractivityDetect} from "tsparticles/dist/Enums/InteractivityDetect";
import {OutMode} from "tsparticles/dist/Enums/OutMode";
import {MoveDirection} from "tsparticles/dist/Enums/MoveDirection";

export const defaultParams: RecursivePartial<IOptions> = {
    particles: {
        number: {
            value: 40,
            max: -1,
            density: {
                enable: false,
                value_area: 1200
            }
        },
        color: {
            value: "#FFF"
        },
        shape: {
            type: ShapeType.circle,
            stroke: {
                width: 0,
                color: "#000000"
            },
            polygon: {
                nb_sides: 5
            },
            image: {
                src: "",
                width: 100,
                height: 100
            },
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 1,
            random: false,
            anim: {
                enable: false,
                speed: 40,
                size_min: 0,
                sync: false
            }
        },
        line_linked: {
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
            out_mode: OutMode.bounce,
            bounce: true,
            attract: {
                enable: false,
                rotateX: 3000,
                rotateY: 3000
            }
        },
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
                line_linked: {
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
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true,
    fps_limit: 999,
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