import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "orbit",
    name: "Orbit",
    particles: {
        color: {
            value: ["#5bc0eb", "#fde74c", "#9bc53d", "#e55934", "#fa7921"],
        },
        move: {
            enable: true,
            speed: 3,
        },
        number: {
            density: {
                enable: true,
            },
            limit: { value: 300 },
            value: 100,
        },
        opacity: {
            value: 1,
        },
        orbit: {
            animation: {
                enable: true,
                speed: 1,
            },
            enable: true,
            opacity: 1,
            color: "#ff7700",
            rotation: {
                random: {
                    enable: true,
                },
            },
        },
        shape: {
            type: ["circle", "square"],
        },
        size: {
            value: 10,
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
