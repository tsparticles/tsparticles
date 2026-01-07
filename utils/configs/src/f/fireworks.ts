import { EventType, type ISourceOptions, type Particle } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "fireworks",
    name: "Fireworks",
    fullScreen: {
        enable: true,
    },
    background: {
        color: "#000",
    },
    emitters: {
        direction: "top",
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
            bounds: {
                top: 30,
            },
            mode: "split",
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
                        width: 0,
                    },
                    color: {
                        value: [
                            "#FF0000",
                            "#FF2A00",
                            "#FF5500",
                            "#FF8000",
                            "#FFAA00",
                            "#FFD400",
                            "#FFFF00",
                            "#D4FF00",
                            "#AAFF00",
                            "#80FF00",
                            "#55FF00",
                            "#2AFF00",
                            "#00FF00",
                            "#00FF2A",
                            "#00FF55",
                            "#00FF80",
                            "#00FFAA",
                            "#00FFD4",
                            "#00FFFF",
                            "#00D4FF",
                            "#00AAFF",
                            "#0080FF",
                            "#0055FF",
                            "#002AFF",
                            "#0000FF",
                            "#2A00FF",
                            "#5500FF",
                            "#8000FF",
                            "#AA00FF",
                            "#D400FF",
                            "#FF00FF",
                            "#FF00D4",
                            "#FF00AA",
                            "#FF0080",
                            "#FF0055",
                            "#FF002A",
                        ],
                    },
                    number: {
                        value: 0,
                    },
                    collisions: {
                        enable: false,
                    },
                    destroy: {
                        bounds: {
                            top: 0,
                        },
                    },
                    opacity: {
                        value: {
                            min: 0.1,
                            max: 1,
                        },
                        animation: {
                            enable: true,
                            speed: 0.7,
                            sync: false,
                            startValue: "max",
                            destroy: "min",
                        },
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: 2,
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
                            enable: true,
                            acceleration: 9.81,
                            inverse: false,
                        },
                        decay: 0.1,
                        speed: {
                            min: 10,
                            max: 25,
                        },
                        direction: "outside",
                        outModes: "destroy",
                    },
                },
            },
        },
        life: {
            count: 1,
        },
        shape: {
            type: "line",
        },
        size: {
            value: {
                min: 0.1,
                max: 50,
            },
            animation: {
                enable: true,
                sync: true,
                speed: 90,
                startValue: "max",
                destroy: "min",
            },
        },
        stroke: {
            color: {
                value: "#ffffff",
            },
            width: 1,
        },
        rotate: {
            enable: true,
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
                default: "destroy",
                top: "none",
            },
        },
    },
    sounds: {
        enable: true,
        events: [
            {
                event: EventType.particleRemoved,
                filter: (args: { data: { particle: Particle } }) => args.data.particle.options.move.gravity.inverse,
                audio: [
                    "https://particles.js.org/audio/explosion0.mp3",
                    "https://particles.js.org/audio/explosion1.mp3",
                    "https://particles.js.org/audio/explosion2.mp3",
                ],
            },
        ],
        volume: 50,
    },
    trail: {
        fill: { color: "#000" },
        enable: true,
        length: 10,
    },
};

export default options;
