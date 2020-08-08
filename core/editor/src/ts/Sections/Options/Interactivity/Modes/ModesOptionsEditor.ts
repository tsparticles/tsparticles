import type { Container } from "tsparticles/dist/Core/Container";
import type { IModes } from "tsparticles/dist/Options/Interfaces/Interactivity/Modes/IModes";
import { ColorUtils, IHsl, IRgb, EditorNumberInput, EditorGroup } from "object-gui";

export class ModesOptionsEditor {
    public readonly group: EditorGroup;
    private readonly options: IModes;

    constructor(private readonly parent: EditorGroup, private readonly particles: Container) {
        this.group = parent.addGroup("modes", "Modes");
        this.options = this.group.data as IModes;

        this.addAttract();
        this.addBubble();
        this.addConnect();
        this.addGrab();
        this.addPush();
        this.addRemove();
        this.addRepulse();
        this.addSlow();
        this.addTrail();
    }

    private addAttract(): void {
        const particles = this.particles;
        const options = this.options.attract;
        const group = this.group.addGroup("attract", "Attract");

        group.addProperty("distance", "Distance", options.distance, typeof options.distance, async () => {
            await particles.refresh();
        });

        group.addProperty("duration", "Duration", options.duration, typeof options.duration, async () => {
            await particles.refresh();
        });

        group.addProperty("speed", "Speed", options.speed, typeof options.speed, async () => {
            await particles.refresh();
        });
    }

    private addBubble(): void {
        const particles = this.particles;
        const options = this.options.bubble;
        const group = this.group.addGroup("bubble", "Bubble");

        let colorStringValue: string | undefined;

        if (options.color !== undefined) {
            if (typeof options.color === "string") {
                colorStringValue = options.color;
            } else if (options.color instanceof Array) {
                colorStringValue = undefined;
            } else if (typeof options.color.value === "string") {
                colorStringValue = options.color.value;
            } else {
                let rgb = options.color.value as IRgb;
                const hsl = options.color.value as IHsl;

                if (hsl.h !== undefined) {
                    rgb = ColorUtils.hslToRgb(hsl);
                }

                colorStringValue = `${rgb.r.toString(16)}${rgb.g.toString(16)}${rgb.b.toString(16)}`;
            }
        }

        group.addProperty(
            "color",
            "Color",
            colorStringValue,
            "color",
            async (value: string | number | boolean) => {
                if (typeof value === "string") {
                    if (typeof options.color === "string") {
                        options.color = value;
                    } else {
                        options.color = {
                            value,
                        };
                    }

                    await particles.refresh();
                }
            },
            false
        );

        group.addProperty("distance", "Distance", options.distance, typeof options.distance, async () => {
            await particles.refresh();
        });

        group.addProperty("duration", "Duration", options.duration, typeof options.duration, async () => {
            await particles.refresh();
        });

        const opacityInput = group.addProperty("opacity", "Opacity", options.opacity, "number", async () => {
            await particles.refresh();
        }) as EditorNumberInput;

        opacityInput.step(0.01).min(0).max(1);

        group.addProperty("size", "Size", options.size, "number", async () => {
            await particles.refresh();
        });
    }

    private addConnect(): void {
        const particles = this.particles;
        const options = this.options.connect;
        const group = this.group.addGroup("connect", "Connect");

        group.addProperty("distance", "Distance", options.distance, "number", async () => {
            await particles.refresh();
        });

        const connectLinksGroup = group.addGroup("links", "Links");

        const opacityInput = connectLinksGroup.addProperty(
            "opacity",
            "Opacity",
            options.links.opacity,
            "number",
            async () => {
                await particles.refresh();
            }
        ) as EditorNumberInput;

        opacityInput.step(0.01).min(0).max(1);

        group.addProperty("radius", "Radius", options.radius, "number", async () => {
            await particles.refresh();
        });
    }

    private addGrab(): void {
        const particles = this.particles;
        const options = this.options.grab;
        const group = this.group.addGroup("grab", "Grab");
        const grabLinksGroup = group.addGroup("links", "Links");

        let colorStringValue: string | undefined;

        if (options.links.color !== undefined) {
            if (typeof options.links.color === "string") {
                colorStringValue = options.links.color;
            } else if (typeof options.links.color.value === "string") {
                colorStringValue = options.links.color.value;
            } else {
                let rgb = options.links.color.value as IRgb;
                const hsl = options.links.color.value as IHsl;

                if (hsl.h !== undefined) {
                    rgb = ColorUtils.hslToRgb(hsl);
                }

                colorStringValue = `${rgb.r.toString(16)}${rgb.g.toString(16)}${rgb.b.toString(16)}`;
            }
        }

        grabLinksGroup.addProperty("blink", "Blink", options.links.blink, typeof options.links.blink, async () => {
            await particles.refresh();
        });

        grabLinksGroup.addProperty(
            "color",
            "Color",
            colorStringValue,
            "color",
            async (value: string | number | boolean) => {
                if (typeof value === "string") {
                    if (typeof options.links.color === "string") {
                        options.links.color = value;
                    } else {
                        options.links.color = {
                            value,
                        };
                    }

                    await particles.refresh();
                }
            },
            false
        );

        grabLinksGroup.addProperty(
            "consent",
            "Consent",
            options.links.consent,
            typeof options.links.consent,
            async () => {
                await particles.refresh();
            }
        );

        const opacityInput = grabLinksGroup.addProperty(
            "opacity",
            "Opacity",
            options.links.opacity,
            "number",
            async () => {
                await particles.refresh();
            }
        ) as EditorNumberInput;

        opacityInput.step(0.01).min(0).max(1);

        group.addProperty("distance", "Distance", options.distance, "number", async () => {
            await particles.refresh();
        });
    }

    private addPush(): void {
        const particles = this.particles;
        const options = this.options.push;
        const group = this.group.addGroup("push", "Push");

        group.addProperty("quantity", "Quantity", options.quantity, typeof options.quantity, async () => {
            await particles.refresh();
        });
    }

    private addRemove(): void {
        const particles = this.particles;
        const options = this.options.remove;
        const group = this.group.addGroup("remove", "Remove");

        group.addProperty("remove", "Remove", options.quantity, typeof options.quantity, async () => {
            await particles.refresh();
        });
    }

    private addRepulse(): void {
        const particles = this.particles;
        const options = this.options.repulse;
        const group = this.group.addGroup("repulse", "Repulse");

        group.addProperty("distance", "Distance", options.distance, typeof options.distance, async () => {
            await particles.refresh();
        });

        group.addProperty("duration", "Duration", options.duration, typeof options.duration, async () => {
            await particles.refresh();
        });

        group.addProperty("speed", "Speed", options.speed, typeof options.speed, async () => {
            await particles.refresh();
        });
    }

    private addSlow(): void {
        const particles = this.particles;
        const options = this.options.slow;
        const group = this.group.addGroup("slow", "Slow");

        group.addProperty("factor", "Factor", options.factor, "number", async () => {
            await particles.refresh();
        });

        group.addProperty("radius", "Radius", options.radius, "number", async () => {
            await particles.refresh();
        });
    }

    private addTrail(): void {
        const particles = this.particles;
        const options = this.options.trail;
        const group = this.group.addGroup("trail", "Trail");

        group.addProperty("delay", "Delay", options.delay, "number", async () => {
            await particles.refresh();
        });

        group.addProperty("quantity", "Quantity", options.quantity, "number", async () => {
            await particles.refresh();
        });

        // TODO: Particles customization is not ready yet
    }
}
