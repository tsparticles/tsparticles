import type { Container } from "tsparticles-engine";
import type { IInteractivity } from "tsparticles/Options/Interfaces/Interactivity/IInteractivity";
import { InteractivityDetect } from "tsparticles-engine";
import { EditorGroup, EditorType } from "object-gui";
import { ModesOptionsEditor } from "./Modes/ModesOptionsEditor";
import { EventsOptionsEditor } from "./Events/EventsOptionsEditor";
import { EditorBase } from "../../../EditorBase";

export class InteractivityOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: IInteractivity;

    constructor(particles: Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("interactivity", "Interactivity");
        this.options = this.group.data as IInteractivity;

        this.addEvents();
        this.addModes();

        this.addProperties();
    }

    private addModes(): void {
        const options = new ModesOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addEvents(): void {
        const options = new EventsOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addProperties(): void {
        const particles = this.particles;

        this.group
            .addProperty("detectsOn", "Detects On", EditorType.select)
            .change(async () => {
                await particles.refresh();
            })
            .addItems([
                {
                    value: InteractivityDetect.canvas,
                },
                {
                    value: InteractivityDetect.parent,
                },
                {
                    value: InteractivityDetect.window,
                },
            ]);
    }
}
