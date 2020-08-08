import { Container } from "tsparticles/dist/Core/Container";
import { IInteractivity } from "tsparticles/dist/Options/Interfaces/Interactivity/IInteractivity";
import { InteractivityDetect } from "tsparticles";
import { EditorSelectInput, EditorGroup } from "object-gui";
import { ModesOptionsEditor } from "./Modes/ModesOptionsEditor";
import { EventsOptionsEditor } from "./Events/EventsOptionsEditor";

export class InteractivityOptionsEditor {
    public readonly group: EditorGroup;
    private readonly options: IInteractivity;

    constructor(private readonly parent: EditorGroup, private readonly particles: Container) {
        this.group = parent.addGroup("interactivity", "Interactivity");
        this.options = this.group.data as IInteractivity;

        this.addEvents();
        this.addModes();

        this.addProperties();
    }

    private addModes(): void {
        const options = new ModesOptionsEditor(this.group, this.particles);
    }

    private addEvents(): void {
        const options = new EventsOptionsEditor(this.group, this.particles);
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
