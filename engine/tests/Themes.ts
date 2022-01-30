import { ClickMode, HoverMode, MoveDirection, Options, OutMode, RotateDirection, ThemeMode, tsParticles } from "../src";
import { describe, it } from "mocha";
import { expect } from "chai";

describe("Themes", () => {
    const sourceOptions = {
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
        fpsLimit: 60,
        particles: {
            number: {
                value: 30,
                density: {
                    enable: true,
                    value_area: 800,
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
                random: {
                    enable: true,
                    minimumValue: 15,
                },
            },
            rotate: {
                value: 0,
                direction: RotateDirection.random,
                animation: {
                    speed: 5,
                    enable: true,
                },
            },
            move: {
                enable: true,
                speed: 6,
                direction: MoveDirection.none,
                outMode: OutMode.out,
            },
        },
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: HoverMode.repulse,
                },
                onClick: {
                    enable: true,
                    mode: ClickMode.push,
                },
                resize: true,
            },
        },
        detectRetina: true,
    };

    const options = new Options(tsParticles);

    options.load(sourceOptions);

    it("Set theme", () => {
        options.setTheme();
        const theme = options.themes.find((t) => t.default);

        expect(options.particles.color.value).to.be.equal(theme?.options?.particles?.color?.value);
    });

    it("Set dark theme", () => {
        const themeName = "dark";

        options.setTheme(themeName);

        const theme = options.themes.find((t) => t.name === themeName);

        if (!theme?.options) {
            // no theme
            return;
        }

        expect(options.particles.color.value).to.be.equal(theme?.options?.particles?.color?.value);
    });

    it("Set light theme", () => {
        const themeName = "light";

        options.setTheme(themeName);

        const theme = options.themes.find((t) => t.name === themeName);

        if (!theme?.options) {
            // no theme
            return;
        }

        expect(options.particles.color.value).to.be.equal(theme?.options?.particles?.color?.value);
    });
});
