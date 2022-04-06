import { MoveDirection } from "tsparticles-engine";

export const options = {
    background: {
        color: "#333",
    },
    particles: {
        move: {
            direction: MoveDirection.bottom,
            enable: true,
            random: false,
            straight: false,
        },
        opacity: {
            value: { min: 0.1, max: 0.5 },
        },
        size: {
            value: { min: 1, max: 10 },
        },
    },
};
