import type { ISourceOptions } from "tsparticles-engine";

export const options: ISourceOptions = {
    fullScreen: {
        enable: true,
        zIndex: 100,
    },
    fpsLimit: 120,
    particles: {
        number: {
            value: 0,
        },
        color: {
            value: ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"],
        },
        shape: {
            type: ["square", "circle"],
        },
        opacity: {
            value: { min: 0, max: 1 },
            animation: {
                enable: true,
                speed: 0.5,
                startValue: "max",
                destroy: "min",
            },
        },
        size: {
            value: 5,
        },
        links: {
            enable: false,
        },
        life: {
            duration: {
                sync: true,
                value: 20 / 6,
            },
            count: 1,
        },
        move: {
            angle: {
                value: 45,
                offset: 0,
            },
            drift: 0,
            enable: true,
            gravity: {
                enable: true,
                acceleration: 9.81,
            },
            speed: 45,
            decay: 0.1,
            direction: -90,
            random: true,
            straight: false,
            outModes: {
                default: "none",
                bottom: "destroy",
            },
        },
        rotate: {
            value: {
                min: 0,
                max: 360,
            },
            direction: "random",
            animation: {
                enable: true,
                speed: 60,
            },
        },
        tilt: {
            direction: "random",
            enable: true,
            value: {
                min: 0,
                max: 360,
            },
            animation: {
                enable: true,
                speed: 60,
            },
        },
        roll: {
            darken: {
                enable: true,
                value: 25,
            },
            enable: true,
            speed: {
                min: 15,
                max: 25,
            },
        },
        wobble: {
            distance: 30,
            enable: true,
            speed: {
                min: -15,
                max: 15,
            },
        },
    },
    detectRetina: true,
    motion: {
        disable: true,
    },
    emitters: {
        name: "confetti",
        startCount: 50,
        position: {
            x: 50,
            y: 50,
        },
        size: {
            width: 0,
            height: 0,
        },
        rate: {
            delay: 0,
            quantity: 0,
        },
        life: {
            duration: 0.1,
            count: 1,
        },
    },
};
