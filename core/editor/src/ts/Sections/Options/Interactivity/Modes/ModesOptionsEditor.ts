import type { Container } from "tsparticles/dist/Core/Container";
import type { IModes } from "tsparticles/dist/Options/Interfaces/Interactivity/Modes/IModes";
import { ColorUtils, IHsl, IRgb, EditorNumberInput, EditorGroup } from "object-gui";

export class ModesOptionsEditor {
    public readonly group: EditorGroup;
    private readonly particles: Container;

    constructor(private readonly parent: EditorGroup, private readonly options: IModes) {
        this.group = parent.addGroup("modes", "Modes");
        this.particles = this.group.data as Container;

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
        const attractGroup = this.group.addGroup("attract", "Attract");

        attractGroup.addProperty(
            "distance",
            "Distance",
            options.distance,
            typeof options.distance,
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.distance = value;

                    await particles.refresh();
                }
            }
        );

        attractGroup.addProperty(
            "duration",
            "Duration",
            options.duration,
            typeof options.duration,
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.duration = value;

                    await particles.refresh();
                }
            }
        );

        attractGroup.addProperty(
            "speed",
            "Speed",
            options.speed,
            typeof options.speed,
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.speed = value;

                    await particles.refresh();
                }
            }
        );
    }

    private addBubble(): void {
        const particles = this.particles;
        const options = this.options.bubble;
        const bubbleGroup = this.group.addGroup("bubble", "Bubble");

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

        bubbleGroup.addProperty(
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
            }
        );

        bubbleGroup.addProperty(
            "distance",
            "Distance",
            options.distance,
            typeof options.distance,
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.distance = value;

                    await particles.refresh();
                }
            }
        );

        bubbleGroup.addProperty(
            "duration",
            "Duration",
            options.duration,
            typeof options.duration,
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.duration = value;

                    await particles.refresh();
                }
            }
        );

        const opacityInput = bubbleGroup.addProperty(
            "opacity",
            "Opacity",
            options.opacity,
            "number",
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.opacity = value;

                    await particles.refresh();
                }
            }
        ) as EditorNumberInput;

        opacityInput.step(0.01).min(0).max(1);

        bubbleGroup.addProperty("size", "Size", options.size, "number", async (value: string | number | boolean) => {
            if (typeof value === "number") {
                options.size = value;

                await particles.refresh();
            }
        });
    }

    private addConnect(): void {
        const particles = this.particles;
        const options = this.options.connect;
        const connectGroup = this.group.addGroup("connect", "Connect");

        connectGroup.addProperty(
            "distance",
            "Distance",
            options.distance,
            "number",
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.distance = value;

                    await particles.refresh();
                }
            }
        );

        const connectLinksGroup = connectGroup.addGroup("links", "Links");

        const opacityInput = connectLinksGroup.addProperty(
            "opacity",
            "Opacity",
            options.links.opacity,
            "number",
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.links.opacity = value;

                    await particles.refresh();
                }
            }
        ) as EditorNumberInput;

        opacityInput.step(0.01).min(0).max(1);

        connectGroup.addProperty(
            "radius",
            "Radius",
            options.radius,
            "number",
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.radius = value;

                    await particles.refresh();
                }
            }
        );
    }

    private addGrab(): void {
        const particles = this.particles;
        const options = this.options.grab;
        const connectGroup = this.group.addGroup("grab", "Grab");

        connectGroup.addProperty(
            "distance",
            "Distance",
            options.distance,
            "number",
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.distance = value;

                    await particles.refresh();
                }
            }
        );

        const grabLinksGroup = connectGroup.addGroup("links", "Links");

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
            }
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
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.links.opacity = value;

                    await particles.refresh();
                }
            }
        ) as EditorNumberInput;

        opacityInput.step(0.01).min(0).max(1);
    }

    private addPush(): void {
        const particles = this.particles;
        const options = this.options.push;
        const pushGroup = this.group.addGroup("push", "Push");

        pushGroup.addProperty(
            "quantity",
            "Quantity",
            options.quantity,
            typeof options.quantity,
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.quantity = value;

                    await particles.refresh();
                }
            }
        );
    }

    private addRemove(): void {
        const particles = this.particles;
        const options = this.options.remove;
        const removeGroup = this.group.addGroup("remove", "Remove");

        removeGroup.addProperty(
            "remove",
            "Remove",
            options.quantity,
            typeof options.quantity,
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.quantity = value;

                    await particles.refresh();
                }
            }
        );
    }

    private addRepulse(): void {
        const particles = this.particles;
        const options = this.options.repulse;
        const repulseGroup = this.group.addGroup("repulse", "Repulse");

        repulseGroup.addProperty(
            "distance",
            "Distance",
            options.distance,
            typeof options.distance,
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.distance = value;

                    await particles.refresh();
                }
            }
        );

        repulseGroup.addProperty(
            "duration",
            "Duration",
            options.duration,
            typeof options.duration,
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.duration = value;

                    await particles.refresh();
                }
            }
        );

        repulseGroup.addProperty(
            "speed",
            "Speed",
            options.speed,
            typeof options.speed,
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.speed = value;

                    await particles.refresh();
                }
            }
        );
    }

    private addSlow(): void {
        const particles = this.particles;
        const options = this.options.slow;
        const slowGroup = this.group.addGroup("slow", "Slow");

        slowGroup.addProperty(
            "factor",
            "Factor",
            options.factor,
            "number",
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.factor = value;

                    await particles.refresh();
                }
            }
        );

        slowGroup.addProperty(
            "radius",
            "Radius",
            options.radius,
            "number",
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.radius = value;

                    await particles.refresh();
                }
            }
        );
    }

    private addTrail(): void {
        const particles = this.particles;
        const options = this.options.trail;
        const trailGroup = this.group.addGroup("trail", "Trail");

        trailGroup.addProperty("delay", "Delay", options.delay, "number", async (value: string | number | boolean) => {
            if (typeof value === "number") {
                options.delay = value;

                await particles.refresh();
            }
        });

        trailGroup.addProperty(
            "quantity",
            "Quantity",
            options.quantity,
            "number",
            async (value: string | number | boolean) => {
                if (typeof value === "number") {
                    options.quantity = value;

                    await particles.refresh();
                }
            }
        );

        // TODO: Particles customization is not ready yet
    }
}
