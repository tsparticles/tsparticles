import { Container } from "tsparticles/dist/Core/Container";
import { IShadow } from "tsparticles/dist/Options/Interfaces/Particles/IShadow";
import { ColorUtils, EditorGroup, IHsl, IRgb, EditorType } from "object-gui";
import { EditorBase } from "../../../../EditorBase";

export class ShadowOptionsEditor extends EditorBase {
    public group!: EditorGroup;
    private options!: IShadow;

    constructor(particles: Container) {
        super(particles);
    }

    public addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("shadow", "Shadow");
        this.options = this.group.data as IShadow;

        this.addOffset();
        this.addProperties();
    }

    private addOffset(): void {
        const particles = this.particles;
        const group = this.group.addGroup("offset", "Offset");

        group.addProperty("x", "X", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("y", "Y", EditorType.number).change(async () => {
            await particles.refresh();
        });
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

        this.group.addProperty("blur", "Blur", EditorType.number).change(async () => {
            await particles.refresh();
        });

        this.group
            .addProperty("color", "Color", EditorType.color, colorStringValue, false)
            .change(async (value: unknown) => {
                if (typeof value === "string") {
                    if (typeof options.color === "string") {
                        options.color = value;
                    } else {
                        options.color.value = value;
                    }
                }

                await particles.refresh();
            });

        this.group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });
    }
}
