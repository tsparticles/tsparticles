import { type Container, type RecursivePartial, type SingleOrMultiple, tsParticles } from "tsparticles-engine";

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

export class Particles {
    private _container?: Container;

    static init(options: RecursivePartial<ParticlesOptions>): Particles {
        const particles = new Particles(),
            selector = options.selector;

        if (!selector) {
            throw new Error("No selector provided");
        }

        const el = document.querySelector(selector) as HTMLElement;

        if (!el) {
            throw new Error("No element found for selector");
        }

        tsParticles
            .load({
                id: selector.replace(".", "").replace("!", ""),
                element: el,
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
                            distance: options.minDistance ?? 120,
                            enable: options.connectParticles ?? false,
                        },
                        move: {
                            enable: true,
                            speed: options.speed ?? 0.5,
                        },
                        number: {
                            value: options.maxParticles ?? 100,
                        },
                        size: {
                            value: { min: 1, max: options.sizeVariations ?? 3 },
                        },
                    },
                    responsive: options.responsive?.map((responsive) => ({
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
            .then((container) => {
                particles._container = container;
            });

        return particles;
    }

    destroy(): void {
        const container = this._container;

        container && container.destroy();
    }

    pauseAnimation(): void {
        const container = this._container;

        container && container.pause();
    }

    resumeAnimation(): void {
        const container = this._container;

        container && container.play();
    }
}
