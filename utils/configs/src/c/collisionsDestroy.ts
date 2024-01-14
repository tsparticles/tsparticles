import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "collisionsDestroy",
    name: "Collisions Destroy",
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
            },
        },
        color: {
            value: ["#3998D0", "#2EB6AF", "#A9BD33", "#FEC73B", "#F89930", "#F45623", "#D62E32", "#EB586E", "#9952CF"],
        },
        destroy: {
            mode: "split",
            split: {
                count: 1,
                factor: {
                    value: {
                        min: 4,
                        max: 9,
                    },
                },
                particles: {
                    collisions: {
                        enable: false,
                    },
                    destroy: {
                        mode: "none",
                    },
                    life: {
                        count: 1,
                        duration: {
                            value: 1,
                        },
                    },
                },
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
                min: 10,
                max: 15,
            },
        },
        links: {
            enable: false,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
        },
        collisions: {
            enable: true,
            mode: "destroy",
        },
        move: {
            enable: true,
            speed: 3,
        },
    },
    interactivity: {
        events: {
            onHover: {
                enable: false,
                mode: "repulse",
                parallax: {
                    enable: false,
                    force: 60,
                    smooth: 10,
                },
            },
            onClick: {
                enable: true,
                mode: "push",
            },
        },
        modes: {
            grab: {
                distance: 400,
                links: {
                    opacity: 1,
                },
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 0.8,
            },
            repulse: {
                distance: 200,
            },
            push: {
                quantity: 1,
            },
            remove: {
                quantity: 2,
            },
        },
    },
    background: {
        color: "#000000",
    },
};

export default options;
