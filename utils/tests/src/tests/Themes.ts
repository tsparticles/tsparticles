import { type ISourceOptions, MoveDirection, OutMode, ThemeMode, tsParticles } from "@tsparticles/engine";
import { describe, expect, it } from "vitest";

describe("Themes", async () => {
    const sourceOptions: ISourceOptions = {
            autoPlay: false,
            themes: [
                {
                    name: "light",
                    default: {
                        mode: ThemeMode.light,
                        value: true,
                    },
                    options: {
                        background: {
                            color: "#ffffff",
                        },
                        particles: {
                            color: {
                                value: "#000000",
                            },
                        },
                    },
                },
                {
                    name: "dark",
                    default: {
                        mode: ThemeMode.dark,
                        value: true,
                    },
                    options: {
                        background: {
                            color: "#000000",
                        },
                        particles: {
                            color: {
                                value: "#ffffff",
                            },
                        },
                    },
                },
            ],
            fpsLimit: 120,
            particles: {
                number: {
                    value: 30,
                    density: {
                        enable: true,
                    },
                },
                shape: {
                    type: ["circle", "square"],
                },
                opacity: {
                    value: 1,
                },
                size: {
                    value: 30,
                },
                rotate: {
                    value: 0,
                    direction: "random",
                    animation: {
                        speed: 5,
                        enable: true,
                    },
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: MoveDirection.none,
                    outModes: OutMode.out,
                },
            },
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "repulse",
                    },
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                },
            },
            detectRetina: true,
        },
        container = await tsParticles.load({
            id: "test-theme",
            options: sourceOptions,
        });

    if (!container) {
        throw new Error(`container not initialized`);
    }

    it("Set theme", async () => {
        await container.loadTheme();

        const theme = container.options.themes.find(t => t.default);

        expect(container.actualOptions.particles.color.value).to.be.equal(theme?.options?.particles?.color?.value);
    });

    it("Set dark theme", async () => {
        const themeName = "dark";

        await container.loadTheme(themeName);

        const theme = container.options.themes.find(t => t.name === themeName);

        if (!theme?.options) {
            // no theme
            return;
        }

        expect(container.actualOptions.particles.color.value).to.be.equal(theme?.options?.particles?.color?.value);
    });

    it("Set light theme", async () => {
        const themeName = "light";

        await container.loadTheme(themeName);

        const theme = container.options.themes.find(t => t.name === themeName);

        if (!theme?.options) {
            // no theme
            return;
        }

        expect(container.actualOptions.particles.color.value).to.be.equal(theme?.options?.particles?.color?.value);
    });
});
