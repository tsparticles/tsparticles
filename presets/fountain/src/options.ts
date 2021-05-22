import type { ISourceOptions } from "tsparticles";
import { DestroyMode, InteractivityDetect, MoveDirection, OutMode } from "tsparticles";

export const options: ISourceOptions = {
    fullScreen: {
        enable: true,
    },
    fpsLimit: 60,
    particles: {
        bounce: {
            vertical: {
                value: 0.85,
                random: {
                    enable: true,
                    minimumValue: 0.75,
                },
            },
        },
        color: {
            value: [ "#3998D0", "#2EB6AF", "#A9BD33", "#FEC73B", "#F89930", "#F45623", "#D62E32", "#EB586E", "#9952CF" ],
        },
        number: {
            value: 0,
        },
        destroy: {
            mode: DestroyMode.split,
            split: {
                count: 2,
                factor: {
                    value: 2,
                    random: {
                        enable: true,
                        minimumValue: 1.1,
                    },
                },
                rate: {
                    value: 3,
                    random: {
                        enable: true,
                        minimumValue: 2,
                    },
                },
            },
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: 0.5,
        },
        size: {
            value: 20,
            random: {
                enable: true,
                minimumValue: 10,
            },
        },
        move: {
            enable: true,
            gravity: {
                enable: true,
                maxSpeed: 50,
            },
            speed: {
                min: 10,
                max: 20,
            },
            direction: MoveDirection.none,
            random: false,
            straight: false,
            outModes: {
                bottom: OutMode.split,
                default: OutMode.bounce,
                top: OutMode.none,
            },
            trail: {
                enable: true,
                fillColor: "#fff",
                length: 3,
            },
        },
    },
    interactivity: {
        detectsOn: InteractivityDetect.canvas,
        events: {
            resize: true,
        },
    },
    detectRetina: true,
    background: {
        color: "#fff",
    },
    emitters: {
        direction: MoveDirection.top,
        life: {
            count: 0,
            duration: 0.15,
            delay: 3,
        },
        rate: {
            delay: 0.1,
            quantity: 5,
        },
        size: {
            width: 0,
            height: 0,
        },
    },
};
