import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "localPolygonMask",
    name: "Local Polygon Mask",
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: "bubble",
            },
        },
        modes: {
            bubble: {
                distance: 40,
                duration: 2,
                opacity: 8,
                size: 6,
            },
        },
    },
    particles: {
        color: {
            value: "#ffffff",
        },
        links: {
            blink: false,
            color: "#ffffff",
            consent: false,
            distance: 30,
            enable: false,
            opacity: 0.4,
            width: 1,
        },
        move: {
            enable: true,
            outModes: "bounce",
            speed: 1,
        },
        number: {
            density: {
                enable: false,
            },
            value: 200,
        },
        opacity: {
            value: 0.5,
        },
        shape: {
            type: "circle",
        },
        size: {
            value: 3,
        },
    },
    polygon: {
        draw: {
            enable: true,
            stroke: {
                color: "#fff",
                width: 0.5,
                opacity: 0.2,
            },
        },
        enable: true,
        move: {
            radius: 10,
        },
        position: {
            x: 50,
            y: 50,
        },
        inline: {
            arrangement: "equidistant",
        },
        scale: 3,
        type: "inside",
        data: '<svg xmlns="http://www.w3.org/2000/svg" height="200" width="150"><path d="M 75,0 0,200 h 150 z" /></svg>',
    },
    background: {
        color: "#000000",
        image: "",
        position: "50% 50%",
        repeat: "no-repeat",
        size: "cover",
    },
};

export default options;
