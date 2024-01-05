import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "pathPolygonMask",
    name: "Path Polygon Mask",
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
            color: "#ffffff",
            distance: 30,
            enable: true,
            opacity: 0.4,
            width: 1,
        },
        move: {
            enable: true,
            outModes: "bounce",
            speed: 1,
        },
        number: {
            value: 80,
        },
        opacity: {
            animation: {
                enable: true,
                speed: 2,
                sync: false,
            },
            value: {
                min: 0.05,
                max: 0.4,
            },
        },
        shape: {
            type: "circle",
        },
        size: {
            value: 1,
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
        scale: 2,
        type: "inline",
        data: {
            path: "M 75,0 0,200 h 150 z",
            size: {
                width: 150,
                height: 200,
            },
        },
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
