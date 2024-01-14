import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "mouseTrail",
    name: "Mouse Trail",
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
            },
        },
        color: {
            value: "#ff0000",
            animation: {
                enable: true,
                speed: 20,
                sync: true,
            },
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
            speed: 6,
        },
    },
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: "trail",
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
            trail: {
                delay: 0.01,
                pauseOnStop: true,
                particles: {
                    color: {
                        value: "#00ff00",
                        animation: {
                            enable: true,
                            speed: 200,
                            sync: false,
                        },
                    },
                    links: {
                        enable: false,
                    },
                    move: {
                        outModes: "destroy",
                    },
                    opacity: {
                        value: {
                            min: 0.1,
                            max: 1,
                        },
                        animation: {
                            enable: true,
                            speed: 3,
                            sync: true,
                        },
                    },
                    size: {
                        value: {
                            min: 1,
                            max: 10,
                        },
                    },
                },
            },
        },
    },
    background: {
        color: "#000000",
    },
};

export default options;
