import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "colorAnimation",
    name: "Color Animation",
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
            },
        },
        color: {
            value: "#ff0000",
            animation: {
                h: {
                    enable: true,
                    speed: { min: 30, max: 60 },
                    sync: true,
                },
                s: {
                    enable: true,
                    speed: { min: 5, max: 10 },
                    sync: true,
                },
                l: {
                    enable: true,
                    speed: { min: 5, max: 10 },
                    sync: true,
                },
            },
        },
        stroke: {
            width: 30,
            color: {
                value: "#0000ff",
                animation: {
                    h: {
                        enable: true,
                        speed: { min: 30, max: 60 },
                        sync: true,
                    },
                    s: {
                        enable: true,
                        speed: { min: 5, max: 10 },
                        sync: true,
                    },
                    l: {
                        enable: true,
                        speed: { min: 5, max: 10 },
                        sync: true,
                    },
                },
            },
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: 1,
        },
        size: {
            value: 15,
        },
        move: {
            enable: true,
            speed: 6,
        },
    },
    background: {
        color: "#000000",
    },
};

export default options;
