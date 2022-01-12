import type { Container, ILinks, ILinksShadow } from "tsparticles-engine";
import { EditorGroup, EditorType } from "object-gui";
import { EditorBase } from "../../../../EditorBase";

export class LinksOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: ILinks;

    constructor(particles: Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("links", "Links");
        this.options = this.group.data as ILinks;

        this.addShadow();
        this.addTriangles();
        this.addProperties();
    }

    private addShadow(): void {
        const particles = this.particles;
        const group = this.group.addGroup("shadow", "Shadow");
        const options = group.data as ILinksShadow;
        const color = typeof options.color === "string" ? options.color : options.color?.value;

        group.addProperty("blur", "Blur", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        group.addProperty("color", "Color", EditorType.color, color, false).change(async (value: unknown) => {
            if (typeof value === "string") {
                if (typeof options.color === "string") {
                    options.color = value;
                } else {
                    if (options.color === undefined) {
                        options.color = {
                            value: value,
                        };
                    } else {
                        options.color.value = value;
                    }
                }
            }

            await particles.refresh();
        });

        group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });
    }

    private addTriangles(): void {
        const particles = this.particles;
        const group = this.group.addGroup("triangles", "Triangles");
        const options = this.options.triangles;
        const color = typeof options.color === "string" ? options.color : options.color?.value;

        group.addProperty("color", "Color", EditorType.color, color, false).change(async (value: unknown) => {
            if (typeof value === "string") {
                if (typeof options.color === "string") {
                    options.color = value;
                } else {
                    if (options.color === undefined) {
                        options.color = {
                            value: value,
                        };
                    } else {
                        options.color.value = value;
                    }
                }
            }

            await particles.refresh();
        });

        group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        group
            .addProperty("frequency", "Frequency", EditorType.number)
            .min(0)
            .max(1)
            .step(0.01)
            .change(async () => {
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
    }

    private addProperties(): void {
        const particles = this.particles;
        const options = this.options;
        const color = typeof options.color === "string" ? options.color : options.color?.value;

        this.group.addProperty("blink", "Blink", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        this.group.addProperty("color", "Color", EditorType.color, color, false).change(async (value: unknown) => {
            if (typeof value === "string") {
                if (typeof options.color === "string") {
                    options.color = value;
                } else {
                    options.color.value = value;
                }

                await particles.refresh();
            }
        });

        this.group.addProperty("consent", "Consent", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        this.group.addProperty("distance", "Distance", EditorType.number).change(async () => {
            await particles.refresh();
        });

        this.group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        this.group
            .addProperty("frequency", "Frequency", EditorType.number)
            .min(0)
            .max(1)
            .step(0.01)
            .change(async () => {
                await particles.refresh();
            });

        this.group.addProperty("id", "Id", EditorType.string).change(async () => {
            await particles.refresh();
        });

        this.group
            .addProperty("opacity", "Opacity", EditorType.number)
            .change(async () => {
                await particles.refresh();
            })
            .step(0.01)
            .min(0)
            .max(1);

        this.group.addProperty("warp", "Warp", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        this.group.addProperty("width", "Width", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }
}
