import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "reactDefaults",
    name: "React Defaults",
    particles: {
        number: {
            value: 40,
        },
        color: {
            value: "#FFF",
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: {
                min: 0.1,
                max: 0.5,
            },
            animation: {
                enable: true,
                speed: 1,
                sync: false,
            },
        },
        size: {
            value: 1,
        },
        links: {
            enable: true,
            distance: 150,
            color: "#FFF",
            opacity: 0.6,
            width: 1,
            shadow: {
                enable: false,
                blur: 5,
                color: "lime",
            },
        },
        move: {
            enable: true,
            speed: 3,
            outModes: "bounce",
        },
        collisions: {
            enable: true,
        },
    },
    background: {
        color: "#0d47a1",
    },
};

export default options;
