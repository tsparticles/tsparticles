import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "soundsMelodyLoop",
    name: "Sounds Melody Loop",
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
                event: "soundsUnmuted",
                melodies: [
                    {
                        loop: true,
                        melodies: [
                            {
                                notes: [
                                    {
                                        duration: 217.39,
                                        value: "E5",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "Eb5",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "E5",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "Eb5",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "E5",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "B4",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "D5",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "C5",
                                    },
                                    {
                                        duration: 434.78,
                                        value: "A4",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "pause",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "C4",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "E4",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "A4",
                                    },
                                    {
                                        duration: 434.78,
                                        value: "B4",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "pause",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "E4",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "Ab4",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "B4",
                                    },
                                    {
                                        duration: 434.78,
                                        value: "C5",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "pause",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "E4",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "E5",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "Eb5",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "E5",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "Eb5",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "E5",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "B4",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "D5",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "C5",
                                    },
                                    {
                                        duration: 434.78,
                                        value: "A4",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "pause",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "C4",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "E4",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "A4",
                                    },
                                    {
                                        duration: 434.78,
                                        value: "B4",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "pause",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "E4",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "C5",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "B4",
                                    },
                                    {
                                        duration: 434.78,
                                        value: "A4",
                                    },
                                    {
                                        duration: 434.78,
                                        value: "pause",
                                    },
                                ],
                            },
                            {
                                notes: [
                                    {
                                        duration: 1739.12,
                                        value: "pause",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "A2",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "E3",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "A3",
                                    },
                                    {
                                        duration: 652.17,
                                        value: "pause",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "E2",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "B2",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "E3",
                                    },
                                    {
                                        duration: 652.17,
                                        value: "pause",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "A2",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "E3",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "A3",
                                    },
                                    {
                                        duration: 1956.51,
                                        value: "pause",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "A2",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "E3",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "A3",
                                    },
                                    {
                                        duration: 652.17,
                                        value: "pause",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "E2",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "B2",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "E3",
                                    },
                                    {
                                        duration: 652.17,
                                        value: "pause",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "A2",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "E3",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "A3",
                                    },
                                    {
                                        duration: 217.39,
                                        value: "pause",
                                    },
                                ],
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
