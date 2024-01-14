import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "disappearing",
    name: "Disappearing",
    background: {
        color: {
            value: "#000",
        },
    },
    emitters: {
        direction: "random",
        size: {
            width: 100,
            height: 100,
        },
        position: {
            x: 50,
            y: 50,
        },
        rate: {
            delay: 0.1,
            quantity: 10,
        },
    },
    particles: {
        number: {
            value: 0,
        },
        color: {
            value: "random",
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: {
                min: 0.3,
                max: 0.8,
            },
        },
        size: {
            value: {
                min: 1,
                max: 50,
            },
            animation: {
                enable: true,
                speed: 30,
                sync: true,
                startValue: "max",
                destroy: "min",
            },
        },
        move: {
            enable: true,
            speed: 5,
            outModes: "destroy",
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
            repulse: {
                distance: 100,
            },
            push: {
                quantity: 4,
            },
        },
    },
};

export default options;
