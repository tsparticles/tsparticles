import type { Container, IInteractivity } from "tsparticles-engine";
import { EditorBase } from "../../../EditorBase";
import type { EditorGroup } from "object-gui";
import { EditorType } from "object-gui";
import { EventsOptionsEditor } from "./Events/EventsOptionsEditor";
import { InteractivityDetect } from "tsparticles-engine";
import { ModesOptionsEditor } from "./Modes/ModesOptionsEditor";

export class InteractivityOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: () => IInteractivity;

    constructor(particles: () => Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("interactivity", "Interactivity");
        this.options = this.group.data as () => IInteractivity;

        this.addEvents();
        this.addModes();

        this.addProperties();
    }

    private addEvents(): void {
        const options = new EventsOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addModes(): void {
        const options = new ModesOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addProperties(): void {
        this.group
            .addProperty("detectsOn", "Detects On", EditorType.select)
            .change(async () => {
                await this.particles().refresh();
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
