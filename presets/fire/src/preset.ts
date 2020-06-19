import { ClickMode, tsParticles } from "tsparticles";

tsParticles.addPreset("fire", {
    fpsLimit: 40,
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800,
            },
        },
        color: {
            value: ["#fdcf58", "#757676", "#f27d0c", "#800909", "#f07f13"],
        },
        opacity: {
            value: 0.5,
            random: true,
        },
        size: {
            value: 3,
            random: true,
        },
        move: {
            enable: true,
            speed: 6,
            random: false,
        },
    },
    interactivity: {
        events: {
            onclick: {
                enable: true,
                mode: ClickMode.push,
            },
            resize: true,
        },
    },
    background: {
        image: "radial-gradient(#4a0000, #000)",
    },
});
