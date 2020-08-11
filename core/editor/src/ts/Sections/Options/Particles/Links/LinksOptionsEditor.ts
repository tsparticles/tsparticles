import type { Container } from "tsparticles/dist/Core/Container";
import { ColorUtils, EditorGroup, IRgb, IHsl, EditorNumberInput } from "object-gui";
import type { ILinks } from "tsparticles/dist/Options/Interfaces/Particles/Links/ILinks";
import { EditorBase } from "../../../../EditorBase";

export class LinksOptionsEditor extends EditorBase {
    public group!: EditorGroup;
    private options!: ILinks;

    constructor(particles: Container) {
        super(particles);
    }

    public addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("links", "Links");
        this.options = this.group.data as ILinks;

        this.addShadow();
        this.addTriangles();
        this.addProperties();
    }

    private addShadow(): void {
        const particles = this.particles;
        const group = this.group.addGroup("shadow", "Shadow");
        const options = this.options.shadow;

        let shadowColorStringValue = "";

        if (options.color !== undefined) {
            if (typeof options.color === "string") {
                shadowColorStringValue = options.color;
            } else if (typeof options.color.value === "string") {
                shadowColorStringValue = options.color.value;
            } else {
                let rgb = options.color.value as IRgb;
                const hsl = options.color.value as IHsl;

                if (hsl.h !== undefined) {
                    rgb = ColorUtils.hslToRgb(hsl);
                }

                shadowColorStringValue = `${rgb.r.toString(16)}${rgb.g.toString(16)}${rgb.b.toString(16)}`;
            }
        }

        group.addProperty("blur", "Blur", options.blur, typeof options.blur, async () => {
            await particles.refresh();
        });

        group.addProperty(
            "color",
            "Color",
            shadowColorStringValue,
            "color",
            async (value: string | number | boolean) => {
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

                    await particles.refresh();
                }
            },
            false
        );

        group.addProperty("enable", "Enable", options.enable, typeof options.enable, () => {
            particles.refresh();
        });
    }

    private addTriangles(): void {
        const particles = this.particles;
        const group = this.group.addGroup("triangles", "Triangles");
        const options = this.options.triangles;

        let trianglesColorStringValue = "";

        if (options.color !== undefined) {
            if (typeof options.color === "string") {
                trianglesColorStringValue = options.color;
            } else if (typeof options.color.value === "string") {
                trianglesColorStringValue = options.color.value;
            } else {
                let rgb = options.color.value as IRgb;
                const hsl = options.color.value as IHsl;

                if (hsl.h !== undefined) {
                    rgb = ColorUtils.hslToRgb(hsl);
                }

                trianglesColorStringValue = `${rgb.r.toString(16)}${rgb.g.toString(16)}${rgb.b.toString(16)}`;
            }
        }

        group.addProperty(
            "color",
            "Color",
            trianglesColorStringValue,
            "color",
            async (value: string | number | boolean) => {
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

                    await particles.refresh();
                }
            },
            false
        );

        group.addProperty("enable", "Enable", options.enable, typeof options.enable, () => {
            particles.refresh();
        });

        const trianglesOpacityInput = group.addProperty("opacity", "Opacity", options.opacity, "number", () => {
            particles.refresh();
        }) as EditorNumberInput;

        trianglesOpacityInput.step(0.01).min(0).max(1);
    }

    private addProperties(): void {
        const particles = this.particles;
        const options = this.options;
        let colorStringValue: string | undefined;

        if (typeof options.color === "string") {
            colorStringValue = options.color;
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

        this.group.addProperty("blink", "Blink", options.blink, typeof options.blink, async () => {
            await particles.refresh();
        });

        this.group.addProperty(
            "color",
            "Color",
            colorStringValue,
            "color",
            async (value: string | number | boolean) => {
                if (typeof value === "string") {
                    if (typeof options.color === "string") {
                        options.color = value;
                    } else {
                        options.color.value = value;
                    }

                    await particles.refresh();
                }
            },
            false
        );

        this.group.addProperty("consent", "Consent", options.consent, typeof options.consent, async () => {
            await particles.refresh();
        });

        this.group.addProperty("distance", "Distance", options.distance, typeof options.distance, async () => {
            await particles.refresh();
        });

        this.group.addProperty("enable", "Enable", options.enable, typeof options.enable, async () => {
            await particles.refresh();
        });

        this.group.addProperty("id", "Id", options.id, "string", async () => {
            await particles.refresh();
        });

        const opacityInput = this.group.addProperty(
            "opacity",
            "Opacity",
            options.opacity,
            typeof options.opacity,
            async () => {
                await particles.refresh();
            }
        ) as EditorNumberInput;

        opacityInput.step(0.01).min(0).max(1);

        this.group.addProperty("warp", "Warp", options.warp, typeof options.warp, async () => {
            await particles.refresh();
        });

        this.group.addProperty("width", "Width", options.width, typeof options.width, async () => {
            await particles.refresh();
        });
    }
}
