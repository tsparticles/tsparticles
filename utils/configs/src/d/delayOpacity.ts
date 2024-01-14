import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "delayOpacity",
    name: "Delay Opacity",
    background: {
        color: {
            value: "#000",
        },
    },
    particles: {
        color: {
            value: "#fff",
        },
        number: {
            value: 100,
        },
        opacity: {
            value: { max: 1, min: 0 },
            animation: {
                enable: true,
                speed: 5,
                sync: true,
                delay: {
                    min: 1,
                    max: 3,
                },
                startValue: "max",
                destroy: "min",
            },
        },
        size: {
            value: 5,
        },
        move: {
            enable: true,
        },
    },
};

export default options;
