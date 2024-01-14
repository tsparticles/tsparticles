import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "zIndex",
    name: "Z Index",
    particles: {
        groups: {
            z5000: {
                number: {
                    value: 70,
                },
                zIndex: {
                    value: 50,
                },
            },
            z7500: {
                number: {
                    value: 30,
                },
                zIndex: {
                    value: 75,
                },
            },
            z2500: {
                number: {
                    value: 50,
                },
                zIndex: {
                    value: 25,
                },
            },
            z1000: {
                number: {
                    value: 40,
                },
                zIndex: {
                    value: 10,
                },
            },
        },
        number: {
            value: 200,
        },
        color: {
            value: "#fff",
            animation: {
                enable: false,
                speed: 20,
                sync: true,
            },
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
        move: {
            angle: {
                value: 10,
                offset: 0,
            },
            enable: true,
            speed: 5,
            direction: "right",
        },
        zIndex: {
            value: 5,
            opacityRate: 0.5,
        },
    },
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: "push",
            },
        },
        modes: {
            push: {
                quantity: 4,
                groups: ["z5000", "z7500", "z2500", "z1000"],
            },
        },
    },
    background: {
        color: "#000000",
    },
};
export default options;
