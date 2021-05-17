import { InteractivityDetect, MoveDirection, OutMode, ShapeType } from "tsparticles";
import type { Main } from "tsparticles";

const options = {
    fullScreen: {
        enable: true,
    },
    fpsLimit: 60,
    particles: {
        number: {
            value: 0,
        },
        collisions: {
            enable: true,
        },
        color: {
            value: "#ffffff",
        },
        shape: {
            type: ShapeType.circle,
        },
        opacity: {
            value: 0.5,
            random: false,
            animation: {
                enable: false,
                speed: 1,
                minimumValue: 0.1,
                sync: false,
            },
        },
        size: {
            value: 15,
            random: {
                enable: true,
                minimumValue: 10,
            },
            animation: {
                enable: false,
                speed: 40,
                minimumValue: 0.1,
                sync: false,
            },
        },
        links: {
            enable: false,
        },
        life: {
            duration: {
                sync: true,
                value: 5,
            },
            count: 1,
        },
        move: {
            enable: true,
            gravity: {
                enable: true,
            },
            speed: 10,
            direction: MoveDirection.none,
            random: false,
            straight: false,
            outMode: OutMode.bounce,
            trail: {
                enable: true,
                fillColor: "#000000",
                length: 10,
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
        color: "#000",
    },
    emitters: {
        direction: MoveDirection.top,
        life: {
            count: 0,
            duration: 5,
            delay: 2,
        },
        rate: {
            delay: 0.1,
            quantity: 1,
        },
        size: {
            width: 0,
            height: 0,
        },
        particles: {
            bounce: {
                vertical: {
                    value: 0.8,
                    random: {
                        enable: true,
                        minimValue: 0.4,
                    },
                },
            },
            color: {
                value: ["#5bc0eb", "#fde74c", "#9bc53d", "#e55934", "#fa7921"],
            },
            links: {
                enable: false,
            },
            size: {
                value: 10,
                random: {
                    enable: true,
                    minimumValue: 5,
                },
            },
            opacity: {
                value: 0.5,
            },
            move: {
                speed: 10,
                random: false,
            },
        },
    },
};

export function loadFountainPreset(tsParticles: Main): void {
    tsParticles.addPreset("fountain", options);
}
