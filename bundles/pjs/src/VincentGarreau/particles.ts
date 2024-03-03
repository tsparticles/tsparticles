import { type Container, type Engine, type Particle, type RecursivePartial, deepExtend } from "@tsparticles/engine";
import type { IParticlesJS, IParticlesJSOptions } from "./IParticlesJS.js";

const defaultMinOpacity = 0,
    defaultMinSize = 0,
    speedFactor = 3,
    defaultPjsOptions: IParticlesJSOptions = {
        particles: {
            number: {
                value: 400,
                density: {
                    enable: true,
                    value_area: 800,
                },
            },
            color: {
                value: "#fff",
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#ff0000",
                },
                polygon: {
                    nb_sides: 5,
                },
                image: {
                    src: "",
                    width: 100,
                    height: 100,
                },
            },
            opacity: {
                value: 1,
                random: false,
                anim: {
                    enable: false,
                    speed: 2,
                    opacity_min: 0,
                    sync: false,
                },
            },
            size: {
                value: 20,
                random: false,
                anim: {
                    enable: false,
                    speed: 20,
                    size_min: 0,
                    sync: false,
                },
            },
            line_linked: {
                enable: true,
                distance: 100,
                color: "#fff",
                opacity: 1,
                width: 1,
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 3000,
                    rotateY: 3000,
                },
            },
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "grab",
                },
                onclick: {
                    enable: true,
                    mode: "push",
                },
                resize: true,
            },
            modes: {
                grab: {
                    distance: 100,
                    line_linked: {
                        opacity: 1,
                    },
                },
                bubble: {
                    distance: 200,
                    size: 80,
                    duration: 0.4,
                    opacity: 1,
                    speed: 3,
                },
                repulse: {
                    distance: 200,
                    duration: 0.4,
                },
                push: {
                    particles_nb: 4,
                },
                remove: {
                    particles_nb: 2,
                },
            },
        },
        retina_detect: false,
    };

