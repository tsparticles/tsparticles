import { MoveDirection, tsParticles } from "tsparticles";

tsParticles.addPreset('snow', {
    particles: {
        color: {
            value: "#fff",
        },
        move: {
            bounce: false,
            direction: MoveDirection.bottom,
            enable: true,
            random: false,
            straight: false,
        },
        opacity: {
            random: true,
            value: 0.5,
        },
        shape: {
            type: 'circle',
        },
        size: {
            random: true,
            value: 10,
        },
    },
});