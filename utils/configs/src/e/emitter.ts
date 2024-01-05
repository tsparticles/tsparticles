import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "emitter",
    name: "Emitter",
    particles: {
        number: {
            value: 100,
            density: {
                enable: false,
            },
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
                enable: true,
                mode: "emitter",
            },
        },
        modes: {
            emitters: {
                life: {
                    count: 10,
                    delay: 0.5,
                    duration: 3,
                },
                particles: {
                    shape: {
                        type: "star",
                        polygon: {
                            sides: 7,
                        },
                    },
                    rotate: {
                        value: {
                            min: 0,
                            max: 360,
                        },
                        direction: "clockwise",
                        animation: {
                            enable: true,
                            speed: 15,
                            sync: false,
                        },
                    },
                    color: {
                        value: "#f0f",
                    },
                    links: {
                        enable: false,
                    },
                    opacity: {
                        value: 1,
                    },
                    size: {
                        value: 15,
                    },
                    move: {
                        speed: 20,
                        outModes: "destroy",
                    },
                },
            },
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
    },
    emitters: [
        {
            life: {
                count: 10,
                delay: 0.5,
                duration: 3,
            },
            particles: {
                shape: {
                    type: "polygon",
                    polygon: {
                        sides: 6,
                    },
                },
                rotate: {
                    value: {
                        min: 0,
                        max: 360,
                    },
                    direction: "clockwise",
                    animation: {
                        enable: true,
                        speed: 15,
                        sync: false,
                    },
                },
                color: {
                    value: "#0f0",
                },
                links: {
                    enable: false,
                },
                opacity: {
                    value: 1,
                },
                size: {
                    value: 15,
                },
                move: {
                    speed: 20,
                    outModes: "destroy",
                },
            },
        },
        {
            direction: "top-right",
            position: {
                x: 0,
                y: 100,
            },
            particles: {
                shape: {
                    type: "star",
                },
                color: {
                    value: "#f00",
                },
                links: {
                    enable: true,
                    id: "emitter1",
                    color: {
                        value: "#ff7700",
                    },
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
                        min: 1,
                        max: 10,
                    },
                },
                move: {
                    speed: 10,
                    outModes: "destroy",
                },
            },
        },
        {
            direction: "top-left",
            position: {
                x: 100,
                y: 100,
            },
            particles: {
                shape: {
                    type: "square",
                },
                rotate: {
                    value: {
                        min: 0,
                        max: 360,
                    },
                    direction: "clockwise",
                    animation: {
                        enable: true,
                        speed: 15,
                        sync: false,
                    },
                },
                color: {
                    value: "#00f",
                },
                links: {
                    enable: false,
                },
                opacity: {
                    value: 0.8,
                },
                size: {
                    value: 15,
                },
                move: {
                    speed: 20,
                    outModes: "destroy",
                },
            },
        },
    ],
};

export default options;
