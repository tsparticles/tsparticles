import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "groups",
    name: "Groups",
    particles: {
        groups: {
            green: {
                number: {
                    value: 10,
                },
                color: {
                    value: "#00ff00",
                },
            },
            yellow: {
                number: {
                    value: 10,
                },
                color: {
                    value: "#ffff00",
                },
            },
            blue: {
                number: {
                    value: 10,
                },
                color: {
                    value: "#0000ff",
                },
            },
            cyan: {
                number: {
                    value: 10,
                },
                color: {
                    value: "#00ffff",
                },
            },
        },
        number: {
            value: 40,
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
            value: 0.5,
        },
        size: {
            value: 10,
        },
        move: {
            enable: true,
            speed: 2,
        },
    },
    background: {
        color: "#000000",
    },
};

export default options;
