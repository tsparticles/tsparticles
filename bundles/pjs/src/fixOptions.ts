import type {
    ISourceOptions,
    SingleOrMultiple,
    RecursivePartial
} from "tsparticles-engine";
import type { IStroke } from "tsparticles-engine/Options/Interfaces/Particles/IStroke";
import type { IShapeValues } from "tsparticles-engine/Options/Interfaces/Particles/Shape/IShapeValues";
import type { IOpacityAnimation } from "tsparticles-engine/Options/Interfaces/Particles/Opacity/IOpacityAnimation";
import type { ISizeAnimation } from "tsparticles-engine/Options/Interfaces/Particles/Size/ISizeAnimation";
import type { ILinks } from "tsparticles-engine/Options/Interfaces/Particles/Links/ILinks";
import type { IClickEvent } from "tsparticles-engine/Options/Interfaces/Interactivity/Events/IClickEvent";
import type { IHoverEvent } from "tsparticles-engine/Options/Interfaces/Interactivity/Events/IHoverEvent";
import type { IGrabLinks } from "tsparticles-engine/Options/Interfaces/Interactivity/Modes/IGrabLinks";
import { deepExtend, setRangeValue } from "tsparticles-engine";
import type { IParticlesJSOptions } from "./IParticlesJSOptions";

const fixOptions = (options: RecursivePartial<IParticlesJSOptions>): ISourceOptions => {
    if (options.retina_detect !== undefined) {
        options.detectRetina = options.retina_detect;
    }

    const particlesOptions = options.particles;

    if (particlesOptions) {
        particlesOptions.links = deepExtend(particlesOptions.links, particlesOptions.line_linked) as ILinks;

        const moveOptions = particlesOptions.move;

        if (moveOptions) {
            if (moveOptions.attract) {
                if (!moveOptions.attract.rotate) {
                    moveOptions.attract.rotate = {};
                }

                if (moveOptions.attract.rotateX !== undefined) {
                    moveOptions.attract.rotate.x = moveOptions.attract.rotateX;
                }

                if (moveOptions.attract.rotateY !== undefined) {
                    moveOptions.attract.rotate.y = moveOptions.attract.rotateY;
                }
            }

            if (moveOptions.out_mode !== undefined) {
                if (!moveOptions.outModes) {
                    moveOptions.outModes = { default: moveOptions.out_mode }
                } else {
                    if (typeof moveOptions.outModes === "object") {
                        moveOptions.outModes.default = moveOptions.out_mode;
                    } else {
                        moveOptions.outModes = moveOptions.out_mode;
                    }
                }
            }
        }

        if (particlesOptions.number?.density?.value_area !== undefined) {
            particlesOptions.number.density.area = particlesOptions.number.density.value_area;
        }

        const opacityOptions = particlesOptions.opacity;

        if (opacityOptions) {
            if (opacityOptions.random) {
                opacityOptions.value = setRangeValue(opacityOptions.value ?? 1, 0);
            }

            if (opacityOptions.anim) {
                opacityOptions.animation = deepExtend(opacityOptions.animation, opacityOptions.anim) as IOpacityAnimation;

                if (opacityOptions.anim.enable && opacityOptions.anim.opacity_min !== undefined) {
                    opacityOptions.value = setRangeValue(opacityOptions.value ?? opacityOptions.anim.opacity_min, opacityOptions.anim.opacity_min);
                }
            }
        }

        if (particlesOptions?.shape?.stroke) {
            particlesOptions.stroke = deepExtend(particlesOptions.stroke, particlesOptions.shape.stroke) as SingleOrMultiple<IStroke>;
        }

        if (particlesOptions?.shape?.polygon) {
            if (!particlesOptions.shape.options) {
                particlesOptions.shape.options = {};
            }

            particlesOptions.shape.options.polygon = deepExtend(particlesOptions.shape.options.polygon, particlesOptions.shape.polygon) as SingleOrMultiple<IShapeValues>;
        }

        if (particlesOptions?.shape?.image) {
            if (!particlesOptions.shape.options) {
                particlesOptions.shape.options = {};
            }


            particlesOptions.shape.options.image = deepExtend(particlesOptions.shape.options.image, particlesOptions.shape.image) as SingleOrMultiple<IShapeValues>;
        }

        const sizeOptions = particlesOptions.size;

        if (sizeOptions) {
            if (sizeOptions.random) {
                sizeOptions.value = setRangeValue(sizeOptions.value ?? 1, 0);
            }

            if (sizeOptions.anim) {
                sizeOptions.animation = deepExtend(sizeOptions.animation, sizeOptions.anim) as ISizeAnimation;

                if (sizeOptions.anim.enable && sizeOptions.anim.size_min !== undefined) {
                    sizeOptions.value = setRangeValue(sizeOptions.value ?? sizeOptions.anim.size_min, sizeOptions.anim.size_min);
                }
            }
        }
    }

    const interactivityOptions = options.interactivity;

    if (interactivityOptions) {
        if (interactivityOptions.detect_on !== undefined) {
            interactivityOptions.detectsOn = interactivityOptions.detect_on;
        }

        const eventsOptions = interactivityOptions.events;

        if (eventsOptions) {
            if (eventsOptions.onclick) {
                eventsOptions.onClick = deepExtend(eventsOptions.onClick, eventsOptions.onclick) as IClickEvent;
            }

            if (eventsOptions.onhover) {
                eventsOptions.onHover = deepExtend(eventsOptions.onHover, eventsOptions.onhover) as IHoverEvent;
            }
        }

        const modesOptions = interactivityOptions.modes;

        if (modesOptions) {
            if (modesOptions.grab?.line_linked) {
                modesOptions.grab.links = deepExtend(modesOptions.grab.links, modesOptions.grab.line_linked) as IGrabLinks;
            }

            if (modesOptions.push?.particles_nb !== undefined) {
                modesOptions.push.quantity = modesOptions.push.particles_nb;
            }

            if (modesOptions.remove?.particles_nb !== undefined) {
                modesOptions.remove.quantity = modesOptions.remove.particles_nb;
            }
        }
    }

    return options;
};

export { fixOptions };
