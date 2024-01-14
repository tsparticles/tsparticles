import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "test",
    name: "Test",
    fullScreen: {
        enable: false,
    },
    background: {
        color: "#000",
    },
    particles: {
        color: {
            value: "#ffffff",
        },
        size: {
            value: 6,
        },
        links: {
            enable: true,
            distance: 200,
        },
        number: {
            value: 80,
            density: {
                enable: true,
            },
        },
        opacity: {
            value: 0.5,
        },
        shape: {
            type: "circle",
        },
    },
};

export default options;
