import type { Container, IModes } from "tsparticles-engine";
import { EasingType } from "tsparticles-engine";
import { EditorBase } from "../../../../EditorBase";
import type { EditorGroup } from "object-gui";
import { EditorType } from "object-gui";
import type { IBubble } from "tsparticles-interaction-external-bubble";
import type { IGrab } from "tsparticles-interaction-external-grab";
import type { ILight } from "tsparticles-interaction-light";
import { ParticlesOptionsEditor } from "../../Particles/ParticlesOptionsEditor";

export class ModesOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: () => IModes;

    constructor(particles: () => Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("modes", "Modes");
        this.options = this.group.data as () => IModes;

        this.addAttract();
        this.addBubble();
        this.addConnect();
        this.addGrab();
        this.addLight();
        this.addPush();
        this.addRemove();
        this.addRepulse();
        this.addSlow();
        this.addTrail();
    }

    private addAttract(): void {
        const group = this.group.addGroup("attract", "Attract");

        group.addProperty("distance", "Distance", EditorType.number).change(async () => {
            await this.particles().refresh();
        });

        group.addProperty("duration", "Duration", EditorType.number).change(async () => {
            await this.particles().refresh();
        });

        group
            .addProperty("easing", "Easing", EditorType.select)
            .change(async () => {
                await this.particles().refresh();
            })
            .addItems([
                {
                    value: EasingType.easeOutBack,
                },
                {
                    value: EasingType.easeOutCirc,
                },
                {
                    value: EasingType.easeOutCubic,
                },
                {
                    value: EasingType.easeOutExpo,
                },
                {
                    value: EasingType.easeOutQuad,
                },
                {
                    value: EasingType.easeOutQuint,
                },
                {
                    value: EasingType.easeOutSine,
                },
            ]);

        group.addProperty("factor", "Factor", EditorType.number).change(async () => {
            await this.particles().refresh();
        });

        group.addProperty("maxSpeed", "Max Speed", EditorType.number).change(async () => {
            await this.particles().refresh();
        });

        group.addProperty("speed", "Speed", EditorType.number).change(async () => {
            await this.particles().refresh();
        });
    }

    private addBubble(): void {
        const optionsFunc = (() => this.options().bubble) as () => IBubble | undefined;
        const options = optionsFunc();
        const group = this.group.addGroup("bubble", "Bubble");
        const color =
            typeof options?.color === "string"
                ? options?.color
                : options?.color instanceof Array
                ? undefined
                : options?.color?.value;

        group.addProperty("color", "Color", EditorType.color, color, false).change(async (value: unknown) => {
            const options = optionsFunc();

            if (!options) {
                return;
            }

            if (typeof value === "string") {
                if (typeof options.color === "string") {
                    options.color = value;
                } else {
                    options.color = {
                        value,
                    };
                }
            }

            await this.particles().refresh();
        });

        group.addProperty("distance", "Distance", EditorType.number).change(async () => {
            await this.particles().refresh();
        });

        group.addProperty("duration", "Duration", EditorType.number).change(async () => {
            await this.particles().refresh();
        });

        group
            .addProperty("opacity", "Opacity", EditorType.number)
            .change(async () => {
                await this.particles().refresh();
            })
            .step(0.01)
            .min(0)
            .max(1);

        group.addProperty("size", "Size", EditorType.number).change(async () => {
            await this.particles().refresh();
        });
    }

    private addConnect(): void {
        const group = this.group.addGroup("connect", "Connect");

        const connectLinksGroup = group.addGroup("links", "Links");

        connectLinksGroup
            .addProperty("opacity", "Opacity", EditorType.number)
            .change(async () => {
                await this.particles().refresh();
            })
            .step(0.01)
            .min(0)
            .max(1);

        group.addProperty("distance", "Distance", EditorType.number).change(async () => {
            await this.particles().refresh();
        });

        group.addProperty("radius", "Radius", EditorType.number).change(async () => {
            await this.particles().refresh();
        });
    }

    private addGrab(): void {
        const optionsFunc = (() => this.options().grab) as () => IGrab | undefined;
        const options = optionsFunc();
        const group = this.group.addGroup("grab", "Grab");
        const grabLinksGroup = group.addGroup("links", "Links");
        const links = options?.links;
        const color = typeof links?.color === "string" ? links?.color : links?.color?.value;

        grabLinksGroup.addProperty("blink", "Blink", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });

        grabLinksGroup.addProperty("color", "Color", EditorType.color, color, false).change(async (value: unknown) => {
            const options = optionsFunc();

            if (!options) {
                return;
            }

            if (typeof value === "string") {
                if (typeof options.links.color === "string") {
                    options.links.color = value;
                } else {
                    options.links.color = {
                        value,
                    };
                }

                await this.particles().refresh();
            }
        });

        grabLinksGroup.addProperty("consent", "Consent", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });

        grabLinksGroup
            .addProperty("opacity", "Opacity", EditorType.number)
            .change(async () => {
                await this.particles().refresh();
            })
            .step(0.01)
            .min(0)
            .max(1);

        group.addProperty("distance", "Distance", EditorType.number).change(async () => {
            await this.particles().refresh();
        });
    }

    private addLight(): void {
        const optionsFunc = (() => this.options().light) as () => ILight | undefined;
        const options = optionsFunc();
        const group = this.group.addGroup("light", "Light");

        const areaGroup = group.addGroup("area", "Light");
        const gradientGroup = areaGroup.addGroup("gradient", "Gradient");
        const startColor =
            typeof options?.area.gradient.start === "string"
                ? options?.area.gradient.start
                : options?.area.gradient.start?.value;

        gradientGroup
            .addProperty("start", "Start", EditorType.color, startColor, false)
            .change(async (value: unknown) => {
                const options = optionsFunc();

                if (!options) {
                    return;
                }

                if (typeof value === "string") {
                    if (typeof options.area.gradient.start === "string") {
                        options.area.gradient.start = value;
                    } else {
                        options.area.gradient.start = {
                            value,
                        };
                    }
                }

                await this.particles().refresh();
            });

        const stopColor =
            typeof options?.area.gradient.stop === "string"
                ? options?.area.gradient.stop
                : options?.area.gradient.stop?.value;

        gradientGroup.addProperty("stop", "Stop", EditorType.color, stopColor, false).change(async (value: unknown) => {
            const options = optionsFunc();

            if (!options) {
                return;
            }

            if (typeof value === "string") {
                if (typeof options.area.gradient.stop === "string") {
                    options.area.gradient.stop = value;
                } else {
                    options.area.gradient.stop = {
                        value,
                    };
                }
            }

            await this.particles().refresh();
        });

        areaGroup.addProperty("radius", "Radius", EditorType.number).change(async () => {
            await this.particles().refresh();
        });

        const shadowGroup = group.addGroup("shadow", "Shadow");

        const shadowColor =
            typeof options?.shadow.color === "string" ? options?.shadow.color : options?.shadow.color?.value;

        shadowGroup
            .addProperty("color", "Color", EditorType.color, shadowColor, false)
            .change(async (value: unknown) => {
                const options = optionsFunc();

                if (!options) {
                    return;
                }

                if (typeof value === "string") {
                    if (typeof options.shadow.color === "string") {
                        options.shadow.color = value;
                    } else {
                        options.shadow.color = {
                            value,
                        };
                    }
                }

                await this.particles().refresh();
            });

        shadowGroup.addProperty("length", "Length", EditorType.number).change(async () => {
            await this.particles().refresh();
        });
    }

    private addPush(): void {
        const group = this.group.addGroup("push", "Push");

        group.addProperty("quantity", "Quantity", EditorType.number).change(async () => {
            await this.particles().refresh();
        });
    }

    private addRemove(): void {
        const group = this.group.addGroup("remove", "Remove");

        group.addProperty("quantity", "Quantity", EditorType.number).change(async () => {
            await this.particles().refresh();
        });
    }

    private addRepulse(): void {
        const group = this.group.addGroup("repulse", "Repulse");

        group.addProperty("distance", "Distance", EditorType.number).change(async () => {
            await this.particles().refresh();
        });

        group.addProperty("duration", "Duration", EditorType.number).change(async () => {
            await this.particles().refresh();
        });

        group
            .addProperty("easing", "Easing", EditorType.select)
            .change(async () => {
                await this.particles().refresh();
            })
            .addItems([
                {
                    value: EasingType.easeOutBack,
                },
                {
                    value: EasingType.easeOutCirc,
                },
                {
                    value: EasingType.easeOutCubic,
                },
                {
                    value: EasingType.easeOutExpo,
                },
                {
                    value: EasingType.easeOutQuad,
                },
                {
                    value: EasingType.easeOutQuint,
                },
                {
                    value: EasingType.easeOutSine,
                },
            ]);

        group.addProperty("factor", "Factor", EditorType.number).change(async () => {
            await this.particles().refresh();
        });

        group.addProperty("maxSpeed", "Max Speed", EditorType.number).change(async () => {
            await this.particles().refresh();
        });

        group.addProperty("speed", "Speed", EditorType.number).change(async () => {
            await this.particles().refresh();
        });
    }

    private addSlow(): void {
        const group = this.group.addGroup("slow", "Slow");

        group.addProperty("factor", "Factor", EditorType.number).change(async () => {
            await this.particles().refresh();
        });

        group.addProperty("radius", "Radius", EditorType.number).change(async () => {
            await this.particles().refresh();
        });
    }

    private addTrail(): void {
        const group = this.group.addGroup("trail", "Trail");
        const options = (): unknown => this.options().trail;

        const particlesEditor = new ParticlesOptionsEditor(this.particles);

        particlesEditor.addParticlesToGroup(group, "particles", options);

        group.addProperty("delay", "Delay", EditorType.number).change(async () => {
            await this.particles().refresh();
        });

        group.addProperty("pauseOnStop", "Pause on Stop", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });

        group.addProperty("quantity", "Quantity", EditorType.number).change(async () => {
            await this.particles().refresh();
        });
    }
}
