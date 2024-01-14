import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "responsive",
    name: "Responsive",
    particles: {
        number: {
            value: 80,
            density: {
                enable: false,
            },
        },
        color: {
            value: "#ff0000",
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: 0.5,
        },
        size: {
            value: {
                min: 1,
                max: 3,
            },
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
            grab: {
                distance: 400,
                links: {
                    opacity: 1,
                },
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 0.8,
            },
            repulse: {
                distance: 200,
            },
            push: {
                quantity: 4,
            },
            remove: {
                quantity: 2,
            },
        },
    },
    responsive: [
        {
            maxWidth: 600,
            options: {
                particles: {
                    color: {
                        value: "#0000ff",
                    },
                    number: {
                        value: 40,
                    },
                },
            },
        },
        {
            maxWidth: 1000,
            options: {
                particles: {
                    color: {
                        value: "#00ff00",
                    },
                    number: {
                        value: 60,
                    },
                },
            },
        },
    ],
    background: {
        color: "#000000",
    },
};
export default options;
