import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "emitterAbsorber",
    name: "Emitter and Absorber",
    particles: {
        number: {
            value: 0,
        },
        color: {
            value: "#000",
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
                max: 5,
            },
        },
        links: {
            enable: true,
            distance: 150,
            color: "#000",
            opacity: 0.4,
            width: 1,
        },
        move: {
            enable: true,
            speed: 2,
        },
    },
    interactivity: {
        events: {
            onHover: {
                enable: false,
                mode: "repulse",
            },
            onClick: {
                enable: false,
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
        color: "#fff",
        image: "",
        position: "50% 50%",
        repeat: "no-repeat",
        size: "cover",
    },
    absorbers: {
        position: {
            x: 50,
            y: 50,
        },
        size: {
            density: 20,
            value: {
                min: 30,
                max: 50,
            },
            limit: 100,
        },
    },
    emitters: [
        {
            direction: "top-right",
            position: {
                x: 0,
                y: 100,
            },
            particles: {
                shape: {
                    type: "circle",
                },
                color: {
                    value: "random",
                },
                links: {
                    enable: false,
                },
                opacity: {
                    value: 0.3,
                },
                rotate: {
                    value: {
                        min: 0,
                        max: 360,
                    },
                    direction: "counter-clockwise",
                    animation: {
                        enable: true,
                        speed: 15,
                        sync: false,
                    },
                },
                size: {
                    value: {
                        min: 5,
                        max: 10,
                    },
                },
                move: {
                    speed: 5,
                    outModes: "bounce",
                },
            },
        },
    ],
};

export default options;
