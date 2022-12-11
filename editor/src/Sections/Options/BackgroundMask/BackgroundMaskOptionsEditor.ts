import type { Container, IBackgroundMask, IBackgroundMaskCover, IColor } from "tsparticles-engine";
import { EditorBase } from "../../../EditorBase";
import type { EditorGroup } from "object-gui";
import { EditorType } from "object-gui";

export class BackgroundMaskOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: () => IBackgroundMask;

    constructor(particles: () => Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("backgroundMask", "Background Mask");
        this.options = this.group.data as () => IBackgroundMask;

        this.addCover();
        this.addProperties();
    }

    private addCover(): void {
        const options = this.options().cover as IBackgroundMaskCover;
        const coverColor = options.color as IColor;
        const coverGroup = this.group.addGroup("cover", "Cover");

        coverGroup
            .addProperty("color", "Color", EditorType.color, coverColor.value, false)
            .change(async (value: unknown) => {
                if (typeof value === "string") {
                    coverColor.value = value;
                }

                await this.particles().refresh();
            });

        coverGroup
            .addProperty("opacity", "Opacity", EditorType.number)
            .change(async () => {
                await this.particles().refresh();
            })
            .step(0.01)
            .min(0)
            .max(1);
    }

    private addProperties(): void {
        this.group
            .addProperty("composite", "Composite", EditorType.select)
            .change(async () => {
                await this.particles().refresh();
            })
            .addItems([
                {
                    value: "source-over",
                },
                {
                    value: "source-in",
                },
                {
                    value: "source-out",
                },
                {
                    value: "source-atop",
                },
                {
                    value: "destination-over",
                },
                {
                    value: "destination-in",
                },
                {
                    value: "destination-out",
                },
                {
                    value: "destination-atop",
                },
                {
                    value: "lighter",
                },
                {
                    value: "copy",
                },
                {
                    value: "xor",
                },
                {
                    value: "multiply",
                },
                {
                    value: "screen",
                },
                {
                    value: "overlay",
                },
                {
                    value: "darken",
                },
                {
                    value: "lighten",
                },
                {
                    value: "color-dodge",
                },
                {
                    value: "color-burn",
                },
                {
                    value: "hard-light",
                },
                {
                    value: "soft-light",
                },
                {
                    value: "difference",
                },
                {
                    value: "exclusion",
                },
                {
                    value: "hue",
                },
                {
                    value: "saturation",
                },
                {
                    value: "color",
                },
                {
                    value: "luminosity",
                },
            ]);

        this.group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });
    }
}
