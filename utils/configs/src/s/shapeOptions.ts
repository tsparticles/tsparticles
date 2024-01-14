import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "shapeOptions",
    name: "Shape Options",
    particles: {
        color: {
            value: "#000",
        },
        move: {
            direction: "none",
            enable: true,
            speed: 6,
        },
        number: {
            value: 80,
        },
        rotate: {
            value: 45,
            path: true,
        },
        opacity: {
            value: 1,
        },
        shape: {
            options: {
                image: [
                    {
                        height: 128,
                        src: "https://particles.js.org/images/plane_alt.png",
                        width: 128,
                    },
                    {
                        height: 128,
                        src: "https://particles.js.org/images/plane_alt.png",
                        width: 128,
                        particles: {
                            rotate: {
                                value: 0,
                            },
                            size: {
                                animation: {
                                    enable: true,
                                    speed: 64,
                                },
                            },
                        },
                    },
                ],
            },
            type: "image",
        },
        size: {
            value: {
                min: 16,
                max: 32,
            },
        },
    },
};

export default options;
