import type { Container } from "tsparticles";
import type { IClickEvent } from "tsparticles/Options/Interfaces/Interactivity/Events/IClickEvent";
import { EditorGroup, EditorType } from "object-gui";
import { AbsorberClickMode, ClickMode, EmitterClickMode } from "tsparticles";
import { EmittersPlugin } from "tsparticles/Plugins/Emitters/EmittersPlugin";
import { AbsorbersPlugin } from "tsparticles/Plugins/Absorbers/AbsorbersPlugin";
import { EditorBase } from "../../../../EditorBase";

export class ClickEventsOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: IClickEvent;

    constructor(particles: Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("onClick", "Click Events");
        this.options = this.group.data as IClickEvent;

        this.addProperties();
    }

    private addProperties(): void {
        const particles = this.particles;

        this.group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        const modeSelectInput = this.group
            .addProperty("mode", "Mode", EditorType.select)
            .change(async () => {
                await particles.refresh();
            })
            .addItems([
                {
                    value: ClickMode.attract,
                },
                {
                    value: ClickMode.bubble,
                },
                {
                    value: ClickMode.pause,
                },
                {
                    value: ClickMode.push,
                },
                {
                    value: ClickMode.remove,
                },
                {
                    value: ClickMode.repulse,
                },
                {
                    value: ClickMode.trail,
                },
            ]);

        if (typeof AbsorbersPlugin !== "undefined") {
            const absorbersGroup = "Absorbers";

            modeSelectInput.addItemGroup(absorbersGroup);
            modeSelectInput.addItem(AbsorberClickMode.absorber, undefined, absorbersGroup);
        }

        if (typeof EmittersPlugin !== "undefined") {
            const emittersGroup = "Emitters";

            modeSelectInput.addItemGroup(emittersGroup);
            modeSelectInput.addItem(EmitterClickMode.emitter, undefined, emittersGroup);
        }
    }
}
