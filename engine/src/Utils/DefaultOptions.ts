export const DefaultOptions = {
    autoPlay: true,
    background: {
        color: {
            value: "",
        },
        image: "",
        position: "",
        repeat: "",
        size: "",
        opacity: 1,
    },
    backgroundMask: {
        composite: "destination-out",
        cover: {
            color: {
                value: "#fff",
            },
            opacity: 1,
        },
        enable: false,
    },
    fullScreen: {
        enable: true,
        zIndex: 0,
    },
    detectRetina: true,
    duration: 0,
    fpsLimit: 60,
    interactivity: {
        detectsOn: "window",
        events: {
            onClick: {
                enable: false,
                mode: [],
            },
            onDiv: {
                selectors: [],
                enable: false,
                mode: [],
                type: "circle",
            },
            onHover: {
                enable: false,
                mode: [],
                parallax: {
                    enable: false,
                    force: 2,
                    smooth: 10,
                },
            },
            resize: true,
        },
        modes: {
            attract: {
                distance: 200,
                duration: 0.4,
                easing: "ease-out-quad",
                factor: 1,
                maxSpeed: 50,
                speed: 1,
            },
            bounce: {
                distance: 200,
            },
            bubble: {
                distance: 200,
                duration: 0.4,
                mix: false,
            },
            connect: {
                distance: 80,
                links: {
                    opacity: 0.5,
                },
                radius: 60,
            },
            grab: {
                distance: 100,
                links: {
                    blink: false,
                    consent: false,
                    opacity: 1,
                },
            },
            light: {
                area: {
                    gradient: {
                        start: {
                            value: "#ffffff",
                        },
                        stop: {
                            value: "#000000",
                        },
                    },
                    radius: 1000,
                },
                shadow: {
                    color: {
                        value: "#000000",
                    },
                    length: 2000,
                },
            },
            push: {
                default: true,
                groups: [],
                quantity: 4,
            },
            remove: {
                quantity: 2,
            },
            repulse: {
                distance: 200,
                duration: 0.4,
                factor: 100,
                speed: 1,
                maxSpeed: 50,
                easing: "ease-out-quad",
            },
            slow: {
                factor: 3,
                radius: 200,
            },
            trail: {
                delay: 1,
                pauseOnStop: false,
                quantity: 1,
            },
        },
    },
    manualParticles: [],
    motion: {
        disable: false,
        reduce: {
            factor: 4,
            value: true,
        },
    },
    particles: {
        bounce: {
            horizontal: 1,
            vertical: 1,
        },
        collisions: {
            bounce: {
                horizontal: 1,
                vertical: 1,
            },
            enable: false,
            mode: "bounce",
            overlap: {
                enable: true,
                retries: 0,
            },
        },
        color: {
            value: "#fff",
            animation: {
                h: { count: 0, enable: false, offset: 0, speed: 1, sync: true },
                s: { count: 0, enable: false, offset: 0, speed: 1, sync: true },
                l: { count: 0, enable: false, offset: 0, speed: 1, sync: true },
            },
        },
        destroy: {
            mode: "none",
            split: {
                count: 1,
                factor: 3,
                rate: {
                    min: 4,
                    max: 9,
                },
                sizeOffset: true,
            },
        },
        gradient: [],
        groups: {},
        life: {
            count: 0,
            delay: {
                value: 0,
                sync: false,
            },
            duration: {
                value: 0,
                sync: false,
            },
        },
        links: {
            blink: false,
            color: {
                value: "#fff",
            },
            consent: false,
            distance: 100,
            enable: false,
            frequency: 1,
            opacity: 1,
            shadow: {
                blur: 5,
                color: {
                    value: "#fff",
                },
                enable: false,
            },
            triangles: {
                enable: false,
                frequency: 1,
            },
            width: 1,
            warp: false,
        },
        move: {
            angle: {
                offset: 0,
                value: 90,
            },
            attract: {
                distance: 200,
                enable: false,
                rotate: {
                    x: 3000,
                    y: 3000,
                },
            },
            center: {
                x: 50,
                y: 50,
                radius: 0,
            },
            decay: 0,
            distance: {},
            direction: "none",
            drift: 0,
            enable: false,
            gravity: {
                acceleration: 9.81,
                enable: false,
                inverse: false,
                maxSpeed: 50,
            },
            path: {
                clamp: true,
                delay: 0,
                enable: false,
                options: {},
            },
            outModes: {
                default: "out",
            },
            random: false,
            size: false,
            speed: 2,
            spin: {
                acceleration: 0,
                enable: false,
            },
            straight: false,
            trail: {
                enable: false,
                length: 10,
                fillColor: {
                    value: "#000000",
                },
            },
            vibrate: false,
            warp: false,
        },
        number: {
            density: {
                enable: false,
                area: 800,
                factor: 1000,
            },
            limit: 0,
            value: 100,
        },
        opacity: {
            value: 1,
            animation: {
                count: 0,
                enable: false,
                speed: 2,
                sync: false,
                destroy: "none",
                startValue: "random",
            },
        },
        orbit: {
            animation: {
                count: 0,
                enable: false,
                speed: 1,
                sync: false,
            },
            enable: false,
            opacity: 1,
            rotation: 0,
            width: 1,
        },
        reduceDuplicates: false,
        repulse: {
            value: 0,
            enabled: false,
            distance: 1,
            duration: 1,
            factor: 1,
            speed: 1,
        },
        roll: {
            darken: {
                enable: false,
                value: 0,
            },
            enable: false,
            enlighten: {
                enable: false,
                value: 0,
            },
            mode: "vertical",
            speed: 25,
        },
        rotate: {
            value: 0,
            animation: {
                enable: false,
                speed: 0,
                sync: false,
            },
            direction: "clockwise",
            path: false,
        },
        shadow: {
            blur: 0,
            color: {
                value: "#000000",
            },
            enable: false,
            offset: {
                x: 0,
                y: 0,
            },
        },
        shape: {
            options: {},
            type: "circle",
        },
        size: {
            value: 3,
            animation: {
                count: 0,
                enable: false,
                speed: 5,
                sync: false,
                destroy: "none",
                startValue: "random",
            },
        },
        stroke: {
            width: 0,
        },
        tilt: {
            value: 0,
            animation: {
                enable: false,
                speed: 0,
                sync: false,
            },
            direction: "clockwise",
            enable: false,
        },
        twinkle: {
            lines: {
                enable: false,
                frequency: 0.05,
                opacity: 1,
            },
            particles: {
                enable: false,
                frequency: 0.05,
                opacity: 1,
            },
        },
        wobble: {
            distance: 5,
            enable: false,
            speed: 50,
        },
        zIndex: {
            value: 0,
            opacityRate: 1,
            sizeRate: 1,
            velocityRate: 1,
        },
    },
    pauseOnBlur: true,
    pauseOnOutsideViewport: true,
    responsive: [],
    themes: [],
    zLayers: 100,
};
