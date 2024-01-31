import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "reactSimple",
    name: "React Simple",
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: "repulse",
            },
        },
        modes: {
            repulse: {
                distance: 100,
                duration: 5,
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
            opacity: 0.6,
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
            enable: true,
            outModes: "bounce",
            speed: 3,
        },
        collisions: {
            enable: true,
        },
        number: {
            value: 50,
        },
        opacity: {
            animation: {
                enable: true,
                speed: 1,
                sync: false,
            },
            value: {
                min: 0.1,
                max: 0.5,
            },
        },
        shape: {
            type: "circle",
        },
        size: {
            value: 3,
        },
        shadow: {
            blur: 0,
            color: {
                value: "#000000",
            },
            enable: false,
            offset: {
                x: 0,
                y: 0,
            },
        },
        stroke: {
            color: {
                value: "#ff0000",
            },
            width: 0,
            opacity: 1,
        },
    },
    polygon: {
        draw: {
            enable: false,
            stroke: {
                color: "rgba(255, 255, 255, .1)",
                width: 0.5,
                opacity: 0.1,
            },
        },
        enable: false,
        inline: {
            arrangement: "one-per-point",
        },
        move: {
            radius: 10,
            type: "path",
        },
        scale: 1,
        type: "inline",
        url: "",
    },
    backgroundMask: {
        cover: {
            color: "#fff",
            opacity: 1,
        },
        enable: false,
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
