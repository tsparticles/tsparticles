import type { ISourceOptions } from "tsparticles";
import { DestroyMode, DestroyType, MoveDirection, OutMode, ShapeType, StartValueType } from "tsparticles";

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
            delay: 0.5,
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
                    value: 0.333333,
                },
                rate: {
                    value: 100,
                },
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
                        value: 1,
                        animation: {
                            enable: true,
                            speed: 0.7,
                            minimumValue: 0.1,
                            sync: false,
                            startValue: StartValueType.max,
                            destroy: DestroyType.min,
                        },
                    },
                    shape: {
                        type: ShapeType.circle,
                    },
                    size: {
                        value: 1,
                        animation: {
                            enable: false,
                        },
                    },
                    life: {
                        count: 1,
                        duration: {
                            value: {
                                min: 1,
                                max: 2,
                            },
                        },
                    },
                    move: {
                        enable: true,
                        gravity: {
                            enable: false,
                        },
                        speed: 2,
                        direction: MoveDirection.none,
                        random: true,
                        straight: false,
                        outModes: {
                            default: OutMode.destroy,
                        },
                    },
                },
            },
        },
        life: {
            count: 1,
        },
        shape: {
            type: ShapeType.line,
        },
        size: {
            value: 50,
            animation: {
                enable: true,
                sync: true,
                speed: 150,
                startValue: StartValueType.max,
                destroy: DestroyType.min,
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
                enable: true,
                inverse: true,
                maxSpeed: 100,
            },
            speed: {
                min: 10,
                max: 20,
            },
            outModes: {
                default: OutMode.destroy,
                top: OutMode.none,
            },
            trail: {
                fillColor: "#000",
                enable: true,
                length: 10,
            },
        },
    },
};
