import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "infection",
    name: "Infection",
    infection: {
        enable: true,
        infections: 10,
        cure: true,
        stages: [
            {
                color: "#ff0000",
                duration: 1,
            },
            {
                color: "#ffa500",
                duration: 1,
                rate: 2,
            },
            {
                color: "#ffff00",
                duration: 1,
                rate: 2,
            },
            {
                color: "#008000",
                duration: 1,
                rate: 3,
            },
            {
                color: "#0000ff",
                duration: 1,
                rate: 4,
            },
            {
                color: "#4b0082",
                duration: 1,
                rate: 5,
            },
            {
                color: "#ee82ee",
                duration: 1,
                rate: 6,
                infectedStage: 0,
            },
        ],
    },
    particles: {
        collisions: {
            enable: true,
        },
        number: {
            value: 400,
            density: {
                enable: true,
            },
        },
        color: {
            value: "#ffffff",
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: 0.8,
        },
        size: {
            value: 5,
        },
        move: {
            enable: true,
            speed: 20,
            outModes: "bounce",
        },
    },
    background: {
        color: "#000000",
    },
};
export default options;
