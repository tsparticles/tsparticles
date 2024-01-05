import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "repulseBack",
    name: "Repulse Back",
    particles: {
        number: {
            value: 200,
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
            value: {
                min: 1,
                max: 3,
            },
        },
        move: {
            enable: true,
            speed: 0,
        },
    },
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: "repulse",
            },
        },
        modes: {
            repulse: {
                distance: 200,
                factor: 1,
                speed: 5,
                easing: "ease-out-back",
            },
        },
    },
    background: {
        color: "#000000",
    },
};

export default options;
