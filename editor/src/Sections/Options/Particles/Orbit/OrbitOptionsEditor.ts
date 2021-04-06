import { EditorBase } from "../../../../EditorBase";
import type { EditorGroup } from "object-gui";
import { EditorType } from "object-gui";
import type { Container } from "tsparticles-engine";
import type { IOrbit } from "tsparticles-engine/Options/Interfaces/Particles/Orbit/IOrbit";

export class OrbitOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: IOrbit;

    constructor(particles: Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("orbit", "Orbit");
        this.options = this.group.data as IOrbit;

        this.addAnimation();
        this.addRotation();
        this.addProperties();
    }

    private addAnimation(): void {
        const group = this.group.addGroup("animation", "Animation");
        const particles = this.particles;

        group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        group.addProperty("speed", "Speed", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }

    private addRotation(): void {
        const group = this.group.addGroup("rotation", "Rotation");
        const particles = this.particles;

        const randomGroup = group.addGroup("random", "Random");

        randomGroup.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        randomGroup.addProperty("minimumValue", "Minimum Value", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group.addProperty("value", "Value", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }

    private addProperties(): void {
        const particles = this.particles;
        const group = this.group;
        const options = this.options;
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

        group.addProperty("radius", "Radius", EditorType.number).change(async () => {
            await particles.refresh();
        });

        group
            .addProperty("opacity", "Opacity", EditorType.number)
            .change(async () => {
                await particles.refresh();
            })
            .min(0)
            .max(1)
            .step(0.01);

        group.addProperty("width", "Width", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }
}
