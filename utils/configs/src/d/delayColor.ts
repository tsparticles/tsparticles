import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "delayColor",
    name: "Delay Color",
    background: {
        color: {
            value: "#000",
        },
    },
    particles: {
        color: {
            value: "#f00",
            animation: {
                enable: true,
                speed: 50,
                sync: true,
                delay: {
                    min: 1,
                    max: 3,
                },
            },
        },
        number: {
            value: 100,
        },
        size: {
            value: 5,
        },
        opacity: {
            value: 1,
        },
        move: {
            enable: true,
        },
        links: {
            enable: true,
            color: "random",
        },
    },
};

export default options;