const initParticlesJS = (
    engine: Engine,
): {
    /**
     * @deprecated this method is obsolete, please use the new {@link Engine.dom | tsParticles.dom}
     * The particles.js compatibility dom array
     */
    pJSDom: Container[];

    /**
     * @deprecated this method is obsolete, please use the new {@link Engine.load | tsParticles.load}
     * The particles.js compatibility instance
     */
    particlesJS: IParticlesJS;
} => {
    /**
     * Loads the provided options to create a {@link Container} object.
     * @deprecated this method is obsolete, please use the new tsParticles.load
     * @param tagId - the particles container element id
     * @param options - the options object to initialize the {@link Container}
     * @returns the loaded container
     */
    const particlesJS = (
        tagId: string,
        options: RecursivePartial<IParticlesJSOptions>,
    ): Promise<Container | undefined> => {
        const fixedOptions = deepExtend(defaultPjsOptions, options) as IParticlesJSOptions;

        return engine.load({
            id: tagId,
            options: {
                fullScreen: {
                    enable: false,
                },
                detectRetina: fixedOptions.retina_detect,
                smooth: true,
                interactivity: {
                    detectsOn: fixedOptions.interactivity.detect_on,
                    events: {
                        onHover: {
                            enable: fixedOptions.interactivity.events.onhover.enable,
                            mode: fixedOptions.interactivity.events.onhover.mode,
                        },
                        onClick: {
                            enable: fixedOptions.interactivity.events.onclick.enable,
                            mode: fixedOptions.interactivity.events.onclick.mode,
                        },
                        resize: {
                            enable: fixedOptions.interactivity.events.resize,
                        },
                    },
                    modes: {
                        grab: {
                            distance: fixedOptions.interactivity.modes.grab.distance,
                            links: {
                                opacity: fixedOptions.interactivity.modes.grab.line_linked.opacity,
                            },
                        },
                        bubble: {
                            distance: fixedOptions.interactivity.modes.bubble.distance,
                            size: fixedOptions.interactivity.modes.bubble.size,
                            duration: fixedOptions.interactivity.modes.bubble.duration,
                            opacity: fixedOptions.interactivity.modes.bubble.opacity,
                            speed: fixedOptions.interactivity.modes.bubble.speed,
                        },
                        repulse: {
                            distance: fixedOptions.interactivity.modes.repulse.distance,
                            duration: fixedOptions.interactivity.modes.repulse.duration,
                        },
                        push: {
                            quantity: fixedOptions.interactivity.modes.push.particles_nb,
                        },
                        remove: {
                            quantity: fixedOptions.interactivity.modes.remove.particles_nb,
                        },
                    },
                },
                particles: {
                    collisions: {
                        enable: fixedOptions.particles.move.bounce,
                    },
                    number: {
                        value: fixedOptions.particles.number.value,
                        density: {
                            enable: fixedOptions.particles.number.density.enable,
                            width: fixedOptions.particles.number.density.value_area,
                        },
                    },
                    color: {
                        value: fixedOptions.particles.color.value,
                    },
                    stroke: {
                        width: fixedOptions.particles.shape.stroke.width,
                        color: {
                            value: fixedOptions.particles.shape.stroke.color,
                        },
                    },
                    shape: {
                        type: fixedOptions.particles.shape.type,
                        options: {
                            polygon: {
                                sides: fixedOptions.particles.shape.polygon.nb_sides,
                            },
                            image: {
                                src: fixedOptions.particles.shape.image.src,
                                width: fixedOptions.particles.shape.image.width,
                                height: fixedOptions.particles.shape.image.height,
                            },
                        },
                    },
                    opacity: {
                        value: fixedOptions.particles.opacity.random
                            ? {
                                  min: fixedOptions.particles.opacity.anim.enable
                                      ? fixedOptions.particles.opacity.anim.opacity_min
                                      : defaultMinOpacity,
                                  max: fixedOptions.particles.opacity.value,
                              }
                            : fixedOptions.particles.opacity.value,
                        animation: {
                            enable: fixedOptions.particles.opacity.anim.enable,
                            speed: fixedOptions.particles.opacity.anim.speed,
                            sync: fixedOptions.particles.opacity.anim.sync,
                        },
                    },
                    size: {
                        value: fixedOptions.particles.size.random
                            ? {
                                  min: fixedOptions.particles.size.anim.enable
                                      ? fixedOptions.particles.size.anim.size_min
                                      : defaultMinSize,
                                  max: fixedOptions.particles.size.value,
                              }
                            : fixedOptions.particles.size.value,
                        animation: {
                            enable: fixedOptions.particles.size.anim.enable,
                            speed: fixedOptions.particles.size.anim.speed,
                            sync: fixedOptions.particles.size.anim.sync,
                        },
                    },
                    links: {
                        enable: fixedOptions.particles.line_linked.enable,
                        distance: fixedOptions.particles.line_linked.distance,
                        color: fixedOptions.particles.line_linked.color,
                        opacity: fixedOptions.particles.line_linked.opacity,
                        width: fixedOptions.particles.line_linked.width,
                    },
                    move: {
                        enable: fixedOptions.particles.move.enable,
                        speed: fixedOptions.particles.move.speed / speedFactor,
                        direction: fixedOptions.particles.move.direction,
                        random: fixedOptions.particles.move.random,
                        straight: fixedOptions.particles.move.straight,
                        outModes: fixedOptions.particles.move.out_mode,
                        attract: {
                            enable: fixedOptions.particles.move.attract.enable,
                            rotate: {
                                x: fixedOptions.particles.move.attract.rotateX,
                                y: fixedOptions.particles.move.attract.rotateY,
                            },
                        },
                    },
                },
            },
        });
    };

    /**
     * Loads the provided json with a GET request.
     * The content will be used to create a {@link Container} object.
     * @deprecated this method is obsolete, please use the new tsParticles.load
     * @param tagId - the particles container element id
     * @param pathConfigJson - the json path to use in the GET request
     * @param callback - called after the {@link Container} is loaded and it will be passed as a parameter
     */
    particlesJS.load = (tagId: string, pathConfigJson: string, callback: (container?: Container) => void): void => {
        engine
            .load({ id: tagId, url: pathConfigJson })
            .then(container => {
                if (container) {
                    callback(container);
                }
            })
            .catch(() => {
                callback(undefined);
            });
    };

    /**
     * Adds a click handler to all the loaded {@link Container} objects.
     * @deprecated this method is obsolete, please use the new tsParticles.setOnClickHandler
     * @param callback - the function called after the click event is fired
     */
    particlesJS.setOnClickHandler = (callback: (e: Event, particles?: Particle[]) => void): void => {
        engine.setOnClickHandler(callback);
    };

    /**
     * All the {@link Container} objects loaded
     * @deprecated this method is obsolete, please use the new {@link Engine.dom | tsParticles.dom}
     */
    const pJSDom = engine.dom();

    return { particlesJS, pJSDom };
};

export { initParticlesJS };
