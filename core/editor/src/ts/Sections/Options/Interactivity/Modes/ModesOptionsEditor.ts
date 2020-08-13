import type { Container } from "tsparticles/dist/Core/Container";
import type { IModes } from "tsparticles/dist/Options/Interfaces/Interactivity/Modes/IModes";
import { ColorUtils, EditorGroup, EditorNumberInput, IHsl, IRgb, EditorType } from "object-gui";
import { EditorBase } from "../../../../EditorBase";

export class ModesOptionsEditor extends EditorBase {
    public group!: EditorGroup;
    private options!: IModes;

    constructor(particles: Container) {
        super(particles);
    }

    public addToGroup(parent: EditorGroup): void {
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
        const group = this.group.addGroup("attract", "Attract");

        group.addProperty("distance", "Distance", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("duration", "Duration", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("speed", "Speed", EditorType.number).change(async () => {
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

        group
            .addProperty("color", "Color", EditorType.color, colorStringValue, false)
            .change(async (value: unknown) => {
                if (typeof value === "string") {
                    if (typeof options.color === "string") {
                        options.color = value;
                    } else {
                        options.color = {
                            value,
                        };
                    }
                }

                await particles.refresh();
            });

        group.addProperty("distance", "Distance", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("duration", "Duration", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group
            .addProperty("opacity", "Opacity", EditorType.number)
            .change(async () => {
                await particles.refresh();
            })
            .step(0.01)
            .min(0)
            .max(1);

        group.addProperty("size", "Size", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }

    private addConnect(): void {
        const particles = this.particles;
        const group = this.group.addGroup("connect", "Connect");

        group.addProperty("distance", "Distance", EditorType.number).change(async () => {
            await particles.refresh();
        });

        const connectLinksGroup = group.addGroup("links", "Links");

        connectLinksGroup
            .addProperty("opacity", "Opacity", EditorType.number)
            .change(async () => {
                await particles.refresh();
            })
            .step(0.01)
            .min(0)
            .max(1);

        group.addProperty("radius", "Radius", EditorType.number).change(async () => {
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

        grabLinksGroup.addProperty("blink", "Blink", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        grabLinksGroup
            .addProperty("color", "Color", EditorType.color, colorStringValue, false)
            .change(async (value: unknown) => {
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
            });

        grabLinksGroup.addProperty("consent", "Consent", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        grabLinksGroup
            .addProperty("opacity", "Opacity", EditorType.number)
            .change(async () => {
                await particles.refresh();
            })
            .step(0.01)
            .min(0)
            .max(1);

        group.addProperty("distance", "Distance", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }

    private addPush(): void {
        const particles = this.particles;
        const group = this.group.addGroup("push", "Push");

        group.addProperty("quantity", "Quantity", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }

    private addRemove(): void {
        const particles = this.particles;
        const group = this.group.addGroup("remove", "Remove");

        group.addProperty("remove", "Remove", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }

    private addRepulse(): void {
        const particles = this.particles;
        const group = this.group.addGroup("repulse", "Repulse");

        group.addProperty("distance", "Distance", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("duration", "Duration", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("speed", "Speed", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }

    private addSlow(): void {
        const particles = this.particles;
        const group = this.group.addGroup("slow", "Slow");

        group.addProperty("factor", "Factor", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("radius", "Radius", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }

    private addTrail(): void {
        const particles = this.particles;
        const group = this.group.addGroup("trail", "Trail");

        group.addProperty("delay", "Delay", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("quantity", "Quantity", EditorType.number).change(async () => {
            await particles.refresh();
        });

        // TODO: Particles customization is not ready yet
    }
}
