import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "warp",
    name: "Warp",
    fullScreen: false,
    fpsLimit: 120,
    manualParticles: [
        {
            position: {
                x: 2,
                y: 2,
            },
        },
        {
            position: {
                x: 2,
                y: 98,
            },
        },
        {
            position: {
                x: 98,
                y: 2,
            },
        },
        {
            position: {
                x: 98,
                y: 98,
            },
        },
        {
            position: {
                x: 3,
                y: 1,
            },
        },
        {
            position: {
                x: 99,
                y: 2,
            },
        },
        {
            position: {
                x: 3,
                y: 2,
            },
        },
        {
            position: {
                x: 99,
                y: 1,
            },
        },
    ],
    particles: {
        number: {
            value: 0,
        },
        color: {
            value: "#ffffff",
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
        links: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            warp: true,
            opacity: 1,
            width: 1,
        },
        move: {
            enable: false,
            speed: 2,
            outModes: "out",
            warp: true,
        },
    },
    background: {
        color: "#0d47a1",
    },
};
export default options;
