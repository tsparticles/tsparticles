import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "soundsLoop",
    name: "Sounds Loop",
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
                audio: {
                    loop: true,
                    source: "https://particles.js.org/audio/nyancat-loop.mp3",
                },
            },
        ],
        volume: 100,
    },
};

export default options;
