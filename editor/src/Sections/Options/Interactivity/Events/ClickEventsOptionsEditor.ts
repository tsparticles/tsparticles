import type { Container } from "tsparticles-engine";
import type { IClickEvent } from "tsparticles-engine/Options/Interfaces/Interactivity/Events/IClickEvent";
import { EditorGroup, EditorType } from "object-gui";
import { ClickMode } from "tsparticles-engine";
import { EditorBase } from "../../../../EditorBase";
import { loadAbsorbersPlugin } from "tsparticles-plugin-absorbers";
import { loadEmittersPlugin } from "tsparticles-plugin-emitters";
import { AbsorberClickMode } from "tsparticles-plugin-absorbers/Enums";
import { EmitterClickMode } from "tsparticles-plugin-emitters/Enums";

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

        if (typeof loadAbsorbersPlugin !== "undefined") {
            const absorbersGroup = "Absorbers";

            modeSelectInput.addItemGroup(absorbersGroup);
            modeSelectInput.addItem(AbsorberClickMode.absorber, undefined, absorbersGroup);
        }

        if (typeof loadEmittersPlugin !== "undefined") {
            const emittersGroup = "Emitters";

            modeSelectInput.addItemGroup(emittersGroup);
            modeSelectInput.addItem(EmitterClickMode.emitter, undefined, emittersGroup);
        }
    }
}
