import type { ISourceOptions } from "tsparticles";
import { DestroyMode, DestroyType, MoveDirection, OutMode, StartValueType } from "tsparticles";

export const options: ISourceOptions = {
    fullScreen: {
        enable: true,
    },
    detectRetina: true,
    background: {
        color: "#000",
    },
    fpsLimit: 60,
    emitters: {
        direction: MoveDirection.top,
        life: {
            count: 0,
            duration: 0.1,
            delay: 0.1,
        },
        rate: {
            delay: 0.15,
            quantity: 1,
        },
        size: {
            width: 100,
            height: 0,
        },
        position: {
            y: 100,
            x: 50,
        },
    },
    particles: {
        number: {
            value: 0,
        },
        destroy: {
            mode: DestroyMode.split,
            split: {
                count: 1,
                factor: {
                    value: 1 / 3,
                },
                rate: {
                    value: 100,
                },
                sizeOffset: false,
                particles: {
                    stroke: {
                        color: {
                            value: ["#5bc0eb", "#fde74c", "#9bc53d", "#e55934", "#fa7921"],
                        },
                        width: 1,
                    },
                    number: {
                        value: 0,
                    },
                    collisions: {
                        enable: false,
                    },
                    opacity: {
                        value: 0.8,
                        animation: {
                            enable: true,
                            speed: 1,
                            minimumValue: 0.1,
                            sync: true,
                            startValue: "max",
                            destroy: "min",
                        },
                    },
                    size: {
                        value: 75,
                        animation: {
                            enable: true,
                            speed: 150,
                            minimumValue: 1,
                            destroy: DestroyType.max,
                            startValue: StartValueType.min,
                            sync: true,
                        },
                    },
                    life: {
                        count: 1,
                    },
                    move: {
                        enable: true,
                        gravity: {
                            enable: false,
                        },
                        speed: 10,
                        direction: MoveDirection.none,
                        random: false,
                        straight: false,
                        outMode: OutMode.destroy,
                    },
                },
            },
        },
        life: {
            count: 1,
            duration: {
                value: 1.25,
            },
        },
        shape: {
            type: "line",
        },
        size: {
            value: 50,
            animation: {
                enable: true,
                minimumValue: 1,
                speed: 150,
                startValue: StartValueType.max,
                count: 1,
            },
        },
        stroke: {
            color: {
                value: "#ffffff",
            },
            width: 1,
        },
        rotate: {
            path: true,
        },
        move: {
            enable: true,
            gravity: {
                acceleration: 15,
                enable: false,
                maxSpeed: 50,
                inverse: true,
            },
            speed: 15,
            outModes: {
                default: OutMode.destroy,
                top: OutMode.none,
            },
            trail: {
                fillColor: "#000",
                enable: true,
                length: 4,
            },
        },
    },
};
