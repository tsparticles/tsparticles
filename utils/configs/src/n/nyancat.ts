import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "nyancat",
    name: "Nyan Cat",
    particles: {
        number: {
            value: 1,
            density: {
                enable: false,
            },
        },
        color: {
            value: "#ffffff",
        },
        shape: {
            type: "image",
            options: {
                image: {
                    src: "https://cdn2.scratch.mit.edu/get_image/gallery/780516_170x100.png",
                    width: 1750,
                    height: 800,
                },
            },
        },
        opacity: {
            value: 0.5,
        },
        size: {
            value: 240,
        },
        move: {
            enable: true,
            speed: 6,
            direction: "right",
            straight: true,
        },
    },
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: "repulse",
            },
        },
        modes: {
            repulse: {
                distance: 200,
                duration: 0.4,
            },
        },
    },
    background: {
        color: "#0d47a1",
        image: "url('http://fc06.deviantart.net/fs71/f/2011/187/1/0/nyan_cat_background_by_kento1-d3l6i50.jpg')",
        position: "50% 50%",
        repeat: "no-repeat",
        size: "cover",
    },
};

export default options;
