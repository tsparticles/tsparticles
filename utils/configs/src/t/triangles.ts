import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "triangles",
    name: "Triangles",
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
            },
        },
        shape: {
            type: ["polygon", "triangle"],
            options: {
                polygon: {
                    sides: 3,
                    particles: {
                        color: {
                            value: "f00",
                        },
                    },
                },
                triangle: {
                    particles: {
                        color: {
                            value: "0f0",
                        },
                    },
                },
            },
        },
        opacity: {
            value: 1,
        },
        size: {
            value: 30,
        },
        move: {
            enable: true,
            speed: 1,
        },
    },
    background: {
        color: "#000",
    },
};

export default options;
