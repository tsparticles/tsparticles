import type { ILinks, ILinksShadow, ILinksTriangle } from "tsparticles-interaction-particles-links";
import type { Container } from "tsparticles-engine";
import { EditorBase } from "../../../../EditorBase";
import type { EditorGroup } from "object-gui";
import { EditorType } from "object-gui";

export class LinksOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: () => ILinks;

    constructor(particles: () => Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("links", "Links");
        this.options = this.group.data as () => ILinks;

        this.addShadow();
        this.addTriangles();
        this.addProperties();
    }

    private addProperties(): void {
        const optionsFunc = (): ILinks => this.options();
        const options = optionsFunc();
        const color = typeof options.color === "string" ? options.color : options.color?.value;

        this.group.addProperty("blink", "Blink", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });

        this.group.addProperty("color", "Color", EditorType.color, color, false).change(async (value: unknown) => {
            const options = optionsFunc();

            if (typeof value === "string") {
                if (typeof options.color === "string") {
                    options.color = value;
                } else {
                    options.color.value = value;
                }

                await this.particles().refresh();
            }
        });

        this.group.addProperty("consent", "Consent", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });

        this.group.addProperty("distance", "Distance", EditorType.number).change(async () => {
            await this.particles().refresh();
        });

        this.group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });

        this.group
            .addProperty("frequency", "Frequency", EditorType.number)
            .min(0)
            .max(1)
            .step(0.01)
            .change(async () => {
                await this.particles().refresh();
            });

        this.group.addProperty("id", "Id", EditorType.string).change(async () => {
            await this.particles().refresh();
        });

        this.group
            .addProperty("opacity", "Opacity", EditorType.number)
            .change(async () => {
                await this.particles().refresh();
            })
            .step(0.01)
            .min(0)
            .max(1);

        this.group.addProperty("warp", "Warp", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });

        this.group.addProperty("width", "Width", EditorType.number).change(async () => {
            await this.particles().refresh();
        });
    }

    private addShadow(): void {
        const group = this.group.addGroup("shadow", "Shadow");
        const optionsFunc = group.data as () => ILinksShadow;
        const options = optionsFunc();
        const color = typeof options.color === "string" ? options.color : options.color?.value;

        group.addProperty("blur", "Blur", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });

        group.addProperty("color", "Color", EditorType.color, color, false).change(async (value: unknown) => {
            const options = optionsFunc();

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

            await this.particles().refresh();
        });

        group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });
    }

    private addTriangles(): void {
        const group = this.group.addGroup("triangles", "Triangles");
        const optionsFunc = (): ILinksTriangle => this.options().triangles;
        const options = optionsFunc();
        const color = typeof options?.color === "string" ? options.color : options?.color?.value;

        group.addProperty("color", "Color", EditorType.color, color, false).change(async (value: unknown) => {
            const options = optionsFunc();

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

            await this.particles().refresh();
        });

        group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });

        group
            .addProperty("frequency", "Frequency", EditorType.number)
            .min(0)
            .max(1)
            .step(0.01)
            .change(async () => {
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
    }
}
