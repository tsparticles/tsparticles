import type { Container } from "tsparticles/dist/Core/Container";
import type { IClickEvent } from "tsparticles/dist/Options/Interfaces/Interactivity/Events/IClickEvent";
import { EditorSelectInput, EditorGroup, EditorType } from "object-gui";
import { AbsorberClickMode, ClickMode, EmitterClickMode } from "tsparticles";
import { EditorBase } from "../../../../EditorBase";

export class ClickEventsOptionsEditor extends EditorBase {
    public group!: EditorGroup;
    private options!: IClickEvent;

    constructor(particles: Container) {
        super(particles);
    }

    public addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("onClick", "Click Events");
        this.options = this.group.data as IClickEvent;

        this.addProperties();
    }

    private addProperties(): void {
        const particles = this.particles;

        this.group.addProperty("enable", "Enable", EditorType.boolean).change(async () => {
            await particles.refresh();
        });

        const modeSelectInput = this.group.addProperty("mode", "Mode", EditorType.select).change(async () => {
            await particles.refresh();
        }) as EditorSelectInput;

        modeSelectInput.addItem(ClickMode.attract);
        // modeSelectInput.addItem(ClickMode.bubble); // TODO: This mode seems buggy
        modeSelectInput.addItem(ClickMode.pause);
        modeSelectInput.addItem(ClickMode.push);
        modeSelectInput.addItem(ClickMode.remove);
        modeSelectInput.addItem(ClickMode.repulse);
        modeSelectInput.addItem(ClickMode.trail);

        if (typeof AbsorberClickMode !== "undefined") {
            const absorbersGroup = "Absorbers";

            modeSelectInput.addItemGroup(absorbersGroup);
            modeSelectInput.addItem(AbsorberClickMode.absorber, undefined, absorbersGroup);
        }

        if (typeof EmitterClickMode !== "undefined") {
            const emittersGroup = "Emitters";

            modeSelectInput.addItemGroup(emittersGroup);
            modeSelectInput.addItem(EmitterClickMode.emitter, undefined, emittersGroup);
        }
    }
}
