import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "repulse",
    name: "Repulse",
    particles: {
        groups: {
            green: {
                number: {
                    value: 30,
                },
                color: {
                    value: "#00ff00",
                },
                repulse: {
                    enabled: true,
                    distance: 50,
                    factor: 20,
                },
            },
            yellow: {
                number: {
                    value: 30,
                },
                color: {
                    value: "#ffff00",
                },
                repulse: {
                    enabled: false,
                    distance: 0,
                },
            },
            blue: {
                number: {
                    value: 30,
                },
                color: {
                    value: "#0000ff",
                },
                repulse: {
                    enabled: true,
                    distance: 50,
                },
            },
            cyan: {
                number: {
                    value: 30,
                },
                color: {
                    value: "#00ffff",
                },
                repulse: {
                    enabled: false,
                    distance: 0,
                },
            },
        },
        number: {
            value: 80,
            density: {
                enable: true,
            },
        },
        color: {
            value: "#ff0000",
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
            value: 14,
        },
        links: {
            enable: true,
            distance: 100,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
        },
        move: {
            enable: true,
            speed: 3,
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
            },
        },
    },
    background: {
        color: "#000000",
    },
};
export default options;
