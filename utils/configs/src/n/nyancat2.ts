import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "nyancat2",
    name: "Nyan Cat 2",
    particles: {
        number: {
            value: 100,
            density: {
                enable: false,
            },
        },
        color: {
            value: "#ffffff",
        },
        shape: {
            type: "star",
            options: {
                star: {
                    sides: 5,
                },
            },
        },
        opacity: {
            value: 0.5,
        },
        size: {
            value: {
                min: 1,
                max: 4,
            },
        },
        move: {
            enable: true,
            speed: 6,
            direction: "left",
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
        color: "#043564",
        image: "url('https://vincentgarreau.com/particles.js/assets/img/kbLd9vb_new.gif')",
        position: "0 50%",
        repeat: "no-repeat",
        size: "60%",
    },
};

export default options;
