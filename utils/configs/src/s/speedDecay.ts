import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "speedDecay",
    name: "Speed Decay",
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
            value: 0.5,
        },
        size: {
            value: {
                min: 10,
                max: 15,
            },
        },
        links: {
            enable: false,
        },
        life: {
            duration: {
                sync: true,
                value: 5,
            },
            count: 1,
        },
        move: {
            enable: true,
            gravity: {
                enable: true,
            },
            speed: 10,
            outModes: {
                default: "bounce",
                bottom: "bounce",
                left: "destroy",
                right: "destroy",
                top: "none",
            },
            trail: {
                enable: true,
                fill: { color: "#000000" },
                length: 10,
            },
        },
    },
    interactivity: {
        events: {
            onHover: {
                enable: false,
                mode: "repulse",
                parallax: {
                    enable: false,
                    force: 60,
                    smooth: 10,
                },
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
    background: {
        color: "#000",
    },
    emitters: {
        direction: "top",
        life: {
            count: 0,
            duration: 5,
            delay: 2,
        },
        rate: {
            delay: 0.1,
            quantity: 1,
        },
        size: {
            width: 0,
            height: 0,
        },
        particles: {
            bounce: {
                vertical: {
                    value: {
                        min: 0.4,
                        max: 0.8,
                    },
                },
            },
            color: {
                value: ["#5bc0eb", "#fde74c", "#9bc53d", "#e55934", "#fa7921"],
            },
            links: {
                enable: false,
            },
            size: {
                value: {
                    min: 5,
                    max: 10,
                },
            },
            opacity: {
                value: 0.5,
            },
            move: {
                speed: 30,
                decay: 0.1,
            },
        },
    },
};

export default options;
