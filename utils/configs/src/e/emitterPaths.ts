import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "emitterPaths",
    name: "Emitter Paths",
    particles: {
        number: {
            value: 0,
        },
        color: {
            value: "#000000",
        },
        move: {
            enable: true,
            trail: {
                enable: true,
                fill: { color: "#fff" },
                length: 20,
            },
            outModes: "destroy",
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: 1,
        },
        size: {
            value: 3,
        },
    },
    background: {
        color: "#fff",
    },
    emitters: [
        {
            position: {
                x: 33,
                y: 50,
            },
            rate: {
                value: 0.5,
            },
            particles: {
                life: {
                    count: 1,
                    duration: {
                        value: 10,
                    },
                },
                move: {
                    path: {
                        clamp: false,
                        enable: true,
                        delay: {
                            value: 0,
                        },
                        generator: "polygonPathGenerator",
                        options: {
                            sides: 6,
                            turnSteps: 30,
                            angle: 30,
                        },
                    },
                },
            },
        },
        {
            position: {
                x: 67,
                y: 50,
            },
            rate: {
                value: 0.5,
            },
            particles: {
                move: {
                    path: {
                        clamp: false,
                        enable: true,
                        delay: {
                            value: 0,
                        },
                        generator: "curvesPathGenerator",
                    },
                },
            },
        },
    ],
};

export default options;
