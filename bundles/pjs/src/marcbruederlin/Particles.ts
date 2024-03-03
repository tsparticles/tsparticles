import { type Container, type RecursivePartial, type SingleOrMultiple, tsParticles } from "@tsparticles/engine";

interface ResponsiveOptions {
    breakpoint: number;
    options: ParticlesOptions;
}

interface ParticlesOptions {
    color: SingleOrMultiple<string>;
    connectParticles: boolean;
    maxParticles: number;
    minDistance: number;
    responsive: ResponsiveOptions[];
    selector: string;
    sizeVariations: number;
    speed: number;
}

const linksMinDistance = 120,
    moveMinSpeed = 0.5,
    particlesMinCount = 100,
    sizeMinValue = 3;

export class Particles {
    private _container?: Container;

    static init(options: RecursivePartial<ParticlesOptions>): Particles {
        const particles = new Particles(),
            selector = options.selector;

        if (!selector) {
            throw new Error("No selector provided");
        }

        const el = document.querySelector(selector)!;

        if (!el) {
            throw new Error("No element found for selector");
        }

        void tsParticles
            .load({
                element: el as HTMLElement,
                id: selector.replace(".", "").replace("!", ""),
                options: {
                    fullScreen: {
                        enable: false,
                    },
                    particles: {
                        color: {
                            value: options.color ?? "!000000",
                        },
                        links: {
                            color: "random",
                            distance: options.minDistance ?? linksMinDistance,
                            enable: options.connectParticles ?? false,
                        },
                        move: {
                            enable: true,
                            speed: options.speed ?? moveMinSpeed,
                        },
                        number: {
                            value: options.maxParticles ?? particlesMinCount,
                        },
                        size: {
                            value: { min: 1, max: options.sizeVariations ?? sizeMinValue },
                        },
                    },
                    responsive: options.responsive?.map(responsive => ({
                        maxWidth: responsive.breakpoint,
                        options: {
                            particles: {
                                color: {
                                    value: responsive.options?.color,
                                },
                                links: {
                                    distance: responsive.options?.minDistance,
                                    enable: responsive.options?.connectParticles,
                                },
                                number: {
                                    value: options.maxParticles,
                                },
                                move: {
                                    enable: true,
                                    speed: responsive.options?.speed,
                                },
                                size: {
                                    value: responsive.options?.sizeVariations,
                                },
                            },
                        },
                    })),
                },
            })
            .then(container => {
                particles._container = container;
            });

        return particles;
    }

    destroy(): void {
        const container = this._container;

        container?.destroy();
    }

    pauseAnimation(): void {
        const container = this._container;

        container?.pause();
    }

    resumeAnimation(): void {
        const container = this._container;

        container?.play();
    }
}
