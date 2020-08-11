import { Container } from "tsparticles/dist/Core/Container";
import { IInteractivity } from "tsparticles/dist/Options/Interfaces/Interactivity/IInteractivity";
import { InteractivityDetect } from "tsparticles";
import { EditorSelectInput, EditorGroup } from "object-gui";
import { ModesOptionsEditor } from "./Modes/ModesOptionsEditor";
import { EventsOptionsEditor } from "./Events/EventsOptionsEditor";
import { EditorBase } from "../../../EditorBase";

export class InteractivityOptionsEditor extends EditorBase {
    public group!: EditorGroup;
    private options!: IInteractivity;

    constructor(particles: Container) {
        super(particles);
    }

    public addToGroup(parent: EditorGroup): void {
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

        const selectDetect = this.group.addProperty(
            "detectsOn",
            "Detects On",
            this.options.detectsOn,
            "select",
            async () => {
                await particles.refresh();
            }
        ) as EditorSelectInput;

        selectDetect.addItem(InteractivityDetect.canvas);
        selectDetect.addItem(InteractivityDetect.parent);
        selectDetect.addItem(InteractivityDetect.window);
    }
}
