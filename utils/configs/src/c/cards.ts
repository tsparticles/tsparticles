import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "cards",
    name: "Cards",
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
            },
        },
        reduceDuplicates: true,
        shape: {
            type: ["spades", "hearts", "diamonds", "clubs"],
            options: {
                spades: {
                    particles: {
                        color: {
                            value: "#000000",
                        },
                    },
                },
                hearts: {
                    particles: {
                        color: {
                            value: "#ff0000",
                        },
                    },
                },
                diamonds: {
                    particles: {
                        color: {
                            value: "#ff0000",
                        },
                    },
                },
                clubs: {
                    particles: {
                        color: {
                            value: "#000000",
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
            speed: 2,
        },
    },
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: "repulse",
            },
            onClick: {
                enable: true,
                mode: "push",
            },
        },
        modes: {
            repulse: {
                distance: 200,
            },
            push: {
                quantity: 4,
            },
        },
    },
    background: {
        color: "#fff",
    },
};

export default options;
