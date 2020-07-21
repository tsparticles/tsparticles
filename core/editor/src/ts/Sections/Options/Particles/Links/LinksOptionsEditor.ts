import type { EditorContainer } from "../../../../Editors/EditorContainer";
import type { IRgb } from "tsparticles/dist/Core/Interfaces/IRgb";
import type { IHsl } from "tsparticles/dist/Core/Interfaces/IHsl";
import type { Container } from "tsparticles/dist/Core/Container";
import { ColorUtils } from "tsparticles";
import type { ILinks } from "tsparticles/dist/Options/Interfaces/Particles/Links/ILinks";

export class LinksOptionsEditor {
    public readonly container: EditorContainer;
    private readonly particles: Container;

    constructor(private readonly parent: EditorContainer, private readonly options: ILinks) {
        this.container = parent.addContainer("links", "Links", true);
        this.particles = this.container.particles;

        this.addLinks();
    }

    private addLinks(): void {
        const particles = this.container.particles;
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

        this.container.addProperty(
            "blink",
            "Blink",
            options.blink,
            typeof options.blink,
            async (value: number | string | boolean) => {
                if (typeof value === "boolean") {
                    options.blink = value;

                    await particles.refresh();
                }
            }
        );

        this.container.addProperty(
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
            }
        );

        this.container.addProperty(
            "consent",
            "Consent",
            options.consent,
            typeof options.consent,
            async (value: number | string | boolean) => {
                if (typeof value === "boolean") {
                    options.consent = value;

                    await particles.refresh();
                }
            }
        );

        this.container.addProperty(
            "distance",
            "Distance",
            options.distance,
            typeof options.distance,
            async (value: number | string | boolean) => {
                if (typeof value === "number") {
                    options.distance = value;

                    await particles.refresh();
                }
            }
        );

        this.container.addProperty(
            "enable",
            "Enable",
            options.enable,
            typeof options.enable,
            async (value: number | string | boolean) => {
                if (typeof value === "boolean") {
                    options.enable = value;

                    await particles.refresh();
                }
            }
        );

        const opacityInput = this.container.addProperty(
            "opacity",
            "Opacity",
            options.opacity,
            typeof options.opacity,
            async (value: number | string | boolean) => {
                if (typeof value === "number") {
                    options.opacity = value;

                    await particles.refresh();
                }
            }
        );

        (opacityInput.element as HTMLInputElement).step = "0.01";

        let trianglesColorStringValue = "";

        if (options.triangles.color !== undefined) {
            if (typeof options.triangles.color === "string") {
                trianglesColorStringValue = options.triangles.color;
            } else if (typeof options.triangles.color.value === "string") {
                trianglesColorStringValue = options.triangles.color.value;
            } else {
                let rgb = options.triangles.color.value as IRgb;
                const hsl = options.triangles.color.value as IHsl;

                if (hsl.h !== undefined) {
                    rgb = ColorUtils.hslToRgb(hsl);
                }

                trianglesColorStringValue = `${rgb.r.toString(16)}${rgb.g.toString(16)}${rgb.b.toString(16)}`;
            }
        }

        const triangleContainer = this.container.addContainer("triangles", "Triangles", true);

        triangleContainer.addProperty(
            "color",
            "Color",
            trianglesColorStringValue,
            "color",
            async (value: string | number | boolean) => {
                if (typeof value === "string") {
                    if (typeof options.triangles.color === "string") {
                        options.triangles.color = value;
                    } else {
                        if (options.triangles.color === undefined) {
                            options.triangles.color = {
                                value: value,
                            };
                        } else {
                            options.triangles.color.value = value;
                        }
                    }

                    await particles.refresh();
                }
            }
        );

        triangleContainer.addProperty(
            "enable",
            "Enable",
            options.triangles.enable,
            typeof options.triangles.enable,
            (value: number | string | boolean) => {
                if (typeof value === "boolean") {
                    options.triangles.enable = value;

                    particles.refresh();
                }
            }
        );

        const trianglesOpacityInput = triangleContainer.addProperty(
            "opacity",
            "Opacity",
            options.triangles.opacity,
            typeof options.triangles.opacity,
            (value: number | string | boolean) => {
                if (typeof value === "number") {
                    options.triangles.opacity = value;

                    particles.refresh();
                }
            }
        );

        (trianglesOpacityInput.element as HTMLInputElement).step = "0.01";

        this.container.addProperty(
            "warp",
            "Warp",
            options.warp,
            typeof options.warp,
            async (value: number | string | boolean) => {
                if (typeof value === "boolean") {
                    options.warp = value;

                    await particles.refresh();
                }
            }
        );

        this.container.addProperty(
            "width",
            "Width",
            options.width,
            typeof options.width,
            async (value: number | string | boolean) => {
                if (typeof value === "number") {
                    options.width = value;

                    await particles.refresh();
                }
            }
        );
    }
}
