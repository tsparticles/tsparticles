import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "polygons",
    name: "Polygon Shape",
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
            },
        },
        color: {
            value: "#ffffff",
        },
        shape: {
            type: "polygon",
            options: {
                polygon: [
                    {
                        sides: 3,
                        particles: {
                            opacity: {
                                value: {
                                    min: 0.5,
                                    max: 0.8,
                                },
                            },
                            size: {
                                value: {
                                    min: 10,
                                    max: 12,
                                },
                            },
                            color: {
                                value: "ff0",
                            },
                        },
                    },
                    {
                        sides: 5,
                        particles: {
                            opacity: {
                                value: 0.5,
                            },
                            size: {
                                value: 8,
                            },
                            color: {
                                value: "0f0",
                            },
                        },
                    },
                    {
                        sides: 8,
                        particles: {
                            opacity: {
                                value: 1,
                            },
                            size: {
                                value: {
                                    min: 15,
                                    max: 20,
                                },
                            },
                            color: {
                                value: "f00",
                            },
                        },
                    },
                ],
            },
        },
        opacity: {
            value: 0.5,
        },
        size: {
            value: {
                min: 1,
                max: 5,
            },
        },
        links: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
        },
        move: {
            enable: true,
            speed: 2,
        },
    },
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: "bubble",
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
                quantity: 4,
            },
            remove: {
                quantity: 2,
            },
        },
    },
    background: {
        color: "#0d47a1",
    },
};

export default options;
