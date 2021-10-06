import type { Container } from "tsparticles-engine";
import { EditorGroup, EditorType } from "object-gui";
import { EditorBase } from "../../../../EditorBase";
import type { IRoll } from "tsparticles-engine/Options/Interfaces/Particles/Roll/IRoll";

export class RollOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: IRoll;

    constructor(particles: Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("roll", "Roll");
        this.options = this.group.data as IRoll;

        this.addDarken();
        this.addEnlighten();
        this.addProperties();
    }

    private addDarken() {
        const particles = this.particles;
        const group = this.group.addGroup("darken", "Darken");

        group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        group.addProperty("value", "Value", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }

    private addEnlighten() {
        const particles = this.particles;
        const group = this.group.addGroup("enlighten", "Enlighten");

        group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        group.addProperty("value", "Value", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }

    private addProperties(): void {
        const particles = this.particles;
        const color =
            typeof this.options.backColor === "string"
                ? this.options.backColor
                : this.options.backColor instanceof Array
                ? this.options.backColor[0]
                : this.options.backColor?.value;

        this.group
            .addProperty("backColor", "Back Color", EditorType.color, color, false)
            .change(async (value: unknown) => {
                if (typeof value === "string") {
                    if (typeof this.options.backColor === "string") {
                        this.options.backColor = value;
                    } else {
                        if (this.options.backColor === undefined) {
                            this.options.backColor = {
                                value: value,
                            };
                        } else {
                            if (this.options.backColor instanceof Array) {
                                this.options.backColor = {
                                    value: value,
                                };
                            } else {
                                this.options.backColor.value = value;
                            }
                        }
                    }
                }

                await particles.refresh();
            });

        this.group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        this.group.addProperty("speed", "Speed", EditorType.number).change(async () => {
            await particles.refresh();
        });
    }
}
