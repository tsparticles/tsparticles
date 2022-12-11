import type { Container } from "tsparticles-engine";
import { EditorBase } from "../../../../EditorBase";
import type { EditorGroup } from "object-gui";
import { EditorType } from "object-gui";

export class RollOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: () => unknown;

    constructor(particles: () => Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("roll", "Roll");
        this.options = this.group.data;

        this.addDarken();
        this.addEnlighten();
        this.addProperties();
    }

    private addDarken(): void {
        const group = this.group.addGroup("darken", "Darken");

        group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });

        group.addProperty("value", "Value", EditorType.number).change(async () => {
            await this.particles().refresh();
        });
    }

    private addEnlighten(): void {
        const group = this.group.addGroup("enlighten", "Enlighten");

        group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });

        group.addProperty("value", "Value", EditorType.number).change(async () => {
            await this.particles().refresh();
        });
    }

    private addProperties(): void {
        const optionsFunc = this.options as () => unknown,
            options = optionsFunc() as {
                backColor: string | unknown[] | { value: unknown };
            },
            color =
                typeof options.backColor === "string"
                    ? options.backColor
                    : options.backColor instanceof Array
                    ? options.backColor[0]
                    : options.backColor?.value;

        this.group
            .addProperty("backColor", "Back Color", EditorType.color, color, false)
            .change(async (value: unknown) => {
                const options = optionsFunc() as {
                    backColor: string | unknown[] | { value: unknown };
                };

                if (typeof value === "string") {
                    if (typeof options.backColor === "string") {
                        options.backColor = value;
                    } else {
                        if (options.backColor === undefined) {
                            options.backColor = {
                                value: value,
                            };
                        } else {
                            if (options.backColor instanceof Array) {
                                options.backColor = {
                                    value: value,
                                };
                            } else {
                                options.backColor.value = value;
                            }
                        }
                    }
                }

                await this.particles().refresh();
            });

        this.group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await this.particles().refresh();
        });

        this.group.addProperty("speed", "Speed", EditorType.number).change(async () => {
            await this.particles().refresh();
        });
    }
}
