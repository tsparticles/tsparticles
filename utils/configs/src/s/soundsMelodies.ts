import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "soundsMelodies",
    name: "Sounds Melodies",
    particles: {
        number: {
            value: 0,
        },
        color: {
            value: "#ff0000",
            animation: {
                enable: true,
                speed: 120,
                sync: true,
            },
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: 1,
        },
        size: {
            value: {
                min: 3,
                max: 6,
            },
        },
        move: {
            enable: true,
            speed: 6,
            direction: "none",
            outModes: "destroy",
        },
    },
    background: {
        color: "#000000",
    },
    emitters: {
        position: {
            x: 50,
            y: 50,
        },
        rate: {
            quantity: 1,
            delay: 0.3,
        },
        size: {
            width: 0,
            height: 0,
        },
    },
    sounds: {
        enable: true,
        events: [
            {
                event: "particleAdded",
                melodies: [
                    {
                        notes: [
                            {
                                duration: 500,
                                value: ["C5", "E5", "G5"],
                            },
                            {
                                duration: 1000,
                                value: ["D5", "F5", "A5"],
                            },
                        ],
                    },
                ],
            },
            {
                event: "particleRemoved",
                melodies: [
                    {
                        notes: [
                            {
                                duration: 500,
                                value: ["E5", "G5", "B5"],
                            },
                        ],
                    },
                ],
            },
        ],
        volume: 10,
    },
};

export default options;
