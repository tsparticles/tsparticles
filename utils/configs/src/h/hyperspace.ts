import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "hyperspace",
    name: "Hyperspace",
    background: {
        color: "#000",
    },
    particles: {
        color: {
            value: ["#3998D0", "#2EB6AF", "#A9BD33", "#FEC73B", "#F89930", "#F45623", "#D62E32", "#EB586E", "#9952CF"],
        },
        move: {
            enable: true,
            outModes: {
                default: "destroy",
            },
            speed: 3,
            trail: {
                fill: { color: "#000" },
                length: 30,
                enable: true,
            },
        },
        number: {
            density: {
                enable: true,
            },
            value: 0,
        },
        opacity: {
            value: 1,
        },
        shape: {
            type: "circle",
        },
        size: {
            value: {
                min: 1,
                max: 25,
            },
            animation: {
                startValue: "min",
                enable: true,
                speed: 2,
                destroy: "max",
                sync: true,
            },
        },
    },
    emitters: {
        direction: "none",
        rate: {
            quantity: 5,
            delay: 0.3,
        },
        size: {
            width: 0,
            height: 0,
        },
        position: {
            x: 50,
            y: 50,
        },
    },
};

export default options;
