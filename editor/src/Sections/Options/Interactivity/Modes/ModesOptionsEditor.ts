import type { Container } from "tsparticles-engine";
import type { IModes } from "tsparticles-engine/Options/Interfaces/Interactivity/Modes/IModes";
import { EditorGroup, EditorType } from "object-gui";
import { EditorBase } from "../../../../EditorBase";
import { ParticlesOptionsEditor } from "../../Particles/ParticlesOptionsEditor";
import type { IPush } from "tsparticles-engine/Options/Interfaces/Interactivity/Modes/IPush";
import type { IRemove } from "tsparticles-engine/Options/Interfaces/Interactivity/Modes/IRemove";
import { EasingType } from "tsparticles-engine";

export class ModesOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: IModes;

    constructor(particles: Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("modes", "Modes");
        this.options = this.group.data as IModes;

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
        const particles = this.particles;
        const group = this.group.addGroup("attract", "Attract");

        group.addProperty("distance", "Distance", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("duration", "Duration", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group
            .addProperty("easing", "Easing", EditorType.select)
            .change(async () => {
                await particles.refresh();
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
            await particles.refresh();
        });

        group.addProperty("maxSpeed", "Max Speed", EditorType.number).change(async () => {
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
        const color =
            typeof options.color === "string"
                ? options.color
                : options.color instanceof Array
                ? undefined
                : options.color?.value;

        group.addProperty("color", "Color", EditorType.color, color, false).change(async (value: unknown) => {
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

        const connectLinksGroup = group.addGroup("links", "Links");

        connectLinksGroup
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

        group.addProperty("radius", "Radius", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }

    private addGrab(): void {
        const particles = this.particles;
        const options = this.options.grab;
        const group = this.group.addGroup("grab", "Grab");
        const grabLinksGroup = group.addGroup("links", "Links");
        const links = options.links;
        const color = typeof links.color === "string" ? links.color : links.color?.value;

        grabLinksGroup.addProperty("blink", "Blink", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        grabLinksGroup.addProperty("color", "Color", EditorType.color, color, false).change(async (value: unknown) => {
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

    private addLight(): void {
        const particles = this.particles;
        const options = this.options.light;
        const group = this.group.addGroup("light", "Light");

        const areaGroup = group.addGroup("area", "Light");
        const gradientGroup = areaGroup.addGroup("gradient", "Gradient");
        const startColor =
            typeof options.area.gradient.start === "string"
                ? options.area.gradient.start
                : options.area.gradient.start?.value;

        gradientGroup
            .addProperty("start", "Start", EditorType.color, startColor, false)
            .change(async (value: unknown) => {
                if (typeof value === "string") {
                    if (typeof options.area.gradient.start === "string") {
                        options.area.gradient.start = value;
                    } else {
                        options.area.gradient.start = {
                            value,
                        };
                    }
                }

                await particles.refresh();
            });

        const stopColor =
            typeof options.area.gradient.stop === "string"
                ? options.area.gradient.stop
                : options.area.gradient.stop?.value;

        gradientGroup.addProperty("stop", "Stop", EditorType.color, stopColor, false).change(async (value: unknown) => {
            if (typeof value === "string") {
                if (typeof options.area.gradient.stop === "string") {
                    options.area.gradient.stop = value;
                } else {
                    options.area.gradient.stop = {
                        value,
                    };
                }
            }

            await particles.refresh();
        });

        areaGroup.addProperty("radius", "Radius", EditorType.number).change(async () => {
            await particles.refresh();
        });

        const shadowGroup = group.addGroup("shadow", "Shadow");

        const shadowColor =
            typeof options.shadow.color === "string" ? options.shadow.color : options.shadow.color?.value;

        shadowGroup
            .addProperty("color", "Color", EditorType.color, shadowColor, false)
            .change(async (value: unknown) => {
                if (typeof value === "string") {
                    if (typeof options.shadow.color === "string") {
                        options.shadow.color = value;
                    } else {
                        options.shadow.color = {
                            value,
                        };
                    }
                }

                await particles.refresh();
            });

        shadowGroup.addProperty("length", "Length", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }

    private addPush(): void {
        const particles = this.particles;
        const group = this.group.addGroup("push", "Push");
        const options = group.data as IPush;

        group.addProperty("default", "Default", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        const groupsGroup = group.addGroup("groups", "group");

        groupsGroup.addButton("addGroup", "Add Group", false).click(async () => {
            const arr = options.groups;

            groupsGroup
                .addProperty(arr.length.toString(10), `Group ${arr.length + 1}`, EditorType.string)
                .change(async () => {
                    await particles.refresh();
                });

            await this.particles.refresh();
        });

        group.addProperty("quantity", "Quantity", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }

    private addRemove(): void {
        const particles = this.particles;
        const group = this.group.addGroup("remove", "Remove");
        const options = group.data as IRemove;

        group.addProperty("default", "Default", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        const groupsGroup = group.addGroup("groups", "group");

        groupsGroup.addButton("addGroup", "Add Group", false).click(async () => {
            const arr = options.groups;

            groupsGroup
                .addProperty(arr.length.toString(10), `Group ${arr.length + 1}`, EditorType.string)
                .change(async () => {
                    await particles.refresh();
                });

            await this.particles.refresh();
        });

        group.addProperty("quantity", "Quantity", EditorType.number).change(async () => {
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

        group
            .addProperty("easing", "Easing", EditorType.select)
            .change(async () => {
                await particles.refresh();
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
            await particles.refresh();
        });

        group.addProperty("maxSpeed", "Max Speed", EditorType.number).change(async () => {
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
        const options = this.options.trail;
        const particlesEditor = new ParticlesOptionsEditor(particles);

        particlesEditor.addToGroup(group, "particles", options);

        group.addProperty("delay", "Delay", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("pauseOnStop", "Pause on Stop", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        group.addProperty("quantity", "Quantity", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("pauseOnStop", "Pause On Stop", EditorType.boolean).change(async () => {
            await particles.refresh();
        });
    }
}
