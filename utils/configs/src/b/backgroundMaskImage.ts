import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "backgroundMaskImage",
    name: "Background Mask Image",
    particles: {
        number: {
            value: 100,
        },
        color: {
            value: "#ffffff",
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: 1,
        },
        size: {
            value: {
                min: 10,
                max: 50,
            },
            animation: {
                enable: true,
                speed: 25,
            },
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
        },
    },
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: "bubble",
            },
            onClick: {
                enable: true,
                mode: "push",
            },
        },
        modes: {
            bubble: {
                distance: 400,
                size: 100,
                duration: 2,
                opacity: 1,
            },
            push: {
                quantity: 4,
            },
        },
    },
    backgroundMask: {
        enable: true,
        cover: {
            image: "https://particles.js.org/images/background2.jpg",
        },
    },
    background: {
        color: "#ffffff",
        image: "url('https://particles.js.org/images/background3.jpg')",
        position: "50% 50%",
        repeat: "no-repeat",
        size: "cover",
    },
};

export default options;
