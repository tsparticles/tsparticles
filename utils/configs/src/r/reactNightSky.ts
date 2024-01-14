import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "reactNightSky",
    name: "React Night Sky",
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: "push",
            },
        },
        modes: {
            push: {
                quantity: 1,
            },
        },
    },
    particles: {
        color: {
            value: "#FFF",
        },
        links: {
            blink: false,
            color: {
                value: "#fff",
            },
            consent: false,
            distance: 150,
            enable: true,
            opacity: 0.02,
            shadow: {
                blur: 5,
                color: {
                    value: "lime",
                },
                enable: false,
            },
            width: 1,
        },
        move: {
            attract: {
                enable: false,
                rotate: {
                    x: 3000,
                    y: 3000,
                },
            },
            direction: "right",
            enable: true,
            outModes: "bounce",
            speed: 0.05,
        },
        collisions: {
            enable: true,
        },
        number: {
            density: {
                enable: true,
            },
            value: 60,
        },
        opacity: {
            animation: {
                enable: true,
                speed: 1,
                sync: false,
            },
            value: {
                min: 0.05,
                max: 0.5,
            },
        },
        shape: {
            type: "circle",
        },
        size: {
            value: 1,
        },
    },
    pauseOnBlur: true,
    background: {
        color: "#0d47a1",
        image: "",
        position: "50% 50%",
        repeat: "no-repeat",
        size: "cover",
    },
};

export default options;
